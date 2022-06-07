const conn = require('../database');
const express = require('express');

exports.editProfile = (
	firstname,
	lastname,
	username,
	email,
	hashedPassword,
	id
) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `UPDATE users SET firstname = '${firstname}', lastname = '${lastname}', username = '${username}', email = '${email}', hashedPassword = '${hashedPassword}' WHERE id = ?`;
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

exports.editInfo = (user_id, bio, location, dateBirth) => {
	let sql = `INSERT INTO user_info(bio, location, date_birth, user_id) VALUES('${bio}','${location}','${dateBirth}', '${user_id}') ON DUPLICATE KEY UPDATE bio = '${bio}', location = "${location}", date_birth = "${dateBirth}"`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
