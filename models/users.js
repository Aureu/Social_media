const conn = require('../database');
const express = require('express');

// Model pro zobrazení uživatelů do tabulky
exports.getUsers = () => {
	return new Promise((resolve, reject) => {
		try {
			let sql = 'SELECT * FROM users';
			conn.query(sql, (err, results) => {
				if (err) throw err;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.getUser = (ID) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM users WHERE user_id = ?`;
			conn.query(sql, ID, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

/* module.exports = {
	getUsers: (callback) => {
		return new Promise((resolve, reject) => {
			try {
				let sql = 'SELECT user_id, jmeno, prijmeni, email FROM users';
				conn.query(sql, (err, results) => {
					if (err) throw err;
					resolve(results);
				});
			} catch (err) {
				reject(err);
			}
		});
	},

	// Model pro zobrazení jednoho uživatele
	getggUser: (user_id, callback) => {
		let sql = 'SELECT * FROM users WHERE user_id = ?';
		conn.query(sql, user_id, (err, data, fields) => {
			if (err) throw err;
			return callback(data[0]);
		});
	},
	// Model pro edit uživatele
	editUser: (editID, callback) => {
		let sql = 'SELECT * FROM users WHERE user_id = ?';
		conn.query(sql, editID, (err) => {
			if (err) throw err;
			return callback(data[0]);
		});
	},
	// Model pro update dat v databázi
	updateUser: (updateUser, user_id, callback) => {
		let sql = 'UPDATE users SET ? WHERE user_id = ?';
		conn.query(sql, [updateUser, user_id], (err) => {
			if (err) throw err;
			return callback(data);
		});
	},

	// Model pro vytvoření nového uživatele
	addUser: (userDetails, callback) => {
		let sql = 'INSERT INTO users SET ?';
		conn.query(sql, userDetails, (err, data) => {
			if (err) throw err;
			return callback(data);
		});
	},
	// Model pro smazání uživatele v DB
	deleteUser: (user_id, callback) => {
		let sql = 'DELETE FROM users WHERE user_id =';
		conn.query(sql, user_id, (err) => {
			if (err) throw err;
			return callback(data);
		});
	},
}; */
