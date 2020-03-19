const bodyParser = require("body-parser");
const user = require("../db/user.js");
const fs = require("fs");

module.exports=(router,dataHandler,path)=>{
	router.get('/',(req,res)=>{
		res.sendFile(path+'/client/index.html');
	});

	router.get('/data',(req,res)=>{
		res.sendFile(path+"/client/data.html");
	})

	router.post('/login',(req,res)=>{
		res.redirect('/data');
	})

	router.post('/register',(req,res)=>{
		var newUser = new user();
		newUser.username = req.body.name;
		newUser.surname = req.body.surname;
		newUser.eMail = req.body.eMail;
		newUser.password = req.body.password;
		newUser.age = req.body.age;
		newUser.active = false;
		if(dataHandler.loadNewUser(newUser))
			res.redirect('/data');
	});
};