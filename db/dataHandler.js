function dataHandler(fs,io,usersPath){
	var dataPageReady = false;
	var dataPageSocket = null;

	var activeUsers=[];

	this.emitAll=()=>{
		if(!dataPageReady)
			return;
		fs.readdir(usersPath,(err,users)=>{
			let user,userData;
			for(let i=0;i<users.length;i++){
				userData = fs.readFileSync(usersPath+"/"+users[i]);
				user = JSON.parse(userData);
				io.emit('data',user);
			}
		})
		console.log("All data sent!");
	}

	this.loadNewUser=(newUser)=>{
		if(invalidName(newUser.name)){
			return false;
		}
		fs.writeFileSync(usersPath+"/"+newUser.username+".json",JSON.stringify(newUser),()=>{
			console.log("Added new user to : "+usersPath);
		})
		return true;
	}

	this.checkUser=(data)=>{
		var tested = false;
		let userFinded = null;
		let user,userData;
		console.log("Started looking for: "+data.username+" "+data.password);
		fs.readdirSync(usersPath).forEach((file)=>{
			userData = fs.readFileSync(usersPath+"/"+file);
			user = JSON.parse(userData);
			console.log("Testing for : "+user.username +" "+user.password);
			if(user.username==data.username && user.password==data.password){
				console.log("Loged with : "+data.username+" "+user.password);
				tested = true;
				userFinded = user;
				return user;
			}
		})
		console.log("Testing result is :" + tested);
		return userFinded;
	}

	this.setPageSocket=(pageSocket)=>{
		dataPageSocket = pageSocket;
		dataPageReady=true;
	}

	this.getUserByName=(name)=>{
		let user,userData;
		fs.readdirSync(usersPath).forEach((file)=>{
			userData = fs.readFileSync(usersPath+"/"+file);
			user = JSON.parse(userData);
			console.log("Testing for : "+user.username +" "+user.password);
			if(user.username==name){
				return user;
			}
		})
		return null;
	}

	function invalidName(name){
		var valid= false;
		let user,userData;
		fs.readdirSync(usersPath).forEach((file)=>{
			userData = fs.readFileSync(usersPath+"/"+file);
			user = JSON.parse(userData);
			if(user.username==name){
				valid = true;
			}
		})
		console.log("Testing result is :" + valid);
		return valid;
	}
}

module.exports = dataHandler;