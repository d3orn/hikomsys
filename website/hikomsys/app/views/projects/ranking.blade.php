@extends('layouts.default')

@section("styles")
@stop

@section("content")

	{{ var_dump($ranking) }}
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

