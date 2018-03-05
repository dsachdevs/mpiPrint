//Getting the DB config from the JASON file
const fs = require('fs');
const config = './config.json'
var parsed = JSON.parse(fs.readFileSync(config,'UTF-8'));

//export the JSON file:
exports.storageConfig=parsed;