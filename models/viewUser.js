const conn = require('../database');
const express = require('express');

exports.getUser = (username) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT u.firstname, u.lastname, u.username, u.email, i.bio, i.location, i.date_birth FROM users AS u JOIN user_info AS i ON u.id = i.user_id WHERE u.username = ?`;
			conn.query(sql, username, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
