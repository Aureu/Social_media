const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();

// Handlebars Middleware
const handlebars = exphbs.create({ extname: '.hbs' });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// Route pro složku public

app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

flash = require('express-flash');
app.use(
	session({
		secret: 'secretcookie',
		resave: true,
		saveUninitialized: true,
	})
);

// Získávání controllerů
const registerRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');

app.use('/register', registerRouter);
app.use('/login', loginRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Aplikace běží na portu  ${PORT}`));
