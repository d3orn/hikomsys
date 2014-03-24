<?php

class QuizzesController extends \BaseController {

	public function index(){
		$projectId =Input::get('project_id');

		$quizzes = Quiz::where('project_id', '=', $projectId)->get();

		return View::make('quizzes.quizlist', compact('quizzes'));
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$db = self::getDb('localhost', 'hikomsys');

		$input = Input::all();

		$userId = Auth::user()->id;
		$projectId = $input['project_id'];

		$quiz = Quiz::create(['user_id' => $userId, 'project_id' => $projectId]); 
		
		$project = Project::find($projectId);
		$projectName = $project->name.'V'.$project->version;

		//TODO Somehow MongoDB Namespace is limited I have to fiqure out how exactly to limit user input of the project name

		$solutionName = $quiz->id.'_So';

		$db->command(array(
			"eval" => new MongoCode("function(){
		       db[".$projectName."].copyTo(".$solutionName.")
			};"
			)
		));

		/*$solution = $db->createCollection($solutionName);
		$solution->ensureIndex(['name' => 1], ['unique' => 1]);

		$collection = $db->$projectName;	

		//TODO I have to replace this with the answer provided on SOF
		$cursor = $collection->find([],['parentPackages' => 0]);

		foreach($cursor as $document){
			$solution->insert($document);
		};;*/

