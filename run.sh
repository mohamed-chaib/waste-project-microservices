#!/bin/bash

echo "🚀 Starting microservices project..."

# =========================
# 🐳 Start Consul (Docker)
# =========================
echo "📦 Starting Consul..."
docker compose up -d

sleep 3


# =========================
# 🔐 Auth Service
# =========================
echo "🔐 Starting Auth Service (port 8002)..."
cd auth-service
nohup python manage.py runserver 0.0.0.0:8002 > ../auth.log 2>&1 &
cd ..

# =========================
# 🤖 AI Service
# =========================
echo "🤖 Starting AI Service (port 8001)..."
cd ai-service
nohup python manage.py runserver 0.0.0.0:8001 > ../ai.log 2>&1 &
cd ..

# =========================
# 🎯 Recommendation Service
# =========================
echo "🎯 Starting Recommendation Service (port 8003)..."
cd recommandation-service
nohup python manage.py runserver 0.0.0.0:8003 > ../recommendation.log 2>&1 &
cd ..

# =========================
# 🌐 Gateway
# =========================
echo "🌐 Starting Gateway (port 8004)..."
cd gateway
nohup python manage.py runserver 0.0.0.0:8004 > ../gateway.log 2>&1 &
cd ..

echo "✅ All services started successfully!"
echo "📊 Consul UI: http://localhost:8500"

echo "🌐 API: http://localhost:8004"