const conn = require('../database');
const express = require('express');

exports.addBio = (user_id, bio) => {
	//	let sql = `UPDATE user_information SET bio = '${bio}' WHERE user_id = '${user_id}'`;
	let sql = `UPDATE user_information SET bio = '${bio}' WHERE user_id = '${user_id}'`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};

exports.viewInfo = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM user_information WHERE user_id = '${user_id}'`;
			conn.query(sql, (err, results) => {
				if (err) throw err;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.viewAvatar = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM avatars WHERE user_id = '${user_id}'`;
			conn.query(sql, user_id, (error, results) => {
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
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

exports.editProfile = (user_id, bio, location, dateBirth) => {
	let sql = `UPDATE user_information SET bio = '${bio}', location = "${location}", date_birth = "${dateBirth}" WHERE user_id = '${user_id}'`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
