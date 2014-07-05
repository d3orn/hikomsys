<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>HIKOMSYS - How I KnOw My SYStem: Home</title>
		
		<meta name="keywords" content="Filler">
		<meta name="robots" content="all">
		<meta name="dcterms.rights" content="copyright by d3orn, CH-3072 Ostermundigen">
		<meta name="author" content="www.d3orn.ch">
		<meta name="description" content="Learn how well YOU know your Java System!">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<!-- Favions sind da aber apple icon fehlen noch  -->
		<link rel="shortcut icon" href="pictures/magnifying_glass.png" type="image/x-icon">
		<link rel="shortcut icon" href="pictures/magnifying_glass.ico" type="image/x-icon">
		<link href="/apple-touch-icon.png" rel="apple-touch-icon">
		<link href="/apple-touch-icon-76x76.png" rel="apple-touch-icon" sizes="76x76">
		<link href="/apple-touch-icon-120x120.png" rel="apple-touch-icon" sizes="120x120">
		<link href="/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152">
		
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
								<li class="has-dropdown">
									<a href="#">{{ Auth::user()->username }}</a>
									<ul class="dropdown">
										<li>{{ HTML::linkRoute('users.edit', 'Edit My Profile', [Auth::user()->id]) }}</li>
										<li>{{ HTML::linkRoute('projects.index', 'Projects') }}</li>
									</ul>
								</li>	
								<li class="divider"></li>
								<li id="navUsers">{{ HTML::linkRoute('users.showall', 'Users') }}</li>
								<li class="divider"></li>
								<li id="navAllProjects">{{ HTML::linkRoute('projects.showall', 'All Projects') }}</li>
								<li class="divider"></li>
								
								<li class="has-form">
									<form>
										<div class="row collapse">
											<div class="large-8 small-9 columns">
												<input type="text" placeholder="Find Stuff">
											</div>
											<div class="large-4 small-3 columns">
												<a href="#" class="alert button expand">Search</a>
											</div>
										</div>
									</form>
								</li>
								<li class="divider"></li>
								<li class="has-form">{{ HTML::linkRoute('projects.random', 'Random Quiz', null, ['class'=>'button success']) }}</li>
								<li class="divider"></li>
								<li class="has-form">{{ HTML::link('logout', 'Logout', ['class'=>'button']) }}</li>
							@else
								<li class="has-form">{{ HTML::link('login', 'Login', ['class'=>'button']) }}</li>
								{{-- TODO need a login directly in nav --}}
							@endif
						</ul>
						<!-- Left Nav Section -->
						<ul class="left"></ul>
					</section>
				</nav>
			</div>

			<header class="panel">
				<a href="{{ route('home') }}">
					<h1 class="row">
						{{ HTML::image('foundation/img/logo.fw.png', 'Hikomsys Logo') }}
						How I KnOw My SYStem
					</h1>
				</a>
			</header>
			<main>
				@if(Session::has('message'))
					<div class="row">
						<div data-alert data-options="animation_speed:500;" class="alert-box success large-12 columns">
							{{Session::get('message')}}
							<a href="#" class="close">&times;</a>
						</div>
					</div>
				@endif
				@if(Session::has('error'))
					<div class="row">
						<div data-alert data-options="animation_speed:500;" class="alert-box alert large-12 columns">
							{{Session::get('error')}}
							<a href="#" class="close">&times;</a>
						</div>
					</div>
				@endif
	
				<section>
					@yield('content')
				</section>
			</main>	
			<div class="push"></div>
		</div>
		<footer>
			@yield('footer')
			<div class="row">
				<div class="medium-12 columns">
					<section class="footertext">
						<address>Dominique Rahm &middot; {{ HTML::mailto('d3orn@hikomsys.ch', 'Send me some Feedback')}} &middot; <a href="http://www.twitter.com/d3orn" target="blank">@deorn</a></address>
					</section>
				</div>
			</div>
		</footer>

		{{ HTML::script('http://code.jquery.com/jquery-1.10.1.min.js') }}
		{{ HTML::script('http://code.jquery.com/jquery-migrate-1.2.1.min.js') }}
		{{ HTML::script('foundation/js/foundation.min.js') }}	
		{{ HTML::script('foundation/js/vendor/modernizr.js') }}

		<!--[if lt IE 9]>
			{{ HTML::script('javascript/html5shiv.min.js') }}
		<![endif]-->
		
		@yield('scripts')

		<script>
	 		$(document).foundation();
		</script>

	</body>
</html>