-- Initialize Tropical Wood Database
CREATE DATABASE IF NOT EXISTS tropical_wood CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE tropical_wood;

-- Grant privileges to user
GRANT ALL PRIVILEGES ON tropical_wood.* TO 'tropical_wood_user'@'%';
FLUSH PRIVILEGES;

-- Create tables will be handled by SQLAlchemy in the application