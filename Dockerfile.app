FROM nikolaik/python-nodejs:python3.11-nodejs18

WORKDIR /app

# Copy everything
COPY . .

# Install Python dependencies first
RUN pip install --no-cache-dir -r backend/requirements.txt

# Verify Python backend can start
RUN cd backend && python -c "import uvicorn; import main; print('Backend imports successful')"

# Install Node dependencies and build frontend
WORKDIR /app/frontend
RUN npm ci --legacy-peer-deps
RUN npm run build

# Go back to root
WORKDIR /app

# Install server dependencies
RUN npm install express http-proxy-middleware

# Create data directory
RUN mkdir -p backend/data

EXPOSE 8080

CMD ["node", "server-combined.js"]