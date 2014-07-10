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
							<ul>
								<li>{{ $userranking->username }}</li>
								<li>	
									{{ $userranking->result. "%"}}
								</li>
								@if($userranking->username == Auth::user()->username)
									<li class="progress success">
								@else	
									<li class="progress">
								@endif
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

