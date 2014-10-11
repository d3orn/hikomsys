@extends('layouts.default')
@section('styles')
	{{ HTML::style('css/style.css') }}
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

@section('content')
	
	<div class="row">
		<div class="medium-12 columns">
			<h2>Coming Soon</h2>
		</div>
	</div>

	<div class="row">
		<div class="medium-8 columns">
			<dl class="sub-nav">
			  <dt>Functions:</dt>
			  <dd class=""><a id="move" aria-hidden="true" data-icon="&#xe601;" class="icon-expand btn"></a></dd>
			</dl>
		</div>
		<div class="medium-4 columns">	
			<div id="continue" class="button tiny radius success right">Continue</div>
			<div id="help" data-reveal-id="myModal" class="button tiny radius alert right" data-reveal>Help</div>
		</div>
	</div>	

	<div class="row">
		<div class="medium-12 columns">
			<div id="container"></div>
		</div>
	</div>

	<input id="quizId" type="hidden" value={{ $quizId }} >
@stop

@section("scripts")
	{{ HTML::script('http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v5.1.0.min.js') }}
	{{ HTML::script('javascripts/kineticSetup.js') }}
	{{ HTML::script('javascripts/kineticHelpers.js') }}
	{{ HTML::script('javascripts/arrow.js') }}
	{{ HTML::script('javascripts/packageGroup.js') }}
	{{ HTML::script('javascripts/kineticResults.js') }}
	{{ HTML::script('javascripts/kineticResize.js') }}
@stop