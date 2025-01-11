const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  deck: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck' }, // Reference to the Deck
});

module.exports = mongoose.model('User', userSchema);
