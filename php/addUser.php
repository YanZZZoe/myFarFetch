<?php
	
	header("content-type","text/html;charset=utf-8");
	
	//一、接收前端传来的数据
	$userName = $_POST["userName"];
	$userNumber = $_POST["userNumber"];
	$userMail = $_POST["userMail"];
	$userPass = $_POST["userPass"];


	$con = mysqli_connect("localhost","root","root","shoppingcenter");
	
	$sqlStr = "insert into vip(userName,userNumber,userMail,userPass)
              values('$userName','$userNumber','$userMail','$userPass')";

	
	$result = mysqli_query($con,$sqlStr);

	mysqli_close($con);

    if($result){
		echo "1";
	}else{
		echo "0";
	}

?>