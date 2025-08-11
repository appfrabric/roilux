const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

console.log('Starting combined server...');
console.log('Working directory:', __dirname);
console.log('Backend directory:', path.join(__dirname, 'backend'));

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

// Wait for backend to be ready
setTimeout(() => {
  if (backendReady) {
    console.log('Backend confirmed ready, starting proxy...');
  } else {
    console.log('Backend may not be ready yet, but starting proxy anyway...');
  }
}, 5000);

// Proxy API requests to backend
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:8000',
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error('Proxy error:', err.message);
    res.status(502).json({ 
      error: 'Backend service unavailable',
      details: err.message
    });
  }
}));

// Health check
app.get('/_health', (req, res) => {
  res.json({ 
    status: 'healthy',
    server: 'combined',
    backend_ready: backendReady,
    timestamp: new Date().toISOString()
  });
});

// Backend health check proxy  
app.get('/_backend_health', async (req, res) => {
  try {
    const http = require('http');
    const options = {
      hostname: 'localhost',
      port: 8000,
      path: '/health',
      method: 'GET',
      timeout: 2000
    };

    const req2 = http.request(options, (res2) => {
      let data = '';
      res2.on('data', chunk => data += chunk);
      res2.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          res.json({ backend_status: 'reachable', data: parsed });
        } catch (e) {
          res.json({ backend_status: 'reachable', data: data });
        }
      });
    });

    req2.on('error', (err) => {
      res.status(502).json({ 
        backend_status: 'unreachable', 
        error: err.message,
        backend_ready: backendReady 
      });
    });

    req2.end();
  } catch (err) {
    res.status(502).json({ 
      backend_status: 'error', 
      error: err.message,
      backend_ready: backendReady 
    });
  }
});

// Serve React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Combined server running on port ${PORT}`);
});

// Handle shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  backendProcess.kill();
  process.exit(0);
});