<?php

	require_once("db.php");

	foreach ($_POST as $key => $value) {
		$_POST["$key"]=addslashes( htmlspecialchars($value));
		//addslashes 转义双引号
		//htmlspecialchars 把预定义的字符转换为 HTML 实体
	}

	//title=1&picturesrc=2&src=3&time=2016-12-03
	$title = $_POST["title"];
	$picturesrc = $_POST["picturesrc"];
	$src = $_POST["src"];
	$time = $_POST["time"];

	$sql="INSERT INTO `news` (`title`,`picturesrc`,`src`,`time`) VALUES ('{$title}', '{$picturesrc}','{$src}','{$time}')";  
	//error_log($sql);
	mysqli_query($link,"SET NAMES utf8");
	$rs= mysqli_query($link,$sql);
	if ($rs) {
		echo true;
	}
	else{
		echo false;
	}
	
?>