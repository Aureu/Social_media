const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Proměnná na čas (Day) pro dobu uložení cookie v sessions
const oneDay = 1000 * 60 * 60 * 24;

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

// Session middleware
app.use(
	session({
		secret: 'thisismysecrteadfsgddfgd',
		saveUninitialized: true,
		maxAge: oneDay,
		resave: false,
	})
);

// cookie parser middleware
app.use(cookieParser());

const PORT = 5000;

app.listen(PORT, () => console.log(`This app is listening on port ${PORT}`));
