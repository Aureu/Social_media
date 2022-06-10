const conn = require('../database');
const express = require('express');

exports.editProfile = (firstname, lastname, username, email, id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `UPDATE users SET firstname = '${firstname}', lastname = '${lastname}', username = '${username}', email = '${email}' WHERE id = ?`;
			conn.query(sql, id, (err, results) => {
				if (err) throw err;
				resolve(results);
				console.log('id = ' + id);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.viewDistricts = () => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM districts`;
			conn.query(sql, (err, results) => {
				if (err) throw err;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.editPassword = (id, hashedPassword) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `UPDATE users SET hashedPassword = '${hashedPassword}' WHERE id = ?`;
			conn.query(sql, id, (err, results) => {
				if (err) throw err;
				resolve(results);
				console.log('id = ' + id);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.editInfo = (user_id, bio, district_id, dateBirth) => {
	let sql = `INSERT INTO user_info(bio, district_id, date_birth, user_id) VALUES('${bio}','${district_id}','${dateBirth}', '${user_id}') ON DUPLICATE KEY UPDATE bio = '${bio}', district_id = "${district_id}", date_birth = "${dateBirth}"`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
