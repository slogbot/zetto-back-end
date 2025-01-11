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
// Join a game
router.post('/:id/join', protect, async (req, res) => {
  try {
    const gameId = req.params.id;
    const userId = req.user.id;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Assign the user as Player 1 or Player 2
    if (!game.player1) {
      game.player1 = userId;
    } else if (!game.player2) {
      game.player2 = userId;
    } else {
      return res.status(400).json({ error: 'Game is full' });
    }

    await game.save();

    res.status(200).json({
      message: 'Successfully joined the game',
      game,
      playerRole: game.player1 === userId ? 'Player 1' : 'Player 2',
    });
  } catch (err) {
    console.error('Error joining game:', err.message);
    res.status(500).json({ error: 'Failed to join game' });
  }
});
// Get a specific game's details
router.get('/:id', protect, async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await Game.findById(gameId).populate('player1 player2', 'username'); // Populate player info
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (err) {
    console.error('Error fetching game details:', err.message);
    res.status(500).json({ error: 'Failed to fetch game details' });
  }
});

module.exports = router;
