const express = require('express');
const router = express.Router();
const session = require('express-session');

// Route for register
router.get('/', (req, res) => {
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

// Route for account
router.get('/account', (req, res) => {
	session = req.session;
	if (session.userid) {
		res.send("Welcome User <a href='/logout'>click to logout</a>");
	} else {
		res.render('account', {
			title: 'Account',
			style: 'account.css',
		});
	}
});

// Logout route
router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
