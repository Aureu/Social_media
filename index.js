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
const postRouter = require('./controllers/postController');
const avatarRouter = require('./controllers/userAvatarController');
const editProfileRouter = require('./controllers/editProfileController');

// Handlebars Middleware
const handlebars = exphbs.create({ extname: '.hbs' });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

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
app.use('/admin', isLoggedIn, userRouter);
app.use('/', isLoggedIn, profileRouter);
app.use('/posts', isLoggedIn, postRouter);
app.use('/avatar', isLoggedIn, avatarRouter);
app.use('/settings', isLoggedIn, editProfileRouter);
app.get('/logout', (req, res) => {
	req.session.destroy(function (err) {
		res.redirect('/login');
	});
});

// search function
app.post('/search', function (req, res) {
	var str = {
		stringPart: req.body.typeahead,
	};

	conn.query(
		// Vyhleda to data z db
		'SELECT username FROM users WHERE username LIKE "%' + str.stringPart + '%"',
		function (err, rows, fields) {
			if (err) throw err;
			var data = [];
			for (i = 0; i < rows.length; i++) {
				data.push(rows[i].username);
			}
			// Dodelat zobrazovani
			res.send(JSON.stringify(data));
		}
	);
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Aplikace běží na portu  ${PORT}`));
