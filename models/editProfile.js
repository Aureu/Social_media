const conn = require('../database');
const express = require('express');

exports.editProfile = (
	firstname,
	lastname,
	username,
	hashedPassword,
	email
) => {
	let sql = `UPDATE users SET firstname = '${firstname}', lastname = '${lastname}', username = '${username}', email = '${email}', hashedPassword = '${hashedPassword}' WHERE id = '${user_id}'`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};

exports.editInfo = (user_id, bio, location, dateBirth) => {
	let sql = `INSERT INTO user_info(bio, location, date_birth, user_id) VALUES('${bio}','${location}','${dateBirth}', '${user_id}') ON DUPLICATE KEY UPDATE bio = '${bio}', location = "${location}", date_birth = "${dateBirth}"`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
