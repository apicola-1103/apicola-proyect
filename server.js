import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public/ and root directory
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));
app.use('/src', express.static(path.join(publicDir, 'src')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(__dirname));

// Explicit route for CSS to guarantee correct MIME type and delivery
app.get('/estilos.css', (req, res) => {
  const publicCss = path.join(publicDir, 'estilos.css');
  const rootCss = path.join(__dirname, 'estilos.css');
  const target = fs.existsSync(publicCss) ? publicCss : rootCss;
  res.type('text/css').sendFile(target);
});

// Explicit route for images
app.get('/src/assets/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const publicImg = path.join(publicDir, 'src', 'assets', 'images', filename);
  const rootImg = path.join(__dirname, 'src', 'assets', 'images', filename);
  const target = fs.existsSync(publicImg) ? publicImg : rootImg;
  if (fs.existsSync(target)) {
    res.sendFile(target);
  } else {
    res.status(404).send('Image not found');
  }
});

// Health check / API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Control Apícola',
    timestamp: new Date().toISOString()
  });
});

// Route root request to index.html
app.get('/', (req, res) => {
  const publicIndex = path.join(publicDir, 'index.html');
  const rootIndex = path.join(__dirname, 'index.html');
  res.sendFile(fs.existsSync(publicIndex) ? publicIndex : rootIndex);
});

// Route /pagina.html explicitly to ensure compatibility
app.get('/pagina.html', (req, res) => {
  const publicPagina = path.join(publicDir, 'pagina.html');
  const rootPagina = path.join(__dirname, 'pagina.html');
  res.sendFile(fs.existsSync(publicPagina) ? publicPagina : rootPagina);
});

// Fallback to index.html for any unhandled routes
app.get('*', (req, res) => {
  const publicIndex = path.join(publicDir, 'index.html');
  const rootIndex = path.join(__dirname, 'index.html');
  res.sendFile(fs.existsSync(publicIndex) ? publicIndex : rootIndex);
});

if (process.env.VERCEL !== '1') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
