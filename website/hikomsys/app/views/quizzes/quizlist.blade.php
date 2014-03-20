@extends('layouts.default')

@section("header")
@stop

@section("content")

	{{ count($quizzes) }}

	@if(count($quizzes) > 0 )
		<ul>
		@foreach($quizzes as $quiz)
			<li>{{ HTML::linkRoute('quiz.show', $user->username, [$user->id]) }}</li>
		@endforeach
		</ul>
	@else
		<p>You did not finish a quiz up to this point, go to your projects and start now!</p>
	@endif
	
@stop