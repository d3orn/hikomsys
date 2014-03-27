@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<div class="row">
		<div class="large-12 columns">
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
								<td>{{ HTML::linkRoute('projects.show', 'Start new Quiz', [$project->project_id], ['class'=>'small button radius'])}}
								{{ HTML::linkRoute('quizzes.index', 'Solutions', ['project_id' => $project->project_id], ['class'=>'success small button radius']) }}</td>
							</tr>
						@endforeach
					</tbody>
				</table>
			@else
				<p> Sorry you did not uplade any projects yet, please do so by filling out the form below </p>
				<p>Please enter a valid Github link</p>

				<div class="row">

					<div class="large-5 medium-5 columns">

						<p>Please enter a valid Github link below</p>

						{{ Form::open(['route'=>'projects.store']) }}

							{{ Form::label('url', 'Gitrepository URL:') }}
							{{ Form::url('url')}}
									
							{{ Form::label('projectName', 'Project name:',['class' => 'form-label']) }}
							{{ Form::text('projectName', null, ['class' => 'form-control']) }}

							{{ Form::submit('Submit Repository', ['class'=>'submit button']) }}

						{{ Form::close() }}

					</div>

				</div>
			@endif
		</div>
	</div>

@stop