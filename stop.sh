#!/bin/bash

echo "🛑 Stopping microservices..."

# Stop Docker Consul
docker stop consul && docker rm consul

# Kill Python services
pkill -f "runserver 0.0.0.0:8001"
pkill -f "runserver 0.0.0.0:8002"
pkill -f "runserver 0.0.0.0:8003"
pkill -f "runserver 0.0.0.0:8004"

echo "✅ All services stopped"