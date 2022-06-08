const conn = require('../database');
const express = require('express');

exports.viewProfile = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM viewprofile WHERE id = ?`;
			conn.query(sql, user_id, (err, results) => {
				if (err) throw err;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
