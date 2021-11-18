const express = require('express');
const router = express.Router();
const conn = require('../database');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
	// Data z formu
	const fName = req.body.fName;
	const lName = req.body.lName;
	const email = req.body.email;
	const hashedPassword = await bcrypt.hash(req.body.pass, 10);

	// SQL příkaz do databáze
	const sql =
		"INSERT INTO users (`firstName`, `lastName`, `email`, `password`) VALUES ('" +
		fName +
		"', '" +
		lName +
		"', '" +
		email +
		"', '" +
		hashedPassword +
		"')";
	conn.query(sql, (err) => {
		if (err) throw err;
		console.log('data saved');
	});
	res.redirect('/');
};
