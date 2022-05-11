const conn = require('../database');

// Sql na vložení nového uživatele do DB
exports.register = (jmeno, prijmeni, prezdivka, heslo, email) => {
	let sql = `INSERT INTO users(firstname, lastname, username, email, hashedPassword, created_at, role) VALUES ('${jmeno}','${prijmeni}', '${prezdivka}','${email}','${heslo}', NOW(), 'user')`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
