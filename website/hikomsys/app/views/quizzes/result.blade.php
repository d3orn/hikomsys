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
			<h2>Your Result</h2>
			<p>Click below to show/hide the dependencies you would like to see and the points rewarded for those dependencies.</p>
		</div>
	</div>
	<div class="row">
		<div class="medium-12 columns">
			<p>Well done! The dependencies highlighted in <span class="color">green</span> are correct.</p>
		</div>
	</div>

	<div class="row">
		<div class="medium-8 columns functions">
			<dl class="sub-nav">
			  <dt>Functions:</dt>
			  <dd class=""><a id="move" aria-hidden="true" data-icon="&#xe601;" class="icon-expand btn"></a></dd>
			  <dd id="info" class=""><a id="infosEnabled" class="btn">Additional Information</a></dd>
			  <dd><a id="greenArrow" aria-hidden="true" data-icon="&#xe600;" class="icon-arrow-right btn arrowbtn"></a></dd>
			  <dd><a id="orangeArrow" aria-hidden="true" data-icon="&#xe600;" class="icon-arrow-right btn arrowbtn"></a></dd>
			  <dd><a id="redArrow" aria-hidden="true" data-icon="&#xe600;" class="icon-arrow-right btn arrowbtn"></a></dd>
			</dl>
		</div>
		<div class="medium-4 columns">
			<div id="continue" class="button tiny radius success right">Continue</div>
			<div id="help" data-reveal-id="myModal" class="button tiny radius alert right" data-reveal>Help</div>
		</div>
	</div>

	<div class="row canvas">
		<div class="medium-12 columns">
			<div id="container"></div>
		</div>

		<div class="panel" id="finalscore">
			<h2>Summary</h2>
			<div id="correct-count"></div>
			<div id="missing-count"></div>
			<div id="wrong-count"></div>
			<div id="score"></div>
		</div>

	</div>

	<input id="quizId" type="hidden" value={{ $quizId }} >
	<input id="green-points" type="hidden" value={{ $greenPoints }} >
	<input id="red-points" type="hidden" value={{ $redPoints }} >
@stop

@section("scripts")
	{{ HTML::script('http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v5.1.0.min.js') }}
	{{ HTML::script('http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js') }}
	{{ HTML::script('javascripts/jquery.flip.min.js') }}

	{{ HTML::script('javascripts/kineticSetup.js') }}
	{{ HTML::script('javascripts/kineticHelpers.js') }}
	{{ HTML::script('javascripts/arrow.js') }}
	{{ HTML::script('javascripts/packageGroup.js') }}
	{{ HTML::script('javascripts/kineticResults.js') }}
	{{ HTML::script('javascripts/kineticResize.js') }}
@stop
