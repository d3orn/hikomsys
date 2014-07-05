@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<div class="row">
		<div class="medium-8 columns">
			<h2>{{ $title }}</h2>

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
								<td>
									{{ HTML::linkRoute('projects.show', 'Start new Quiz', [$project->project_id], ['class'=>'small button radius'])}}
									{{ HTML::linkRoute('projects.ranking', 'Ranking', ['project_id' => $project->project_id], ['class'=>'secondary small button radius']) }}
									{{ HTML::linkRoute('quizzes.index', 'Solutions', ['project_id' => $project->project_id], ['class'=>'success small button radius']) }}
								</td>
							</tr>
						@endforeach
					</tbody>
				</table>
			@else
				<p> Sorry you did not upload any projects yet, please do so by filling out the form below </p>

				{{ Form::open(['route'=>'projects.store']) }}

					<div class="row">
						<div class="medium-4 columns">   
							{{ Form::label('url', 'URL to your Git Repository:', ['class' => 'left inline']) }}
						</div>
				 		<div class="medium-8 columns">
							{{ Form::url('url')}}
						</div>
					</div>

					<div class="row">
						<div class="medium-4 columns">							
							{{ Form::label('projectName', 'Project name:', ['class' => 'left inline']) }}
						</div>
				 		<div class="medium-8 columns">
							{{ Form::text('projectName') }}
						</div>
					</div>

				{{ Form::submit('Upload my Project', ['class'=>'submit button']) }}

			@endif
		</div>
	</div>

@stop