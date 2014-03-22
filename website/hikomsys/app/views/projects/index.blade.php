@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<h1>{{ $title }}</h1>

	@if($projects)
		<ul>
			@foreach($projects as $project)
				<li>
					<li>
						{{ $project->name .' Version: '. $project->version }}

						{{ HTML::linkRoute('projects.show', 'Take the quiz!', [$project->project_id])}}

						{{ HTML::linkRoute('quizzes.index', 'Checkout your results', ['project_id' => $project->project_id])}}
					</li>
				</li>
			@endforeach
		</ul>
	@else
		<p> Sorry you did not uplade any projects yet, please do so by filling out the form below </p>
		<p>Please enter a valid Github link</p>

		{{ Form::open(['route'=>'projects.store', 'class' => 'well col-4']) }}

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

			{{ Form::submit('Submit Repository', ['class'=>'submit btn btn-primary']) }}

		{{ Form::close() }}
	@endif

@stop