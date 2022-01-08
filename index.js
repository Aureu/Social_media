const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Handlebar Middleware
const handlebars = exphbs.create({ extname: '.hbs' });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// Route for public folder
const public = path.join(__dirname, 'public');
app.use(express.static('./public'));

// Route for images in the public folder
app.use(express.static('./public/images'));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
// routes for admin
app.use('/admin', require('./routes/users'));

const PORT = 5000;

app.listen(PORT, () => console.log(`This app is listening on port ${PORT}`));
