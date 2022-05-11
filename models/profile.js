const conn = require('../database');
const express = require('express');

exports.viewInfo = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM user_info WHERE user_id = '${user_id}'`;
			conn.query(sql, (err, results) => {
				if (err) throw err;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.viewAvatar = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM user_avatars WHERE user_id = '${user_id}'`;
			conn.query(sql, user_id, (error, results) => {
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
