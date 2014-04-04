@extends('layouts.default')

@section("styles")
	{{ HTML::style('css/scrollableList.css') }}
@stop

@section("content")

	<div id='scrollbox'>

		@if(count($quizzes) > 0 )
			<ul>
			@foreach($quizzes as $quiz)
				<li>{{ HTML::linkRoute('quizzes.show', $quiz->id, [$quiz->id]) }}</li>
			@endforeach
			</ul>
		@else
			<p>You did not finish a quiz up to this point, go to your projects and start now!</p>
		@endif

	</div>
	
@stop