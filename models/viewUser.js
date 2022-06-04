const conn = require('../database');
const mysql = require('mysql');
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
