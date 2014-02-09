<?php
	include 'mongodb.php';
	session_start();

	$resultsName = $_SESSION['projectname'].'Result';	
	$results = $db->$resultsName;

	$project = $db->$_SESSION['projectname'];

	$nbrOfPackages = $results->count();
	$maxDependencies = $nbrOfPackages * ($nbrOfPackages - 1);

	$countGreen = $countOrange = $countRed = 0;
	$cursor = $results->find(array(),array('_id' => 0, 'name' => 0,'position' => 0, 'color' => 0));
	foreach ($cursor as $key => $value) {
		if(array_key_exists('dependencies', $value)){
			$dependencies = $value['dependencies'];
			foreach ($dependencies as $k => $dependency) {
				if($dependency['color'] == 'green'){
					$countGreen++;};
				if($dependency['color'] == 'orange'){
					$countOrange++;};
				if($dependency['color'] == 'red'){
					$countRed++;};
			}
		}
	}

	$totalDependencies = $countOrange + $countGreen;
	$plusPoints = 100/$totalDependencies;
	$minusPoints = -100/($maxDependencies-$totalDependencies);

	$userPoints = $plusPoints * $countGreen + $minusPoints * ($countRed + $countOrange);

	echo (round($userPoints,2));

	//echo json_encode(iterator_to_array($cursor));
?>