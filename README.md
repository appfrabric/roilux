# Tropical Wood - Containerized Web Application

A modern, containerized 2-tier web application for Tropical Wood (a division of Roilux), featuring a React frontend and Python FastAPI backend.

## Features

- **Vibrant, Animated UI**: Wood-themed design with smooth animations
- **Mobile Responsive**: Fully responsive design for all devices
- **Product Gallery**: Interactive product galleries with image viewers
- **Multi-level Navigation**: Hierarchical menu system with dropdowns
- **Virtual Tours**: Schedule virtual factory tours
- **Custom Media Support**: Upload and manage images and videos
- **Containerized Architecture**: Easy deployment on any cloud provider

## Product Categories

- Plywood (Premium, Marine, Structural)
- Prefinished Melamine
- Prefinished Melamine Plywood
- Wood Veneer
- Raw Wood Logs

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Heroicons for icons

### Backend
- Python FastAPI
- Pydantic for data validation
- CORS middleware for cross-origin requests
- File upload support

### Infrastructure
- Docker containers
- Docker Compose orchestration
- Nginx for production serving
- Volume persistence for uploads

## Quick Start

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd TropicalWood
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Build and run with Docker Compose:
```bash
docker-compose up --build
```

4. Access the application:
- Frontend: http://localhost
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Stopping the Application

```bash
docker-compose down
```

## Deployment

### Deploy to Any Cloud Provider

This application is fully containerized and can be deployed to any cloud provider that supports Docker:

#### AWS
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin [your-ecr-uri]
docker-compose build
docker tag tropicalwood-frontend:latest [your-ecr-uri]/tropicalwood-frontend:latest
docker tag tropicalwood-backend:latest [your-ecr-uri]/tropicalwood-backend:latest
docker push [your-ecr-uri]/tropicalwood-frontend:latest
docker push [your-ecr-uri]/tropicalwood-backend:latest
```

#### Google Cloud Platform
```bash
# Build and push to GCR
gcloud auth configure-docker
docker-compose build
docker tag tropicalwood-frontend:latest gcr.io/[project-id]/tropicalwood-frontend:latest
docker tag tropicalwood-backend:latest gcr.io/[project-id]/tropicalwood-backend:latest
docker push gcr.io/[project-id]/tropicalwood-frontend:latest
docker push gcr.io/[project-id]/tropicalwood-backend:latest
```

#### Azure
```bash
# Build and push to ACR
az acr login --name [registry-name]
docker-compose build
docker tag tropicalwood-frontend:latest [registry-name].azurecr.io/tropicalwood-frontend:latest
docker tag tropicalwood-backend:latest [registry-name].azurecr.io/tropicalwood-backend:latest
docker push [registry-name].azurecr.io/tropicalwood-frontend:latest
docker push [registry-name].azurecr.io/tropicalwood-backend:latest
```

#### Deploy to a VM

1. Copy docker-compose.yml to your VM
2. SSH into your VM
3. Install Docker and Docker Compose
4. Run:
```bash
docker-compose up -d
```

## Development

### Frontend Development
```bash
cd frontend
npm install
npm start
```

### Backend Development
```bash
cd backend
pip install -r requirements.txt
python main.py
```

## API Endpoints

- `GET /` - API root
- `GET /api/products` - Get all product categories
- `GET /api/products/{category}` - Get products by category
- `POST /api/virtual-tour` - Book a virtual tour
- `POST /api/contact` - Submit contact message
- `POST /api/upload/image` - Upload image
- `POST /api/upload/video` - Upload video
- `GET /api/images/{filename}` - Serve images
- `GET /api/videos/{filename}` - Serve videos
- `GET /api/company-info` - Get company information
- `GET /health` - Health check

## Customization

### Adding Custom Images/Videos

1. Place your media files in the appropriate directories:
   - Images: `backend/uploads/images/`
   - Videos: `backend/uploads/videos/`

2. Or use the upload endpoints to add media through the API

### Modifying Colors/Theme

Edit the Tailwind configuration in `frontend/tailwind.config.js`:
- Wood colors: `wood-light`, `wood-medium`, `wood-dark`
- Green colors: `leaf-green`, `forest-green`, `sage-green`
- Background colors: `cream`, `sand`

### Adding New Product Categories

1. Update the backend API in `backend/main.py`
2. Add new routes in `frontend/src/App.tsx`
3. Create corresponding component in `frontend/src/pages/`

## Production Considerations

1. **Environment Variables**: Set proper environment variables for production
2. **CORS**: Update CORS settings to restrict origins
3. **HTTPS**: Configure SSL certificates for secure connections
4. **Database**: Replace in-memory storage with a proper database
5. **CDN**: Consider using a CDN for static assets
6. **Monitoring**: Add logging and monitoring solutions
7. **Backup**: Implement backup strategies for uploaded files

## Support

For support, please contact the development team or create an issue in the repository.

## License

© 2024 Tropical Wood, a division of Roilux. All rights reserved.