@extends('layouts.default')

@section("styles")
	{{ HTML::style('javascripts/jstree3/dist/themes/default/style.min.css') }}
@stop


@section("content")
	<div class="row">
		<div class="medium-12 columns">
			<h1>{{ $project->name }}</h1>  

			<p> Please select the packages you think are most important for your project. Your knowledge will be tested base on the selection you made. </p> 
		</div>
	</div>
	<div class="row">
		<div class="medium-12 columns">
			{{ Form::open(['route' => 'quizzes.store', 'id' => 'package_viewer']) }}

				<div id="package_list">
					<ul>
						{{ Helpers::recursiveTree($cursor, $collection) }}
					</ul>
				</div>
				{{ Form::hidden('project_id', $project->id) }}
				<br>
				{{Form::submit('Start Quiz', ['class'=>'submit button'])}}
			{{Form::close()}}
		</div>
	</div>

@stop

@section("scripts")
		{{ HTML::script('javascripts/jstree3/dist/jstree.min.js') }}
		{{ HTML::script('javascripts/packageViewer.js') }}
@stop