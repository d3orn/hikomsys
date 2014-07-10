@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<div class="row">
		<div class="medium-12 column">
			<h2>{{ $projectName }}</h2>
		</div>
	</div>
	<div class="row">
		<div class="medium-10 columns" id="ranking">
			@if($ranking)
				<ol>
					@foreach($ranking as $userranking)
						<li>
						@if($userranking->username == Auth::user()->username)
							{{ 'hello there' }}
							<ul class='current-user'>
						@else	
							<ul>
						@endif
								<li>{{ $userranking->username }}</li>
								<li>	
									{{ $userranking->result. "%"}}
								</li>
								<li class="progress">
									{{ "<span class=\"meter\" style=\"width: ".$userranking->result."%\"></span>" }}	
								</li>
								<li>
									{{ HTML::linkRoute('quizzes.show', "Checkout!", [$userranking->id]) }}
								</li>
							</ul>
						</li>
					@endforeach

				</ol>
			@endif
		</div>
	</div>

@stop

