const conn = require('../database');
const express = require('express');

// Editování profilu - dodělát
exports.editProfile = (ID) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = 'SELECT * FROM users WHERE user_id = ?';
			conn.query(sql, ID, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

// dodělat
exports.updateProfile = (updateProfile, ID, callback) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = 'UPDATE users SET ? WHERE user_id = ?';
			conn.query(sql, [updateUser, ID], (err) => {
				if (err) throw err;
				return callback();
			});
		} catch (err) {
			reject(err);
		}
	});
};

// Sql na vložení nového uživatele do DB
exports.addBio = (user_id, bio) => {
	let sql = `UPDATE users SET bio = '${bio}' WHERE user_id = '${user_id}'`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
