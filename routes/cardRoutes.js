const express = require('express');
const Card = require('../models/Card');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const Deck = require('../models/Deck');

// Get 10 random cards
router.get('/random', protect, async (req, res) => {
  try {
    const cards = await Card.aggregate([{ $sample: { size: 10 } }]);
    res.status(200).json(cards);
  } catch (err) {
    console.error('Error fetching random cards:', err.message);
    res.status(500).json({ error: 'Failed to fetch random cards' });
  }
});

// Add cards to user's deck
router.post('/add-to-deck', protect, async (req, res) => {
    try {
      const userId = req.user.id; // From the decoded token in the protect middleware
      const { cards } = req.body;
  
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
  
      // Check if the user already has a deck
      let deck = await Deck.findOne({ user: userId });
  
      if (deck) {
        // Update the existing deck
        deck.cards = cards.map((card) => card._id);
        await deck.save();
      } else {
        // Create a new deck
        deck = new Deck({
          user: userId,
          cards: cards.map((card) => card._id),
        });
        await deck.save();
  
        // Link the deck to the user
        user.deck = deck._id;
        await user.save();
      }
  
      res.status(200).json({ message: 'Deck updated successfully', deck });
    } catch (err) {
      console.error('Error updating deck:', err.message);
      res.status(500).json({ error: 'Failed to update deck' });
    }
  });
module.exports = router;
