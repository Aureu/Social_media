const conn = require('../database');
const express = require('express');

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
