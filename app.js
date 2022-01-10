const express = require('express');

const logger = require('morgan');

const Mongoose = require('mongoose');

const bodyParser = require('body-parser');

const session = require('express-session');

Mongoose.connect('mongodb://localhost/apiproject', () => {
    console.log('connected to mongoDB database');
});

const app = express();
//sessions setup 
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
//routes

const users = require('./routes/users');
const reservations = require('./routes/reservations');
const auth = require('./routes/auth');
const roles = require('./routes/roles');
const pensions = require('./routes/pension');


//middleware

app.use(logger('dev'));
app.use(bodyParser.json());

//routes

app.use('/users', users);
app.use('/reservations', reservations);
app.use('/auth', auth);
app.use('/role', roles);
app.use('/pension', pensions);



//catche 404 error and forward theme to the error handler

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler function

app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    //respond to client

    res.status(status).json({
        error: {
            message: error.message
        }
    });

    //respond to ourselves

    console.error(err);
});

//start the server

const port = app.get('port') || 3000;

app.listen(port, () => {
    console.log(`server in listening on port ${port}`);
});