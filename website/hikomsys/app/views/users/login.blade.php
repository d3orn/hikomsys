@extends('layouts.default')
@section("content")

	<div class="large-12 columns">
		<h2>Welcome on Hikomsys</h2>
		<p> If you are new please {{ HTML::linkRoute('users.create', 'Sign up') }} , else sign in below </p>
	</div>
	<div class="row"></div>
		<div class="large-4 medium-4 columns">
			<h2>Login</h2>

			{{ Form::open(['route'=>'sessions.store']) }}
			  
					<div class="">
						{{ Form::label('username', 'Username') }}
					    {{ Form::text('username', null, ['placeholder'=>'Username', 'class' => 'large-12 columns']) }}

					    {{ Form::label('password', 'Password') }}
					    {{ Form::password('password', ['placeholder'=>'Password','class' => 'large-12 columns']) }}
					</div>

			    {{ Form::submit('Login', ['class'=>'submit button'])}}
			{{ Form::close() }}
		</div>
	</div>
@stop