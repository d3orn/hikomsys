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

			{{ Form::open(array('route'=>'projects.store')) }}

				<fieldset>

					{{Form::label('url', 'Gitrepository URL:')}}
					{{Form::url('url')}}

					{{Form::label('projectName', 'Project name:')}}
					{{Form::text('projectName')}}

				</fieldset>

				{{Form::submit('Submit Repository', array('class'=>'submit'))}}

			{{Form::close()}}
	@endif

@stop