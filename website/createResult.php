<?php 
  include 'mongodb.php';
	session_start();

	$name = $_SESSION['projectname'];

	$solutionName = $name.'Solution';
	$solution = $db->$solutionName;

	$resultName = $name.'Result';
	$result = $db->createCollection($resultName);
  $result->ensureIndex(array('name' => 1), array('unique' => 1));

	if(isset($_POST['packages'])) {
   	$json = $_POST['packages'];

 		//reset userSub if resent or somehow manage multiple submissions with usermgt
		$userSub = $db->createCollection($name.'UserSubmission');

		$userSub->ensureIndex(array('name' => 1), array('unique' => 1));
		$json = json_decode($json);
		foreach($json as $entry){
			$userSub->insert($entry);
		}
		
		addPackages($userSub);
		crossCheck($userSub);
		addForgottenDependencies($userSub);
    colorPackage();

		cleanUp();
 
  } 
  else {
    echo 'there has been an error, please help us fix this by reporting to the email down below!';
  }

  function addPackages($userSub){
  	global $name, $db, $result;

  	$cursor = $userSub->find(array(),array('name' => 1, 'position' => 1));
		foreach($cursor as $document){
			$result->insert($document);
		}
  }

  function crossCheck($toCheck){
  	global $solution, $result;

  	$cursor = $toCheck->find(array('dependencies' => array('$exists' => true)));
  	foreach ($cursor as $package => $value) {
  		$dependencies = $value['dependencies'];
  		$currentPackageName = $value['name'];

      checkDependencies($dependencies, $currentPackageName);
  	}
	}

  function checkDependencies($dependencies, $packageName){
    global $solution, $result;

    $result->update(array('name' => $packageName), array('$set' => array('dependencies' => array())));

    foreach ($dependencies as $dep => $depName) {
      $test = $solution->find(array('name' => $packageName,'outgoingDependencies' => array('$elemMatch' => array('to' => array('$elemMatch' => array('package' => $depName['to']))))));

      if($test->hasNext()){
        $result->update(array('name' => $packageName), array('$push' => array('dependencies' => array('to' => $depName['to'], 'color' => 'green'))));
        $solution->update(array('name' => $packageName),array('$pull' => array('outgoingDependencies' => array('to' => array('package' => $depName['to'])))));
      }
      else{
        $result->update(array('name' => $packageName), array('$push' => array('dependencies' => array('to' => $depName['to'], 'color' => 'red'))));
      }
    }
  }

  function addForgottenDependencies($toCheck){
  	global $solution, $result;

  	$packages = $toCheck->find(array(),array('_id' => 0, 'position' => 0, 'dependencies' => 0));
    foreach ($packages as $key => $value) {
      $packageNames[] = ($value['name']);
    }

  	$packagesToCheck = $solution->find(array('name' => array('$in' => $packageNames)), array('name' => 1,'outgoingDependencies' => 1));
  	foreach ($packagesToCheck as $key => $package) {
  		$remainingName = $package['name'];
  		if (array_key_exists('outgoingDependencies', $package)){
  			$dependencies = $package['outgoingDependencies'];
  			foreach ($dependencies as $otherKey => $dependency) {
          $dependencyToCheck = $dependency['to']['package'];
				
					if(($remainingName != $dependencyToCheck) and (in_array($dependencyToCheck, $packageNames))){
              $result->update(array('name' => $remainingName), array('$push' => array('dependencies' => array('to' => $dependencyToCheck, 'color' => 'orange'))));
  				}
          $solution->update(array('name' => $remainingName),array('$pull' => array('outgoingDependencies' => array('to' => array('package' => $dependencyToCheck)))));
  			}
  		}
  	}
	}

  function colorPackage(){
    global $result;

    $alpha = 0.3;
    $packages = $result->find(array(),array('position' => 0, '_id' => 0));

    foreach ($packages as $key => $package) {
      $color = "rgba(0,128,0,$alpha)";   
      if(array_key_exists('dependencies', $package)){
        $dependencies = $package['dependencies'];
        foreach ($dependencies as $k => $dependency) {
          if($dependency['color'] == 'orange'){ 
            $color = "rgba(242,165,0,$alpha)";
          };
          if($dependency['color'] == 'red'){ 
            $color = "rgba(255,0,0,$alpha)"; 
            break;
          };
        }
      }
      $result->update(array('name' => $package['name']),array('$set' => array('color' => $color)));
    }
  }

  //This function just resets the Solutiontable to it's original state
	function cleanUp(){
  	global $solution, $db;

    $solution->remove();
    $collection = $db->$_SESSION['projectname'];  

    $cursor = $collection->find(array(),array('outgoingDependencies.from' => 0, 'outgoingDependencies.to.class' => 0, 'outgoingDependencies.to.name' => 0, 'outgoingDependencies.to.class' => 0, 'classes' => 0, 'parentPackages' => 0,  'children' => 0));
    foreach($cursor as $document){
      $solution->insert($document);
    };
	}
?>