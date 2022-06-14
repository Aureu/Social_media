const conn = require('../database');
const express = require('express');

exports.addPost = (text, user_id, username) => {
	const today = new Date();
	const date =
		today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
	const time = today.getHours() + ':' + today.getMinutes();
	const dateTime = date + ' ' + time;
	let sql = `INSERT INTO posts(content, user_id, created_at) VALUES ('${text}','${user_id}', '${dateTime}')`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};

exports.viewPost = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM viewposts WHERE id = ? ORDER BY post_id DESC `;
			conn.query(sql, user_id, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.vPost = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM viewposts WHERE post_id = ? `;
			conn.query(sql, user_id, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.viewComment = (post_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM viewcomments AS v WHERE post_id = ?`;
			conn.query(sql, post_id, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.viewAll = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM viewposts AS p JOIN followers AS f ON p.id = f.followed_id WHERE f.follower_id = ?`;
			conn.query(sql, user_id, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

// Deleting post by id
exports.deletePost = (post_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = 'DELETE FROM posts WHERE post_id = ?';
			conn.query(sql, post_id, (err, results) => {
				if (err) throw err;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
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
		const time = today.getHours() + ':' + today.getMinutes();
		const dateTime = date + ' ' + time;
		let sql = `INSERT INTO comments (user_id, post_id, comment_body, created_at) VALUES ('${user_id}','${post_id}','${commentText}','${dateTime}')`;
		conn.query(sql, (err, results) => {
			if (err) throw err;
			conn.query(
				`UPDATE posts SET comments = comments + 1 WHERE post_id = ?`,
				post_id,
				(err2, results2) => {
					if (err2) throw err;
				}
			);
		});
	} catch (err) {
		reject(err);
	}
};

exports.like = (user_id, post_id) => {
	try {
		const today = new Date();
		const date =
			today.getDate() +
			'/' +
			(today.getMonth() + 1) +
			'/' +
			today.getFullYear();
		const time = today.getHours() + ':' + today.getMinutes();
		const dateTime = date + ' ' + time;
		let sql = `INSERT INTO likes (created_at, user_id, post_id) VALUES ('${dateTime}','${user_id}','${post_id}')`;
		conn.query(sql, (err, results) => {
			if (err) throw err;
			conn.query(
				`UPDATE posts SET likes = likes + 1 WHERE post_id = ?`,
				post_id,
				(err2, results2) => {
					if (err2) throw err;
				}
			);
		});
	} catch (err) {
		reject(err);
	}
};
