const express = require('express');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple in-memory database (will persist to file)
let database = {
  adminUsers: [
    {
      id: 1,
      username: 'admin',
      email: 'roilux.woods@gmail.com',
      password_hash: crypto.createHash('sha256').update('roilux2024').digest('hex'),
      role: 'admin',
      createdAt: new Date().toISOString(),
      lastLogin: null
    },
    {
      id: 2,
      username: 'processor1',
      email: 'processor@roilux.com',
      password_hash: crypto.createHash('sha256').update('processor123').digest('hex'),
      role: 'processor',
      createdAt: new Date().toISOString(),
      lastLogin: null
    }
  ],
  contactMessages: [],
  virtualTours: []
};

// Load database from file if exists
async function loadDatabase() {
  try {
    const data = await fs.readFile('database.json', 'utf8');
    const loaded = JSON.parse(data);
    // Merge with defaults, keeping admin users
    database.contactMessages = loaded.contactMessages || [];
    database.virtualTours = loaded.virtualTours || [];
    console.log('Database loaded from file');
  } catch (err) {
    console.log('No existing database file, using defaults');
  }
}

// Save database to file
async function saveDatabase() {
  try {
    await fs.writeFile('database.json', JSON.stringify(database, null, 2));
  } catch (err) {
    console.error('Error saving database:', err);
  }
}

// Initialize
loadDatabase();

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// API Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/_health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    server: 'node-api',
    timestamp: new Date().toISOString() 
  });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt for username: ${username}`);
  
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
  const user = database.adminUsers.find(u => u.username === username);
  
  if (!user) {
    console.log(`User not found: ${username}`);
    return res.status(401).json({ detail: 'Invalid username or password' });
  }
  
  console.log(`Checking password for ${username}`);
  console.log(`Provided hash: ${passwordHash}`);
  console.log(`Stored hash: ${user.password_hash}`);
  
  if (user.password_hash !== passwordHash) {
    console.log('Password mismatch!');
    return res.status(401).json({ detail: 'Invalid username or password' });
  }
  
  // Update last login
  user.lastLogin = new Date().toISOString();
  saveDatabase();
  
  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    }
  });
});

// Get users (for admin check)
app.get('/api/auth/users', (req, res) => {
  res.json(database.adminUsers.map(u => ({
    id: u.id,
    username: u.username,
    email: u.email,
    role: u.role
  })));
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  const contactMessage = {
    id: database.contactMessages.length + 1,
    name,
    email,
    phone,
    subject,
    message,
    created_at: new Date().toISOString(),
    status: 'pending',
    archived: false
  };
  
  database.contactMessages.push(contactMessage);
  await saveDatabase();
  
  res.json({
    success: true,
    message: 'Message sent successfully!',
    message_id: contactMessage.id
  });
});

// Get contact messages
app.get('/api/contact-messages', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const start = (page - 1) * limit;
  
  const messages = database.contactMessages
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(start, start + limit);
  
  res.json({
    messages,
    total: database.contactMessages.length,
    page,
    limit
  });
});

// Delete contact message
app.delete('/api/contact-messages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = database.contactMessages.findIndex(m => m.id === id);
  
  if (index === -1) {
    return res.status(404).json({ detail: 'Message not found' });
  }
  
  database.contactMessages.splice(index, 1);
  saveDatabase();
  
  res.json({ success: true, message: 'Message deleted successfully' });
});

// Virtual tour submission
app.post('/api/virtual-tour', async (req, res) => {
  const { name, email, company, phone, preferredDate, preferredTime, message } = req.body;
  
  const tour = {
    id: database.virtualTours.length + 1,
    name,
    email,
    company,
    phone,
    preferred_date: preferredDate,
    preferred_time: preferredTime,
    message,
    created_at: new Date().toISOString(),
    status: 'pending',
    archived: false
  };
  
  database.virtualTours.push(tour);
  await saveDatabase();
  
  res.json({
    success: true,
    message: 'Virtual tour request submitted successfully!',
    tour_id: tour.id
  });
});

// Get virtual tours
app.get('/api/virtual-tours', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const start = (page - 1) * limit;
  
  const tours = database.virtualTours
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(start, start + limit);
  
  res.json({
    tours,
    total: database.virtualTours.length,
    page,
    limit
  });
});

// Delete virtual tour
app.delete('/api/virtual-tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = database.virtualTours.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ detail: 'Tour not found' });
  }
  
  database.virtualTours.splice(index, 1);
  saveDatabase();
  
  res.json({ success: true, message: 'Tour deleted successfully' });
});

// Serve React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Admin credentials: admin / roilux2024');
  console.log('Processor credentials: processor1 / processor123');
});