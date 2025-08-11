const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;

console.log('Starting combined server...');

// Start Python backend
const backendProcess = spawn('python', ['-m', 'uvicorn', 'main:app', '--host', '0.0.0.0', '--port', '8000'], {
  cwd: path.join(__dirname, 'backend'),
  env: { ...process.env, PYTHONUNBUFFERED: '1' }
});

backendProcess.stdout.on('data', (data) => {
  console.log(`Backend: ${data}`);
});

backendProcess.stderr.on('data', (data) => {
  console.error(`Backend Error: ${data}`);
});

backendProcess.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
});

// Wait a bit for backend to start
setTimeout(() => {
  console.log('Backend should be running, starting proxy...');
}, 3000);

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
    timestamp: new Date().toISOString()
  });
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