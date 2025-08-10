# 🚀 GoDaddy App Deployment Configuration

This project is configured for seamless deployment to GoDaddy Apps platform.

## 📋 Deployment Files Created

✅ **app.yaml** - GoDaddy app service configuration
✅ **Procfile** - Process configuration for web and API services  
✅ **build.sh** - Build script for frontend
✅ **runtime.txt** - Python runtime specification
✅ **.env.production** - Production environment variables
✅ **package.json** - Updated with deployment scripts

## 🔧 Services Configuration

### Frontend Service
- **Port**: 3000 (auto-configured)
- **Build**: `npm ci && npm run build`
- **Start**: `npx serve -s build -l 3000`
- **Routes**: `/` (root)

### Backend Service  
- **Port**: 8000 (auto-configured)
- **Start**: `uvicorn main:app --host 0.0.0.0 --port 8000`
- **Routes**: `/api/*`
- **Runtime**: Python 3.11

## 🌐 Environment Variables

Set these in your GoDaddy app dashboard:

### Required:
- `ENV=production`
- `NODE_ENV=production`
- `PYTHONUNBUFFERED=1`

### Optional:
- `DATABASE_URL` (defaults to SQLite)
- `FRONTEND_URL` (for CORS)
- `DEBUG=false`

## 🚦 Deployment Process

1. **Push to GitHub** - GoDaddy will auto-deploy from main branch
2. **Services Start** - Frontend and backend deploy automatically  
3. **Health Checks** - Automatic service monitoring
4. **DNS Routing** - `/api/*` → Backend, `/` → Frontend

## 🔍 Troubleshooting

If deployment fails:
1. Check GoDaddy app logs
2. Verify environment variables
3. Ensure both services are running
4. Check `/health` endpoints

## 📊 Service Status

- **Frontend**: Ready for static serving
- **Backend**: FastAPI with all endpoints
- **Database**: SQLite (auto-created)
- **Admin Panel**: Available at `/admin`