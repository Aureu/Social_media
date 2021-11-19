const express = require('express');
const authController = require('../controllers/register');

const router = express.Router();

// Route for index
router.post('/register', authController.register);

module.exports = router;
