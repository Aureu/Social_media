const conn = require('../database');
const mysql = require('mysql');
const express = require('express');

// Selects user table with user_info table using JOIN
exports.getUser = (username) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM users AS u JOIN user_info AS i ON u.id = i.user_id WHERE u.username = ?`;
			conn.query(sql, username, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

// Selects user_avatars table
exports.getUser1 = (username) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT a.file_src, u.id FROM users AS u JOIN user_avatars AS a ON u.id = a.user_id WHERE u.username = ?`;
			conn.query(sql, username, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

// Selects post
exports.Posts = (username) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT p.username, p.content, p.like_count, p.created_at FROM users AS u JOIN posts AS p ON u.id = p.user_id WHERE u.username = ?`;
			conn.query(sql, username, (error, results) => {
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
	const today = new Date();
	const date =
		today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
	const time =
		today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
	const dateTime = date + ' ' + time;
	return new Promise((resolve, reject) => {
		try {
			let sql = `INSERT INTO followers (follower_id, followed_id, created_at) VALUES ('${followerId}', '${followedId}', '${dateTime}')`;
			conn.query(sql, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
