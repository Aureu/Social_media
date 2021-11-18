const jwt = require('jsonwebtoken');
const conn = require('../database');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
	// Získávání dat z formuláře 'register'
	const { fName, lName, email, pass } = req.body;

	conn.query(
		'SELECT email FROM users WHERE email = ?',
		[email],
		async (error, results) => {
			if (error) {
				console.log(error);
			}

			if (results.length > 0) {
				return res.render('register', {
					message: 'That email is already in use',
				});
			}
			let hashedPassword = await bcrypt.hash(pass, 8);

			conn.query(
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
						return res.render('register', {
							message: 'User registered',
						});
					}
				}
			);
		}
	);
};
