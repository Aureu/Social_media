const conn = require('../database');

// Model pro zobrazení uživatelů do tabulky
exports.view = () => {
	let sql = 'SELECT * FROM users WHERE status = "active"';
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
// Model pro edit uživatele
exports.edit = () => {
	let sql = 'SELECT * FROM users WHERE user_id = ?';
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
// Model pro update dat v databázi
exports.update = (jmeno, prijmeni, prezdivka, email, heslo, status) => {
	let sql =
		'UPDATE users SET jmeno = ?, prijmeni = ?, prezdivka = ?, email = ? WHERE user_id = ?';
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
// Model pro zobrazení jednoho uživatele
exports.view_user = () => {
	let sql = 'SELECT * FROM users WHERE user_id = ?';
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
// Model pro vytvoření nového uživatele
exports.create = (jmeno, prijmeni, prezdivka, email, heslo, status) => {
	let sql = `INSERT INTO users(jmeno, prijmeni, prezdivka, email, heslo, status) VALUES ('${jmeno}','${prijmeni}', '${prezdivka}','${email}','${heslo}','${status}')`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
// Model pro smazání uživatele v DB
exports.delete = () => {
	let sql = 'UPDATE users SET status = ? WHERE user_id = ?';
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
