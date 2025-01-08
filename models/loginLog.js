import mongoose from 'mongoose';
import express from 'express';  

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB User Login Schema
const loginLogSchema = new mongoose.Schema({
  email: { type: String, required: false },
  provider: { type: String, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

const LoginLog = mongoose.model('LoginLog', loginLogSchema);

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Endpoint to Log Login Details
app.post('/api/users/log-login', async (req, res) => {
  const { email, provider, status, timestamp } = req.body;

  try {
    const log = new LoginLog({
      email: email || null,
      provider,
      status,
      timestamp: new Date(timestamp),
    });

    await log.save();

    res.status(201).json({ success: true, message: 'Login details logged successfully.' });
  } catch (error) {
    console.error('Error logging login details:', error);
    res.status(500).json({ success: false, message: 'Error logging login details.' });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
export default LoginLog;