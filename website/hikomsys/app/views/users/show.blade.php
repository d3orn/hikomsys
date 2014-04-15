@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<h2> {{ $user->username }} </h2>
		
		<label for="firstname">First Name:</label>
		<input type="text">{{ $user->firstname }}</input>
		


@stop