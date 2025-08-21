#!/bin/bash

echo "🚀 Setting up Mobile Publishing Platform..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment file
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp env.example .env
    echo "⚠️  Please update .env file with your Google OAuth credentials"
fi

# Create uploads directory
mkdir -p backend/uploads
mkdir -p frontend/public

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Services are running!"
    echo ""
    echo "🌐 Frontend: http://localhost:3000"
    echo "📡 Backend API: http://localhost:8000"
    echo "📚 API Documentation: http://localhost:8000/docs"
    echo ""
    echo "📋 Default admin user will be created on first Google login"
    echo ""
    echo "🔧 To stop services: docker-compose down"
    echo "📜 To view logs: docker-compose logs -f"
else
    echo "❌ Some services failed to start. Check logs with: docker-compose logs"
    exit 1
fi
