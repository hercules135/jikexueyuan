<?php
	require_once("db.php");
	//$link = mysqli_connect('localhost','root','1234','baidunews',8889);

	$type = $_GET["type"];
	if ($_GET["type"]=="-1"||$_GET["type"]==null) {
		$sql="select * from news";  
	}
	else{
		$sql="select * from news where src='{$type}'";  
	}

	
	mysqli_query($link,"SET NAMES utf8");
	$rs= mysqli_query($link,$sql);
	$result["data"] = array();
	while ($row =mysqli_fetch_assoc($rs)) {
		foreach ($row as $key => $value) {
			$value = addslashes( htmlspecialchars($value));
		}
		array_push($result["data"] ,$row);
	}
	//error_log(json_encode($result));

	echo json_encode($result);
?>