<?php

	require_once("db.php");
	error_log("进入上传");

	// $upfile =  $_FILES['pic'];
	// error_log("文件名"+$upfile['tmp_name']);

	// if(is_uploaded_file($upfile['tmp_name']) && $upfile['size']>0){
	//     $filepath = 'img/'.$upfile['name'];
	//     $path = str_replace("/php/upload.php", "", $_SERVER['DOCUMENT_ROOT'].$_SERVER['PHP_SELF']."/".$filepath);
	//     error_log($path);
	//     move_uploaded_file($upfile['tmp_name'],$path); 
	//     //PHP_SELF
	//     echo json_encode($filepath);
	// }
	

if ($_FILES["pic"]["error"] --> 0)
{
echo "Error: " . $_FILES["pic"]["error"] . "<br>";
}
else
{
echo "Upload: " . $_FILES["pic"]["name"] . "<br>";
echo "Type: " . $_FILES["pic"]["type"] . "<br>";
echo "Size: " . ($_FILES["pic"]["size"] / 1024) . " Kb<br>";

echo "Stored in: " . $_FILES["pic"]["tmp_name"];
move_uploaded_file($_FILES["pic"]["tmp_name"],"upload/".$_FILES["pic"]["name"]);
}




?>