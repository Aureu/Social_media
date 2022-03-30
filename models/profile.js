const conn = require('../database');
const express = require('express');

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
