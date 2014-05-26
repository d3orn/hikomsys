@extends('layouts.default')

@section("styles")
@stop

@section("content")

	<div class="row">
		<div class="medium-8 columns">
			<h2> Edit your profile </h2>
		</div>
	</div>

	<div class="row">

		<div class="medium-9 columns">
		
		{{ Form::model($user, ['method' => 'PATCH', 'route' => ['users.update', $user->id]]) }}

			<div class="row">
				<div class="medium-2 columns">
					{{ HTML::image($user->picturepath, 'Profile Picture') }}
					{{ Form::label('picturepath', 'Profile Picture', ['class' => 'left inline']) }}
			   		{{ Form::file('picturepath') }}
				</div>
			 	<div class="medium-8 columns">
				</div>
			</div>

			<div class="row">
				<div class="medium-3 columns">   	
					{{ Form::label('firstname', 'First Name:', ['class' => 'left inline']) }}
				</div>
			 	<div class="medium-8 columns">
			   		{{ Form::text('firstname') }}
				</div>
			</div>

			<div class="row">
				<div class="medium-3 columns">  
			   		{{ Form::label('lastname', 'Last Name:', ['class' => 'left inline']) }}
				</div>
				<div class="medium-8 columns">
					{{ Form::text('lastname') }}
				</div>
			</div>

			<div class="row">
				<div class="medium-3 columns">  
					{{ Form::label('email', 'E-Mail', ['class' => 'left inline']) }}
				</div>
				<div class="medium-8 columns">
					{{ Form::text('email') }}
				</div>
			</div>

			<div class="row">
				<div class="medium-3 columns">  
					{{ Form::label('username', 'Username', ['class' => 'left inline']) }}
				</div>
				<div class="medium-8 columns">
					{{ Form::text('username') }}
				</div>
			</div>

			<div class="row">
				<div class="medium-3 columns">  
					{{ Form::label('description', 'Description', ['class' => 'left inline']) }}
				</div>
				<div class="medium-8 columns">
			   		{{ Form::textarea('description') }}
				</div>
			</div>

			{{ Form::submit('Update Profile', ['class'=>'submit button']) }}

		{{ Form::close() }}
		</div>
	</div>

@stop