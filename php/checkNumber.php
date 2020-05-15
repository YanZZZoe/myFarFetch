<?php
	header("content-type","text/html;charset=utf-8");

	$userNumber = $_GET["userNumber"];
	
	$conn = mysqli_connect("localhost","root","root","shoppingcenter");
	
	$sqlStr="select * from vip where userNumber='{$userNumber}'";
	   
	$result=mysqli_query($conn,$sqlStr);
	 
	mysqli_close($conn);
	
	$arr = mysqli_fetch_all($result, MYSQL_ASSOC);
  
    if(count($arr)==1){
        echo "1";  
    }else{
        echo "0"; 
    }
?>