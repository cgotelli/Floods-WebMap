// server.js
const express = require('express');
const fetch = require('node-fetch'); // or use the built-in fetch in Node.js 18+
const app = express();
const PORT = process.env.PORT || 3000;

// Create an API endpoint that fetches the JSON data server-side.
app.get('/api/data', async (req, res) => {
  try {
    const response = await fetch('https://www.hydrodaten.admin.ch/plots/p_q_7days/2269_p_q_7days_en.json');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Serve your static HTML files (assumes they’re in the 'public' directory)
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});