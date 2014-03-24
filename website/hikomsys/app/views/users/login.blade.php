@extends('layouts.default')
@section("content")

	<div class="large-12 columns">
		<h2>Welcome on Hikomsys</h2>
		<p> If you are new please {{ HTML::linkRoute('users.create', 'Sign up') }} , else sign in below </p>
	</div>
	<div class="row"></div>
		<div class="large-5 medium-5 columns">
			<h2>Login</h2>

			{{ Form::open(['route'=>'sessions.store']) }}
			  
					<div class="">
						{{ Form::label('username', 'Username') }}
					    {{ Form::text('username', null, ['placeholder'=>'Username', 'class' => 'large-12 columns']) }}

					    {{ Form::label('password', 'Password') }}
					    {{ Form::password('password', ['placeholder'=>'Password','class' => 'large-12 columns']) }}
					</div>

			    {{ Form::submit('Login', ['class'=>'submit button'])}}
			{{ Form::close() }}
		</div>
		<div class="panel large-7 medium-7 columns">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, sed, maiores, tempore itaque quaerat nisi aliquid inventore ducimus ipsa saepe sunt enim voluptate velit. Cupiditate, doloribus, harum laborum eligendi id numquam culpa dolor sunt fuga beatae tempora quisquam temporibus. Nemo, cumque, fugit, autem, quia ullam neque aperiam deleniti quas quos praesentium molestias eaque vitae dolore et veniam? Voluptatem, fugit, laborum, temporibus nesciunt alias est enim minus reiciendis qui culpa provident numquam ullam optio officia nisi possimus debitis rem. Laboriosam, amet, doloremque, hic dicta aperiam quis modi asperiores quam veritatis earum tempora non dolores excepturi aliquid quidem ratione eaque! Molestiae, delectus.</p>
		</div>
	</div>
@stop