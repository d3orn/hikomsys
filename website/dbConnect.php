<!DOCTYPE html>
<html>
	<head>
		<?php require("html_template/head.php"); ?>
		<link rel="stylesheet" href="css/packageViewer.css">
	</head>
	<body>
		<div id="wrapper">
	
			<?php require("html_template/navi.php"); ?>
	<!-- PROGRESS BALL LOADER -->
			<div class="container">
				<ul id="progress">
    					<li><div id="layer1" class="ball"></div><div id="layer7" class="pulse"></div></li>
					<li><div id="layer2" class="ball"></div><div id="layer8" class="pulse"></div></li>
					<li><div id="layer3" class="ball"></div><div id="layer9" class="pulse"></div></li>
					<li><div id="layer4" class="ball"></div><div id="layer10" class="pulse"></div></li>
					<li><div id="layer5" class="ball"></div><div id="layer11" class="pulse"></div></li>
				</ul>
			</div>
	<!-- END PROGRESS BALL LOADER -->

<?php
	//REFACTOR into seperate file and add echo code to a div
	
	// Config  
	$dbhost = 'localhost';  
	$dbname = 'hikomsys';  
	$collectionName = $_GET[db_name];
  
	// Connect to test database  
	$m = new Mongo("mongodb://$dbhost");  
	$db = $m->selectDB("$dbname");  
 
	// select the collection  
	$list = $db->listCollections();
	$collection = $db->$collectionName;

	//Find the most top packages (those without parentPackages) and wihtout including the "Default Package"
	$cursor = $collection->find(array("parentPackage"=>array('$exists'=>false), "name"=>array('$ne'=>'Default Package')));	

	echo "<form id=\"package_viewer\" action=\"quiz.php\" method=\"post\">";	
	echo "<div id=\"package_list\"><ul>";	
	recursiveTree($cursor);
	echo "</ul></div>";
	echo "<input type=\"submit\" value=\"Submit\"></form>";	

//need a better name
function recursiveTree($children){
	global $collection;
	foreach($children as $child){
		$tmpName = $child["name"];
		$strRepName = str_replace('::','\\:\\:',$tmpName);
		echo "\n\t<li id=\"$strRepName\"><a>".$tmpName."</a>";
		if(hasChildren($tmpName)){
			echo "<ul>";
			$cursor = $collection->find(array("name"=>$tmpName));
			foreach($cursor as $document){
				$tmpChildren = $document["children"];
				recursiveTree($tmpChildren);
			}
			echo "</ul>";
		
		}
		echo "</li>\n";	
	}
		
}

function hasChildren($name){
	global $collection;
	//Find the package with the given $name and check if it has children	
	$tmpCursor = $collection->find(array("name"=>$name, "children"=>array('$exists'=>true)));

	return($tmpCursor->count()>0);
}

?>

			<?php require("html_template/footer.php"); ?>

			<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
			<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
			<script src="scripts/jstree/jquery.jstree.js"></script>
			<script src="scripts/jstree/_lib/jquery.cookie.js"></script>
			<script src="packageViewer.js"></script>    
	
		</div>
	</body>
</head>
