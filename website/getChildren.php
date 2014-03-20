<?php
	$name = $_GET['name'];
	include 'mongodb.php';
	session_start();

	$project = $db->$_SESSION['projectname'];

	$cursor = $project->find(array('name' => $name),array('_id' => 0, 'outgoingDependencies' => 0,'classes' => 0, 'parentPackage' => 0, 'name' => 0));
	
	$cursor->next();
	$obj = $cursor->current();
	$children = $obj['children'];

	foreach ($children as $key => $value) {
		$arr[] = $value;
	}
	
	echo json_encode($arr);
?>