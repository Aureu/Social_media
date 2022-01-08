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
