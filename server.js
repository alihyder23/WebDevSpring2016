/**
 * Created by AliHyder on 1/17/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var userModel = require('./public/assignment/server/models/user.model.js')();
require('./public/assignment/server/services/user.service.server.js')(app, userModel);

var formModel = require('./public/assignment/server/models/form.model.js')();
require('./public/assignment/server/services/form.service.server.js')(app, formModel);
require('./public/assignment/server/services/fields.service.server.js')(app, formModel);

var newsModel = require('./public/project/server/models/news.model.js')();
require('./public/project/server/services/news.service.server.js')(app, newsModel);

var projectUserModel = require('./public/project/server/models/user.model.js')();
require('./public/project/server/services/user.service.server.js')(app, projectUserModel);

var teamModel = require('./public/project/server/models/team.model.js')();
require('./public/project/server/services/team.service.server.js')(app, teamModel);

var fixturesModel = require('./public/project/server/models/fixtures.model.js')();
require('./public/project/server/services/fixtures.service.server.js')(app, fixturesModel);

app.listen(port, ipaddress);

