const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/top-headlines', async (req, res) => {
  try {
    const { country = 'in', category = 'general', page = 1, pageSize = 20 } = req.query;
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`News proxy server running on http://localhost:${PORT}`);
});
