@extends('layouts.default')

@section("content")

	<div class="row">
		<div class="large-12 columns">
			<h1>Sign Up now!</h1>
			<p>To find out how well you know your code just fill out the form below and you are ready to go!</p>
		</div>
	</div>

	<div class="row">
		<div class="large-5 medium-5 columns">
			@if($errors->has())
				<div id="errors">
					<ul>
						@foreach($errors->all() as $error)
							<li>{{ $error }}</li>
						@endforeach
					</ul>
				</div>
			@endif

			{{ Form::open(['url'=>'users', 'data-abide' => '']) }}

				{{-- {{ Form::label('username', 'Username') }}
				{{ Form::text('username', null, ['placeholder'=>'Username', 'required' => '', 'pattern' => 'alpha_numeric']) }}
				<small class="error">Name is required and must be alpha numeric.</small> --}}

				<label>Username
					{{ Form::text('username', null, ['placeholder'=>'Username', 'required' => '', 'pattern' => 'alpha_numeric']) }}
				</label>
				<small class="error">Name is required and must be alpha numeric.</small>

				{{ Form::label('email', 'E-Mail') }}
				{{ Form::email('email', null, ['placeholder'=>'Email Address']) }}
				<small class="error">An email address is required.</small>

				{{ Form::label('password', 'Password') }}
				{{ Form::password('password', ['placeholder'=>'Password']) }}
				<small class="error">Your password has to be atleast 8 characters long.</small>

				{{ Form::label('password_confirmation', 'Password') }}
				{{ Form::password('password_confirmation', ['placeholder'=>'Confirm Password', 'required' => '', 'pattern' => 'password', 'data-equalto' => 'password']) }}
				<small class="error">The password did not match.</small>

				{{ Form::submit('Sign Up', ['class'=>'submit button'])}}

			{{ Form::close() }}
			</div>
	</div>

@stop