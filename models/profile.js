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

exports.getFollowers = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT uf1.follower_id AS id, u.username, COUNT(uf2.followed_id) AS count
			FROM followers uf1
					LEFT JOIN followers uf2
							ON uf1.followed_id = uf2.followed_id
					INNER JOIN users u
							ON uf1.followed_id = u.id
			WHERE uf1.follower_id = '${user_id}'
			GROUP BY uf1.follower_id`;
			conn.query(sql, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
