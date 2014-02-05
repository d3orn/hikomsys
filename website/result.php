<?php 
	include 'mongodb.php';
	session_start();
?>
<!DOCTYPE html>
<html>
	<head>
		<?php require("html_template/head.php"); ?>
		<link rel="stylesheet" href="css/kinetic.css">
		<link rel="stylesheet" href="css/style.css">
	</head>
	<body>
		<div id="wrapper">
			<?php require("html_template/navi.php"); ?>
			<h1>Draw the dependencies</h1>
			<p>Please draw the dependencies between the packages you selected previously. 
				
				<br>To do so, you are able to switch between moving mode <a aria-hidden="true" data-icon="&#xe601;" class="icon-expand"></a> and
				
				drawing mode <a aria-hidden="true" data-icon="&#xe602;" class="icon-loop"></a>. 
				<br>In moving mode you are able to move around your packages freely, if you did already draw some dependencies they will just move along.
				<br>Within drawing mode you can <b>click-and-drag</b> from one package to another to visualize the dependency between them.
				An arrow starting on one packages signals that this packages depends on the other package at the end of the arrow.
				<br> As soon as you are satisfied with your dependencies please submit your solution by clicking on the submit dependencies button below.
			</p>	
			<div id="menu">
				<div id="move" aria-hidden="true" data-icon="&#xe601;" class="icon-expand activatedIcon buttonlike"></div>
				<div id="draw" aria-hidden="true" data-icon="&#xe602;" class="icon-loop gradientBG buttonlike"></div>
				<div id="help" class="gradientBG buttonlike">Help</div>
				<div id="submit" class="gradientBG buttonlike">Submit dependencies</div>
			</div>
			<div id="help_container">THIS IS JUST A FILLER</div>
			<div id="container"></div>
			<?php require("html_template/footer.php"); ?>

			<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
			<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
			<script src="http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.4.min.js"></script>
			<script src="kineticTutorial2.js"></script> 

			<!--The following javascript calls are created with PHP, creating a new packageGroup (displayed on the canvas) for each selected package stored within &POST -->	
			<?php
				// I have to get all the information about all the packages in the result table
				$resultName = $_SESSION['projectname'].'Result';	
				$collection = $db->$resultName;	

				echo "<script> var allPackages = [];";
				foreach($_POST as $key => $value){
					$strRepName = str_replace('check_','',$key);
					$strRepName = str_replace('\\:\\:','::', $strRepName);
					echo "allPackages.push(new PackageGroup(\"$strRepName\"));";
				}
				echo "</script>";
			?>
		</div>
	</body>
</html>