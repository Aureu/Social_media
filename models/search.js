const conn = require('../database');
const express = require('express');

exports.search = (str) => {
	return new Promise((resolve, reject) => {
		try {
			console.log(str);
			let sql = `SELECT * FROM viewuser WHERE username LIKE '${str}%'`;
			conn.query(sql, (err, results) => {
				if (err) throw err;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
