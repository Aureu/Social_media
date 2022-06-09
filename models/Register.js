const conn = require('../database');

// Sql na vložení nového uživatele do DB
exports.register = (jmeno, prijmeni, prezdivka, heslo, email) => {
	const today = new Date();
	const date =
		today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
	const time = today.getHours() + ':' + today.getMinutes();
	const dateTime = date + ' ' + time;
	/* 	let sql = `INSERT INTO users(firstname, lastname, username, email, hashedPassword, created_at, isAdmin) VALUES ('${jmeno}','${prijmeni}', '${prezdivka}','${email}','${heslo}', '${dateTime}', '0')`;
	 */
	let sql = ` BEGIN;
	INSERT INTO users(firstname, lastname, username, email, hashedPassword, created_at, isAdmin) VALUES ('${jmeno}','${prijmeni}', '${prezdivka}','${email}','${heslo}', '${dateTime}', '0');
	INSERT INTO user_avatars(user_id, file_src) VALUES (LAST_INSERT_ID(), "avatar.jpg");
	COMMIT;`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
