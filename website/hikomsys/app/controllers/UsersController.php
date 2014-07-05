<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UsersController extends BaseController {

	protected $users;

	public function __construct(UserInterface $users) {
		$this->users = $users;
		parent::__construct();
		// $this->beforeFilter(function(){
		// 	if(Auth::guest()) 
		// 		return View::make('users.login');
		// }, array('except' => ['create','store']));
		// $this->beforeFilter(function(){
		// 	if(Auth::user()->username != 'd3orn') 
		// 		return View::make('users.login')->with('message', 'You do not have permission to delete users!');
		// }, array('only' => ['destroy']));
	}

	public function index(){
		$message = Auth::user()->notification;
		return View::make('users.dashboard', compact($message));
	}

	public function create(){
		return View::make('users.register');
	}

	public function store(){
		$input = Input::all();
		
		$validator = Validator::make($input, User::$rules);

		if ($validator->fails()) {
			return Redirect::route('users.create')->withErrors($validator)->withInput();
		}

		unset($input['password_confirmation']);
		$input['password'] = Hash::make($input['password']);

		$this->users->create($input);
		
		return Redirect::route('users.index')->with('message', 'Thanks for signing up!');
	}

	public function show($id){
		try
		{
			$user = $this->users->findOrFail($id);

			return View::make('users.show', compact('user'));
		}
		catch(ModelNotFoundException $e)
		{
			return Redirect::home('message', 'Sorry the user you are looking for does not exist.');
		}
	}

	public function showall(){
		$users = $this->users->all();

		return View::make('users.userlist', compact('users'));
	}

	public function edit($id){
		try {
			$message = 'You do not have permission to edit other users!';

			$user = $this->users->findOrFail($id);
			//TODO
			//this should not check if the user is 'd3orn' it should check if the user is an admin 
			//=> I should add a field isAdmin to the userstable
			if($user == Auth::user() or Auth::user()->username == 'd3orn') return View::make('users.edit', compact('user'));
			return Redirect::home()->with('message', $message);
		} 
		catch (ModelNotFoundException $e) {
			return Redirect::home()-with('message', 'Somthing went wrong. Please try editing the profile again.');
		}


	}

	public function update($id){
		try{
			$user = $this->users->findOrFail($id);
			$user->fill(Input::all());
			$user->save();

			return Redirect::route('users.index')->with('message', 'Profile Successfully updated');
		}
		catch(ModelNotFoundException $e){
			return Redirect::home()->with('message', 'Somthing went wrong. Please try updating the profile again.');
		}
	}

	public function destroy($id){
		try {
			// delete
			$user = $this->users->findOrFail($id);
			$user->delete();

			// redirect
			Session::flash('message', 'Successfully deleted the nerd!');
			return Redirect::route('users.showall');			
		} 
		catch (ModelNotFoundException $e) {
			return Redirect::home()->with('message', 'Somthing went wrong. Please try deleting the user again.');
		}

	}
}