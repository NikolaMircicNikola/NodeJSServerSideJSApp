const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const router = express.Router();

const ip = "192.168.1.11";
const port = process.env.PORT || 80;

app.get('/',(req, res)=>{
	if(req.url === "/favicon.ico"){
		return;
	}
	res.sendFile(path.join(__dirname + "/index.html"));
	console.log("Connected!!");
});

app.use(morgan('dev'));
app.use('/CSS',express.static(path.join(__dirname + "/CSS")));
app.use('/',router);
app.listen(port,ip,()=>{
	console.log("Listenning...");
});