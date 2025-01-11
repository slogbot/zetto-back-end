const mongoose = require('mongoose');

// Define the Card schema
const cardSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name is required
});

// Create the Card model
module.exports = mongoose.model('Card', cardSchema);
