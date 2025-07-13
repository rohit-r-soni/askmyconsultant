from fastapi import FastAPI, HTTPException, Depends, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas
from database import engine, get_db
from sqlalchemy import distinct
import os

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AskMyConsultant API", version="1.0.0")

def verify_admin_password(password: str):
    """Verify admin password"""
    admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
    if password != admin_password:
        raise HTTPException(status_code=401, detail="Invalid admin password")
    return True

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to AskMyConsultant API"}

@app.post("/api/consultant/create", response_model=schemas.Consultant)
def create_consultant(consultant: schemas.ConsultantCreate, db: Session = Depends(get_db)):
    """Admin API to create consultant profile"""
    db_consultant = models.Consultant(**consultant.dict())
    db.add(db_consultant)
    db.commit()
    db.refresh(db_consultant)
    return db_consultant

@app.get("/api/consultants", response_model=List[schemas.Consultant])
def get_consultants(
    country: Optional[str] = None,
    state: Optional[str] = None,
    city: Optional[str] = None,
    profession: Optional[str] = None,
    expertise: Optional[str] = None,
    status: Optional[str] = "active",  # Only show active consultants by default
    db: Session = Depends(get_db)
):
    """List consultants with optional filters"""
    query = db.query(models.Consultant)
    
    # Filter by status (default to active)
    if status:
        query = query.filter(models.Consultant.status == status)
    
    if country:
        query = query.filter(models.Consultant.country.ilike(f"%{country}%"))
    if state:
        query = query.filter(models.Consultant.state.ilike(f"%{state}%"))
    if city:
        query = query.filter(models.Consultant.city.ilike(f"%{city}%"))
    if profession:
        query = query.filter(models.Consultant.profession.ilike(f"%{profession}%"))
    if expertise:
        query = query.filter(models.Consultant.fields_of_expertise.ilike(f"%{expertise}%"))
    
    return query.all()

@app.get("/api/consultant/{consultant_id}", response_model=schemas.Consultant)
def get_consultant(consultant_id: int, db: Session = Depends(get_db)):
    """Get consultant profile by ID"""
    consultant = db.query(models.Consultant).filter(models.Consultant.id == consultant_id).first()
    if consultant is None:
        raise HTTPException(status_code=404, detail="Consultant not found")
    return consultant

@app.get("/api/consultants/search")
def search_consultants(
    q: str,
    status: Optional[str] = "active",  # Only search active consultants by default
    db: Session = Depends(get_db)
):
    """Search consultants by name, profession, or expertise"""
    query = db.query(models.Consultant).filter(
        models.Consultant.name.ilike(f"%{q}%") |
        models.Consultant.profession.ilike(f"%{q}%") |
        models.Consultant.fields_of_expertise.ilike(f"%{q}%") |
        models.Consultant.country.ilike(f"%{q}%") |
        models.Consultant.state.ilike(f"%{q}%") |
        models.Consultant.city.ilike(f"%{q}%")
    )
    
    # Filter by status (default to active)
    if status:
        query = query.filter(models.Consultant.status == status)
    
    return query.all()

@app.get("/api/countries", response_model=List[str])
def get_countries(db: Session = Depends(get_db)):
    countries = db.query(distinct(models.Consultant.country)).filter(models.Consultant.country != None).all()
    return [c[0] for c in countries if c[0]]

@app.get("/api/states", response_model=List[str])
def get_states(country: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(distinct(models.Consultant.state)).filter(models.Consultant.state != None)
    if country:
        query = query.filter(models.Consultant.country == country)
    states = query.all()
    return [s[0] for s in states if s[0]]

@app.get("/api/cities", response_model=List[str])
def get_cities(country: Optional[str] = None, state: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(distinct(models.Consultant.city)).filter(models.Consultant.city != None)
    if country:
        query = query.filter(models.Consultant.country == country)
    if state:
        query = query.filter(models.Consultant.state == state)
    cities = query.all()
    return [c[0] for c in cities if c[0]]

# Admin endpoints for status management
@app.get("/api/admin/consultants", response_model=List[schemas.Consultant])
def get_all_consultants(
    password: str,
    db: Session = Depends(get_db)
):
    """Admin endpoint to get all consultants regardless of status"""
    verify_admin_password(password)
    return db.query(models.Consultant).all()

@app.put("/api/admin/consultant/{consultant_id}/status")
def update_consultant_status(
    consultant_id: int, 
    status: str, 
    password: str,
    db: Session = Depends(get_db)
):
    """Admin endpoint to update consultant status"""
    verify_admin_password(password)
    consultant = db.query(models.Consultant).filter(models.Consultant.id == consultant_id).first()
    if consultant is None:
        raise HTTPException(status_code=404, detail="Consultant not found")
    
    if status not in ["pending", "active", "inactive", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid status. Must be: pending, active, inactive, or rejected")
    
    consultant.status = status
    db.commit()
    db.refresh(consultant)
    return {"message": f"Consultant status updated to {status}", "consultant": consultant}

@app.post("/api/user/create", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Create a new user (client)"""
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/api/users", response_model=List[schemas.User])
def get_users(db: Session = Depends(get_db)):
    """Get all users (admin only)"""
    return db.query(models.User).all()

@app.get("/api/registration-form")
def get_registration_form():
    """Return the Google Form URL for consultant registration"""
    form_url = os.getenv("REGISTRATION_FORM_URL", "https://forms.google.com/dummy-consultant-registration-form")
    return {
        "form_url": form_url,
        "message": "Please fill out this form to register as a consultant. We will review your application and get back to you."
    } 