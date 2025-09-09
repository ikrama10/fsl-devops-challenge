const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// API endpoint to get the secret
app.get('/api/secret', (req, res) => {
  res.json({ 
    secret: process.env.MY_SECRET || 'Secret not found',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('healthy');
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`MY_SECRET: ${process.env.MY_SECRET || 'Not set'}`);
});
