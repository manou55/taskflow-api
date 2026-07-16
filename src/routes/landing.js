const express = require('express');
const path = require('path');
const paddleRoutes = require('./routes/paddle');

const router = express.Router();

// Serve static files
router.use(express.static(path.join(__dirname, '../public')));

// Paddle routes
router.use('/paddle', paddleRoutes);

// Home page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;