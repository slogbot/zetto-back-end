const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  player1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  player2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
});

module.exports = mongoose.model('Game', gameSchema);
