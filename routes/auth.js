const express = require('express');
const registerController = require('../controllers/register');

const router = express.Router();

// Route for index
router.post('/register', registerController.register);

module.exports = router;
