@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<h1> Edit your profile </h1>

     {{ Form::model($user, ['method' => 'PATCH', 'route' => ['users.update', $user->id], 'class' => 'col-md-4']) }}

        <div class="form-group">
            {{ Form::label('firstname', 'First Name:', ['class' => 'form-label']) }}
            {{ Form::text('firstname', null, ['class' => 'form-control']) }}
        </div>

        <div class="form-group">
            {{ Form::label('lastname', 'Last Name:', ['class' => 'form-label']) }}
            {{ Form::text('lastname', null, ['class' => 'form-control']) }}
        </div>

        <div class="form-group">
            {{ Form::label('email', 'E-Mail', ['class' => 'form-label']) }}
            {{ Form::text('email', null, ['class' => 'form-control']) }}
        </div>

        <div class="form-group">
            {{ Form::label('username', 'Username', ['class' => 'form-label']) }}
            {{ Form::text('username', null, ['class' => 'form-control']) }}
        </div>

        <div class="form-group">
            {{ Form::label('description', 'Description', ['class' => 'form-label']) }}
            {{ Form::textarea('description', null, ['class' => 'form-control']) }}
        </div>

		{{ Form::submit('Update Profile') }}
    {{ Form::close() }}

@stop