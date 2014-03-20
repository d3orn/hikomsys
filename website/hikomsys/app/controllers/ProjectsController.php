<?php

class ProjectsController extends BaseController {

	public function __construct() {
		$this->beforeFilter(function(){
			if(Auth::guest()) 
				return Redirect::route('login');
		});
	}

	public function index(){
		$title = 'Your projects on HIKOMSYS';
		$projects = DB::table('projects')
			->join('usersprojects', 'projects.id', '=', 'usersprojects.project_id')
			->where('user_id' ,'=' , Auth::user()->id)
			->get([
				'projects.name', 
				'projects.version',
				'usersprojects.project_id', 
				'usersprojects.user_id'
			]);
		return View::make('projects.index', compact('projects', 'title'));
	}

	public function store(){
		$url = Input::get("url");
		$parsedUrl = parse_url($url);

		$projectName = Input::get("projectName");
		if ($projectName == ""){
			$projectName = $parsedUrl['path'];
		}	

		#Need some more github verifications like size and so on
		if (preg_match("/github.com/", $url)) 
		{	
			#I have to compare the shas of all the other versions and this one before doing anything
			exec("git ls-remote --heads ". escapeshellarg($url), $output);

			$sha = explode("	", $output[0]);
			$sha = $sha[0];

			$projectExits = DB::table('projects')->where('sha', '=', $sha)->where('path' ,'=', $url);
			$message = 'Sorry your project is already in our system and we just added it to your projects';

			#only if there is not sha 
			if(!$projectExits->first()){

				$version = (DB::table('projects')->where('path', '=', $url)->count())+1;

				$folderName = $projectName.'V'.$version;

				exec("./clone.sh ". escapeshellarg($url)." ". escapeshellarg($folderName));
				#i should delete the project folder and only keep the .mse file
				exec(escapeshellcmd("pharo-vm-nox datagatherer/Hikomsys.image runDataGatherer --projectName=$folderName"));

				$project = new Project;
				$project->path = $url;
				$project->version = $version;
				$project->name = $projectName;
				$project->sha = $sha;
				$project->save();

				$usersprojects = new UsersProjects;
				$usersprojects->user_id = Auth::user()->id;
				$usersprojects->project_id = $project->id;
				$usersprojects->save();
				$message = "Thank you! Your project has been added to our system";
			}
			else{
				$userId = Auth::user()->id;
				$projectId = $projectExits->first()->id;
				$hasProject = DB::table('usersprojects')->where('user_id', '=', $userId)->where('project_id' ,'=', $projectId);
				if(!$hasProject->first()){
					$usersprojects = new UsersProjects;
					$usersprojects->user_id = Auth::user()->id;
					$usersprojects->project_id = $projectExits->first()->id;
					$usersprojects->save();	
				}
			}
		}
		else{
			return Redirect::back()->with('message', 'not a valid github link');
		}
		
		return Redirect::back()
			->with('message', $message);
	}

	public function show($id){
		global $db;

		self::dbconnect();

		$project = Project::findOrFail($id);

		//REFACTOR into seperate file and add echo code to a div
		$collectionName = $project->name;
		$collectionName = $collectionName.'V'.$project->version;

		// select the collection  
		$list = $db->listCollections();
		$collection = $db->$collectionName;
		$cursor = $collection->find(['parentPackage' => ['$exists' => false], 'name' => ['$ne' => 'Default Package']]);	

		return View::make('projects.view', compact('project', 'collection', 'cursor'));
	}

	public function showall(){
		$title = 'All projects on HIKOMSYS';
		$projects = DB::table('projects')
			->join('usersprojects', 'projects.id', '=', 'usersprojects.project_id')
			->get([
				'projects.name', 
				'projects.version',
				'usersprojects.project_id', 
				'usersprojects.user_id'
			]);
		return View::make('projects.index', compact('projects', 'title'));
	}











	//@Deprecated
	/*
	public function getClasses(){
		global $db;

		self::dbconnect();

		set_time_limit(0);
		ini_set("max-execution-time" , 600);
		ini_set('memory_limit', '96M'); 

		$name = Input::get('name');
		$quizId = Input::get('quizId');
		$quiz = Quiz::find($quizId);
		$projectId = $quiz->project_id;

		$project = Project::find($projectId);
		$projectName = $project->name.'V'.$project->version;

		$project = $db->$projectName;

		$cursor = $project->find(['name' => $name], ['_id' => 0, 'outgoingDependencies' => 0, 'children' => 0, 'parentPackage' => 0, 'name' => 0]);

		//$cursor = $project->find(['name' => $name], ['_id' => 0, 'outgoingDependencies' => 0,'children' => 0, 'parentPackage' => 0, 'name' => 0]);		
		//$cursor = $project->find(['name' => $name]);		
		

		//$cursor = $project->find(['name' => $name]);

		$cursor->next();
		$obj = $cursor->current();
		if(array_key_exists('classes', $obj)){
			$classes = $obj['classes'];

			foreach ($classes as $key => $value) {
				if(strpos($value['name'], 'anonymous') === false){
					$arr[] = $value;
				}
			}
			return json_encode($arr);
		}
		else{
			return;
		}
	}

	public function getChildren(){
		global $db;

		self::dbconnect();

		set_time_limit(0);
		ini_set("max-execution-time" , 600);
		ini_set('memory_limit', '96M'); 

		$name = Input::get('name');
		$quizId = Input::get('quizId');
		$quiz = Quiz::find($quizId);
		$projectId = $quiz->project_id;

		$project = Project::find($projectId);
		$projectName = $project->name.'V'.$project->version;
		$project = $db->$projectName;

		$cursor = $project->find(['name' => $name], ['_id' => 0, 'outgoingDependencies' => 0,'classes' => 0, 'parentPackage' => 0, 'name' => 0]);
	
		$cursor->next();
		$obj = $cursor->current();
		if(array_key_exists('children', $obj)){
			$children = $obj['children'];

			foreach ($children as $key => $value) {
				$arr[] = $value;
			}
			return json_encode($arr);
		}
		else{
			return;
		}
	}

	public function getDependencies(){
		global $db;

		self::dbconnect();

		set_time_limit(0);
		ini_set("max-execution-time" , 600);
		ini_set('memory_limit', '96M'); 
		
		$name = Input::get('name');
		$quizId = Input::get('quizId');
		$quiz = Quiz::find($quizId);
		$projectId = $quiz->project_id;

		$project = Project::find($projectId);
		$projectName = $project->name.'V'.$project->version;
		$project = $db->$projectName;

		$cursor = $project->find(['name' => $name], ['_id' => 0, 'children' => 0,'classes' => 0, 'parentPackage' => 0, 'name' => 0]);
	
		$cursor->next();
		$obj = $cursor->current();
		if(array_key_exists('outgoingDependencies', $obj)){
			$dependencies = $obj['outgoingDependencies'];

			foreach ($dependencies as $key => $dependency) {
				if($dependency['to']['package'] !== "Default Package"){
					$arr[] = $dependency;
				}
			}
			return json_encode($arr);
		}
		else{
			return;
		}
	}	
	*/
}