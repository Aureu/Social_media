const mysql = require('mysql');

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'social_media',
});

conn.connect(function (err) {
	if (err) throw err;
	console.log('Database connected!');
});

module.exports = conn;
