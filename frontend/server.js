const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;

console.log('Starting Express server...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', PORT);

// Proxy /api requests to backend service
// In DigitalOcean App Platform, services communicate via service names
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8080';

console.log('Setting up proxy to:', BACKEND_URL);

app.use('/api', createProxyMiddleware({
  target: BACKEND_URL,
  changeOrigin: true,
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying ${req.method} ${req.path} to ${BACKEND_URL}`);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err.message);
    res.status(502).json({ 
      error: 'Backend service unavailable',
      details: err.message,
      backend: BACKEND_URL 
    });
  }
}));

// Health check endpoint
app.get('/_health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    server: 'express',
    backend_url: BACKEND_URL,
    timestamp: new Date().toISOString()
  });
});

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, 'build')));

// All other routes serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Proxying /api requests to ${BACKEND_URL}`);
});