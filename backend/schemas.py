from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ConsultantBase(BaseModel):
    name: str
    address: Optional[str] = None
    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    profession: str
    experience_years: int
    fields_of_expertise: str
    clients_served: str
    education: Optional[str] = None
    projects_completed: Optional[str] = None
    references_testimonials: Optional[str] = None
    website_social_links: Optional[str] = None
    status: Optional[str] = "pending"  # pending, active, inactive, rejected
    # Deprecated: location: Optional[str] = None

class ConsultantCreate(ConsultantBase):
    pass

class Consultant(ConsultantBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 