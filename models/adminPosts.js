const conn = require('../database');
const express = require('express');

// Model pro zobrazení uživatelů do tabulky
exports.getPosts = () => {
	return new Promise((resolve, reject) => {
		try {
			let sql = 'SELECT * FROM posts';
			conn.query(sql, (err, results) => {
				if (err) throw err;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
// Mazání uživatele
exports.deletePost = (ID) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = 'DELETE FROM posts WHERE id = ?';
			conn.query(sql, ID, (err, results) => {
				if (err) throw err;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
