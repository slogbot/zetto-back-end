const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cards', require('./routes/cardRoutes')); // Register the card routes
app.use('/api/games', require('./routes/gameRoutes')); // Register the game routes

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
