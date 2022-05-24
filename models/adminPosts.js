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
