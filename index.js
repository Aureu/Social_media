const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const conn = require('./database');

const app = express();

// Získávání controllerů
const registerRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/userController');
const profileRouter = require('./controllers/profileController');

// Handlebars Middleware
const handlebars = exphbs.create({ extname: '.hbs' });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

/* // Multer Middleware
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/Avatars');
	},

	filename: (req, file, cb) => {
		console.log(file);
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

// Route pro uploadovani uzivatelskych avataru
app.post('/upload', upload.single('image'), (req, res) => {
	if (!req.file) {
		console.log('No file upload');
	} else {
		console.log(req.file.filename);
		var imgsrc = req.file.filename;
		var insertData = 'INSERT INTO avatars(user_id, file_src)VALUES(?)';
		conn.query(insertData, [imgsrc], (err, result) => {
			if (err) throw err;
			console.log('file uploaded');
		});
	}
}); */

// Route pro složku public
app.use(express.static(path.resolve('./public')));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie parser middleware
app.use(cookieParser());

// Session middleware
const oneDay = 1000 * 60 * 60 * 24;
app.use(
	session({
		secret: process.env.SECRET_COOKIE,
		resave: false,
		cookie: { maxAge: oneDay },
		saveUninitialized: true,
	})
);
// Flash middleware
app.use(flash());
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Funkce na zjištění jestli je uživatel již přihlášen
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
}
// Routes
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/admin', userRouter);
app.use('/profile', isLoggedIn, profileRouter);
app.get('/logout', (req, res) => {
	req.session.destroy(function (err) {
		res.redirect('/login'); //Inside a callback… bulletproof!
	});
});

// search function
app.post('/search', function (req, res) {
	var str = {
		stringPart: req.body.typeahead,
	};

	conn.query(
		'SELECT username FROM users WHERE username LIKE "%' + str.stringPart + '%"',
		function (err, rows, fields) {
			if (err) throw err;
			var data = [];
			for (i = 0; i < rows.length; i++) {
				data.push(rows[i].username);
			}
			res.send(JSON.stringify(data));
		}
	);
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Aplikace běží na portu  ${PORT}`));
