const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require("socket.io")(http,{});

const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");

const IP = "192.168.1.8";
const PORT = process.env.PORT || 80;
const START_MSG = "Server started with NODEMON!";

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname)));
app.use("/assets",express.static(path.join(__dirname,"/client/assets")));
app.use(bodyParser.urlencoded({ extended: false }));

const dataHandler = require("./db/dataHandler.js");
var handler = new dataHandler(fs,io,__dirname+"/db/users");
var listener = require("./routing/socketListener.js");
require("./routing/router.js")(app,handler,__dirname);

io.sockets.on("connection",(socket)=>{
	listener(io,socket,handler);
	socket.on("disconnect",()=>{
		console.log("[Server]: User disconnected!");
	})
})

http.listen(PORT,process.env.OPENSHIFT_NODEJS_IP || process.env.IP || IP,()=>{
	console.log(START_MSG);
	console.log("Opt 1: "+ process.env.OPENSHIFT_NODEJS_IP);
	console.log("Opt 2: "+ process.env.IP);
	console.log("Opt 2: "+ IP);
});


