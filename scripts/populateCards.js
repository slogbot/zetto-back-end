const mongoose = require('mongoose');
const Card = require('../models/Card'); // Adjust path if needed
require('dotenv').config(); // Load environment variables

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

// Array of cards to populate
const cards = [
  { name: 'Card 1' },
  { name: 'Card 2' },
  { name: 'Card 3' },
  { name: 'Card 4' },
  { name: 'Card 5' },
  { name: 'Card 6' },
  { name: 'Card 7' },
  { name: 'Card 8' },
  { name: 'Card 9' },
  { name: 'Card 10' },
];

// Populate the database with cards
const populateCards = async () => {
  try {
    await connectDB();

    // Clear existing cards (optional)
    await Card.deleteMany({});
    console.log('Existing cards cleared');

    // Insert new cards
    await Card.insertMany(cards);
    console.log('Cards populated successfully');

    process.exit(0);
  } catch (err) {
    console.error('Error populating cards:', err.message);
    process.exit(1);
  }
};

populateCards();
