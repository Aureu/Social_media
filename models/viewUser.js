const conn = require('../database');
const express = require('express');

exports.getUser = (username) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM users WHERE username = ?`;
			conn.query(sql, username, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
