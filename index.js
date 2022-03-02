const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const flash = require('connect-flash');

const app = express();

// Získávání controllerů
const registerRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/userController');

// Handlebars Middleware
const handlebars = exphbs.create({ extname: '.hbs' });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// Route pro složku public

app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session middleware
app.use(
	session({
		secret: process.env.SECRET_COOKIE,
		resave: true,
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
	if (req.isAuthenticated())
		// <-- typo here
		return next();
	res.redirect('/login');
}
// Routes pro register a login (Používají controller login a register)
// Předělat na route auth
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/admin', userRouter);
// Test route
app.get('/session', isLoggedIn, function (req, res) {
	res.render('index', {
		user: req.user, // get the user out of session and pass to template
		style: 'index.css',
	});
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Aplikace běží na portu  ${PORT}`));
