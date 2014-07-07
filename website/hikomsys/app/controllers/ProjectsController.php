<?php

use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProjectsController extends BaseController {

	//I should just add this filter to the BaseController
	public function __construct() {
		parent::__construct();
		// $this->beforeFilter(function(){
		// 	if(Auth::guest()) 
		// 		return Redirect::route('sessions.login');
		// });
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
		//maybe I have to manually add https://
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

			$existingProject = Project::where('sha', '=', $sha)->first();
			
			if(!$existingProject){

				$version = (DB::table('projects')->where('path', '=', $url)->count())+1;

				$args = [
					'path' => $url,
					'version' => $version,
					'name' => $projectName,
					'sha' => $sha
				];

				$project_id = self::parseProject($args);
				
				$message = "Thank you for adding your project to our system";
			}
			else{
				$project_id = $existingProject->id;
				$message = 'Awesome your project is already in our system and you should be able to access it now!';
			}

			$userId = Auth::user()->id;
			$hasProject = DB::table('usersprojects')->where('user_id', '=', $userId)->where('project_id' ,'=', $project_id);
			
			if(!$hasProject->first()){
				$usersprojects = new UsersProjects;
				$usersprojects->user_id = $userId;
				$usersprojects->project_id = $project_id;
				$usersprojects->save();		
			}
			else{
				$message = 'This project is already in your list of projects';
			}

			return Redirect::back()
				->with('message', $message);
		}
		else{
			return Redirect::back()->with('message', 'Not a valid github link');
		}
	}

	public function show($id){
		$db = self::getDb('localhost', 'hikomsys');

		try
		{
			$project = Project::findOrFail($id);
		
			//REFACTOR into seperate file and add echo code to a div
			$collectionName = $project->name;
			$collectionName = $collectionName.'V'.$project->version;

			// select the collection  
			$list = $db->listCollections(); //whaaat? probably not needed
			$collection = $db->$collectionName;
			$cursor = $collection->find(['parentPackage' => ['$exists' => false], 'name' => ['$ne' => 'Default Package']]);	

			return View::make('projects.view', compact('project', 'collection', 'cursor'));
		}
		catch(ModelNotFoundException $e)
		{
			return Redirect::home()->with('error', 'Sorry the project you are looking for does not exist.');
		}
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

	public function random(){
		$id = Project::all()->random(1)->id;
		return Redirect::route('projects.show', $id);
	}

	private function parseProject($args){
		$folderName = $args['name'].'V'.$args['version'];

		//TODO those two exec call should get executed without the need for the user to wait
		exec("./clone.sh ". escapeshellarg($args['path'])." ". escapeshellarg($folderName));
		exec(escapeshellcmd("pharo-vm-nox datagatherer/Hikomsys.image runDataGatherer --projectName=$folderName"));

		$project = new Project();

		if ($project->validate($args))
		{
			$project->fill($args);
			$project->save();
		}
		else
		{
			$errors = $project->errors();
			return Redirect::back()->withErrors($errors)->withInput();
		}

		return $project->id;
	}

	public function ranking($projectid){
		var_dump(gettype($projectid));
		/*	Select id, x.user_id, max From hikomsys.quizzes x 
			Left outer join
			(SELECT user_id, project_id, max(total_points) as max 
			FROM hikomsys.quizzes Where project_id = 1 group by project_id, user_id) y
			on x.total_points = y.max Where y.project_id is not null;*/
		if(is_int($projectid)){
			$ranking = DB::select('	SELECT id, x.user_id, max 
									FROM quizzes x 
									Left outer join
									(SELECT user_id, project_id, max(total_points) as max 
									FROM hikomsys.quizzes WHERE project_id = ' +$projectid+ ' 
									GROUP BY project_id, user_id) y
									ON x.total_points = y.max WHERE y.project_id is not null;');

			return View::make('projects.ranking')
				->with('ranking' , $ranking)
				->with();
		}
	}

}