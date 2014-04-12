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
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Time</th>
							<th>Points</th>
							<th>View</th>
						</tr>
					</thead>
					<tbody>
						@foreach($quizzes as $quiz)
							<tr>
								<td>{{ 
									$date = $quiz->created_at;
									explode(' ', $date);
									$date[0];
								 }}</td>
								<td>bla</td>
								<td>{{ $quiz->points }}</td>
								<td>
									{{ HTML::linkRoute('quizzes.show', "Inspect", [$quiz->id], ['class'=>'small button radius']) }}
								</td>
							</tr>
						@endforeach
					</tbody>
				</table>
			@else
				<p>You did not finish a quiz up to this point, go to your projects and start now!</p>
			@endif

		</div>
	</div>
</div>


	
@stop