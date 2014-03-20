@extends('layouts.default')

@section("header")
@stop

@section("content")

	<h1> Edit your profile </h1>

     {{ Form::model($user, ['method' => 'PATCH', 'route' => ['users.update', $user->id]]) }}

     	<fieldset>
            {{ Form::label('firstname', 'First Name:', array('class' => 'address')) }}
            {{ Form::text('firstname') }}

            {{ Form::label('lastname', 'Last Name:', array('class' => 'address')) }}
            {{ Form::text('lastname') }}

            {{ Form::label('email', 'E-Mail', array('class' => 'address')) }}
            {{ Form::text('email') }}

            {{ Form::label('username', 'Username', array('class' => 'address')) }}
            {{ Form::text('username') }}

            {{ Form::label('description', 'Description', array('class' => 'address')) }}
            {{ Form::textarea('description') }}
           
        </fieldset>
		{{ Form::submit('Update Profile') }}
    {{ Form::close() }}

@stop