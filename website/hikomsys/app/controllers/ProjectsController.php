<?php

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
			
			if(!Project::where('sha', '=', $sha)->first()){

				$version = (DB::table('projects')->where('path', '=', $url)->count())+1;

				$args = [
					'path' => $url,
					'version' => $version,
					'name' => $projectName,
					'sha' => $sha
				];

				//self->parseProject($args)
				
				$folderName = $projectName.'V'.$version;

				exec("./clone.sh ". escapeshellarg($url)." ". escapeshellarg($folderName));
				#I should delete the project folder and only keep the .mse file
				exec(escapeshellcmd("pharo-vm-nox datagatherer/Hikomsys.image runDataGatherer --projectName=$folderName"));



				$project = new Project();

				if ($project->validate($args))
				{
					$project->fill($args);
				}
				else
				{
					$errors = $project->errors();
					return Redirect::back()->withErrors($errors)->withInput();
				}

				$project_id = $project->id;
				$message = "Thank you for adding your project to our system";
			}
			else{
				$project_id = $projectExits->first()->id;
			}

			$userId = Auth::user()->id;
			$hasProject = DB::table('usersprojects')->where('user_id', '=', $userId)->where('project_id' ,'=', $project_id);
			if(!$hasProject->first()){
				$usersprojects = new UsersProjects;
				$usersprojects->user_id = $userId;
				$usersprojects->project_id = $project_id;
				$usersprojects->save();	
				$message = 'Awesome your project is already in our system and you should be able to access it now!';
			}
			else{
				$message = 'This project is already in your list of projects';
			}
			return Redirect::back()
				->with('message', $message);
		}
		else{
			return Redirect::back()->with('message', 'not a valid github link');
		}
	}

	public function show($id){
		$db = self::getDb('localhost', 'hikomsys');

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
		$version = (DB::table('projects')->where('path', '=', $url)->count())+1;

		$folderName = $projectName.'V'.$version;

		exec("./clone.sh ". escapeshellarg($url)." ". escapeshellarg($folderName));
		#I should delete the project folder and only keep the .mse file
		exec(escapeshellcmd("pharo-vm-nox datagatherer/Hikomsys.image runDataGatherer --projectName=$folderName"));



		$project = new Project();

		if ($project->validate($args))
		{
			$project->fill($args);
		}
		else
		{
			$errors = $project->errors();
			return Redirect::back()->withErrors($errors)->withInput();
		}

		$project_id = $project->id;
		$message = "Thank you for adding your project to our system";
	}

}