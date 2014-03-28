@extends('layouts.default')
@section('styles')
	{{ HTML::style('css/style.css') }}
@stop

@section('content')
	<div class="row">
		<div class="medium-12 columns">
			<h2>Draw the dependencies</h2>
			<p>
				Please draw the dependencies between the packages you selected previously. 
			</p>	
		</div>
	</div>
	<div class="row">
		<div class="medium-12 columns">

			<dl class="sub-nav">
			  <dt>Functions:</dt>
			  <dd><a id="move" aria-hidden="true" data-icon="&#xe601;" class="icon-expand active"></a></dd>
			  <dd><a id="draw" aria-hidden="true" data-icon="&#xe602;" class="icon-loop button"></a></dd>
			  <dd><a data-reveal-id="myModal" class="button" data-reveal>Help</a></dd>
			</dl>


			<div id="menu">
				<div id="move" aria-hidden="true" data-icon="&#xe601;" class="icon-expand button"></div>
				<div id="draw" aria-hidden="true" data-icon="&#xe602;" class="icon-loop button"></div>
				<div data-reveal-id="myModal" class="button" data-reveal>Help</div>
				<div id="submit" class="gradientBG buttonlike">Submit dependencies</div>
			</div>
			<div id="container"></div>

			<input id="quizId" type="hidden" value={{ $quizId }} >



			<!-- Size Classes: [small medium large xlarge expand] -->
			<div id="myModal" class="reveal-modal" data-reveal>
				<h2>Help</h2>
				<p>You are able to switch between moving mode <a aria-hidden="true" data-icon="&#xe601;" class="icon-expand"></a> and
				drawing mode <a aria-hidden="true" data-icon="&#xe602;" class="icon-loop"></a>. </p>
				<p>In moving mode you are able to move around your packages freely, if you did already draw some dependencies they will just move along.</p>
				<p>Within drawing mode you can <b>click-and-drag</b> from one package to another to visualize the dependency between them.
				An arrow starting on one packages signals that this packages depends on the other package at the end of the arrow.</p>
				<p> As soon as you are satisfied with your dependencies please submit your solution by clicking on the submit dependencies button.</p>
				<a class="close-reveal-modal">&#215;</a>
			</div>	
		</div>
	</div>
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