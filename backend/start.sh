#!/bin/bash
echo "Starting backend server..."
echo "PORT: ${PORT:-8000}"
echo "Installing dependencies..."
pip install -r requirements.txt
echo "Starting uvicorn..."
uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}