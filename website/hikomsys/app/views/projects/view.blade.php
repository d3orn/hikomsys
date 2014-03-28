@extends('layouts.default')

@section("styles")
	{{ HTML::style('javascripts/jstree3/dist/themes/default/style.min.css') }}
@stop


@section("content")
	<div class="row">
		<h1>{{ $project->name }}</h1>  

		<p> Please select the packages you think are most important for your project. Your knowledge will be tested base on the selection you made. </p> 
		{{ Form::open(['route' => 'quizzes.store', 'id' => 'package_viewer' , 'class' => 'col-md-4']) }}

			<div id="package_list">
				<ul>
					{{ Helpers::recursiveTree($cursor, $collection) }}
				</ul>
			</div>
			{{ Form::hidden('project_id', $project->id) }}
			{{Form::submit('Start Quiz', ['class'=>'submit btn btn-primary'])}}

		{{Form::close()}}
	</div>

@stop

@section("scripts")
		{{ HTML::script('javascripts/jstree3/dist/jstree.min.js') }}
		{{ HTML::script('javascripts/packageViewer.js') }}
@stop