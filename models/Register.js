const conn = require('../database');

// Sql na vložení nového uživatele do DB
exports.register = (jmeno, prijmeni, prezdivka, heslo, email) => {
	let sql = `INSERT INTO users(firstname, lastname, username, email, hashedPassword, created_at, isAdmin) VALUES ('${jmeno}','${prijmeni}', '${prezdivka}','${email}','${heslo}', NOW(), '0')`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
