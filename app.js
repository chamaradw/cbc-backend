const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./controllers/userController.js');

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', userRoutes); // Mounting the user routes under /api

// Start Server
const PORT = process.env.PORT || 5000; // Use environment variable for portability
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
