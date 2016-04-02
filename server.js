/**
 * Created by AliHyder on 1/17/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));


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




var newsModel = require('./public/project/server/models/news.model.js')();
require('./public/project/server/services/news.service.server.js')(app, newsModel);

var projectUserModel = require('./public/project/server/models/user.model.js')();
require('./public/project/server/services/user.service.server.js')(app, projectUserModel);

var teamModel = require('./public/project/server/models/team.model.js')();
require('./public/project/server/services/team.service.server.js')(app, teamModel);

var fixturesModel = require('./public/project/server/models/fixtures.model.js')();
require('./public/project/server/services/fixtures.service.server.js')(app, fixturesModel);

app.listen(port, ipaddress);

