const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/message', async (req, res) => {

  try {
    const response = await fetch('https://fartworth.com/api/messages?limit=20');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({
      error: 'Failed to retrieve data'
    });
  }
});

app.get('/messages', async (req, res) => {
  try {
    const {
      task_id,
      size,
      page
    } = req.query;

    if (!task_id) {
      return res.status(400).json({
        error: 'task_id is required'
      });
    }
    const response = await fetch(`https://fed-ledger-prod.flock.io/api/v1/stats/models?task_id=${task_id}&page=${page}&size=${size}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({
      error: 'Failed to retrieve data'
    });
  }
});


module.exports = app;