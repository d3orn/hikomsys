@extends('layouts.default')

@section("header")
@stop

@section("content")

	{{ count($users) }}

	@if(count($users) > 1 )
		<ul>
		@foreach($users as $user)
			<li>{{ HTML::linkRoute('users.show', $user->username, [$user->id]) }}</li>
		@endforeach
		</ul>
	@else
		<p>You are currently the only user on HIKOMSYS</p>
	@endif
	
@stop