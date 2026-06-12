// Local development entry point — serves the built React app and the API together.
// Not used on Vercel (which serves static files and the API as a serverless function natively).
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`
  🚀 Server running on port ${PORT}
  📍 Contact form:      POST /api/submit-to-notion
  📍 Testimonial:       POST /api/submit-testimonial
  📍 Simple contact:    POST /api/submit-simple-contact
  📍 Debug:             GET /api/debug-database
  📍 Health:            GET /api/health
  📍 Gallery CMS:       GET /api/gallery
  📍 Blog list:         GET /api/blog
  📍 Blog article:      GET /api/blog/:slug
  `);
});
