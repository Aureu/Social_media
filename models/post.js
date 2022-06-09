const conn = require('../database');
const express = require('express');
const { resolve } = require('path');

exports.addPost = (text, user_id, username) => {
	const today = new Date();
	const date =
		today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
	const time = today.getHours() + ':' + today.getMinutes();
	const dateTime = date + ' ' + time;
	let sql = `INSERT INTO posts(content, user_id, username, created_at) VALUES ('${text}','${user_id}','${username}', '${dateTime}')`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};

exports.viewPost = (user_id, post_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM viewposts WHERE id = '${user_id}' `;
			conn.query(sql, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.viewComments = (post_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM viewcomments WHERE post_id = ?`;
			conn.query(sql, post_id, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.viewAll = () => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM viewposts`;
			conn.query(sql, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

// Deleting post by id
exports.deletePost = (ID) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = 'DELETE FROM posts WHERE post_id = ?';
			conn.query(sql, ID, (err, results) => {
				if (err) throw err;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.likes = (action, user_id, post_id) => {
	try {
		const today = new Date();
		const date =
			today.getDate() +
			'/' +
			(today.getMonth() + 1) +
			'/' +
			today.getFullYear();
		const time =
			today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
		const dateTime = date + ' ' + time;
		let sql = `INSERT INTO likes (status, created_at,  user_id, post_id) VALUES ('${action}','${dateTime}', '${user_id}','${post_id}') ON DUPLICATE KEY UPDATE status = '${action}', updated_at = '${dateTime}'`;
		conn.query(sql, (err, results) => {
			if (err) throw err;
		});
	} catch (err) {
		reject(err);
	}
};

exports.likeCount = (post_id, counter) => {
	try {
		let sql = `UPDATE posts SET like_count = '${counter}' WHERE id = '${post_id}'`;
		conn.query(sql, (err, results) => {
			if (err) throw err;
		});
	} catch (err) {
		reject(err);
	}
};

exports.comment = (user_id, post_id, commentText) => {
	try {
		const today = new Date();
		const date =
			today.getDate() +
			'/' +
			(today.getMonth() + 1) +
			'/' +
			today.getFullYear();
		const time =
			today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
		const dateTime = date + ' ' + time;
		let sql = `INSERT INTO comments (user_id, post_id, body, created_at) VALUES ('${user_id}','${post_id}','${commentText}','${dateTime}')`;
		conn.query(sql, (err, results) => {
			if (err) throw err;
		});
	} catch (err) {
		reject(err);
	}
};
