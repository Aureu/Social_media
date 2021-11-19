const jwt = require('jsonwebtoken');
const conn = require('../database');
const bcrypt = require('bcrypt.js');

exports.register = (req, res) => {
	// Získávání dat z formuláře 'register'
	const { fName, lName, email, pass } = req.body;

	conn.query(
		// Vytáhnutí emailu z databáze pro kontrolu
		'SELECT email FROM users WHERE email = ?',
		[email],
		async (error, results) => {
			if (error) {
				console.log(error);
			}
			// Kontrola stejného emailu v DB
			if (results.length > 0) {
				return res.render('register', {
					message: 'That email is already in use',
				});
			}
			// Hashování hesla
			let hashedPassword = await bcrypt.hash(pass, 10);

			conn.query(
				// Vložení dat do databáze
				'INSERT INTO users SET ?',
				{
					firstName: fName,
					lastName: lName,
					password: hashedPassword,
					email: email,
				},
				(error, results) => {
					if (error) {
						console.log(error);
					} else {
						console.log(results);
						// Redirect na account
						res.redirect('/account');
					}
				}
			);
		}
	);
};
