@extends('layouts.default')

@section("styles")
@stop

@section("content")
	
	<div class="row">

		<h2>How do you know your system?</h2>
		 
		<p>Welcome back {{ Auth::user()->firstname }} on How I KnOw My SYStem.</p>

		<p>Please enter a valid Github link below</p>

		{{ Form::open(['route'=>'projects.store', 'class' => 'col-md-4']) }}
				
				<div class="form-group">
					{{ Form::label('url', 'Gitrepository URL:', ['class' => 'form-label']) }}
					{{ Form::url('url', null, ['class' => 'form-control'])}}
				</div>

				<div class="form-group">
					{{ Form::label('projectName', 'Project name:',  ['class' => 'form-label']) }}
					{{ Form::text('projectName', null, ['class' => 'form-control']) }}
				</div>

			{{ Form::submit('Submit Repository', ['class'=>'submit btn btn-primary']) }}

		{{ Form::close() }}

	</div>

@stop