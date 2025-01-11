const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }], // Array of Card references
  });
  
  module.exports = mongoose.model('Deck', deckSchema);
  