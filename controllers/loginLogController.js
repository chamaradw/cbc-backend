import LoginLog from "../models/loginLog";


//const LoginLog = require('../models/LoginLog');


// Controller to log login details
exports.logLoginDetails = async (req, res) => {
  const { email, provider, status, timestamp } = req.body;

  // Basic validation
  if (!provider || !status) {
    return res.status(400).json({ success: false, message: 'Provider and status are required.' });
  }

  try {
    // Create and save a new log entry
    const log = new LoginLog({
      email: email || null,
      provider,
      status,
      timestamp: timestamp ? new Date(timestamp) : Date.now(),
    });

    await log.save();

    res.status(201).json({ success: true, message: 'Login details logged successfully.' });
  } catch (error) {
    console.error('Error logging login details:', error);
    res.status(500).json({ success: false, message: 'Error logging  details.' });
  }
};
