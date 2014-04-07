@extends('layouts.default')

@section("styles")
	{{ HTML::style('css/scrollableList.css') }}
@stop

@section("content")

<div class="row">
	<div class="medium-12 columns">
		<h2>{{ $projectName }}</h2>
	</div>
</div>

<div class="row">
	<div class="medium-8 columns">
		<div id='scrollbox'>

			@if(count($quizzes) > 0 )
				<ul>
				@foreach($quizzes as $quiz)
					<li>{{ HTML::linkRoute('quizzes.show',"Date: ".$quiz->created_at."points: ".$quiz->points, [$quiz->id]) }}</li>
				@endforeach
				</ul>
			@else
				<p>You did not finish a quiz up to this point, go to your projects and start now!</p>
			@endif

		</div>
	</div>
</div>


	
@stop