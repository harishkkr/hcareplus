from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserRegister(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    password: str
    role: str  # board_of_directors, doctor, receptionist
    specialization: Optional[str] = None  # Only for doctors
    license_number: Optional[str] = None  # For doctors and receptionists

class UserLogin(BaseModel):
    email: str
    password: str
    role: str


class SymptomReportBase(BaseModel):
    district: str
    symptom: str
    severity: int

class SymptomReportCreate(SymptomReportBase):
    pass

class SymptomReport(SymptomReportBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class AlertBase(BaseModel):
    type: str
    message: str
    district: str

class Alert(AlertBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class PatientVisitBase(BaseModel):
    full_name: str
    dob: str
    district: str
    phone: str
    address: str
    symptoms: str
    age: int
    gender: str
    admission_no: str
    is_new: str

class InventoryItemBase(BaseModel):
    name: str
    stock_level: int
    unit: str
    district: str
    min_threshold: int

class EnvironmentalDataBase(BaseModel):
    district: str
    water_tds: float
    temperature: float
    humidity: float
    rainfall: float
