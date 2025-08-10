#!/bin/bash
# Production startup script for DigitalOcean

echo "🚀 Starting Tropical Wood Frontend in Production Mode"
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"

# Ensure build directory exists
if [ ! -d "build" ]; then
    echo "❌ Build directory not found! Running build..."
    NODE_ENV=production npm run build
fi

# List build contents for debugging
echo "📦 Build directory contents:"
ls -la build/

# Start production server
echo "🌐 Starting production server on port $PORT"
npx serve build -p $PORT -s