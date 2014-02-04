<?php 
	ini_set('display_errors', 1);
	session_start();

	$name = $_SESSION['projectname'];

	$dbhost = 'localhost';  
	$dbname = 'hikomsys';  

	// Connect to test database  
	$m = new Mongo("mongodb://$dbhost");  
	$db = $m->selectDB("$dbname");  

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

		//cleanUp();
 
  } 
  else {
    echo 'there has been an error, please help us fix this by reporting to the email down below!';
  }

  function addPackages($userSub){
  	global $name, $db, $result;

  	$cursor = $userSub->find(array(),array('name' => 1, 'position' => 1));
		foreach($cursor as $document){
			$result->insert($document);
		};
  }

  function crossCheck($toCheck){
  	global $solution, $result;

  	$cursor = $toCheck->find(array("dependencies"=>array('$exists'=>true)));
  	foreach ($cursor as $package => $value) {
  		$dependencies = $value["dependencies"];
  		$thisPackage = $value["name"];
  		$result->update(array("name" => $thisPackage), array('$set' => array("dependencies" => array())));
  		foreach ($dependencies as $dep => $depName) {
  			$test = $solution->find(array('name' => $thisPackage,'outgoingDependencies' => array('$elemMatch' => array('to' => array('$elemMatch' => array('package' => $depName["to"]))))));

  			if($test->hasNext()){
  				$result->update(array("name" => $thisPackage), array('$push' => array("dependencies" => array("to" => $depName["to"], "color" => "green"))));
  				$solution->update(array("name" => $thisPackage),array('$pull' => array("outgoingDependencies" => array("to" => array("package" => $depName["to"])))));
  			}
  			else{
  				$result->update(array("name" => $thisPackage), array('$push' => array("dependencies" => array("to" => $depName["to"], "color" => "red"))));
  			}
  		}
  	}
	}

  function addForgottenDependencies($toCheck){
  	global $solution, $result;
  	$packages = $toCheck->find(array(),array("name" => 1));
  	foreach($packages as $package => $value){
  		$packageName = $value["name"];
  		$remaining = $solution->find(array("name" => $packageName), array("name" => 1,"outgoingDependencies" => 1));
  		foreach ($remaining as $key => $p) {
  			$remainingName = $p["name"];
  			if (array_key_exists('outgoingDependencies', $p)){
  				$dependencies = $p["outgoingDependencies"];
  				foreach ($dependencies as $k => $v) {
             $dependencyToCheck = $v["to"]["package"];
				
					  if($remainingName != $dependencyToCheck){
               $test = $toCheck->find(array("name" => $dependencyToCheck));

  						if($test->hasNext()){
 								$result->update(array("name" => $remainingName), array('$push' => array("dependencies" => array("to" => $dependencyToCheck, "color" => "orange"))));
      				}
  					}
  				}
  			}
  		}
  	}
	}

	function cleanUp(){
  	global $solution;

  	$solution->drop();
	}
?>