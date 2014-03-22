@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<h1>How do you know your system?</h1>
	 
	<p>Welcome on How I KnOw My SYStem.</p>

	<p>Please enter a valid Github link below</p>

	{{ Form::open(array('route'=>'projects.store', 'class' => 'form-horizontal')) }}

		<fieldset>
			
			<div class="form-group">
				{{ Form::label('url', 'Gitrepository URL:', ['class' => 'form-label']) }}
				{{ Form::url('url', null,   ['class' => 'form-control'])}}
			</div>

			<div class="form-group">
				{{ Form::label('projectName', 'Project name:',  ['class' => 'form-label']) }}
				{{ Form::text('projectName', null, ['class' => 'form-control']) }}
			</div>

		</fieldset>

		{{ Form::submit('Submit Repository', array('class'=>'submit')) }}

	{{ Form::close() }}

@stop