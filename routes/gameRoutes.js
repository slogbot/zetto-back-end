const express = require('express');
const Game = require('../models/Game');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Create an empty game
router.post('/', protect, async (req, res) => {
  try {
    const game = new Game(); // Create an empty game
    await game.save();
    res.status(201).json({ message: 'Empty game created successfully', game });
  } catch (err) {
    console.error('Error creating empty game:', err.message);
    res.status(500).json({ error: 'Failed to create empty game' });
  }
});

module.exports = router;
