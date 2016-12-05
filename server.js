var express = require('express');
var app = express();
var multer        = require('multer');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

multer();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);
require ("./assignment/app.js")(app);

app.set('ipaddress', (process.env.IP));
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), app.get('ipaddress'));
