const express = require('express');
const router = express.Router();

// Route for index
router.get('/', (req, res) => {
	res.render('index');
});

// Route for register
router.get('/register', (req, res) => {
	res.render('register');
});

// Route for login
router.get('/login', (req, res) => {
	res.render('login');
});

module.exports = router;
