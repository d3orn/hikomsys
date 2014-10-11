@extends('layouts.default')

@section('styles')
	{{ HTML::style('css/add-footer.css') }}
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
		<div class="large-12 columns">
			<h2>Welcome on Hikomsys</h2>
			<p> If you are new please {{ HTML::linkRoute('users.create', 'Sign up') }} , else sign in below </p>
		</div>
	</div>
	<div class="row">
		<div class="large-5 medium-5 columns">
			<h2>Login</h2>

			{{ Form::open(['route'=>'sessions.store']) }}
			  
						{{ Form::label('email', 'Email') }}
					    {{ Form::email('email', null, ['placeholder'=>'Email']) }}

					    {{ Form::label('password', 'Password') }}
					    {{ Form::password('password', ['placeholder'=>'Password']) }}

			    {{ Form::submit('Login', ['class'=>'submit button'])}}
			{{ Form::close() }}
		</div>
		<div class="panel large-7 medium-7 columns">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, sed, maiores, tempore itaque quaerat nisi aliquid inventore ducimus ipsa saepe sunt enim voluptate velit. Cupiditate, doloribus, harum laborum eligendi id numquam culpa dolor sunt fuga beatae tempora quisquam temporibus. Nemo, cumque, fugit, autem, quia ullam neque aperiam deleniti quas quos praesentium molestias eaque vitae dolore et veniam? Voluptatem, fugit, laborum, temporibus nesciunt alias est enim minus reiciendis qui culpa provident numquam ullam optio officia nisi possimus debitis rem. Laboriosam, amet, doloremque, hic dicta aperiam quis modi asperiores quam veritatis earum tempora non dolores excepturi aliquid quidem ratione eaque! Molestiae, delectus.</p>
		</div>
	</div>
@stop

@section('footer')
	<div class="row">
		<div class="medium-12 columns">
			<section id="links" class="row">
				<div class="medium-4 columns">
					<a href="http://www.pharo-project.org/home" target="_blank">
						{{ HTML::image('foundation/img/pharo.fw.png', 'Smalltalk Pharo Logo') }}
					</a>	
					<p>a clean, innovative, free open-source Smalltalk-inspired environment</p>
				</div>
				<div class="medium-5 columns">
					<div class="vertDivider"></div>
					<p>a platform for software and data analysis</p>
					<a href="http://www.moosetechnology.org/" target="_blank">	
						{{ HTML::image('foundation/img/mooseTech.fw.png', 'Moose Technology Logo') }}
					</a>
				</div>	
				<div class="medium-3 columns left">
					<div class="vertDivider"></div>
					<a href="http://www.d3orn.ch" target="_blank">
						{{ HTML::image('foundation/img/d3orn.fw.png', 'd3orn Logo') }}
					</a>	
				</div>	
			</section>
		</div>
	</div>
	<hr>
@stop