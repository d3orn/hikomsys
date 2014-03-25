@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<div class="row">
		<h1>{{ $title }}</h1>

		@if($projects)
			<table class="table table-striped">
				<thead>
					<tr>
						<th>Project Name</th>
						<th>Version</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					@foreach($projects as $project)
						<tr>
							<td>{{ $project->name }}</td>
							<td>{{ $project->version }}</td>
							<td>{{ HTML::linkRoute('projects.show', 'Start new Quiz', [$project->project_id, 'class'=>'submit button'])}}
							{{ HTML::linkRoute('quizzes.index', 'Checkout your results', ['project_id' => $project->project_id])}}</td>
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
	</div>

@stop