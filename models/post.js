const conn = require('../database');
const express = require('express');

exports.addPost = (text, user_id, username) => {
	let sql = `INSERT INTO posts(content, user_id, username) VALUES ('${text}','${user_id}','${username}')`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};

exports.viewPost = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM posts WHERE user_id = '${user_id}'`;
			conn.query(sql, user_id, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
