@extends('layouts.default')

@section("styles")
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

				<p>The first step you have to take is to upload one of your Opensource Java projects. To do so, please enter a valid link to a Git Repository below</p>

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
		
			<div class="medium-4 columns">
				<div class="panel callout radius">
					<h3>This is a callout pannel.</h3>
					<p>hello there!</p>
				</div>
			</div>
		</div>

@stop