<?php

	require_once("db.php");

	foreach ($_POST as $key => $value) {
		$_POST["$key"]=addslashes( htmlspecialchars($value));
		//addslashes 转义双引号
		//htmlspecialchars 把预定义的字符转换为 HTML 实体
	}

	$id=$_POST["id"];
	$sql="delete from news where id = '{$id}'"; 
	error_log($sql);
	mysqli_query($link,"SET NAMES utf8");
	$rs= mysqli_query($link,$sql);
	if ($rs) {
		echo true;
	}
	else{
		echo false;
	}
	

	
?>