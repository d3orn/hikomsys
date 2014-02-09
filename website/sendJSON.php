<?php
	include 'mongodb.php';
	session_start();

	$resultsName = $_SESSION['projectname'].'Result';	
	$results = $db->$resultsName;

	$cursor = $results->find(array(),array('_id' => 0));

	echo json_encode(iterator_to_array($cursor));
?>