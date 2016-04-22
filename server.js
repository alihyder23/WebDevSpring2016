/**
 * Created by AliHyder on 1/17/16.
 */

var express         = require('express');
var bodyParser      = require('body-parser');
var multer          = require('multer');
var passport        = require('passport');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');

require('dotenv').config();

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
multer();

app.use(session({
    secret: process.env.OPENSHIFT_SECRET_TOKEN || process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/local';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

require('./public/assignment/server/app.js')(app, db, mongoose);
//require('./public/project/server/app.js')(app, db, mongoose);

app.listen(port, ipaddress);

//Please make note of these MongoDB credentials:
//    RockMongo User: admin
//RockMongo Password: GuyBCvcN7wdY
//URL: https://webdev2016-hyderali.rhcloud.com/rockmongo/

