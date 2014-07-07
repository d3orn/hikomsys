@extends('layouts.default')

@section("styles")
@stop

@section("content")

	{{ var_dump($ranking) }}
	<div class="row">
		<div class="medium-8 columns">
			@if($ranking)
				<ol>
					
					@foreach($ranking as $userranking)
						<li>
							<ul>
								<li>{{ $userranking->username }}</li>
								<li>
									<div class="progress">
										<span class="meter" style="width: 50%"></span>
									</div>
								</li>
							</ul>
						</li>
					@endforeach

				</ol>
			@endif
		</div>
	</div>

@stop

