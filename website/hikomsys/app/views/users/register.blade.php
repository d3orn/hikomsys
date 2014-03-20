@extends('layouts.default')

@section("content")

    <h1>Sign Up now!</h1>
    <p>To find out how well you know your code just fill out the form below and you are ready to go!</p>
     
    @if($errors->has())
        <div id="errors">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    {{ Form::open(array('url'=>'users')) }}
        
        <fieldset>
            {{ Form::label('username', 'Username') }}
            {{ Form::text('username', null, array('placeholder'=>'Username')) }}

            {{ Form::label('firstname', 'Firstname') }}
            {{ Form::text('firstname', null, array('placeholder'=>'First Name')) }}

            {{ Form::label('lastname', 'Lastname') }}
            {{ Form::text('lastname', null, array('placeholder'=>'Last Name')) }}

            {{ Form::label('email', 'E-Mail') }}
            {{ Form::text('email', null, array('placeholder'=>'Email Address')) }}

            {{ Form::label('password', 'Password') }}
            {{ Form::password('password', array ('placeholder'=>'Password')) }}

            {{ Form::label('password_confirmation', 'Password') }}
            {{ Form::password('password_confirmation', array('placeholder'=>'Confirm Password')) }}
        </fieldset>

    {{ Form::submit('Sign Up', array('class'=>'submit'))}}

@stop