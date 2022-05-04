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

exports.addBio = (user_id, bio) => {
	let sql = `UPDATE users SET bio = '${bio}' WHERE user_id = '${user_id}'`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};

exports.viewAvatar = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM avatars WHERE user_id = '${user_id}'`;
			conn.query(sql, user_id, (error, results) => {
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.viewPost = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM posts WHERE user_id = '${user_id}'`;
			conn.query(sql, user_id, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
