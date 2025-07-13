#!/bin/bash

echo "🚀 Setting up AskMyConsultant.com"
echo "=================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Start the services
echo "🐳 Starting services with Docker Compose..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if backend is running
echo "🔍 Checking if backend is running..."
if curl -s http://localhost:8000/ > /dev/null; then
    echo "✅ Backend is running on http://localhost:8000"
else
    echo "❌ Backend is not responding. Please check the logs with: docker-compose logs backend"
    exit 1
fi

# Check if frontend is running
echo "🔍 Checking if frontend is running..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is running on http://localhost:3000"
else
    echo "❌ Frontend is not responding. Please check the logs with: docker-compose logs frontend"
    exit 1
fi

# Add sample data
echo "🌱 Adding sample consultant data..."
cd backend
python seed_data.py
cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo "================================"
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/docs"
echo ""
echo "📝 Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop services: docker-compose down"
echo "  - Restart services: docker-compose restart"
echo ""
echo "🔍 You can now search for consultants on the homepage!" 