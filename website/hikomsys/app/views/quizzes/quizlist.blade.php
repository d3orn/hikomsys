@extends('layouts.default')

@section("header")
@stop

@section("content")

	<div style="width: 300px; overflow: auto; height: 100px;">

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