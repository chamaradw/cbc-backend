const express = require('express');
const mongoose = require('mongoose');
const loginLogRoutes = require('./routes/loginLogRoutes');

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
app.use('/api/users', loginLogRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
