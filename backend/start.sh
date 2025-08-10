#!/bin/bash

# Start MySQL service
service mysql start

# Wait for MySQL to be ready
until mysqladmin ping >/dev/null 2>&1; do
    echo "Waiting for MySQL to start..."
    sleep 2
done

# Create database and user if they don't exist
mysql -e "CREATE DATABASE IF NOT EXISTS tropical_wood;"
mysql -e "CREATE USER IF NOT EXISTS 'roilux'@'localhost' IDENTIFIED BY 'roilux2024';"
mysql -e "GRANT ALL PRIVILEGES ON tropical_wood.* TO 'roilux'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

echo "MySQL is ready!"

# Start the FastAPI application
uvicorn main:app --host 0.0.0.0 --port 8000