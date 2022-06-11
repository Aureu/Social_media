const conn = require('../database');
const mysql = require('mysql');
const express = require('express');

// Selects user table with user_info table using JOIN
exports.getUser = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM viewuser WHERE id = ?`;
			conn.query(sql, user_id, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

// Follow user
exports.follow = (followerId, followedId) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `INSERT INTO followers (follower_id, followed_id) VALUES ('${followerId}', '${followedId}')`;
			conn.query(sql, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

// Unfollow user
exports.unFollow = (followedId) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `DELETE FROM followers WHERE followed_id = ? `;
			conn.query(sql, followedId, (error, results) => {
				if (error) throw error;
				resolve(results);
				console.log('User unfollowed');
			});
		} catch (err) {
			reject(err);
		}
	});
};
