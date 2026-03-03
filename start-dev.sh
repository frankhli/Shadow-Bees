#!/bin/bash

echo "🚀 Tiaohai Global - Development Starter"
echo "========================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start infrastructure
echo "📦 Starting infrastructure (PostgreSQL, Redis, Meilisearch)..."
docker-compose up -d

# Wait for PostgreSQL
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Copying from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env file with your API keys before continuing."
    exit 1
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Run migrations
echo "🔄 Running database migrations..."
npm run db:migrate

# Seed database (optional)
read -p "🌱 Seed database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run db:seed
fi

# Start development servers
echo "🚀 Starting development servers..."
echo ""
echo "Services will be available at:"
echo "  🌐 Frontend: http://localhost:3000"
echo "  🔌 API:      http://localhost:3001"
echo "  🤖 AI:       http://localhost:3002"
echo "  💾 Database: localhost:5432"
echo "  ⚡ Redis:    localhost:6379"
echo ""

# Use concurrently or turbo to run all services
if command -v turbo &> /dev/null; then
    turbo run dev
else
    echo "Running with npm (install turbo for better performance)..."
    npm run dev
fi
