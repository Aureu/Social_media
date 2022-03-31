const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const conn = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: '',
	database: process.env.DATABASE,
});

conn.connect(function (err) {
	if (err) throw err;
	console.log('Databáze připojena');
});

module.exports = conn;
