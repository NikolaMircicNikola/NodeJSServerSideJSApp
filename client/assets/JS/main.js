var socket = io();
var userLoged = 0;

socket.on("usersCount",(data)=>{
	document.getElementById("uc").innerHTML=data;
});

socket.on("logedUser",()=>{
	console.log("Loged....");
	socket.emit("profile",$("#login input[name='name']").val());
	$("#login").submit();
})

$("#showPassReg").click((e)=>{
	e.preventDefault();
	if($("#register input[name='password']").attr("type")=="password"){
		$("#register input[name='password']").attr("type","text");
		$("#showPassReg").html("Hide password");
	}else{
		$("#register input[name='password']").attr("type","password");
		$("#showPassReg").html("See password");
	}
	
})

$("#showPassLog").click((e)=>{
	e.preventDefault();
	if($("#login input[name='password']").attr("type")=="password"){
		$("#login input[name='password']").attr("type","text");
		$("#showPassLog").html("Hide password");
	}else{
		$("#login input[name='password']").attr("type","password");
		$("#showPassLog").html("See password");
	}
	
})

$("#loginbtn").click((e)=>{
	e.preventDefault();
	if($("#login").css("display")=="block"){
		checkValueLogin();
	}else{
		$("#register").hide();
		$("#login").show();
	}
})

$("#registerbtn").click((e)=>{
	e.preventDefault();
	if($("#register").css("display")=="block"){
		socket.emit("registered");
		$("#register").submit();
	}else{
		$("#login").hide();
		$("#register").show();
	}
})

function checkValueLogin(){
	let name = $("#login input[name='name']").val();
	let pass = $("#login input[name='password']").val();
	if(name != "" && pass != ""){
		socket.emit("userLogin",{username : name,
								password : pass});
	}
}

function printErrMsg(elemame){
	$("input[name='"+elemame+"']").css("border","3px solid red");
}