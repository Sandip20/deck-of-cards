var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var logger = require('morgan');
var passport = require('passport')
var validator = require('express-validator')
var session = require('express-session');
var mongostore = require('connect-mongo')(session);
var app = express();
var mongoose = require('mongoose');
require('./server/mongo/connection');
require('./config/passport');
app.use(session({
    secret: 'mysupersecretkey',
    resave: false,
    saveUninitialized: false,
    store: new mongostore({
        mongooseConnection: mongoose.connection,
    }),
    cookie: { maxAge: 180 * 60 * 1000 }

}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(validator());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/deckofcards')));
app.use('/backend/images',express.static(path.join(__dirname, '/backend/images')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('')
    next();
});
app.use('/api/v1/auth',require('./server/routes/auth'))
app.use('/api/v1/users', require('./server/routes/users'));
app.use('/api/v1/cards', require('./server/routes/cards'));

app.use((req, res, next) => {
    res.sendfile(path.join(__dirname, 'dist/deckofcards', 'index.html'));

})
//app.listen(3000);
app.listen(process.env.PORT || 3000);
//module.exports=app;