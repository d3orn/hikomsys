@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<h1>How do you know your system?</h1>
	 
	<p>Welcome on How I KnOw My SYStem.</p>

	<p>Please enter a valid Github link below</p>

	{{ Form::open(['route'=>'projects.store', 'class' => 'col-md-4']) }}
			
			<div class="form-group">
				{{ Form::label('url', 'Gitrepository URL:', ['class' => 'form-label']) }}
				{{ Form::url('url', ['class' => 'form-control'])}}
			</div>

			<div class="form-group">
				{{ Form::label('projectName', 'Project name:',  ['class' => 'form-label']) }}
				{{ Form::text('projectName', ['class' => 'form-control']) }}
			</div>

		{{ Form::submit('Submit Repository', ['class'=>'submit btn btn-primary']) }}

	{{ Form::close() }}

@stop