@extends('layouts.default')

@section("styles")
@stop

@section("header")
	<header class="panel">
		<a href="{{ route('home') }}">
			<h1 class="row">
				{{ HTML::image('foundation/img/logo.fw.png', 'Hikomsys Logo') }}
				How I KnOw My SYStem
			</h1>
		</a>
	</header>
@stop

@section("content")

	<div class="row">
		<div class="large-12 columns">
			<h2>How do you know your system?</h2>

			<p>Welcome back {{ Auth::user()->firstname }} on How I KnOw My SYStem.</p>
		</div>
	</div>

	<div class="row">
		<div class="medium-8 columns">

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
									{{ HTML::linkRoute('projects.show', 'Start new Quiz', ['project_id' => $project->id], ['class'=>'small button radius'])}}
									{{ HTML::linkRoute('projects.ranking', 'Ranking', ['project_id' => $project->id], ['class'=>'secondary small button radius']) }}
									{{ HTML::linkRoute('quizzes.index', 'Solutions', ['project_id' => $project->id], ['class'=>'success small button radius']) }}
								</td>
							</tr>
						@endforeach
					</tbody>
				</table>
			@else
				<p> Sorry you did not upload any projects yet, please do so by filling out the form below </p>
			@endif
		</div>

		<div class="medium-4 columns">
			<div class="panel callout radius">
				<h3>Awesome!</h3>
				<p>You don't want to upload a project yet? You just want to see what others submitted?</p>
				<p>No Problem! Just select one of the projects on the left.</p>
			</div>
		</div>

	</div>

	<div class="row">

		<div class="medium-8 columns">

			<p>The first step you have to take is to upload one of your Opensource Java projects from Github. To do so, please enter a valid link to a Github Repository below</p>

			@if($errors->has())
				<div id="errors">
					<ul>
						@foreach($errors->all() as $error)
							<li>{{ $error }}</li>
						@endforeach
					</ul>
				</div>
			@endif

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

			{{ Form::close() }}

		</div>

	</div>

@stop
