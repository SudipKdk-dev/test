import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample API Endpoints for testing
app.get('/api/message', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Hello from Node Express backend!',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/echo', (req, res) => {
  const { text } = req.body;
  res.json({
    received: text || '',
    reversed: (text || '').split('').reverse().join(''),
    timestamp: new Date().toISOString()
  });
});

// Serve static frontend in production (Docker or after build)
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'), (err) => {
    if (err) {
      res.status(404).send('Static build not found. Running in development mode?');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
