@extends('layouts.default')

@section("styles")
@stop

@section("content")
    
    <div class="row">
    	<div class="large-5 medium-5 columns">
			<h1> Edit your profile </h1>

		     {{ Form::model($user, ['method' => 'PATCH', 'route' => ['users.update', $user->id]]) }}

		            {{ Form::label('firstname', 'First Name:') }}
		            {{ Form::text('firstname', null, ['class' => 'form-control']) }}

		            {{ Form::label('lastname', 'Last Name:') }}
		            {{ Form::text('lastname', null, ['class' => 'form-control']) }}

		            {{ Form::label('email', 'E-Mail') }}
		            {{ Form::text('email', null, ['class' => 'form-control']) }}

		            {{ Form::label('username', 'Username') }}
		            {{ Form::text('username', null, ['class' => 'form-control']) }}

		            {{ Form::label('description', 'Description') }}
		            {{ Form::textarea('description', null, ['class' => 'form-control']) }}

				{{ Form::submit('Update Profile') }}
		    {{ Form::close() }}
	    </div>
	</div>

@stop