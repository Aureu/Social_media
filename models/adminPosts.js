const conn = require('../database');
const express = require('express');

// Model for getting posts into the table
exports.getPosts = () => {
	return new Promise((resolve, reject) => {
		try {
			let sql = 'SELECT * FROM viewPosts';
			conn.query(sql, (err, results) => {
				if (err) throw err;
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
			let sql = 'SELECT * FROM viewcomments';
			conn.query(sql, post_id, (err, results) => {
				if (err) throw err;
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
			let sql = 'DELETE FROM viewposts WHERE post_id = ?';
			conn.query(sql, ID, (err, results) => {
				if (err) throw err;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
