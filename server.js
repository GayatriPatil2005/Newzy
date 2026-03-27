const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/news', async (req, res) => {
  try {
    const { country = 'in', category = 'general', size = 20 } = req.query;
    const apiKey = process.env.NEWS_DATA_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured. Check .env' });
    }
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}&category=${category}&size=${size}`;
    
    console.log('Proxy fetching:', url); // Debug
    const response = await fetch(url, { 
      timeout: 10000,
      headers: { 'User-Agent': 'NewsApp/1.0' }
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch news: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`News proxy server running on http://localhost:${PORT}`);
});
