@extends('layouts.default')
@section("content")

	<h1>Welcome on Hikomsys</h1>
		<p> If you are new please {{ HTML::linkRoute('users.create', 'Sign up') }} , else sign in below </p>
	<h2>Login</h2>

	{{ Form::open(['route'=>'sessions.store', 'class' => '']) }}
	  
			<div class="form">
				{{ Form::label('username', 'Username', ['class' => '']) }}
			    {{ Form::text('username', null, ['placeholder'=>'Username', 'class' => '']) }}

			    {{ Form::label('password', 'Password', ['class' => '']) }}
			    {{ Form::password('password', ['placeholder'=>'Password','class' => '']) }}
			</div>

	    {{ Form::submit('Login', ['class'=>'submit button'])}}
	{{ Form::close() }}

@stop