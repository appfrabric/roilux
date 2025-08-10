const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, 'build')));

// DO NOT handle /api routes - let them pass through to backend
app.get('*', (req, res) => {
  // Skip /api routes
  if (req.path.startsWith('/api')) {
    res.status(404).send('Not Found');
    return;
  }
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});