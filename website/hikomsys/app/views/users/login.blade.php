@extends('layouts.default')
@section("content")

	<h1>Welcome on Hikomsys</h1>
		<p> If you are new please {{ HTML::linkRoute('users.create', 'Sign up') }} , else sign in below </p>
	<h2>Login</h2>

	{{ Form::open(array('route'=>'sessions.store')) }}
	  
		<fieldset>
			{{ Form::label('username', 'Username') }}
		    {{ Form::text('username', null, array('placeholder'=>'Username')) }}

		    {{ Form::label('password', 'Password') }}
		    {{ Form::password('password', array('placeholder'=>'Password')) }}
		</fieldset>

	    {{ Form::submit('Login', array('class'=>'submit'))}}
	{{ Form::close() }}

@stop