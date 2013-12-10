<?php
	ini_set ('display_errors', true);
	error_reporting (E_ALL);
	
	$url = $_POST["url"];
	$link = parseUrl($url);

	$path = $link[6];
	$list = explode("/", $path);
	
	$projectName = $_POST["projectName"];
	if ($_POST["projectName"] == "")
	{
		$projectName = $list[2];
	}	

#    	echo ("PATH: ". $path . "<br>");
#    	echo ("Projectname: $projectName <br>");
#    	echo "Link: " . $url . "<br>";

	#Need some more github verifications like size and so on
	if (preg_match("/github.com/", $url)) 
     	{	
	
		echo "Valid Github link!";
		exec("bash scripts/clone.sh $url $projectName", $output);
	} 
        else 
        {
            echo "Sorry, please enter a valid Github link";
        }
	print_r($output);


	

function parseUrl ( $url )
{
    $r  = '!(?:(\w+)://)?(?:(\w+)\:(\w+)@)?([^/:]+)?';
    $r .= '(?:\:(\d*))?([^#?]+)?(?:\?([^#]+))?(?:#(.+$))?!i';

    preg_match ( $r, $url, $out );

    return $out;
}

header('Location: dbConnect.php');
die();
	
?>

