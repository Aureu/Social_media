const conn = require('../database');
const express = require('express');

// counters
exports.postCounter = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT COUNT(*) AS postCount FROM posts WHERE user_id = ?`;
			conn.query(sql, user_id, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.followingCounter = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT COUNT(*) AS followingCount FROM followers WHERE follower_id = ?`;
			conn.query(sql, user_id, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.followersCounter = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT COUNT(*) AS followersCount FROM followers WHERE followed_id = ?`;
			conn.query(sql, user_id, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
