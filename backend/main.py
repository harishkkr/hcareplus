from fastapi import FastAPI, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Dict
import database
import pydantic_models
import auth
import ml_service
from fastapi.security import OAuth2PasswordRequestForm
import datetime

app = FastAPI(title="HCarePlus AI Platform")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def startup():
    # In cloud environments, we assume tables are already created via SQL Editor
    pass

# --- Auth Routes (Managed by Supabase on Frontend) ---

@app.get("/users/me")
async def read_users_me(current_user: database.User = Depends(auth.get_current_user)):
    return {"username": current_user.username, "role": current_user.role, "name": current_user.full_name}

# --- Health Data Routes ---

@app.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    return {
        "active_outbreaks": db.query(database.Alert).filter(database.Alert.type == "Outbreak").count(),
        "districts_monitored": 24,
        "health_score": 88,
        "pending_alerts": db.query(database.Alert).count(),
        "total_visits_today": db.query(database.PatientVisit).count()
    }

@app.get("/alerts")
def get_alerts(db: Session = Depends(get_db)):
    return db.query(database.Alert).order_by(database.Alert.timestamp.desc()).all()

@app.post("/alerts")
async def create_alert(alert: pydantic_models.AlertBase, db: Session = Depends(get_db), current_user: database.User = Depends(auth.get_current_user)):
    auth.check_role(current_user, ["super_admin", "district_health_officer", "board_of_directors"])
    db_alert = database.Alert(**alert.dict())
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    
    # Broadcast via WebSocket
    await manager.broadcast({
        "type": "new_alert",
        "data": {
            "type": db_alert.type,
            "message": db_alert.message,
            "district": db_alert.district
        }
    })
    return db_alert

# --- Patient Routes ---

@app.get("/patients")
def get_patients(db: Session = Depends(get_db), current_user: database.User = Depends(auth.get_current_user)):
    auth.check_role(current_user, ["board_of_directors", "doctor", "receptionist"])
    return db.query(database.PatientVisit).order_by(database.PatientVisit.timestamp.desc()).limit(50).all()

@app.post("/patients")
def create_patient_visit(visit: pydantic_models.PatientVisitBase, db: Session = Depends(get_db), current_user: database.User = Depends(auth.get_current_user)):
    auth.check_role(current_user, ["receptionist", "doctor"])
    db_visit = database.PatientVisit(**visit.dict())
    db.add(db_visit)
    db.commit()
    db.refresh(db_visit)
    return db_visit

# --- Inventory Routes ---

@app.get("/inventory")
def get_inventory(db: Session = Depends(get_db), current_user: database.User = Depends(auth.get_current_user)):
    auth.check_role(current_user, ["board_of_directors", "doctor"])
    return db.query(database.InventoryItem).all()

@app.post("/inventory")
def update_inventory(item: pydantic_models.InventoryItemBase, db: Session = Depends(get_db), current_user: database.User = Depends(auth.get_current_user)):
    auth.check_role(current_user, ["board_of_directors", "doctor"])
    db_item = db.query(database.InventoryItem).filter(database.InventoryItem.name == item.name, database.InventoryItem.district == item.district).first()
    if db_item:
        db_item.stock_level = item.stock_level
    else:
        db_item = database.InventoryItem(**item.dict())
        db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

# --- Environmental Routes ---

@app.get("/environment")
def get_environment(db: Session = Depends(get_db), current_user: database.User = Depends(auth.get_current_user)):
    auth.check_role(current_user, ["board_of_directors", "doctor"])
    return db.query(database.EnvironmentalData).order_by(database.EnvironmentalData.timestamp.desc()).limit(20).all()

@app.post("/environment")
def log_environment_data(data: pydantic_models.EnvironmentalDataBase, db: Session = Depends(get_db), current_user: database.User = Depends(auth.get_current_user)):
    auth.check_role(current_user, ["receptionist", "board_of_directors"])
    db_data = database.EnvironmentalData(**data.dict())
    db.add(db_data)
    db.commit()
    db.refresh(db_data)
    return db_data

# --- ML & Prediction Routes ---

@app.get("/predictions")
def get_predictions(db: Session = Depends(get_db)):
    # Trigger new predictions if none exist for today
    today = datetime.datetime.utcnow().date()
    existing = db.query(database.Prediction).filter(database.Prediction.timestamp >= today).first()
    if not existing:
        ml_service.generate_district_predictions(db)
    
    return db.query(database.Prediction).order_by(database.Prediction.timestamp.desc()).limit(10).all()

# --- WebSocket Route ---

@app.websocket("/ws/notifications")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Wait for any message (not strictly needed for broadcast only)
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
