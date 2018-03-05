var express = require('express');
var router = express.Router();
 router.get('v1/usernames', function(req, res, next){
 	
 	res.locals.connection.query('SELECT * from users', function (error, result, fields)
 	{
 		if(error){
 			res.send(JSON.stringify({"status":500, "error":error, "result":none}));
 		} else {
 			res.send(JSON.stringify({"status":200, "error":none, "result":result}));
 		}
 	})
 });



 router.post('/', function(req, res){
 	res.send('Post routes on things'); 
 });

//Export the router
module.exports = router;