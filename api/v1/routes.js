var express = require('express');
var sqlconnect = require ('./db_config');
var router = express.Router();


router.get('/', function(req, res){
 	
 	res.send("Hello i am TEMP");

 });


 router.get('/v1/usernames', function(req, res, next){
 	
 	
 	sqlconnect.query('SELECT * from users where name=?',["Dhiraj"], function (error, result, fields)
 	{
 		if(error){
 			res.send(JSON.stringify({"status":500, "error":error, "result":'none'}));
 		} else {
 			res.send(JSON.stringify({"status":200, "error":'none', "result":result}));
 		}
 	})
 });

  router.post('/v1/login', function(req, res, next){
 	let username = req.body.username;
 	let password = req.body.password;
 	
 	sqlconnect.query('SELECT count(*) as status from users where name=? and password = ?',[username, password], function (error, result, fields)
 	{
 		console.log(result[0].status);
 		if(error){
 			res.send(JSON.stringify({"status":500, "error":error, "result":'none'}));
 		} else if(result[0].status == 1) {
 			res.send(JSON.stringify({"status":200, "error":'none', "result":'login successfull'}));
 		}
 			else{
 				res.send(JSON.stringify({"status":404, "error":'Invalid username or password', "result":result}));
 			}
 	})
 });



 router.post('/', function(req, res){
 	res.send('Post routes on things'); 
 });

//Export the router
module.exports = router;