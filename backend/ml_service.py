import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import datetime
import database
from sqlalchemy.orm import Session

def predict_outbreak_risk(district: str, db: Session):
    env = db.query(database.EnvironmentalData).filter(database.EnvironmentalData.district == district).order_by(database.EnvironmentalData.timestamp.desc()).first()
    visits = db.query(database.PatientVisit).filter(database.PatientVisit.district == district).all()
    
    risk_score = 0.1
    if env:
        if env.rainfall > 50 and env.humidity > 70: risk_score += 0.4
        if env.water_tds > 500: risk_score += 0.3
    if visits:
        fever_count = sum(1 for v in visits if "fever" in v.symptoms.lower())
        if fever_count > 5: risk_score += 0.2
    return min(risk_score, 1.0)

def generate_district_predictions(db: Session):
    districts = ["North District", "South District", "East District", "West District"]
    today = datetime.datetime.utcnow().date()
    db.query(database.Prediction).filter(database.Prediction.timestamp >= today).delete()
    
    predictions = []
    for d in districts:
        risk = predict_outbreak_risk(d, db)
        disease = "Dengue/Malaria" if risk > 0.5 else "Water-borne" if risk > 0.3 else "General Viral"
        pred = database.Prediction(district=d, disease=disease, risk_score=risk, predicted_date=datetime.datetime.utcnow() + datetime.timedelta(days=7))
        db.add(pred)
        predictions.append(pred)
    db.commit()
    return predictions
