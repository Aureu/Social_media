const conn = require('../database');

// Sql na vložení nového uživatele do DB
exports.register = (jmeno, prijmeni, prezdivka, heslo, email, status) => {
	let sql = `INSERT INTO users(firstname, lastname, username, hashedPassword, email, status, createdAt) VALUES ('${jmeno}','${prijmeni}', '${prezdivka}','${heslo}','${email}','${status}', NOW())`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
