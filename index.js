const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

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

// Route pro složku public
app.use(express.static(path.join(__dirname, 'public')));

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

/* app.get('/user', function (req, res) {
	res.render('profile/user', {
		style: 'user.css',
	});
}); */
const PORT = 5000;

app.listen(PORT, () => console.log(`Aplikace běží na portu  ${PORT}`));
