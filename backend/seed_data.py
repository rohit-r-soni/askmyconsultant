#!/usr/bin/env python3
"""
Seed script to populate the database with sample consultant data.
Run this after starting the backend service.
"""

import requests
import json

BASE_URL = "http://localhost:8000"

sample_consultants = [
    {
        "name": "Sarah Johnson",
        "address": "123 Main St",
        "country": "USA",
        "state": "New York",
        "city": "New York City",
        "profession": "Business Strategy Consultant",
        "experience_years": 8,
        "fields_of_expertise": "Strategic planning, Market analysis, Business transformation, Digital strategy",
        "clients_served": "Fortune 500 companies, startups, non-profits, government agencies",
        "education": "MBA from Harvard Business School, BS in Economics from Stanford University",
        "projects_completed": "Led digital transformation for 3 major corporations, Increased revenue by 40% for 5 companies",
        "references_testimonials": "Sarah helped us increase revenue by 40% in just 6 months. Her strategic insights were invaluable.",
        "website_social_links": "linkedin.com/in/sarahjohnson, sarahjohnson.com"
    },
    {
        "name": "Michael Chen",
        "address": "456 Market St",
        "country": "USA",
        "state": "California",
        "city": "San Francisco",
        "profession": "Technology Consultant",
        "experience_years": 12,
        "fields_of_expertise": "Software architecture, Cloud migration, DevOps, AI/ML implementation",
        "clients_served": "Tech startups, enterprise companies, healthcare organizations",
        "education": "MS in Computer Science from MIT, BS in Engineering from UC Berkeley",
        "projects_completed": "Migrated 50+ applications to cloud, Implemented AI solutions for 3 companies",
        "references_testimonials": "Michael's technical expertise and leadership helped us scale our infrastructure 10x.",
        "website_social_links": "github.com/michaelchen, michaelchen.dev"
    },
    {
        "name": "Emily Rodriguez",
        "address": "789 Lake Shore Dr",
        "country": "USA",
        "state": "Illinois",
        "city": "Chicago",
        "profession": "Marketing Consultant",
        "experience_years": 6,
        "fields_of_expertise": "Digital marketing, Brand strategy, Social media, Content marketing",
        "clients_served": "E-commerce businesses, B2B companies, consumer brands",
        "education": "BA in Marketing from Northwestern University, Google Ads certification",
        "projects_completed": "Increased online sales by 200% for 4 e-commerce clients, Built brand presence for 10+ companies",
        "references_testimonials": "Emily transformed our marketing strategy and doubled our customer acquisition rate.",
        "website_social_links": "emilyrodriguez.com, @emilyrodriguez"
    },
    {
        "name": "David Thompson",
        "address": "321 Congress Ave",
        "country": "USA",
        "state": "Texas",
        "city": "Austin",
        "profession": "Financial Consultant",
        "experience_years": 15,
        "fields_of_expertise": "Financial planning, Investment strategy, Risk management, M&A advisory",
        "clients_served": "High-net-worth individuals, small businesses, family offices",
        "education": "CFA, MBA in Finance from University of Texas, BS in Accounting",
        "projects_completed": "Managed $500M+ in client assets, Advised on 20+ M&A transactions",
        "references_testimonials": "David's financial guidance helped us grow our portfolio by 25% annually.",
        "website_social_links": "davidthompson.com, linkedin.com/in/davidthompson"
    },
    {
        "name": "Lisa Wang",
        "address": "654 Pine St",
        "country": "USA",
        "state": "Washington",
        "city": "Seattle",
        "profession": "HR & Organizational Development Consultant",
        "experience_years": 10,
        "fields_of_expertise": "Talent acquisition, Employee engagement, Leadership development, Change management",
        "clients_served": "Tech companies, healthcare organizations, manufacturing firms",
        "education": "MA in Industrial Psychology from University of Washington, SHRM-SCP certification",
        "projects_completed": "Reduced turnover by 30% for 5 companies, Implemented leadership programs for 200+ managers",
        "references_testimonials": "Lisa helped us build a culture that attracts and retains top talent.",
        "website_social_links": "lisawangconsulting.com, linkedin.com/in/lisawang"
    }
]

def seed_database():
    """Add sample consultants to the database."""
    print("🌱 Seeding database with sample consultants...")
    
    for i, consultant in enumerate(sample_consultants, 1):
        try:
            response = requests.post(
                f"{BASE_URL}/api/consultant/create",
                json=consultant,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                print(f"✅ Added consultant {i}: {consultant['name']}")
            else:
                print(f"❌ Failed to add consultant {i}: {response.text}")
                
        except requests.exceptions.ConnectionError:
            print("❌ Could not connect to the backend. Make sure the service is running on http://localhost:8000")
            return
        except Exception as e:
            print(f"❌ Error adding consultant {i}: {str(e)}")
    
    print("\n🎉 Database seeding completed!")
    print(f"📊 Added {len(sample_consultants)} sample consultants")
    print(f"🌐 Frontend: http://localhost:3000")
    print(f"📚 API Docs: http://localhost:8000/docs")

if __name__ == "__main__":
    seed_database() 