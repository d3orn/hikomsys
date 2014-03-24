@extends('layouts.default')

@section("content")

	<h1>Sign Up now!</h1>
	<p>To find out how well you know your code just fill out the form below and you are ready to go!</p>
	 
	{{ Form::open(['url'=>'users']) }}


	{{ Form::label('username', 'Username') }}
	{{ Form::text('username', null, ['placeholder'=>'Username']) }}

	{{ Form::label('firstname', 'Firstname') }}
	{{ Form::text('firstname', null, ['placeholder'=>'First Name']) }}

	{{ Form::label('lastname', 'Lastname') }}
	{{ Form::text('lastname', null, ['placeholder'=>'Last Name']) }}

	{{ Form::label('email', 'E-Mail') }}
	{{ Form::text('email', null, ['placeholder'=>'Email Address']) }}

	{{ Form::label('password', 'Password') }}
	{{ Form::password('password', ['placeholder'=>'Password']) }}

	{{ Form::label('password_confirmation', 'Password') }}
	{{ Form::password('password_confirmation', ['placeholder'=>'Confirm Password']) }}

	{{ Form::submit('Sign Up', ['class'=>'submit'])}}

@stop