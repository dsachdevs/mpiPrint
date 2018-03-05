const express = require('express');
const mysql = require ('mysql');
const parser = require('body-parser');
const db_config = require('./db_config.js');
var routes = require('./routes.js');

var connection = mysql.createConnection({
	host: db_config.storageConfig.host,
	user: db_config.storageConfig.user,
	password: db_config.storageConfig.password,
	database: db_config.storageConfig.database
	});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

var app = express();
app.use(parser.json());

app.use('/api', routes);

app.listen(3000);


