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
			<div id="ausgabe"></div>
			</p>	
			<div id="menu">
				<div id="move" aria-hidden="true" data-icon="&#xe601;" class="icon-expand gradientBG buttonlike"></div>
				<div id="greenArrow" aria-hidden="true" data-icon="&#xe600;" class="icon-arrow-right activatedIcon buttonlike"></div>
				<div id="orangeArrow" aria-hidden="true" data-icon="&#xe600;" color="orange" class="icon-arrow-right activatedIcon buttonlike"></div>
				<div id="redArrow" aria-hidden="true" data-icon="&#xe600;" class="icon-arrow-right activatedIcon buttonlike"></div>
				<div id="infosEnabled" class="activatedIcon buttonlike">Additional information</div>
				<div id="help" class="gradientBG buttonlike">Help</div>
				<div id="continue" class="gradientBG buttonlike">Continue</div>
			</div>
			<div id="help_container">THIS IS JUST A FILLER</div>
			<div id="container"></div>
			<?php require("html_template/footer.php"); ?>

			<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
			<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
			<script src="http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.4.min.js"></script>
			<script type="text/javascript" src="/hikomsys/min/?b=hikomsys/scripts/javascripts&amp;f=kineticSetup.js,kineticHelpers.js,arrow.js,packageGroup.js,kineticResults.js"></script>

		</div>
	</body>
</html>