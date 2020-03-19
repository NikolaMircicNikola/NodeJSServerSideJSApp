function dataTable(){
	let code = "";
	var users = [];
	let n;

	this.getCode=()=>{
		code="";
		n = users.length;
		for(let i=0;i<n;i++){
			code+="<tr id='"+users[i].username+"'>";
			code+="<td>"+users[i].username+"</td>";
			code+="<td>"+users[i].surname+"</td>";
			code+="<td>"+users[i].eMail+"</td>";
			code+="<td>"+users[i].password+"</td>";
			code+="<td>"+users[i].age+"</td>";
			if(users[i].active)
				code+="<td name='status'>Online</td>";
			else
				code+="<td name='status'>Offline</td>";
			code+="</tr>";
		}
		return code;
	}

	this.clearTable=()=>{
		users.length = 0;
	}

	this.addUser=(user)=>{
		var newUser = true;
		for(let i=0;i<users.length;i++){
			if(users[i].username==user.username){
				newUser = false;
			}
		}
		if(newUser){
			users[users.length]=user;
		}
	}
}

var socket = io();

dt = new dataTable();

socket.emit("dataPage","data");

socket.on('data',function(data){
	dt.addUser(data);
	updateTable();
})

socket.on("usersCount",(data)=>{
	document.getElementById("uc").innerHTML=data;
});

function updateTable(){
	document.getElementById("data_table").innerHTML="<tr><td>Name</td>"+
														"<td>Surname</td>"+
														"<td>E-Mail</td>"+
														"<td>Password</td>"+
														"<td>Age</td>"+
														"<td>Status</td></tr>";
	$("#data_table").append(dt.getCode());
	
};

