const jwt = require('jsonwebtoken');
const conn = require('../database');
const bcrypt = require('bcryptjs');
const { stat } = require('fs');

exports.register = (req, res) => {
	// Getting data from form on register page
	const { fName, lName, email, password } = req.body;
	const status = 'active';

	conn.query(
		// SQL command for searching same email in database
		'SELECT email FROM users WHERE email = ?',
		[email],
		async (error, results) => {
			if (error) {
				console.log(error);
			}
			// Checking same email in database
			if (results.length > 0) {
				return res.render('register', {
					message: 'That email is already in use',
				});
			}
			// Hashing password
			let hashedPassword = await bcrypt.hash(password, 10);

			conn.query(
				// Inserting into database in the table 'users'
				'INSERT INTO users SET ?',
				{
					firstName: fName,
					lastName: lName,
					password: hashedPassword,
					email: email,
					status: status,
				},
				(error, results) => {
					if (error) {
						console.log(error);
					} else {
						console.log(results);
						// Redirect on account
						res.redirect('/login');
					}
				}
			);
		}
	);
};
