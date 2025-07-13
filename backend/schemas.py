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
    # Deprecated: location: Optional[str] = None

class ConsultantCreate(ConsultantBase):
    pass

class Consultant(ConsultantBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 