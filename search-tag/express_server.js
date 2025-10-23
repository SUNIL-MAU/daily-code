const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS, JSON)
app.use(express.static('public'));

// Serve search-index.json explicitly (if it's in a different location)
app.get('/search-index.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search-index.json'));
});

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route for HTML pages
app.get('/*.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', req.path));
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Search index available at http://localhost:${PORT}/search-index.json`);
});
