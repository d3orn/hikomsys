@extends('layouts.default')

@section("styles")
@stop

@section("content")

	{{ var_dump($ranking) }}
	@if($ranking)
		<table class="table table-striped">
			<thead>
				<tr>
					<th>User</th>
					<th>Result</th>
				</tr>
			</thead>
			<tbody>
				<th>Testuser</th>
				<th>
					<div class="progress">
						<span class="meter" style="width: 50%"></span>
					</div>
				</th>
			</tbody>
		</table>
	@endif

@stop