#!/usr/bin/env python3
"""
Migration script to add status column to existing consultants table.
"""

from sqlalchemy import text
from database import engine

def migrate_database():
    """Add status column to consultants table if it doesn't exist."""
    try:
        with engine.connect() as connection:
            # Check if status column exists
            result = connection.execute(text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'consultants' AND column_name = 'status'
            """))
            
            if not result.fetchone():
                print("🔄 Adding status column to consultants table...")
                
                # Add status column with default value
                connection.execute(text("""
                    ALTER TABLE consultants 
                    ADD COLUMN status VARCHAR DEFAULT 'active' NOT NULL
                """))
                
                # Update existing records to have 'active' status
                connection.execute(text("""
                    UPDATE consultants 
                    SET status = 'active' 
                    WHERE status IS NULL
                """))
                
                connection.commit()
                print("✅ Status column added successfully!")
            else:
                print("✅ Status column already exists!")
                
    except Exception as e:
        print(f"❌ Error during migration: {str(e)}")
        raise

if __name__ == "__main__":
    migrate_database() 