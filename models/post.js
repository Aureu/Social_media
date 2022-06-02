const conn = require('../database');
const express = require('express');

exports.addPost = (text, user_id, username) => {
	const today = new Date();
	const date =
		today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
	const time =
		today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
	const dateTime = date + ' ' + time;
	let sql = `INSERT INTO posts(content, user_id, username, created_at) VALUES ('${text}','${user_id}','${username}', '${dateTime}')`;
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
