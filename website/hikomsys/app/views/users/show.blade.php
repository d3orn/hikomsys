@extends('layouts.default')

@section("styles")
@stop

@section("header")
	<header class="panel">
		<a href="{{ route('home') }}">
			<h1 class="row">
				{{ HTML::image('foundation/img/logo.fw.png', 'Hikomsys Logo') }}
				How I KnOw My SYStem
			</h1>
		</a>
	</header>
@stop

@section("content")

    <div class="row">
		<div class="medium-10 columns">
			<h2>{{ $user->username }}</h2>
		</div>
	</div>

	<div class="row">

		<div class="medium-9 columns">
		
		{{ Form::model($user, ['method' => 'PATCH', 'route' => ['users.update', $user->id]]) }}

			<div class="row">
				<div class="medium-3 columns">   	
					{{ Form::label('firstname', 'First Name:', ['class' => 'left inline']) }}
				</div>
			 	<div class="medium-9 columns">
			   		{{ Form::text('firstname', $value = null, ['disabled']) }}
				</div>
			</div>

			<div class="row">
				<div class="medium-3 columns">  
			   		{{ Form::label('lastname', 'Last Name:', ['class' => 'left inline']) }}
				</div>
				<div class="medium-9 columns">
					{{ Form::text('lastname', $value = null, ['disabled']) }}
				</div>
			</div>

			<div class="row">
				<div class="medium-3 columns">  
					{{ Form::label('email', 'E-Mail', ['class' => 'left inline']) }}
				</div>
				<div class="medium-9 columns">
					{{ Form::text('email', $value = null, ['disabled']) }}
				</div>
			</div>

			<div class="row">
				<div class="medium-3 columns">  
					{{ Form::label('description', 'Description', ['class' => 'left inline']) }}
				</div>
				<div class="medium-9 columns">
			   		{{ Form::textarea('description', $value = null, ['disabled']) }}
				</div>
			</div>

		{{ Form::close() }}
		</div>
	</div>

@stop