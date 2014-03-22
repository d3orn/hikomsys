<html>
	<head>
		<title>HIKOMSYS - How I KnOw My SYStem: Home</title>
		
		<meta name="keywords" content="Filler" />
		<meta name="robots" content="all" />
		<meta name="copyright" content="copyright by d3orn, CH-3072 Ostermundigen" />
		<meta name="author" content="www.d3orn.ch" />
		
		<link rel="shortcut icon" href="pictures/magnifying_glass.png" type="image/x-icon" />
		<link rel=”apple-touch-icon” sizes=”114×114? href=”/touch-icon-114×114.png” />
		<link rel=”apple-touch-icon” sizes=”72×72? href=”/touch-icon-72×72.png” />
		<link rel=”apple-touch-icon” href=”/touch-icon-iphone.png” />
		
		{{ HTML::style('css/cssreset.css') }}
		{{ HTML::style('css/general.css') }}
		{{ HTML::style('//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css') }}

		<!-- 
			Thank you for looking at the sources
			
				Concept and realisation by 
				Dominique Rahm www.d3orn.ch
				Copyright © 2014 - All rights reserved
		-->

		@yield('header')

	</head>
	<body>
		<div id="wrapper">
			<div id="logo">
				<div class="boxed">How I KnOw My SYStem</div>
			</div>
			<div id="navi">
				<ul>
					<li>{{ HTML::linkRoute('home', 'Home') }}</li>
				 	@if(Auth::check())
                    	<li>{{ HTML::linkRoute('users.edit', 'Profile', [Auth::user()->id]) }}</li>
                    	<li>{{ HTML::linkRoute('projects.index', 'Projects') }}</li>
                    	<li>{{ HTML::linkRoute('users.showall', 'Users') }}</li>
                    	<li>{{ HTML::linkRoute('projects.showall', 'All Projects') }}</li>
                    	<li>{{ HTML::link('logout', 'Logout') }}</li>
                	@endif
				</ul>
			</div>
			<div id="maincontent">

				@if(Session::has('message'))
					<p id="message">
						{{Session::get('message')}}
					</p>
				@endif
				@yield('content')
				
			</div>	
			<div id="footer">
				<div class="boxed">
					<address>Dominique Rahm &middot {{ HTML::mailto('d3orn@hikomsys.ch', 'Send me some Feedback')}} &middot <a href="http://www.twitter.com/d3orn" target="blank">@deorn</a></address>
				</div>
			</div>
	
		{{ HTML::script('http://code.jquery.com/jquery-1.10.1.min.js') }}
		{{ HTML::script('http://code.jquery.com/jquery-migrate-1.2.1.min.js') }}
		{{ HTML::script('//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js') }}

	</body>
</html>
