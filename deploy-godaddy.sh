#!/bin/bash

# =============================================================================
# GoDaddy Deployment Script (Frontend Only)
# =============================================================================

set -e

echo "🌐 Building Frontend for GoDaddy Deployment..."

# Navigate to frontend directory
cd frontend

# Check if production environment is configured
if [ ! -f ".env.production.local" ]; then
    echo "⚠️  Creating production environment file..."
    echo "Please update .env.production.local with your backend API URL!"
    cp .env.production.godaddy .env.production.local
    
    read -p "Enter your backend API URL (e.g., https://api.yourdomain.com): " api_url
    if [ ! -z "$api_url" ]; then
        sed -i.bak "s|https://your-backend-domain.com|$api_url|g" .env.production.local
        rm .env.production.local.bak
    fi
fi

# Build the frontend
echo "🔨 Building React application..."
npm run build

# Create deployment package
echo "📦 Creating deployment package..."
cd build
zip -r ../godaddy-deployment.zip . -x "*.DS_Store*"
cd ..

echo "✅ Deployment package created: frontend/godaddy-deployment.zip"
echo ""
echo "📋 Next steps:"
echo "1. Download the godaddy-deployment.zip file"
echo "2. Log into your GoDaddy cPanel"
echo "3. Go to File Manager → public_html"
echo "4. Upload and extract the zip file"
echo "5. Ensure .htaccess file is present for routing"
echo ""
echo "⚠️  Note: Backend features won't work without API server!"
echo "🚀 Consider deploying backend to DigitalOcean or similar service."