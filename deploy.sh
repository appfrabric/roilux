#!/bin/bash

# =============================================================================
# Tropical Wood Deployment Script for DigitalOcean Droplet
# =============================================================================

set -e  # Exit on any error

echo "🌴 Starting Tropical Wood Deployment..."

# Configuration
REPO_URL="https://github.com/appfrabric/roilux.git"
DEPLOY_DIR="/opt/tropical-wood"
BACKUP_DIR="/opt/tropical-wood-backup-$(date +%Y%m%d-%H%M%S)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons"
   exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not available. Please install Docker Compose plugin."
    exit 1
fi

# Create deployment directory if it doesn't exist
if [ ! -d "$DEPLOY_DIR" ]; then
    print_status "Creating deployment directory: $DEPLOY_DIR"
    sudo mkdir -p "$DEPLOY_DIR"
    sudo chown $USER:$USER "$DEPLOY_DIR"
fi

cd "$DEPLOY_DIR"

# Backup existing deployment if it exists
if [ -d ".git" ]; then
    print_status "Creating backup of existing deployment..."
    sudo cp -r "$DEPLOY_DIR" "$BACKUP_DIR"
    print_status "Backup created at: $BACKUP_DIR"
    
    # Stop existing services
    print_status "Stopping existing services..."
    docker compose -f docker-compose.prod.yml down || true
fi

# Clone or update repository
if [ ! -d ".git" ]; then
    print_status "Cloning repository..."
    git clone "$REPO_URL" .
else
    print_status "Updating repository..."
    git fetch origin
    git reset --hard origin/main
fi

# Check if production environment file exists
if [ ! -f ".env.production" ]; then
    print_warning "Production environment file not found!"
    if [ -f ".env.production.example" ]; then
        print_status "Copying example environment file..."
        cp .env.production.example .env.production
        print_warning "Please edit .env.production with your production settings!"
        print_warning "Opening editor in 5 seconds... Press Ctrl+C to skip"
        sleep 5
        nano .env.production || true
    else
        print_error "No environment configuration found!"
        exit 1
    fi
fi

# Build and deploy
print_status "Building Docker images..."
docker compose -f docker-compose.prod.yml build --no-cache

print_status "Starting services..."
docker compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
print_status "Waiting for services to be ready..."
sleep 30

# Check service health
print_status "Checking service health..."
if docker compose -f docker-compose.prod.yml ps | grep -q "unhealthy"; then
    print_error "Some services are unhealthy!"
    docker compose -f docker-compose.prod.yml logs
    exit 1
fi

# Display service status
print_status "Deployment completed successfully!"
echo ""
echo "Service Status:"
docker compose -f docker-compose.prod.yml ps

echo ""
echo "🎉 Tropical Wood is now deployed!"
echo "Frontend: http://$(curl -s ifconfig.me):80"
echo "Backend API: http://$(curl -s ifconfig.me):8000"
echo ""
echo "To check logs: docker compose -f docker-compose.prod.yml logs"
echo "To stop: docker compose -f docker-compose.prod.yml down"
echo ""
print_warning "Don't forget to configure your firewall and SSL certificates!"

# Optional: Clean up old Docker images
read -p "Clean up unused Docker images? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Cleaning up Docker images..."
    docker system prune -f
fi

print_status "Deployment script completed!"