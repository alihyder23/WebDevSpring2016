/**
 * Created by AliHyder on 1/17/16.
 */
var express = require('express');
var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public/'));
app.use(express.bodyParser());

var userModel = require('./public/assignment/server/models/user.model.js')();
require('./public/assignment/server/services/user.service.server.js')(app, userModel);

var formModel = require('./public/assignment/server/models/form.model.js')();
require('./public/assignment/server/services/form.service.server.js')(app, formModel);

app.listen(port, ipaddress);