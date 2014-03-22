@extends('layouts.default')
@section('header')
	{{ HTML::style('css/kinetic.css') }}
	{{ HTML::style('css/style.css') }}
@stop

@section('content')
	<h2>Draw the dependencies</h2>
	<p>
		Please draw the dependencies between the packages you selected previously. 
	</p>	
	<div id="menu">
		<div id="move" aria-hidden="true" data-icon="&#xe601;" class="icon-expand activatedIcon buttonlike"></div>
		<div id="draw" aria-hidden="true" data-icon="&#xe602;" class="icon-loop gradientBG buttonlike"></div>
		<div id="help" class="gradientBG buttonlike">Help</div>
		<div id="submit" class="gradientBG buttonlike">Submit dependencies</div>
	</div>
	<div id="help_container"><br>You are able to switch between moving mode <a aria-hidden="true" data-icon="&#xe601;" class="icon-expand"></a> and
		
		drawing mode <a aria-hidden="true" data-icon="&#xe602;" class="icon-loop"></a>. 
		<br>In moving mode you are able to move around your packages freely, if you did already draw some dependencies they will just move along.
		<br>Within drawing mode you can <b>click-and-drag</b> from one package to another to visualize the dependency between them.
		An arrow starting on one packages signals that this packages depends on the other package at the end of the arrow.
		<br> As soon as you are satisfied with your dependencies please submit your solution by clicking on the submit dependencies button below.</div>
	<div id="container"></div>

	<input id="quizId" type="hidden" value={{ $quizId }} >

@stop

@section("scripts")
	{{ HTML::script('http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.4.min.js') }}
	{{ HTML::script('javascripts/kineticSetup.js') }}
	{{ HTML::script('javascripts/kineticHelpers.js') }}
	{{ HTML::script('javascripts/arrow.js') }}
	{{ HTML::script('javascripts/packageGroup.js') }}
	{{ HTML::script('javascripts/kineticQuiz.js') }}
	{{ Helpers::addPackages($selected) }}
@stop