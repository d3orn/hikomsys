@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<h1>{{ $title }}</h1>

	@if($projects)
		<table class="table table-striped">
			<thead>
				<tr>
					<th>Project Name</th>
					<th>Versione</th>
					<th>New Quiz</th>
					<th>Results</th>
				</tr>
			</thead>
			<tbody>
				@foreach($projects as $project)
					<tr>
						<td>{{ $project->name }}</td>
						<td>{{ $project->version }}</td>
						<td>{{ HTML::linkRoute('projects.show', 'Take the quiz!', [$project->project_id])}}</td>
						<td>{{ HTML::linkRoute('quizzes.index', 'Checkout your results', ['project_id' => $project->project_id])}}</td>
					</tr>
				@endforeach
			</tbody>
		</table>
	@else
		<p> Sorry you did not uplade any projects yet, please do so by filling out the form below </p>
		<p>Please enter a valid Github link</p>

		{{ Form::open(['route'=>'projects.store', 'class' => 'well col-md-4']) }}

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