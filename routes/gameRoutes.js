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

// Get all games
router.get('/', protect, async (req, res) => {
  try {
    const games = await Game.find(); // Fetch all games from the database
    res.status(200).json(games);
  } catch (err) {
    console.error('Error fetching games:', err.message);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

module.exports = router;
