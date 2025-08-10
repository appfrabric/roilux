#!/bin/bash
# Build script for GoDaddy deployment

echo "🚀 Building Tropical Wood for production..."

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
cd frontend
npm ci

echo "🔨 Building frontend..."
npm run build

echo "✅ Build complete!"