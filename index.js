const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// Handlebars Middleware
const handlebars = exphbs.create({ extname: '.hbs' });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// Route pro složku public
const public = path.join(__dirname, 'public');
app.use(express.static('./public'));

// Route pro obrázky v public složce
app.use(express.static('./public/images'));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes pro stránky
app.use('/', require('./routes/pages'));
// routes pro uživatele
app.use('/auth', require('./routes/auth'));
// routes pro admina
app.use('/admin', require('./routes/admin-users'));

// Session middleware
app.use(
	session({
		secret: 'mysecretcookie',
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 60000 },
	})
);

// cookie parser middleware
app.use(cookieParser());

const PORT = 5000;

app.listen(PORT, () => console.log(`Aplikace běží na portu 5000 ${PORT}`));
