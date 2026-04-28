from sqlalchemy import Column, Integer, String, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import datetime

import os
from dotenv import load_dotenv

load_dotenv()

# Use environment variable for Supabase connection, fallback to local sqlite for dev
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./healthguard.db")

# For PostgreSQL (Supabase), we don't need check_same_thread
if SQLALCHEMY_DATABASE_URL.startswith("postgresql"):
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
else:
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class SymptomReport(Base):
    __tablename__ = "symptom_reports"

    id = Column(Integer, primary_key=True, index=True)
    district = Column(String)
    symptom = Column(String)
    severity = Column(Integer)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String) # Outbreak, Shortage, etc.
    message = Column(String)
    district = Column(String)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class User(Base):
    __tablename__ = "profiles"

    id = Column(String, primary_key=True, index=True) # UUID from Supabase Auth
    username = Column(String, unique=True, index=True)
    full_name = Column(String)
    role = Column(String) # board_of_directors, doctor, receptionist
    phone = Column(String, nullable=True)
    specialization = Column(String, nullable=True) # Only for doctors
    license_number = Column(String, nullable=True) # For doctors and receptionists

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    district = Column(String)
    disease = Column(String)
    risk_score = Column(Float)
    predicted_inflow = Column(Integer, nullable=True)
    predicted_demand = Column(String, nullable=True) # JSON string of medicine:count
    predicted_date = Column(DateTime)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class PatientVisit(Base):
    __tablename__ = "patient_visits"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String)
    dob = Column(String)
    district = Column(String)
    phone = Column(String)
    address = Column(String)
    symptoms = Column(String) # Comma separated symptoms
    age = Column(Integer)
    gender = Column(String)
    admission_no = Column(String)
    is_new = Column(String) # "New Patient" or "Already Admitted"
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    stock_level = Column(Integer)
    unit = Column(String) # tablets, bottles, etc.
    district = Column(String)
    min_threshold = Column(Integer)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class EnvironmentalData(Base):
    __tablename__ = "environmental_data"

    id = Column(Integer, primary_key=True, index=True)
    district = Column(String)
    water_tds = Column(Float)
    temperature = Column(Float)
    humidity = Column(Float)
    rainfall = Column(Float)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

def init_db():
    Base.metadata.create_all(bind=engine)
