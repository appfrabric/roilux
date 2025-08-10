# Digital Ocean Deployment Instructions

## Prerequisites
- Digital Ocean droplet with Docker and docker-compose installed
- Domain pointing to the droplet IP (optional)
- SSH access to the droplet

## Deployment Steps

### 1. Connect to your Digital Ocean droplet
```bash
ssh root@your-droplet-ip
```

### 2. Install Docker and docker-compose (if not already installed)
```bash
# Update package list
apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install docker-compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version
```

### 3. Clone the repository
```bash
git clone https://github.com/appfrabric/roilux.git
cd roilux
```

### 4. Deploy using production configuration
```bash
# Build and start the containers
docker-compose -f docker-compose.prod.yml up -d --build

# Check container status
docker ps

# View logs if needed
docker-compose -f docker-compose.prod.yml logs -f
```

### 5. Configure firewall (if ufw is enabled)
```bash
ufw allow 80/tcp
ufw allow 443/tcp
ufw reload
```

### 6. Verify deployment
- Visit your domain/IP to see the application
- Test the contact form and other features

## Troubleshooting "Invalid Host Header" Error

If you see "Invalid Host header" error, try these solutions:

### Solution 1: Use Minimal Configuration (RECOMMENDED)
```bash
# Stop current containers
docker-compose down

# Use the minimal configuration that bypasses webpack dev server completely
docker-compose -f docker-compose.minimal.yml up -d --build
```

### Solution 2: Use Alternative Nginx Config
```bash
# Stop containers
docker-compose -f docker-compose.prod.yml down

# Replace nginx config with direct version
cp frontend/nginx-direct.conf frontend/nginx.conf

# Rebuild and start
docker-compose -f docker-compose.prod.yml up -d --build
```

### Solution 2: Check Nginx Logs
```bash
# Check frontend logs
docker-compose -f docker-compose.prod.yml logs frontend

# Check if containers are communicating
docker exec roilux-frontend curl -I http://backend:8000/health
```

### Solution 3: Test Direct Access
```bash
# Test if the React app is built and served correctly
curl -I http://your-domain-or-ip

# Test API proxy
curl -I http://your-domain-or-ip/api/contact
```

### Solution 4: Force Rebuild Without Cache
```bash
# Complete rebuild
docker-compose -f docker-compose.prod.yml down
docker system prune -f
docker-compose -f docker-compose.prod.yml up -d --build --force-recreate
```

### Solution 5: Check Domain Configuration
- Ensure your domain DNS points to the correct IP
- If using a subdomain, make sure it's configured properly
- Test with direct IP address first

## SSL Setup (Optional but Recommended)

### Using Certbot with Nginx (requires domain)
```bash
# Install certbot
apt install certbot python3-certbot-nginx

# Stop containers temporarily
docker-compose -f docker-compose.prod.yml down

# Get SSL certificate (replace your-domain.com)
certbot certonly --standalone -d your-domain.com

# Start containers again
docker-compose -f docker-compose.prod.yml up -d
```

## Default Credentials

- **Admin User**: 
  - Username: `admin`
  - Password: `admin123`
  - Email: `roilux.woods@gmail.com`

**Important**: Change default passwords immediately after deployment.

## Updates

To update the application:
```bash
git pull origin main
docker-compose -f docker-compose.prod.yml up -d --build
```