const conn = require('../database');
const express = require('express');

exports.addBio = (user_id, bio) => {
	//	let sql = `UPDATE user_information SET bio = '${bio}' WHERE user_id = '${user_id}'`;
	let sql = `UPDATE user_info SET bio = '${bio}' WHERE user_id = '${user_id}'`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};

exports.viewInfo = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM user_info WHERE user_id = '${user_id}'`;
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
			let sql = `SELECT * FROM user_avatars WHERE user_id = '${user_id}'`;
			conn.query(sql, user_id, (error, results) => {
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.editInfo = (user_id, bio, location, dateBirth) => {
	let sql = `INSERT INTO user_info(bio, location, date_birth, user_id) VALUES('${bio}','${location}','${dateBirth}', '${user_id}') ON DUPLICATE KEY UPDATE bio = '${bio}', location = "${location}", date_birth = "${dateBirth}"`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
