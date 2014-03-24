@extends('layouts.default')

@section("styles")
@stop

@section("content")

		<h2>How do you know your system?</h2>
		 
		<p>Welcome back {{ Auth::user()->firstname }} on How I KnOw My SYStem.</p>

		<div class="row">

			<div class="large-5 medium-5 columns">

				<p>Please enter a valid Github link below</p>

				{{ Form::open(['route'=>'projects.store']) }}

					{{ Form::label('url', 'Gitrepository URL:') }}
					<div class="row collapse">
						<div class="small-3 large-2 columns">
							<span class="prefix">https://</span>
						</div>
						<div class="small-9 large-10 columns">
							{{ Form::url('url')}}
						</div>
					</div>
						
							
					{{ Form::label('projectName', 'Project name:',['class' => 'form-label']) }}
					{{ Form::text('projectName', null, ['class' => 'form-control']) }}

					{{ Form::submit('Submit Repository', ['class'=>'submit button']) }}

				{{ Form::close() }}

			</div>

		</div>

@stop