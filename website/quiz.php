<!DOCTYPE html>
<html>
	<head>
		<?php require("html_template/head.php"); ?>
		<link rel="stylesheet" href="css/kinetic.css">

	</head>
	<body>
		<div id="wrapper">
			<?php require("html_template/navi.php"); ?>
			<div id="container"></div>
			<div id="buttons">
				<input type="button" id="draw" value="Activate drawing">
			</div>

			<?php require("html_template/footer.php"); ?>

			<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
			<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
			<script src="http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.4.min.js"></script>
			<script src="kineticTutorial2.js"></script> 

			<!--The following javascript calls are created with PHP, creating a new packageGroup (displayed on the canvas) for each selected package stored within &POST -->	
			<?php
				echo "<script>";
				foreach($_POST as $key => $value){
					$strRepName = str_replace('check_','',$key);
					$strRepName = str_replace('\\:\\:','::', $strRepName);
					echo "new PackageGroup(\"$strRepName\");";
				}
				echo "</script>";
			?>
		</div>
	</body>
</html>
