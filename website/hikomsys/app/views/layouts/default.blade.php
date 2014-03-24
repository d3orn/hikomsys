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
		
		{{ HTML::style('css/cssreset.css') }}
		{{ HTML::style('css/general.css') }}
		{{ HTML::style('foundation/css/foundation.css') }}
		
		@yield('styles')

    	<script src="js/vendor/modernizr.js"></script>

		<!-- 
			Thank you for looking at the sources
			
				Concept and realisation by 
				Dominique Rahm www.d3orn.ch
				Copyright © 2014 - All rights reserved
		-->

	</head>
	<body>	
		<div id="wrapper">
			<nav class="top-bar" data-topbar>
			  <ul class="title-area">
			    <li class="name">
			      <h1><a href="#">Hikomsys</a></h1>
			    </li>
			    <li class="toggle-topbar menu-icon"><a href="#">Menu</a></li>
			  </ul>

			  <section class="top-bar-section ">
			    <!-- Right Nav Section -->
			    <ul class="right">
			     	@if(Auth::check())
						<li class="has-form">{{ HTML::link('logout', 'Logout',['class'=>'small button']) }}</li>
					@else
						<li>{{ HTML::link('login', 'Login') }}</li>
					@endif
			    </ul>

			    <!-- Left Nav Section -->
			    <ul class="left">
			      	<li>{{ HTML::linkRoute('home', 'Home') }}</li>
			      	<li class="divider"></li>
				 	@if(Auth::check())
                    	<li>{{ HTML::linkRoute('users.edit', 'Profile', [Auth::user()->id]) }}</li>
                    	<li class="divider"></li>
                    	<li>{{ HTML::linkRoute('projects.index', 'Projects') }}</li>
                    	<li class="divider"></li>
                    	<li>{{ HTML::linkRoute('users.showall', 'Users') }}</li>
                    	<li class="divider"></li>
                    	<li>{{ HTML::linkRoute('projects.showall', 'All Projects') }}</li>
                    	<li class="divider"></li>
                    @else
                    	{{-- TODO need a login directly in nav --}}
                	@endif
			    </ul>
			  </section>
			</nav>

			<header>
				<h1>How I KnOw My SYStem</h1>
			</header>
			<main class="row">

				@if(Session::has('message'))
					<p id="message">
						{{Session::get('message')}}
					</p>
				@endif
				<section>
					@yield('content')
				</section>
			</main>	
			<footer>
				<div>
					<address>Dominique Rahm &middot {{ HTML::mailto('d3orn@hikomsys.ch', 'Send me some Feedback')}} &middot <a href="http://www.twitter.com/d3orn" target="blank">@deorn</a></address>
				</div>
			</footer>

			{{ HTML::script('http://code.jquery.com/jquery-1.10.1.min.js') }}
			{{ HTML::script('http://code.jquery.com/jquery-migrate-1.2.1.min.js') }}
			{{ HTML::script('foundation/js/foundation.min.js') }}
			
			@yield('scripts')

			<script>
		   		$(document).foundation();
		    </script>

		</div>	
	</body>
</html>