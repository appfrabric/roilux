# 🚀 Deploy Tropical Wood to DigitalOcean App Platform

This repository is **ready for DigitalOcean App Platform** deployment! Just follow these simple steps.

## 📦 What's Included

✅ **App Platform Configuration** (`.do/app.yaml`)
✅ **GitHub Actions CI/CD** (`.github/workflows/deploy.yml`) 
✅ **Health Check Endpoints** (`/health` for backend)
✅ **Production Dependencies** (serve package for frontend)
✅ **CORS Configuration** (backend ready for frontend API calls)

## 🔥 Quick Deploy (3 Steps)

### Step 1: Push to GitHub
Your code is already on GitHub at: `https://github.com/appfrabric/roilux.git`

### Step 2: Create App on DigitalOcean
1. Go to: https://cloud.digitalocean.com/apps
2. Click **"Create App"**
3. Choose **"GitHub"** as source
4. Select repository: **`appfrabric/roilux`**
5. Branch: **`main`**
6. **Auto-deploy**: ✅ Enable

### Step 3: Let DigitalOcean Auto-Configure
DigitalOcean will automatically detect:
- ✅ **Frontend** (React app in `/frontend`)
- ✅ **Backend** (FastAPI app in `/backend`) 
- ✅ **Build commands** and **run commands**
- ✅ **Environment variables**
- ✅ **Routing** (`/` for frontend, `/api` for backend)

**That's it!** 🎉

## 📊 Deployment Details

### What Gets Deployed:

| Service | Framework | Build Command | Run Command | Port |
|---------|-----------|---------------|-------------|------|
| Frontend | React + TypeScript | `npm ci && npm run build` | `npx serve -s build -l 80` | 80 |
| Backend | FastAPI + Python | `pip install -r requirements.txt` | `uvicorn main:app --host 0.0.0.0 --port 8000` | 8000 |

### Your URLs:
- **Website**: `https://tropical-wood-[random].ondigitalocean.app`
- **API**: `https://tropical-wood-[random].ondigitalocean.app/api`
- **Health Check**: `https://tropical-wood-[random].ondigitalocean.app/health`

## 🔧 Configuration

### Environment Variables (Auto-Configured)
```bash
# Frontend
NODE_ENV=production
GENERATE_SOURCEMAP=false
REACT_APP_API_URL=${backend.PUBLIC_URL}

# Backend  
FRONTEND_URL=${frontend.PUBLIC_URL}
PYTHONUNBUFFERED=1
HOST=0.0.0.0
PORT=8000
```

### Automatic Features:
- ✅ **SSL Certificate** (HTTPS)
- ✅ **Custom Domain** support
- ✅ **Auto-scaling**
- ✅ **Health monitoring**
- ✅ **GitHub integration** (auto-deploy on push)
- ✅ **Rollback** capability

## 💰 Pricing

**Estimated Cost**: ~$12-25/month
- Frontend: ~$5/month (Static Site)
- Backend: ~$7-20/month (Web Service)

## 🎯 Custom Domain (Optional)

After deployment:
1. Go to **Settings** → **Domains**
2. Add your domain: `tropicalwood.com`
3. Update DNS records as shown
4. SSL certificate automatically provisioned

## 🔄 CI/CD Pipeline

Every `git push` to `main` branch:
1. ✅ **Tests run** (frontend build + backend health check)
2. ✅ **Auto-deployment** to App Platform
3. ✅ **Health checks** ensure deployment success
4. ✅ **Rollback** if deployment fails

## 📱 Contact Information

Your deployed app will include:
- **📞 Phone**: +237-681-21-1111
- **📧 Email**: roilux.woods@gmail.com  
- **📍 Address**: Abonbang, Cameroon
- **💬 WhatsApp**: Direct integration
- **📝 Contact Form**: Full functionality

## 🚨 Quick Start Commands

```bash
# Clone repository (if needed)
git clone https://github.com/appfrabric/roilux.git

# Test locally (optional)
docker-compose up

# Push changes (triggers auto-deployment)
git push origin main
```

## 🔍 Monitoring

### Health Checks:
- **Frontend**: `GET /` (returns React app)
- **Backend**: `GET /health` (returns `{"status": "healthy"}`)

### Logs:
- View in DigitalOcean App Platform dashboard
- Real-time logs and metrics
- Performance monitoring included

## 🛠️ Advanced Configuration

### Custom Build Settings:
Edit `.do/app.yaml` to customize:
- Instance sizes
- Environment variables  
- Build commands
- Health check settings

### GitHub Secrets (for CI/CD):
Add to your repository secrets:
- `DIGITALOCEAN_ACCESS_TOKEN`: Your DigitalOcean API token

## 📞 Support

- **DigitalOcean Docs**: https://docs.digitalocean.com/products/app-platform/
- **Community**: https://www.digitalocean.com/community/tags/app-platform
- **Support**: Available 24/7 with paid plans

---

## 🌟 Ready to Deploy?

Your repository is **100% ready** for DigitalOcean App Platform!

**Just go to**: https://cloud.digitalocean.com/apps

**Select**: `appfrabric/roilux`

**Click**: Create App

**Done!** 🚀

---

*Tropical Wood - Premium wood products from Cameroon* 🌴