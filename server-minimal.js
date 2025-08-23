const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 8080;

console.log('Starting minimal combined server...');
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

// MIME type mapping
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Health check endpoint
  if (req.url === '/_health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'healthy',
      server: 'minimal-combined',
      backend_ready: backendReady,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Proxy API requests to backend
  if (req.url.startsWith('/api')) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const options = {
        hostname: 'localhost',
        port: 8000,
        path: req.url,
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {})
        }
      };

      const proxyReq = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
      });

      proxyReq.on('error', (err) => {
        console.error('Proxy error:', err);
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          error: 'Backend service unavailable',
          details: err.message,
          backend_ready: backendReady 
        }));
      });

      if (body) {
        proxyReq.write(body);
      }
      proxyReq.end();
    });
    return;
  }

  // Serve static files
  const buildDir = path.join(__dirname, 'frontend/build');
  let filePath = path.join(buildDir, req.url === '/' ? 'index.html' : req.url);
  
  // Remove query parameters
  filePath = filePath.split('?')[0];
  
  // Check if file exists
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    // If file doesn't exist, serve index.html for React routing
    filePath = path.join(buildDir, 'index.html');
  }

  try {
    const data = fs.readFileSync(filePath);
    const contentType = getMimeType(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    console.error('Error serving file:', err);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File not found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Minimal combined server running on port ${PORT}`);
});

// Handle shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  backendProcess.kill();
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...');
  backendProcess.kill();
  server.close(() => {
    process.exit(0);
  });
});