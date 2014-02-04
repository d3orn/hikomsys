<?php 
	$dbhost = 'localhost';
	$dbname = 'hikomsys';

	// Connect to test database  
	$m = new Mongo("mongodb://$dbhost");
	$db = $m->selectDB("$dbname");
?>
