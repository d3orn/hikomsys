<?php
class Helpers {

	public static function recursiveTree($children, $collection){
		$html = '';
		foreach($children as $child){
			$tmpName = $child['name'];
			$strRepName = str_replace('::','\\:\\:',$tmpName);
			$classCount = self::countClasses($child);
			$html = $html."\n\t<li id=\"$strRepName\"><a>".$tmpName." (".$classCount." Classes)</a>";
			if(self::hasChildren($tmpName, $collection)){
				$html = $html.'<ul>';
				$cursor = $collection->find(array('name' => $tmpName));
				foreach($cursor as $document){
					$tmpChildren = $document['children'];
					$html = $html.self::recursiveTree($tmpChildren, $collection);
				}
				$html = $html.'</ul>';
			}
			$html = $html."</li>\n";	
		}
		return $html;
	}

	public static function hasChildren($name, $collection){	
		//Find the package with the given $name and check if it has children	
		$tmpCursor = $collection->find(array('name' => $name, 'children' => array('$exists' => true)));

		return($tmpCursor->hasNext());
	}

	private static function countClasses($package){
		var_dump($package);
		return sizeof($package['classes']);
		
	}

	public static function addPackages($array){
		$string = '<!--The following javascript calls are created with PHP, creating a new packageGroup (displayed on the canvas) for each selected package stored within &POST -->';
		$string = $string.'<script> var allPackages = [];';
		$selected = json_decode($array['selected']);
		foreach($selected as $key => $value){
			$strRepName = str_replace('\\:\\:','::', $value);
			$string = $string. "allPackages.push(new PackageGroup(\"$strRepName\"));";
		}
		$string = $string. '</script>';
		return $string;
	}
}