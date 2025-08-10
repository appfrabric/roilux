# 🌐 Deploy to GoDaddy Shared Hosting (Frontend Only)

GoDaddy shared hosting only supports static files. Here's how to deploy the frontend:

## 📋 Prerequisites
- GoDaddy shared hosting account
- Backend deployed elsewhere (DigitalOcean, AWS, etc.)

## 🚀 Deployment Steps

### Step 1: Build Frontend for Production
```bash
cd frontend
npm run build
```

### Step 2: Configure API URL
Create `frontend/.env.production.local`:
```
REACT_APP_API_URL=https://your-backend-domain.com/api
```

### Step 3: Rebuild with Production API URL
```bash
npm run build
```

### Step 4: Upload to GoDaddy
1. Log into GoDaddy cPanel/File Manager
2. Navigate to `public_html` folder
3. Upload all contents from `frontend/build/` folder
4. Ensure `.htaccess` file is uploaded for routing

## 🔧 Required Files for GoDaddy

### `.htaccess` (Already included)
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]
```

## ⚠️ Limitations
- No backend functionality (contact forms, admin panel won't work)
- Need separate backend hosting
- API calls will be cross-origin

## 💡 Better Alternatives
1. **DigitalOcean App Platform** - Full stack deployment
2. **Vercel** - Frontend + Serverless backend
3. **Railway** - Full Docker deployment