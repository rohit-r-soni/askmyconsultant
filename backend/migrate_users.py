#!/usr/bin/env python3
"""
Migration script to add users table to the database.
"""

from sqlalchemy import text
from database import engine

def migrate_users_table():
    """Add users table if it doesn't exist."""
    try:
        with engine.connect() as connection:
            # Check if users table exists
            result = connection.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_name = 'users'
            """))
            
            if not result.fetchone():
                print("🔄 Creating users table...")
                
                # Create users table
                connection.execute(text("""
                    CREATE TABLE users (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR NOT NULL,
                        email VARCHAR NOT NULL UNIQUE,
                        phone VARCHAR,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                    )
                """))
                
                connection.commit()
                print("✅ Users table created successfully!")
            else:
                print("✅ Users table already exists!")
                
    except Exception as e:
        print(f"❌ Error during migration: {str(e)}")
        raise

if __name__ == "__main__":
    migrate_users_table() 