const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy /api requests to backend service
// In DigitalOcean App Platform, services communicate via service names
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8080';

app.use('/api', createProxyMiddleware({
  target: BACKEND_URL,
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(502).json({ error: 'Backend service unavailable' });
  }
}));

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