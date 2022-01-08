const mysql = require('mysql');
const connection = require('../database');

// View users
exports.view = (req, res) => {
	// User the connection
	connection.query(
		'SELECT * FROM users WHERE status = "active"',
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
		'SELECT * FROM users WHERE id = ?'[req.params.id],
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
	const { firstName, lastName, email } = req.body;
	// User the connection
	connection.query(
		'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?',
		[firstName, lastName, email, req.params.id],
		(err, rows) => {
			if (!err) {
				// User the connection
				connection.query(
					'SELECT * FROM users WHERE id = ?',
					[req.params.id],
					(err, rows) => {
						// when done with the connection, release it

						if (!err) {
							res.render('edit-user', {
								rows,
								alert: `${firstName} has been updated.`,
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
		'SELECT * FROM users WHERE id = ?',
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
		'SELECT * FROM users WHERE firstName LIKE ? OR lastName LIKE ?',
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
	const { fName, lName, email, password } = req.body;
	let searchTerm = req.body.search;
	const status = 'active';

	// User the connection
	connection.query(
		'INSERT INTO users SET ?',
		{
			firstName: fName,
			lastName: lName,
			password: password,
			email: email,
			status: status,
		},
		(err, rows) => {
			if (!err) {
				res.render('add-user', { alert: 'User added successfully.' });
			} else {
				console.log(err);
			}
			console.log('The data from user table: \n', rows);
		}
	);
};

// Delete User
exports.delete = (req, res) => {
	connection.query(
		'DELETE FROM users WHERE id = ?',
		[req.params.id],
		(err, rows) => {
			if (!err) {
				res.redirect('/admin/user_list');
			} else {
				console.log(err);
			}
			console.log('The data from users table: \n', rows);
		}
	);
};
