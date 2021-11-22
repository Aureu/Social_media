const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const app = express();

// Handlebar Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Route for public folder
const public = path.join(__dirname, 'public');
app.use(express.static('./public'));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

// Session middleware
app.use(
	sessions({
		secret: 'thisismysecrteadfsgddfgd',
		saveUninitialized: true,
		cookie: { maxAge: oneDay },
		resave: false,
	})
);

// cookie parser middleware
app.use(cookieParser());

const PORT = 5000;

app.listen(PORT, () => console.log(`This app is listening on port ${PORT}`));
