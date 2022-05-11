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
