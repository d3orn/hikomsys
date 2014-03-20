<?php

use Illuminate\Auth\UserInterface;

class UsersController extends BaseController {

	protected $users;

	public function __construct(UserInterface $users) {
		$this->users = $users;
		$this->beforeFilter(function(){
			if(Auth::guest()) 
				return View::make('users.login');
		}, array('except' => ['create','store']));
	}

	public function index(){
		return View::make('users.dashboard');
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
		
		return Redirect::route('users.index')->with('message', 'Thanks for siging up!');
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
		$user = $this->users->findOrFail($id);

		if($user == Auth::user() or Auth::user()->username == 'd3orn') return View::make('users.edit', compact('user'));
		return Redirect::home()->with('message', 'You do not have permission to edit other users!');
	}

	public function update($id){
		$user = $this->users->findOrFail($id);

		$user->fill(Input::all());

		$user->save();

		return Redirect::route('users.index');
	}

	//should be added for admin purposes
	public function destroy(){

	}
}