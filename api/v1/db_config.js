//Getting the DB config from the JASON file
const fs = require('fs');
const mysql = require ('mysql');

const config = './db_config.json'
var parsed = JSON.parse(fs.readFileSync(config,'UTF-8'));

var connection = mysql.createConnection({
	host: parsed.host,
	user: parsed.user,
	password: parsed.password,
	database: parsed.database
	});

// console.log(db_config.storageConfig.host);
// console.log(connection)

connection.connect(function(err) {
	console.log(err);
  if (err) 
  	throw err
  else
  console.log('You are now connected!!...')
})

module.exports = connection;