const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();

// Middleware
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Allow express to parse JSON bodies in requests
app.use(express.json());

// Define API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/users', require('./routes/users'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/swipes', require('./routes/swipes'));

// Simple route for testing if the server is up
app.get('/', (req, res) => {
  res.send('Connect API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));