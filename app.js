var appPort = 3000;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mysql = require('mysql');
var Route = require('./route');


var connection = mysql.createConnection({
	host: 'host',
	user: 'user',
	password: 'password',
	database: 'database'
});
var router = new Route(app, connection); 
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('template'));

app.get('/', function (req, res, next) {
	res.sendFile('index.html');
});

router.init(connection);

app.listen(appPort, function() {
	console.log('Server start');
});