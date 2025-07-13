from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class Consultant(Base):
    __tablename__ = "consultants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    # Deprecated: location = Column(String, nullable=False)
    address = Column(String, nullable=True)
    country = Column(String, nullable=True)
    state = Column(String, nullable=True)
    city = Column(String, nullable=True)
    profession = Column(String, nullable=False)
    experience_years = Column(Integer, nullable=False)
    fields_of_expertise = Column(Text, nullable=False)
    clients_served = Column(Text, nullable=False)
    
    # Optional fields
    education = Column(Text, nullable=True)
    projects_completed = Column(Text, nullable=True)
    references_testimonials = Column(Text, nullable=True)
    website_social_links = Column(Text, nullable=True)
    
    # Status field for approval management
    status = Column(String, nullable=False, default="pending")  # pending, active, inactive, rejected
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    phone = Column(String, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now()) 