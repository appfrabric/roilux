# Multi-stage Docker build for containerized deployment
FROM nikolaik/python-nodejs:python3.11-nodejs18 AS builder

# Set working directory
WORKDIR /app

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy frontend package files
COPY frontend/package*.json frontend/
WORKDIR /app/frontend

# Install dependencies for frontend
RUN npm install --legacy-peer-deps

# Copy frontend source and build
COPY frontend/ .
RUN npm run build

# Runtime stage
FROM nikolaik/python-nodejs:python3.11-nodejs18

WORKDIR /app

# Copy Python dependencies
COPY backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend source
COPY backend/ backend/

# Copy built frontend
COPY --from=builder /app/frontend/build frontend/build

# Copy the minimal server (no external dependencies)
COPY server-minimal.js .

# Create data directory
RUN mkdir -p backend/data

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/_health || exit 1

# Start the minimal combined server
CMD ["node", "server-minimal.js"]