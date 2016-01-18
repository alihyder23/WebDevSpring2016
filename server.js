/**
 * Created by AliHyder on 1/17/16.
 */
var express = require('express');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/ozil', function(req, res){
    res.send('"Ya Gunners Ya" - Mesut Ozil');
});
app.listen(port, ipaddress);