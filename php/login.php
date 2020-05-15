<?php
	header("content-type","text/html;charset=utf-8");
	
	$userNumber = $_POST["userNumber"];
	$userPass = $_POST["userPass"];
	
	$conn = mysqli_connect("localhost","root","root","shoppingcenter");
	 
	$result = mysqli_query($conn,"select * from vip where userNumber='{$userNumber}' and userpass='{$userPass}'");
 
    mysqli_close($conn);
 
    $arr = mysqli_fetch_all($result, MYSQL_ASSOC);
  
    if(count($arr)==1){
        echo '{"status":"1"}';
    }else{
        echo '{"status":"0"}'; 
    }
?>