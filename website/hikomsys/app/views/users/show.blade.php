@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<h2> {{ $user->username }} </h2>
		
     {{ Form::model($user, ['method' => 'PATCH', 'route' => ['users.update', $user->id]]) }}

        {{ Form::label('firstname', 'First Name:', array('class' => 'address')) }}
        {{ Form::text('firstname', array('disabled')) }}

        {{ Form::label('lastname', 'Last Name:', array('class' => 'address')) }}
        {{ Form::text('lastname', array('disabled')) }}

        {{ Form::label('email', 'E-Mail', array('class' => 'address')) }}
        {{ Form::text('email', array('disabled') }}

        {{ Form::label('username', 'Username', array('class' => 'address')) }}
        {{ Form::text('username', array('disabled')) }}

        {{ Form::label('description', 'Description', array('class' => 'address')) }}
        {{ Form::textarea('description', array('disabled')) }}

    {{ Form::close() }}

@stop