		return Redirect::route('quizzes.edit', [$quiz->id])
			->with('selected', $input);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return View::make('quizzes.result')
			->with('quizId', $id);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		return View::make('quizzes.show')
			->with('quizId' , $id)
			->with('selected', Session::get('selected'));
	}


	//REFACTOR stuff below is so ugly..
	public function createResults(){
		global $solution;

		$db = self::getDb('localhost', 'hikomsys');
		$packages = Input::get('packages');
		$quizId = Input::get('quizId');

		$solutionName = $quizId.'_So';
		$solution = $db->$solutionName;

		self::createUserSubmTable($packages, $quizId);
		self::createResultTable($quizId);

		//self::crossCheck();
		//self::addForgottenDependencies();
		//self::colorPackage();
		//self::addAdditionalInformation();
		//self::cleanUp();

		//$quiz = Quiz::findOrFail($quizId);
		//$quiz->points = self::getPoints();
		//$quiz->save();
	}

	public function sendJSON(){
		$db = self::getDb('localhost', 'hikomsys');

		$quizId = Input::get('quizId');

		$resultsName = $quizId.'_RES';	
		$results = $db->$resultsName;

		$cursor = $results->find([],['_id' => 0]);;

		return json_encode(iterator_to_array($cursor));
	}

	//It can happend that totelDependencies is 0 and then I divide by zero => BAD
	public function getPoints(){
		$db = self::getDb('localhost', 'hikomsys');

		$quizId = Input::get('quizId');

		$resultsName = $quizId.'_RES';
		$results = $db->$resultsName;

		$nbrOfPackages = $results->count();
		$maxDependencies = $nbrOfPackages * ($nbrOfPackages - 1);

		$countGreen = $countOrange = $countRed = 0;
		$cursor = $results->find([], ['_id' => 0, 'name' => 0,'position' => 0, 'color' => 0]);
		foreach ($cursor as $key => $value) {
			if(array_key_exists('dependencies', $value)){
				$dependencies = $value['dependencies'];
				foreach ($dependencies as $k => $dependency) {
					if($dependency['color'] == 'green'){
						$countGreen++;};
					if($dependency['color'] == 'orange'){
						$countOrange++;};
					if($dependency['color'] == 'red'){
						$countRed++;};
				}
			}
		}

		$totalDependencies = $countOrange + $countGreen;
		$plusPoints = 100/$totalDependencies;
		$minusPoints = -100/($maxDependencies-$totalDependencies);

		$userPoints = $plusPoints * $countGreen + $minusPoints * ($countRed + $countOrange);

		$userPoints = round($userPoints,2);

		$quiz = Quiz::find($quizId);
		$quiz->points = $userPoints;
		$quiz->save();;

		return $userPoints;
	}

	private function createUserSubmTable($packages, $id){
		global $userSub;

		$db = self::getDb('localhost', 'hikomsys');

		$userSub = $db->createCollection($id.'_'.'US');

		$userSub->ensureIndex(['name' => 1], ['unique' => 1]);
		$packages = json_decode($packages);
		foreach($packages as $entry){
			$userSub->insert($entry);
		}
	}

	private function createResultTable($id){
		global $results, $userSub;

		$db = self::getDb('localhost', 'hikomsys');

		$results = $db->createCollection($id.'_RES');

		$cursor = $userSub->find([],['name' => 1, 'position' => 1]);
		foreach($cursor as $document){
			$results->insert($document);
		}
	}

	private function crossCheck(){
		global $results, $userSub;

		$cursor = $userSub->find(['dependencies' => ['$exists' => true]]);
		foreach ($cursor as $package => $value) {
			$dependencies = $value['dependencies'];
			$currentPackageName = $value['name'];
			self::checkDependencies($dependencies, $currentPackageName);
		}
	}

	private function checkDependencies($dependencies, $packageName){
		global $solution, $results;

		$results->update(['name' => $packageName], ['$set' => ['dependencies' => []]]);

		foreach ($dependencies as $dep => $depName) {
			$test = $solution->find(['name' => $packageName,'outgoingDependencies' => ['$elemMatch' => ['to' => ['$elemMatch' => ['package' => $depName['to']]]]]]);
			var_dump($test->hasNext());
			var_dump($depName['to']);
			if($test->hasNext()){
				$results->update(['name' => $packageName], ['$push' => ['dependencies' => ['to' => $depName['to'], 'color' => 'green']]]);
				$solution->update(['name' => $packageName], ['$pull' => ['outgoingDependencies' => ['to' => ['package' => $depName['to']]]]]);
			}
			else{
				$results->update(['name' => $packageName], ['$push' => ['dependencies' => ['to' => $depName['to'], 'color' => 'red']]]);
			}
		}
	}

	private function addForgottenDependencies(){
		global $solution, $results, $userSub;

		$packages = $userSub->find([], ['_id' => 0, 'position' => 0, 'dependencies' => 0]);
		foreach ($packages as $key => $value) {
			$packageNames[] = ($value['name']);
		}

		$packagesToCheck = $solution->find(['name' => ['$in' => $packageNames]], ['name' => 1,'outgoingDependencies' => 1, 'classes' => 1, 'children' => 1]);
		foreach ($packagesToCheck as $key => $package) {
			$remainingName = $package['name'];
			if (array_key_exists('outgoingDependencies', $package)){
				$dependencies = $package['outgoingDependencies'];
				foreach ($dependencies as $otherKey => $dependency) {
					$dependencyToCheck = $dependency['to']['package'];
					
					if(($remainingName != $dependencyToCheck) and (in_array($dependencyToCheck, $packageNames))){
						$results->update(['name' => $remainingName], ['$push' => ['dependencies' => ['to' => $dependencyToCheck, 'color' => 'orange']]]);
					}
					$solution->update(['name' => $remainingName], ['$pull' => ['outgoingDependencies' => ['to' => ['package' => $dependencyToCheck]]]]);
				}
			}
		}
	}

	private function addAdditionalInformation(){
		global $solution, $results;

		$packages = $results->find([], ['_id' => 0, 'position' => 0, 'dependencies' => 0]);
		foreach ($packages as $key => $value) {
			$packageNames[] = ($value['name']);
		}

		$additonalInfos = $solution->find(['name' => ['$in' => $packageNames]], ['name' => 1, 'classes' => 1, 'children' => 1, 'outgoingDependencies' => 1]);
		foreach ($additonalInfos as $key => $package) {
			$name = $package['name'];
			if(array_key_exists('children', $package)){
				$results->update(['name' => $name], ['$set' => ['children' => $package['children']]]);
			}
			if(array_key_exists('classes', $package)){
				$results->update(['name' => $name], ['$set' => ['classes' => $package['classes']]]);
			}
			if(array_key_exists('outgoingDependencies', $package)){
				$results->update(['name' => $name], ['$set' => ['allDependencies' => $package['outgoingDependencies']]]);
			}
		}
	}

	private function colorPackage(){
		global $results;

		$alpha = 0.3;
		$packages = $results->find([], ['position' => 0, '_id' => 0]);


		foreach ($packages as $key => $package) {
			$color = "rgba(0,128,0,$alpha)"; 
			if(array_key_exists('dependencies', $package)){
				$dependencies = $package['dependencies'];
				foreach ($dependencies as $k => $dependency) {
					if($dependency['color'] == 'orange'){ 
						$color = "rgba(242,165,0,$alpha)";
					};
					if($dependency['color'] == 'red'){ 
						$color = "rgba(255,0,0,$alpha)"; 
						break;
					};
				}
			}
		$results->update(['name' => $package['name']],['$set' => ['color' => $color]]);
		}
	}

	private function cleanUp(){
		global $solution;

		$solution->drop();
	}

}	