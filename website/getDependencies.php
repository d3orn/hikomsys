<?php
	$name = $_GET['name'];
	include 'mongodb.php';
	session_start();

	$project = $db->$_SESSION['projectname'];

	$cursor = $project->find(array('name' => $name),array('_id' => 0, 'children' => 0,'classes' => 0, 'parentPackage' => 0, 'name' => 0));
	
	$cursor->next();
	$obj = $cursor->current();
	$dependencies = $obj['outgoingDependencies'];

	foreach ($dependencies as $key => $dependency) {
		if($dependency['to']['package'] !== "Default Package"){
			$arr[] = $dependency;
		}
	}
	
	echo json_encode($arr);
?>