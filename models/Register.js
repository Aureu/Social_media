const conn = require('../database');

// Sql na vložení nového uživatele do DB
exports.register = (jmeno, prijmeni, prezdivka, email, heslo, status) => {
	let sql = `INSERT INTO users(jmeno, prijmeni, prezdivka, email, heslo, status, created_at) VALUES ('${jmeno}','${prijmeni}', '${prezdivka}','${email}','${heslo}','${status}', NOW())`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
