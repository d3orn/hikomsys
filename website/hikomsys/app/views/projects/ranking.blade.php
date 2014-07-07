@extends('layouts.default')

@section("styles")
@stop

@section("content")

	{{ var_dump($ranking) }}
	@if($ranking)
		<ol>
			<li>
				<ul>
					<li>User1</li>
					<li>
						<div class="progress">
							<span class="meter" style="width: 50%"></span>
						</div>
					</li>
				</ul>
			</li>
			<li>
				<ul>
					<li>User1</li>
					<li>
						<div class="progress">
							<span class="meter" style="width: 50%"></span>
						</div>
					</li>
				</ul>
			</li>
		</ol>
	@endif

@stop