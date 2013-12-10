<html>
	<head>
		<?php require("html_template/head.php"); ?>
		<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
		<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
	</head>
	<body>
		<div id="wrapper">
			<?php require("html_template/navi.php"); ?>

			<header> Welcome on How I Know My System </header>
			<p>Please enter a valid Github link below</p>
	
			<form action="cloneGitRep.php" method="post" enctype="multipart/form-data">
				<label for="url">Gitrepository URL:</label>
				<input type="url" name="url" id="url"><br>
				<label for="projectName">Project name:</label>
				<input type="text" name="projectName"<br>
				<input type="submit" name="submit" value="Submit">
			</form>

			<?php require("html_template/footer.php"); ?>
		<div>
	</body>
</html>
