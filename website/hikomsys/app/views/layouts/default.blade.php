<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>HIKOMSYS - How I KnOw My SYStem: Home</title>
		
		<meta name="keywords" content="Filler" />
		<meta name="robots" content="all" />
		<meta name="copyright" content="copyright by d3orn, CH-3072 Ostermundigen" />
		<meta name="author" content="www.d3orn.ch" />
		<meta name="description" content="Learn how well YOU know your Java System!">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<link rel="shortcut icon" href="pictures/magnifying_glass.png" type="image/x-icon" />
		<link rel="shortcut icon" href="pictures/magnifying_glass.ico" type="image/x-icon" />
		<link rel="apple-touch-icon" sizes="114×114" href="/touch-icon-114×114.png" />
		<link rel="apple-touch-icon" sizes="72×72" href="/touch-icon-72×72.png" />
		<link rel="apple-touch-icon" sizes="72×72" href="/touch-icon-72×72.png" />
		<link rel="apple-touch-icon" href="/touch-icon-iphone.png" />
		
		{{ HTML::style('css/general.css') }}
		{{ HTML::style('foundation/css/foundation.css') }}
		
		@yield('styles')

		<!-- 
			Thank you for looking at the sources
			
				Concept and realisation by 
				Dominique Rahm www.d3orn.ch
				Copyright © 2014 - All rights reserved
		-->

	</head>
	<body>	
		<div id="wrapper">
			<div class="fixed">
				<nav class="top-bar" data-topbar>
					<ul class="title-area">
						<li class="name">
							<h1>{{ HTML::linkRoute('home', 'Hikomsys') }}</h1>
						</li>
						<li class="toggle-topbar menu-icon"><a href="#">Menu</a></li>
					</ul>

					<section class="top-bar-section">
					<!-- Right Nav Section -->
						<ul class="right">
							@if(Auth::check())
								<li>{{ HTML::linkRoute('users.edit', 'Profile', [Auth::user()->id]) }}</li>
								<li class="divider"></li>
								<li>{{ HTML::linkRoute('projects.index', 'Projects') }}</li>
								<li class="divider"></li>
								<li>{{ HTML::linkRoute('users.showall', 'Users') }}</li>
								<li class="divider"></li>
								<li>{{ HTML::linkRoute('projects.showall', 'All Projects') }}</li>
								<li class="divider"></li>
								<li class="has-form">{{ HTML::link('#', 'Random Quiz',['class'=>'button success']) }}</li>
								<li class="divider"></li>
								<li class="has-form">{{ HTML::link('logout', 'Logout',['class'=>'button']) }}</li>
							@else
								<li class="has-form">{{ HTML::link('login', 'Login',['class'=>'button']) }}</li>
								{{-- TODO need a login directly in nav --}}
							@endif
						</ul>
						<!-- Left Nav Section -->
						<ul class="left"></ul>
					</section>
				</nav>
			</div>

			<header class="panel">
				<h1 class="row">
					{{ HTML::image('foundation/img/logo.fw.png', 'Hikomsys Logo') }}
					How I KnOw My SYStem
				</h1>
			</header>
			<main class="row">

				@if(Session::has('message'))
					<div data-alert data-options="animation_speed:500;" class="alert-box warning large-10">
						{{Session::get('message')}}
						<a href="#" class="close">&times;</a>
					</div>
				@endif
	
				<section class="row">
					@yield('content')
				</section>
			</main>	
			<footer class="bottom-bar">	
				<section class="footertext">
					<address>Dominique Rahm &middot {{ HTML::mailto('d3orn@hikomsys.ch', 'Send me some Feedback')}} &middot <a href="http://www.twitter.com/d3orn" target="blank">@deorn</a></address>
				</section>
			</footer>

			{{ HTML::script('http://code.jquery.com/jquery-1.10.1.min.js') }}
			{{ HTML::script('http://code.jquery.com/jquery-migrate-1.2.1.min.js') }}
			{{ HTML::script('foundation/js/foundation.min.js') }}	
			{{ HTML::script('foundation/js/vendor/modernizr.js') }}
			
			@yield('scripts')

			<script>
		 		$(document).foundation();
			</script>

		</div>	
	</body>
</html>