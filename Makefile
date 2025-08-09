.PHONY: help build up down restart logs clean test

help:
	@echo "Available commands:"
	@echo "  make build    - Build Docker images"
	@echo "  make up       - Start containers"
	@echo "  make down     - Stop containers"
	@echo "  make restart  - Restart containers"
	@echo "  make logs     - View container logs"
	@echo "  make clean    - Remove containers and volumes"
	@echo "  make test     - Run tests"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs -f

clean:
	docker-compose down -v
	rm -rf backend/uploads/*

test:
	@echo "Testing backend API..."
	@curl -s http://localhost:8000/health | grep -q "healthy" && echo "✓ Backend is healthy" || echo "✗ Backend health check failed"
	@echo "Testing frontend..."
	@curl -s http://localhost | grep -q "<!DOCTYPE html>" && echo "✓ Frontend is serving" || echo "✗ Frontend not responding"

dev-frontend:
	cd frontend && npm start

dev-backend:
	cd backend && python main.py

install-frontend:
	cd frontend && npm install

install-backend:
	cd backend && pip install -r requirements.txt

deploy:
	@echo "Building and starting production containers..."
	docker-compose -f docker-compose.yml up --build -d
	@echo "Deployment complete! Application is running at http://localhost"