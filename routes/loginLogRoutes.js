import express from 'express';

const express = require('express');
const { logLoginDetails } = require('../controllers/loginLogController');

const router = express.Router();

// Route to log login details
router.post('/log-login', logLoginDetails);

module.exports = router;
