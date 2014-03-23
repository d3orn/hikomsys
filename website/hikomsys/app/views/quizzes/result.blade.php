@extends('layouts.default')
@section('styles')
	{{ HTML::style('css/kinetic.css') }}
	{{ HTML::style('css/style.css') }}
@stop

@section('content')

	<h1>Your Result</h1>
	<p id="result"></p>

	<div id="menu">
		<div id="move" aria-hidden="true" data-icon="&#xe601;" class="icon-expand gradientBG buttonlike"></div>
		<div value="green" aria-hidden="true" data-icon="&#xe600;" class="arrowbtn icon-arrow-right activatedIcon buttonlike"></div>
		<div aria-hidden="true" data-icon="&#xe600;" class="arrowbtn icon-arrow-right activatedIcon buttonlike"></div>
		<div aria-hidden="true" data-icon="&#xe600;" class="arrowbtn icon-arrow-right activatedIcon buttonlike"></div>
		<div id="infosEnabled" class="activatedIcon buttonlike">Additional information</div>
		<div id="help" class="gradientBG buttonlike">Help</div>
		<div id="continue" class="gradientBG buttonlike">Continue</div>
	</div>
	<div id="help_container">THIS IS JUST A FILLER</div>
	<div id="container"></div>

	<input id="quizId" type="hidden" value={{ $quizId }} >
@stop

@section("scripts")
	{{ HTML::script('http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.4.min.js') }}
	{{ HTML::script('javascripts/kineticSetup.js') }}
	{{ HTML::script('javascripts/kineticHelpers.js') }}
	{{ HTML::script('javascripts/arrow.js') }}
	{{ HTML::script('javascripts/packageGroup.js') }}
	{{ HTML::script('javascripts/kineticResults.js') }}
@stop