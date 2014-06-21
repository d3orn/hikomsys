@extends('layouts.default')

@section("styles")
@stop

@section("content")

	 {{ HTML::ul($users) }}

@stop