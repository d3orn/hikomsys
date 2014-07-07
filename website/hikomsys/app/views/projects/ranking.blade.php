@extends('layouts.default')

@section("styles")
@stop

@section("content")

	{{ var_dump($ranking) }}
	<div class="row">
		<div class="medium-8 columns" id="ranking">
			@if($ranking)
				<ol>
					
					@foreach($ranking as $userranking)
						<li>
							<ul>
								<li>{{ $userranking->username }}</li>
								<li>
									<div class="progress">
										{{ "<span class=\"meter\" style=\"width: ".$userranking->result."%\"></span>" }}	
									</div>
								</li>
								<li>	
									{{ $userranking->result. "%"}}
								</li>
							</ul>
						</li>
					@endforeach

				</ol>
			@endif
		</div>
	</div>

@stop

