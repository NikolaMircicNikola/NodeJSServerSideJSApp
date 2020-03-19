const user = require("../db/user.js");
const fs = require("fs");

var usersCount = 0;

module.exports = function(io,socket,dataHandler){
	console.log("User connected!");

	usersCount++;
	io.emit("usersCount",usersCount);

	socket.on("userLogin",(data)=>{
		console.log("Login request ...");
		let user = dataHandler.checkUser(data);
		if(user){
			io.emit("logedUser");
		}
	})

	socket.on("registered",()=>{
		console.log("New user registered...");
	})
	
	socket.on("dataPage",(data)=>{
		console.log("Data page request!");
		dataHandler.setPageSocket(socket);
		dataHandler.emitAll(data);
		console.log("Data recived: "+data);
	})

	socket.on("disconnect",()=>{
		usersCount--;
		io.emit("usersCount",usersCount);
	})
}
