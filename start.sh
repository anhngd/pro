#!/bin/bash

echo "🚀 Starting Mobile Publishing Platform..."
echo "================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created. Please configure your environment variables."
    echo "📖 Edit .env file with your Google OAuth credentials if needed."
fi

# Start the application
echo "🔧 Starting services with Docker Compose..."
docker-compose up -d

echo ""
echo "✅ Application started successfully!"
echo ""
echo "🌐 Access URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "🔑 Demo Login:"
echo "   Username: anhnd"
echo "   Password: 123123123"
echo ""
echo "📊 Features Available:"
echo "   • Dashboard with analytics"
echo "   • App management"
echo "   • Marketing campaigns"
echo "   • Business reports"
echo "   • User management"
echo "   • Profile settings"
echo ""
echo "🛑 To stop the application, run: docker-compose down"
echo "📝 To view logs, run: docker-compose logs -f"
