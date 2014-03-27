@extends('layouts.default')

@section("styles")
@stop

@section("content")
    
    <div class="row">
    	<div class="medium-10 columns">
			<h1> Edit your profile </h1>
		</div>
	</div>
	
		     {{ Form::model($user, ['method' => 'PATCH', 'route' => ['users.update', $user->id]]) }}

				<div class="row">
		        	<div class="small-3 columns">   	
		            	{{ Form::label('firstname', 'First Name:') }}
		            </div>
		            <div class="small-9 columns">
		           		{{ Form::text('firstname') }}
		            </div>
				</div>
	
		            {{ Form::label('lastname', 'Last Name:') }}
		            {{ Form::text('lastname') }}

		            {{ Form::label('email', 'E-Mail') }}
		            {{ Form::text('email') }}

		            {{ Form::label('username', 'Username') }}
		            {{ Form::text('username') }}

		            {{ Form::label('description', 'Description') }}
		            {{ Form::textarea('description') }}

				{{ Form::submit('Update Profile', ['class'=>'submit button']) }}
		    {{ Form::close() }}
	    </div>
	</div>

@stop