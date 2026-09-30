import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(__dirname));

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
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route /pagina.html explicitly to ensure compatibility
app.get('/pagina.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pagina.html'));
});

// Fallback to index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

if (process.env.VERCEL !== '1') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
