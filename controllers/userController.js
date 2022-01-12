const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const connection = require('../database');

// View users
exports.view = (req, res) => {
	// User the connection
	connection.query(
		'SELECT * FROM user WHERE status = "active"',
		(err, rows) => {
			// When done with the connection, release it
			if (!err) {
				let removedUser = req.query.removed;
				res.render('user_list', { rows, removedUser });
			} else {
				console.log(err);
			}
			console.log('The data from users table: \n', rows);
		}
	);
};

// Edit user
exports.edit = (req, res) => {
	// User the Connection
	connection.query(
		'SELECT * FROM user WHERE id = ?',
		[req.params.id],
		(err, rows) => {
			if (!err) {
				res.render('edit-user', { rows });
			} else {
				console.log(err);
			}
			console.log('The data from user table: \n', rows);
		}
	);
};

// Update User
exports.update = (req, res) => {
	const { fName, lName, username, email } = req.body;
	// User the connection
	connection.query(
		'UPDATE user SET first_name = ?, last_name = ?, username = ?, email = ? WHERE id = ?',
		[fName, lName, username, email, req.params.id],
		(err, rows) => {
			if (!err) {
				// User the connection
				connection.query(
					'SELECT * FROM user WHERE id = ?',
					[req.params.id],
					(err, rows) => {
						// when done with the connection, release it

						if (!err) {
							res.render('edit-user', {
								rows,
								alert: `${fName} has been updated.`,
							});
						} else {
							console.log(err);
						}
						console.log('The data from user table: \n', rows);
					}
				);
			} else {
				console.log(err);
			}
			console.log('The data from user table: \n', rows);
		}
	);
};

// View Users
exports.viewall = (req, res) => {
	// User the connection
	connection.query(
		'SELECT * FROM user WHERE id = ?',
		[req.params.id],
		(err, rows) => {
			if (!err) {
				res.render('view-user', { rows });
			} else {
				console.log(err);
			}
			console.log('The data from user table: \n', rows);
		}
	);
};

// Find User by Search
exports.find = (req, res) => {
	let searchTerm = req.body.search;
	// User the connection
	connection.query(
		'SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?',
		['%' + searchTerm + '%', '%' + searchTerm + '%'],
		(err, rows) => {
			if (!err) {
				res.render('user_list', { rows });
			} else {
				console.log(err);
			}
			console.log(' The data from user table: \n', rows);
		}
	);
};

exports.form = (req, res) => {
	res.render('add-user');
};

// Add new user
exports.create = (req, res) => {
	// Getting data from form
	const { fName, lName, username, email, password } = req.body;
	const status = 'active';

	connection.query(
		// SQL command for searching same email in database
		'SELECT email FROM user WHERE email = ?',
		[email],
		async (error, results) => {
			if (error) {
				console.log(error);
			}
			// Checking same email in database
			if (results.length > 0) {
				return res.render('add-user', {
					alert: 'That email is already in use',
				});
			}
			// Hashing password
			let hashedPassword = await bcrypt.hash(password, 10);

			connection.query(
				// Inserting into database in the table 'users'
				'INSERT INTO user SET ?',
				{
					first_name: fName,
					last_name: lName,
					username: username,
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
						return res.render('add-user', {
							alert: 'User added successfully',
						});
					}
				}
			);
		}
	);
};

// Delete User
exports.delete = (req, res) => {
	connection.query(
		'UPDATE user SET status = ? WHERE id = ?',
		['removed', req.params.id],
		(err, rows) => {
			if (!err) {
				let removedUser = encodeURIComponent('User successeflly removed.');
				res.redirect('/admin/user_list');
			} else {
				console.log(err);
			}
			console.log('The data from beer table are: \n', rows);
		}
	);
};
