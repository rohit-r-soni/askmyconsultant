from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas
from database import engine, get_db
from sqlalchemy import distinct

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AskMyConsultant API", version="1.0.0")

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
    db: Session = Depends(get_db)
):
    """List consultants with optional filters"""
    query = db.query(models.Consultant)
    
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