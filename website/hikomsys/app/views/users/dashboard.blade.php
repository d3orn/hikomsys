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

				<p>Please enter a valid Github link below</p>

				{{ Form::open(['route'=>'projects.store']) }}

					<div class="row">
						<div class="medium-3 columns">   
							{{ Form::label('url', 'URL to your Git Repository:') }}
						</div>
				 		<div class="medium-9 columns">
						{{ Form::url('url')}}
						</div>
					</div>

					<div class="row">
						<div class="medium-3 columns">							
							{{ Form::label('projectName', 'Project name:',['class' => 'form-label']) }}
						</div>
				 		<div class="medium-9 columns">
							{{ Form::text('projectName', null, ['class' => 'form-control']) }}
						</div>
					</div>

					{{ Form::submit('Submit Repository', ['class'=>'submit button']) }}

				{{ Form::close() }}

			</div>

		</div>

@stop