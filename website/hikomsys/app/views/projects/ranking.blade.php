@extends('layouts.default')

@section("styles")
@stop

@section("content")

	{{ var_dump($ranking) }}
	@if($ranking)
		<table class="table table-striped">
			<thead>
				<tr>
					<th>Project Name</th>
					<th>Version</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				
			</tbody>
		</table>
	@else

	<div class="progress">
		<span class="meter" style="width: 50%"></span>
	</div>

@stop