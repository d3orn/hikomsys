<?php

use Illuminate\Auth\UserInterface;

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
		$notification = Auth::user()->notification;
		return View::make('users.dashboard', compact($notification));
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
		$user = $this->users->findOrFail($id);

		return View::make('users.show', compact('user'));
	}

	public function showall(){
		$users = $this->users->all();

		return View::make('users.userlist', compact('users'));
	}

	public function edit($id){
		$message = 'You do not have permission to edit other users!';

		$user = $this->users->findOrFail($id);

		//TODO
		//this should not check if the user is 'd3orn' it should check if the user is an admin 
		//=> I should add a field isAdmint to the userstable
		if($user == Auth::user() or Auth::user()->username == 'd3orn') return View::make('users.edit', compact('user'));
		return Redirect::home()->with('message', $message);
	}

	public function update($id){
		$user = $this->users->findOrFail($id);

		$user->fill(Input::all());

		$user->save();

		return Redirect::route('users.index')->with('message', 'Profile Successfully updated');
	}

	public function destroy($id){
		// delete
		$user = $this->users->findOrFail($id);
		$user->delete();

		// redirect
		Session::flash('message', 'Successfully deleted the nerd!');
		return Redirect::route('users.showall');
	}
}