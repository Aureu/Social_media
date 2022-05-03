const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Register = require('../models/register');

// Zobrazení stránky
router.get('/', (req, res) => {
	res.render('auth/register', {
		title: 'Register',
		style: 'auth/register.css',
	});
});

// Dodělat error handling
router.post('/', async (req, res) => {
	try {
		const { jmeno, prijmeni, prezdivka, email, heslo } = req.body;
		const status = 'user';
		console.log(req.body);
		// Hashovaní hesla před uložením do DB
		const hashedPassword = await bcrypt.hash(heslo, 10);
		Register.register(
			jmeno,
			prijmeni,
			prezdivka,
			hashedPassword,
			email,
			status
		);
		res.redirect('/login');
	} catch {
		res.redirect('/register');
	}
});

module.exports = router;
