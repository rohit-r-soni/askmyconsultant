#!/bin/bash

echo "🚀 Deploying AskMyConsultant to Production Server"
echo "=================================================="

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
    echo "❌ This script needs to be run with sudo for server deployment"
    echo "Usage: sudo ./deploy.sh"
    exit 1
fi

# Update system packages
echo "📦 Updating system packages..."
apt-get update -y

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    usermod -aG docker $USER
    rm get-docker.sh
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
    echo "🐳 Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Create production docker-compose file
echo "📝 Creating production docker-compose.yml..."
cat > docker-compose.prod.yml << 'EOF'
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
    restart: unless-stopped
    command: uvicorn main:app --host 0.0.0.0 --port 8000

  frontend:
    build: ./frontend
    ports:
      - "80:3000"
    environment:
      - REACT_APP_API_URL=${REACT_APP_API_URL}
    depends_on:
      - backend
    restart: unless-stopped
EOF

# Set environment variables (you should customize these)
export DATABASE_URL="postgresql://neondb_owner:npg_aSqGZf8DCtN3@ep-autumn-silence-adspcyj0-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
export REACT_APP_API_URL="http://your-server-ip:8000"

# Build and start services
echo "🐳 Building and starting services..."
docker-compose -f docker-compose.prod.yml up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are running
echo "🔍 Checking if services are running..."
if curl -s http://localhost:8000/ > /dev/null; then
    echo "✅ Backend is running on http://localhost:8000"
else
    echo "❌ Backend is not responding"
fi

if curl -s http://localhost:80 > /dev/null; then
    echo "✅ Frontend is running on http://localhost:80"
else
    echo "❌ Frontend is not responding"
fi

echo ""
echo "🎉 Deployment completed!"
echo "======================="
echo "🌐 Frontend: http://your-server-ip"
echo "🔌 Backend API: http://your-server-ip:8000"
echo "📚 API Documentation: http://your-server-ip:8000/docs"
echo ""
echo "📝 Useful commands:"
echo "  - View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "  - Stop services: docker-compose -f docker-compose.prod.yml down"
echo "  - Restart services: docker-compose -f docker-compose.prod.yml restart"
echo ""
echo "⚠️  Remember to:"
echo "  - Update REACT_APP_API_URL with your actual server IP"
echo "  - Configure your firewall to allow ports 80 and 8000"
echo "  - Set up SSL certificates for production use" 