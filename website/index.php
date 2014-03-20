<html>
	<head>
		<title>HIKOMSYS - How I KnOw My SYStem: Home</title>
		
		<meta name="keywords" content="Filler" />
		<meta name="robots" content="all" />
		<meta name="copyright" content="copyright by d3orn, CH-3072 Ostermundigen" />
		<meta name="author" content="www.d3orn.ch" />
		
		<link rel="shortcut icon" href="pictures/magnifying_glass.png" type="image/x-icon" />
		<link rel=”apple-touch-icon” sizes=”114×114? href=”/touch-icon-114×114.png” />
		<link rel=”apple-touch-icon” sizes=”72×72? href=”/touch-icon-72×72.png” />
		<link rel=”apple-touch-icon” href=”/touch-icon-iphone.png” />
		
		<link rel="stylesheet" href="css/cssreset.css">
		<link rel="stylesheet" href="css/general.css">
		<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
		<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
	</head>
	<body>
		<div id="wrapper">
			<div id="navi">
				<ul>
					<li> <a href="index.php">Home</a> </li>
					<li> <a href="dbConnect.php?db_name=ant">ANT</a> </li>
					<li> <a href="dbConnect.php?db_name=pomodoroBox">PomodoroBox</a> </li>
					<li> <a href="dbConnect.php?db_name=3dgp">3dgp</a> </li>
					<li> <a href="quiz">Quiz</a> </li>
				</ul>
			</div>

			<header> Welcome on How I Know My System </header>
			<p>Please enter a valid Github link below</p>
	
			<form action="cloneGitRep.php" method="post" enctype="multipart/form-data">
				<label for="url">Gitrepository URL:</label>
				<input type="url" name="url" id="url"><br>
				<label for="projectName">Project name:</label>
				<input type="text" name="projectName"<br>
				<input type="submit" name="submit" value="Submit">
			</form>

			<div id="footer">
				<address>Dominique Rahm &middot dominique.rahm@gmail.com &middot <a href="http://www.twitter.com/d3orn" target="blank">@deorn</a></address>
			</div>
		<div>
	</body>
</html>
