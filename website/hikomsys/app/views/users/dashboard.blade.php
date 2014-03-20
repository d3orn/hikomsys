@extends('layouts.default')

@section("header")
@stop

@section("content")

	<h1>How do you know your system?</h1>
	 
	<p>Welcome on How I KnOw My SYStem.</p>

	<p>Please enter a valid Github link below</p>

	{{ Form::open(array('route'=>'projects.store')) }}

		<fieldset>

			{{Form::label('url', 'Gitrepository URL:')}}
			{{Form::url('url')}}

			{{Form::label('projectName', 'Project name:')}}
			{{Form::text('projectName')}}

		</fieldset>

		{{Form::submit('Submit Repository', array('class'=>'submit'))}}

	{{Form::close()}}

@stop