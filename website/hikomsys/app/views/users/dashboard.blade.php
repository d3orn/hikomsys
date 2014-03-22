@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<h1>How do you know your system?</h1>
	 
	<p>Welcome on How I KnOw My SYStem.</p>

	<p>Please enter a valid Github link below</p>

	{{ Form::open(array('route'=>'projects.store', 'class' => 'form-horizontal')) }}

		<fieldset>
			
			<div class="control-group">
				{{Form::label('url', 'Gitrepository URL:', ['class' => 'control-label'])}}
				{{Form::url('url',  ['class' => 'controls'])}}
			</div>

			<div class="control-group">
				{{Form::label('projectName', 'Project name:',  ['class' => 'control-label'])}}
				{{Form::text('projectName',  ['class' => 'controls'])}}
			</div>

		</fieldset>

		{{Form::submit('Submit Repository', array('class'=>'submit'))}}

	{{Form::close()}}

@stop