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

// Selects post
exports.Posts = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT p.post_id, p.username, p.content,  p.created_at FROM users AS u JOIN posts AS p ON u.id = p.user_id WHERE u.id = ?`;
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
			let sql = `INSERT INTO followers (follower_id, followed_id, created_at) VALUES ('${followerId}', '${followedId}', NOW())`;
			conn.query(sql, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
