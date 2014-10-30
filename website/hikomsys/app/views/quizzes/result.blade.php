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
		</div>
	</div>
	<div class="row">
		<div class="medium-12 columns infotext">
			<h3>Well done! The dependencies highlighted in <span style="color: green">green </span> are correct.</h3>
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
		</div>
	</div>

	<div class="row canvas">
		<div class="medium-12 columns">
			<div id="container"></div>
		</div>

		<div class="panel" id="finalscore">
			<h2>Summary</h2>
			<p>Correct: <span id="correct-count"> {{ $countCorrect }} </span></p>
			<p>Missing: <span id="missing-count"> {{ $countMissing }} </span></p>
			<p>Wrong: <span id="wrong-count"> {{ $countWrong }} </span></p>
			<h3>Score: <strong>{{ $totalPoints }} %</strong></h3>
		</div>

	</div>

	<input id="quizId" type="hidden" value={{ $quizId }} >

@stop

@section("scripts")
	{{ HTML::script('http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v5.1.0.min.js') }}
	{{ HTML::script('http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js') }}

	{{ HTML::script('javascripts/kineticSetup.js') }}
	{{ HTML::script('javascripts/kineticHelpers.js') }}
	{{ HTML::script('javascripts/arrow.js') }}
	{{ HTML::script('javascripts/packageGroup.js') }}
	{{ HTML::script('javascripts/kineticResults.js') }}
	{{ HTML::script('javascripts/kineticResize.js') }}
@stop
