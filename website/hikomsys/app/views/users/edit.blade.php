@extends('layouts.default')

@section("styles")
@stop

@section("content")
    
    <div class="row">
    	<div class="large-5 medium-5 columns">
			<h1> Edit your profile </h1>

		     {{ Form::model($user, ['method' => 'PATCH', 'route' => ['users.update', $user->id]]) }}

		            {{ Form::label('firstname', 'First Name:') }}
		            {{ Form::text('firstname') }}

		            {{ Form::label('lastname', 'Last Name:') }}
		            {{ Form::text('lastname') }}

		            {{ Form::label('email', 'E-Mail') }}
		            {{ Form::text('email') }}

		            {{ Form::label('username', 'Username') }}
		            {{ Form::text('username') }}

		            {{ Form::label('description', 'Description') }}
		            {{ Form::textarea('description') }}

				{{ Form::submit('Update Profile', ['class'=>'submit button']) }}
		    {{ Form::close() }}
	    </div>
	</div>

@stop