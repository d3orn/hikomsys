@extends('layouts.default')

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
	<h1>{{ $project->name }}</h1>  

	<p> Please select the packages you think are most important for your project. Your knowledge will be tested base on the selection you made. </p> 
	{{ Form::open(array('route' => 'quizzes.store', 'id' => 'package_viewer')) }}

		<div id="package_list">
			<ul>
				{{ Helpers::recursiveTree($cursor, $collection) }}
			</ul>
		</div>
		{{ Form::hidden('id', $project->id) }}
		{{Form::submit('Start Quiz')}}

	{{Form::close()}}

@stop

@section("scripts")
	{{ HTML::script('javascripts/jstree/jquery.jstree.js') }}
	{{ HTML::script('javascripts/jstree/_lib/jquery.cookie.js') }}
	{{ HTML::script('javascripts/packageViewer.js') }}
@stop