const express = require('express');
const router = express.Router();

// Route for index
router.get('/', (req, res) => {
	res.render('index', {
		title: 'Home Page',
		style: 'index.css'
	});
});

// Route for register
router.get('/register', (req, res) => {
	res.render('register', {
		title: 'SignUp',
		style: 'register.css',
	});
});

// Route for login
router.get('/login', (req, res) => {
	res.render('login', {
		title: 'Login',
		style: 'login.css',
	});
});

module.exports = router;
