<?php

class SessionsController extends \BaseController {

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('users.login');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$input = Input::all();
		
		$attempt = Auth::attempt([
			'email' => $input['email'],
			'password' => $input['password']
		]);

		if($attempt) return Redirect::route('users.index')->with('message', 'You are now logged in!');
		return Redirect::back()
			->with('error', 'Your email/password combination was incorrect')
			->withInput();
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy()
	{
		Auth::logout();

		return Redirect::home();
	}

}