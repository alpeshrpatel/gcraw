// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 4005; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config/config')


var env = config.env;
var dbURL = config.mongodb.dbURL;

// configuration ===============================================================
//mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app);
require('./app/routes/todoRoute')(app);
require('./app/routes/entityRoute')(app);

// listen (start app with node server.js) ======================================




db = mongoose.createConnection(dbURL);
db.on('error', function (err) {
	console.error('There was a db connection error');
	return  console.error(err.message);
});

db.once('connected', function () {
    app.listen(port);
    console.log("App listening on port " + port);
    return console.log('Successfully connected to ' + dbURL);
});
db.once('disconnected', function () {
	return console.error('Successfully disconnected from ' + dbURL);
});


