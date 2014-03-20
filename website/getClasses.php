<?php
	$name = $_GET['name'];
	include 'mongodb.php';
	session_start();

	$project = $db->$_SESSION['projectname'];

	$cursor = $project->find(array('name' => $name),array('_id' => 0, 'outgoingDependencies' => 0,'children' => 0, 'parentPackage' => 0, 'name' => 0));

	$cursor->next();
	$obj = $cursor->current();
	$classes = $obj['classes'];

	foreach ($classes as $key => $value) {
		if(strpos($value['name'], 'anonymous') === false){
			$arr[] = $value;
		}
	}
	
	echo json_encode($arr);
?>