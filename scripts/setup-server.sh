#!/bin/bash

# =============================================================================
# DigitalOcean Droplet Initial Setup for Tropical Wood
# Run this script on a fresh Ubuntu 22.04 droplet
# =============================================================================

set -e

echo "🌴 Setting up DigitalOcean Droplet for Tropical Wood..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Update system
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install essential packages
print_status "Installing essential packages..."
apt install -y \
    curl \
    wget \
    git \
    unzip \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    ufw \
    fail2ban \
    htop \
    nano \
    vim

# Install Docker
print_status "Installing Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start Docker service
systemctl start docker
systemctl enable docker

# Create tropical-wood user
print_status "Creating tropical-wood user..."
if ! id "tropical-wood" &>/dev/null; then
    useradd -m -s /bin/bash tropical-wood
    usermod -aG docker tropical-wood
    usermod -aG sudo tropical-wood
    
    # Set up SSH key for tropical-wood user (copy from root)
    if [ -d "/root/.ssh" ]; then
        mkdir -p /home/tropical-wood/.ssh
        cp /root/.ssh/authorized_keys /home/tropical-wood/.ssh/
        chown -R tropical-wood:tropical-wood /home/tropical-wood/.ssh
        chmod 700 /home/tropical-wood/.ssh
        chmod 600 /home/tropical-wood/.ssh/authorized_keys
    fi
fi

# Configure firewall
print_status "Configuring firewall..."
ufw --force enable
ufw allow OpenSSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 8000/tcp  # Backend API (temporary, will be behind reverse proxy)

# Configure fail2ban
print_status "Configuring fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban

# Install and configure Nginx (for reverse proxy and SSL)
print_status "Installing Nginx..."
apt install -y nginx
systemctl start nginx
systemctl enable nginx

# Install Certbot for SSL certificates
print_status "Installing Certbot..."
apt install -y certbot python3-certbot-nginx

# Create Nginx configuration for Tropical Wood
print_status "Creating Nginx configuration..."
cat > /etc/nginx/sites-available/tropical-wood << 'EOF'
server {
    listen 80;
    server_name _;  # Replace with your domain
    
    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Health check
    location /health {
        proxy_pass http://localhost:8000/health;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable the site (will be activated after deployment)
# ln -sf /etc/nginx/sites-available/tropical-wood /etc/nginx/sites-enabled/
# systemctl reload nginx

# Set up deployment directory
print_status "Setting up deployment directory..."
mkdir -p /opt/tropical-wood
chown tropical-wood:tropical-wood /opt/tropical-wood

# Download deployment script
print_status "Downloading deployment script..."
su - tropical-wood -c "cd /opt/tropical-wood && curl -O https://raw.githubusercontent.com/appfrabric/roilux/main/deploy.sh && chmod +x deploy.sh"

# Install Docker Compose monitoring script
print_status "Setting up monitoring..."
cat > /opt/tropical-wood/monitor.sh << 'EOF'
#!/bin/bash
# Simple monitoring script for Tropical Wood

LOGFILE="/var/log/tropical-wood-monitor.log"

check_services() {
    cd /opt/tropical-wood
    
    if ! docker compose -f docker-compose.prod.yml ps | grep -q "Up"; then
        echo "$(date): Services are down, attempting restart..." >> $LOGFILE
        docker compose -f docker-compose.prod.yml up -d
    fi
}

check_services
EOF

chmod +x /opt/tropical-wood/monitor.sh
chown tropical-wood:tropical-wood /opt/tropical-wood/monitor.sh

# Add cron job for monitoring (every 5 minutes)
(crontab -u tropical-wood -l 2>/dev/null; echo "*/5 * * * * /opt/tropical-wood/monitor.sh") | crontab -u tropical-wood -

# Configure log rotation
print_status "Configuring log rotation..."
cat > /etc/logrotate.d/tropical-wood << 'EOF'
/var/log/tropical-wood-monitor.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 644 tropical-wood tropical-wood
}
EOF

# Set up swap file (if not exists and RAM < 2GB)
TOTAL_MEM=$(free -m | awk 'NR==2{printf "%.0f", $2}')
if [ $TOTAL_MEM -lt 2048 ] && [ ! -f /swapfile ]; then
    print_status "Setting up swap file..."
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
fi

# Final security hardening
print_status "Applying security hardening..."

# Disable root SSH login (optional - uncomment if you want this)
# sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
# systemctl reload sshd

# Set up automatic security updates
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

print_status "✅ Server setup completed!"
echo ""
echo "Next steps:"
echo "1. Switch to tropical-wood user: su - tropical-wood"
echo "2. Run deployment: cd /opt/tropical-wood && ./deploy.sh"
echo "3. Configure your domain in Nginx: /etc/nginx/sites-available/tropical-wood"
echo "4. Enable the site: sudo ln -sf /etc/nginx/sites-available/tropical-wood /etc/nginx/sites-enabled/"
echo "5. Get SSL certificate: sudo certbot --nginx -d yourdomain.com"
echo ""
print_warning "Remember to:"
print_warning "- Update the server_name in Nginx config with your domain"
print_warning "- Configure .env.production with your settings"
print_warning "- Test the firewall rules"
print_warning "- Set up regular backups"
echo ""
echo "🌴 Tropical Wood server is ready for deployment!"