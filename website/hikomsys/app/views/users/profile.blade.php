@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<h2> Edit your profile </h2>

     {{ Form::model($user, ['method' => 'PATCH', 'route' => ['users.update', $user->id]]) }}

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

		{{ Form::submit('Update Profile') }}
    {{ Form::close() }}

@stop