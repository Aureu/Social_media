const conn = require('../database');
const express = require('express');

// Model pro zobrazení uživatelů do tabulky
exports.getUsers = () => {
	return new Promise((resolve, reject) => {
		try {
			let sql = 'SELECT * FROM users';
			conn.query(sql, (err, results) => {
				if (err) throw err;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
// Získání jednoho uživatele
exports.getUser = (ID) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM users WHERE id = ?`;
			conn.query(sql, ID, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

// Editování uživatele - zobrazení formu podle ID
exports.editUser = (ID) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = 'SELECT * FROM users WHERE id = ?';
			conn.query(sql, ID, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

// Úprava dat uživatele
exports.updateUser = (updateUser, ID, callback) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = 'UPDATE users SET ? WHERE id = ?';
			conn.query(sql, [updateUser, ID], (err) => {
				if (err) throw err;
				return callback();
			});
		} catch (err) {
			reject(err);
		}
	});
};

// Přidávání uživatele
exports.addUser = (jmeno, prijmeni, prezdivka, email, heslo, status) => {
	let sql = `INSERT INTO users(jmeno, prijmeni, prezdivka, email, heslo, status) VALUES ('${jmeno}','${prijmeni}', '${prezdivka}','${email}','${heslo}','${status}')`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};

// Mazání uživatele
exports.deleteUser = (ID) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = 'DELETE FROM users WHERE id = ?';
			conn.query(sql, ID, (err, results) => {
				if (err) throw err;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
