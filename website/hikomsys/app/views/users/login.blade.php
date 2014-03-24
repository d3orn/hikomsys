@extends('layouts.default')
@section("content")

	<h1>Welcome on Hikomsys</h1>
		<p> If you are new please {{ HTML::linkRoute('users.create', 'Sign up') }} , else sign in below </p>
	<h2>Login</h2>

	{{ Form::open(['route'=>'sessions.store', 'class' => 'large-6 columns']) }}
	  
			<div class="">
				{{ Form::label('username', 'Username') }}
			    {{ Form::text('username', null, ['placeholder'=>'Username', 'class' => 'large-12 columns']) }}

			    {{ Form::label('password', 'Password') }}
			    {{ Form::password('password', ['placeholder'=>'Password','class' => 'large-12 columns']) }}
			</div>

	    {{ Form::submit('Login', ['class'=>'submit button'])}}
	{{ Form::close() }}

@stop