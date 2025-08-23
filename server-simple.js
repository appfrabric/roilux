const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

console.log('Starting simple combined server...');
console.log('Working directory:', __dirname);

// Ensure data directory exists
const dataDir = path.join(__dirname, 'backend', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('Created data directory:', dataDir);
}

let backendReady = false;

// Start Python backend
console.log('Starting Python backend...');
const backendProcess = spawn('python3', ['-m', 'uvicorn', 'main:app', '--host', '0.0.0.0', '--port', '8000'], {
  cwd: path.join(__dirname, 'backend'),
  env: { 
    ...process.env, 
    PYTHONUNBUFFERED: '1',
    DATABASE_URL: 'sqlite:///./data/tropical_wood.db'
  }
});

backendProcess.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(`Backend: ${output}`);
  if (output.includes('Uvicorn running') || output.includes('Application startup complete')) {
    backendReady = true;
    console.log('✓ Backend is ready!');
  }
});

backendProcess.stderr.on('data', (data) => {
  console.error(`Backend Error: ${data}`);
});

backendProcess.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
  backendReady = false;
});

// Parse JSON middleware
app.use(express.json());

// Simple proxy for API calls
app.use('/api', (req, res) => {
  console.log(`Proxying ${req.method} ${req.path} to backend`);
  
  const postData = req.method !== 'GET' ? JSON.stringify(req.body) : null;
  
  const options = {
    hostname: 'localhost',
    port: 8000,
    path: req.url,
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err);
    res.status(502).json({ 
      error: 'Backend service unavailable',
      details: err.message,
      backend_ready: backendReady 
    });
  });

  if (postData) {
    proxyReq.write(postData);
  }
  proxyReq.end();
});

// Health check
app.get('/_health', (req, res) => {
  res.json({ 
    status: 'healthy',
    server: 'simple-combined',
    backend_ready: backendReady,
    timestamp: new Date().toISOString()
  });
});

// Serve React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Simple combined server running on port ${PORT}`);
});

// Handle shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  backendProcess.kill();
  process.exit(0);
});