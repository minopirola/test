import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`<h2>Proxy attivo. Usa <code>/proxy?url=https://...</code></h2>`);
});

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('URL mancante');

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get("content-type") || "text/html";
    const content = await response.text();
    res.setHeader('Content-Type', contentType);
    res.send(content);
  } catch (e) {
    console.error(e);
    res.status(500).send('Errore durante la richiesta');
  }
});

app.listen(PORT, () => console.log(`Proxy in ascolto su http://localhost:${PORT}`));
