@extends('layouts.default')
@section("content")

	<h1>Welcome on Hikomsys</h1>
		<p> If you are new please {{ HTML::linkRoute('users.create', 'Sign up') }} , else sign in below </p>
	<h2>Login</h2>

	{{ Form::open(['route'=>'sessions.store', 'class' => 'col-md-4']) }}
	  
		<fieldset>
			<div class="form-group">
				{{ Form::label('username', 'Username', ['class' => 'form-label']) }}
			    {{ Form::text('username', null, array('placeholder'=>'Username', 'class' => 'form-control')) }}
			</div>

			<div class="form-group">
			    {{ Form::label('password', 'Password', ['class' => 'form-label']) }}
			    {{ Form::password('password', array('placeholder'=>'Password','class' => 'form-control')) }}
			</div>

		</fieldset>

	    {{ Form::submit('Login', ['class'=>'submit btn btn-primary'])}}
	{{ Form::close() }}

@stop