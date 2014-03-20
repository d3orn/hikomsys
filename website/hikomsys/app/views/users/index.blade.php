@extends('layouts.default')

@section("header")
@stop

@section("content")

	 {{ HTML::ul($users) }}

@stop