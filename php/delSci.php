<?php
	session_start();
	header("Content-Type:text/plain;charset=utf-8");
	include_once 'fun.inc.php';
	linkDB();
	$id = $_POST["id"];
	$back = deleteSciElement($id);
	$data = array(
			"success" => $back
		);
	echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>