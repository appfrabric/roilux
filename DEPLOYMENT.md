# 🚀 Tropical Wood - DigitalOcean Deployment Guide

This guide covers multiple deployment options for the Tropical Wood application on DigitalOcean.

## 📋 Prerequisites

- DigitalOcean account
- GitHub repository: `https://github.com/appfrabric/roilux.git`
- Domain name (optional)

## 🎯 Deployment Options

### Option 1: App Platform (Recommended for Beginners)

**Cost:** ~$12-25/month | **Difficulty:** Easy | **Features:** Auto-scaling, SSL, CI/CD

#### Steps:

1. **Go to DigitalOcean Console**
   - Visit: https://cloud.digitalocean.com/apps
   - Click "Create App"

2. **Connect Repository**
   - Choose "GitHub"
   - Select `appfrabric/roilux` repository
   - Branch: `main`
   - Auto-deploy: Enabled

3. **Configure Services**
   ```yaml
   # App Platform will auto-detect this configuration:
   
   Frontend Service:
   - Name: tropical-wood-frontend
   - Type: Static Site
   - Build Command: npm run build
   - Output Directory: build
   - Environment: Node.js 18
   
   Backend Service:
   - Name: tropical-wood-backend  
   - Type: Web Service
   - Port: 8000
   - Environment: Python 3.11
   - Start Command: uvicorn main:app --host 0.0.0.0 --port 8000
   ```

4. **Environment Variables**
   ```bash
   # Backend environment variables:
   FRONTEND_URL=https://your-app.ondigitalocean.app
   ```

5. **Deploy**
   - Review configuration
   - Click "Create Resources"
   - Wait 5-10 minutes for deployment

6. **Custom Domain (Optional)**
   - Go to Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed

---

### Option 2: Droplet with Docker Compose

**Cost:** ~$6-12/month | **Difficulty:** Medium | **Features:** Full control, cost-effective

#### Steps:

1. **Create Droplet**
   ```bash
   # DigitalOcean Console:
   - OS: Ubuntu 22.04 LTS
   - Size: Basic ($6/month) or Regular ($12/month) 
   - Region: Choose closest to users
   - Authentication: SSH Keys recommended
   - Backups: Enable
   - Monitoring: Enable
   ```

2. **Initial Server Setup**
   ```bash
   # SSH into your droplet
   ssh root@your-droplet-ip
   
   # Update system
   apt update && apt upgrade -y
   
   # Install Docker
   apt install -y docker.io docker-compose-plugin
   
   # Install Git
   apt install -y git
   
   # Create non-root user (recommended)
   adduser tropical-wood
   usermod -aG docker tropical-wood
   usermod -aG sudo tropical-wood
   
   # Switch to new user
   su - tropical-wood
   ```

3. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/appfrabric/roilux.git
   cd roilux
   
   # Create production environment file
   cp .env.example .env.production
   nano .env.production
   ```

4. **Production Environment File**
   ```bash
   # .env.production
   NODE_ENV=production
   REACT_APP_API_URL=http://your-droplet-ip:8000
   
   # Backend settings
   FRONTEND_URL=http://your-droplet-ip:3000
   ```

5. **Production Docker Compose**
   ```bash
   # Create docker-compose.prod.yml
   cat > docker-compose.prod.yml << 'EOF'
   version: '3.8'

   services:
     frontend:
       build:
         context: ./frontend
         dockerfile: Dockerfile
       ports:
         - "80:80"
       depends_on:
         - backend
       restart: unless-stopped

     backend:
       build:
         context: ./backend
         dockerfile: Dockerfile
       ports:
         - "8000:8000"
       env_file:
         - .env.production
       restart: unless-stopped

   networks:
     roilux-network:
       driver: bridge
   EOF
   ```

6. **Deploy and Start**
   ```bash
   # Build and start services
   docker compose -f docker-compose.prod.yml up -d
   
   # Check status
   docker compose -f docker-compose.prod.yml ps
   
   # View logs
   docker compose -f docker-compose.prod.yml logs
   ```

7. **Setup Nginx (Optional - for SSL and domain)**
   ```bash
   # Install Nginx
   sudo apt install -y nginx certbot python3-certbot-nginx
   
   # Create Nginx config
   sudo nano /etc/nginx/sites-available/tropical-wood
   ```

   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
       
       location /api/ {
           proxy_pass http://localhost:8000/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```

   ```bash
   # Enable site
   sudo ln -s /etc/nginx/sites-available/tropical-wood /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   
   # Get SSL certificate
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

8. **Setup Auto-deployment (Optional)**
   ```bash
   # Create deployment script
   cat > deploy.sh << 'EOF'
   #!/bin/bash
   cd /home/tropical-wood/roilux
   git pull origin main
   docker compose -f docker-compose.prod.yml down
   docker compose -f docker-compose.prod.yml build --no-cache
   docker compose -f docker-compose.prod.yml up -d
   echo "Deployment completed!"
   EOF
   
   chmod +x deploy.sh
   ```

---

### Option 3: Container Registry + Kubernetes

**Cost:** ~$20-50/month | **Difficulty:** Advanced | **Features:** Auto-scaling, high availability

#### Steps:

1. **Create Container Registry**
   - Go to Container Registry in DigitalOcean
   - Create registry: `tropical-wood-registry`

2. **Build and Push Images**
   ```bash
   # Tag images
   docker build -t registry.digitalocean.com/tropical-wood-registry/frontend:latest ./frontend
   docker build -t registry.digitalocean.com/tropical-wood-registry/backend:latest ./backend
   
   # Push to registry
   docker push registry.digitalocean.com/tropical-wood-registry/frontend:latest
   docker push registry.digitalocean.com/tropical-wood-registry/backend:latest
   ```

3. **Create Kubernetes Cluster**
   - Go to Kubernetes in DigitalOcean
   - Create cluster with 2-3 nodes

4. **Deploy with Kubernetes manifests**
   ```yaml
   # k8s/deployment.yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: tropical-wood-app
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: tropical-wood
     template:
       metadata:
         labels:
           app: tropical-wood
       spec:
         containers:
         - name: frontend
           image: registry.digitalocean.com/tropical-wood-registry/frontend:latest
           ports:
           - containerPort: 80
         - name: backend
           image: registry.digitalocean.com/tropical-wood-registry/backend:latest
           ports:
           - containerPort: 8000
   ```

---

## 🔧 Production Optimizations

### Security
```bash
# Firewall setup (for Droplet)
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Regular updates
apt update && apt upgrade -y

# Docker security
docker system prune -f
```

### Monitoring
```bash
# Install monitoring (optional)
curl -sSL https://repos.insights.digitalocean.com/install.sh | sudo bash
```

### Backup Strategy
- **App Platform:** Automatic backups included
- **Droplet:** Enable backup option ($1.20/month extra)
- **Database:** Use managed database for production

---

## 🌐 DNS Setup

If using custom domain:

1. **Point domain to DigitalOcean:**
   ```
   # For App Platform:
   CNAME: www.yourdomain.com -> your-app.ondigitalocean.app
   
   # For Droplet:
   A Record: yourdomain.com -> your-droplet-ip
   A Record: www.yourdomain.com -> your-droplet-ip
   ```

---

## 📊 Cost Comparison

| Option | Monthly Cost | Pros | Cons |
|--------|--------------|------|------|
| App Platform | $12-25 | Easy, auto-scaling, SSL | Less control |
| Droplet Basic | $6-12 | Full control, cost-effective | Manual setup |
| Kubernetes | $20-50 | High availability, scalable | Complex setup |

---

## 🚨 Quick Start (Recommended)

**For immediate deployment, use App Platform:**

1. Go to: https://cloud.digitalocean.com/apps
2. Connect: `https://github.com/appfrabric/roilux.git`
3. Auto-detect services
4. Deploy!

Your app will be live at: `https://tropical-wood-[random].ondigitalocean.app`

---

## 📞 Support

- **DigitalOcean Docs:** https://docs.digitalocean.com/
- **Community:** https://www.digitalocean.com/community
- **Support Tickets:** Available with paid plans

---

## 🔄 CI/CD Integration

### GitHub Actions (Optional)
```yaml
# .github/workflows/deploy.yml
name: Deploy to DigitalOcean
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to DigitalOcean App Platform
      uses: digitalocean/app_action@main
      with:
        app_name: tropical-wood
        token: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
```

Choose the option that best fits your needs and budget!