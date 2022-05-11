const mysql = require('mysql');
const conn = require('../database');
const express = require('express');
const router = require('./register');
const postModel = require('../models/post');

router.post('/add-post', (req, res) => {
	const text = req.body.postMessage;
	user_id = req.user.id;
	username = req.user.username;
	postModel.addPost(text, user_id, username);
	res.status(204).send();
});

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

module.exports = router;
