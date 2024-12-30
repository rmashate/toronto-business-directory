const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const { processBusinessQuery } = require('../services/chatService');

router.post('/', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await processBusinessQuery(query);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;