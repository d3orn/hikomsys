@extends('layouts.default')
@section('styles')
	{{ HTML::style('css/style.css') }}
@stop

@section('content')
	
	<div class="row">
		<div class="medium-12 columns">
			<h2>Your Result</h2>
			<p>You are able to see further details about your packages by clicking on Additional Information.</p>
			<p>Doing so will enable a drop down menu if you hover over a package. You will find information about the classes and children of the given package and you will also see all the dependencies going out from this package</p>
		</div>
	</div>

	<div class="row">
		<div class="medium-8 columns">
			<dl class="sub-nav">
			  <dt>Functions:</dt>
			  <dd class=""><a id="move" aria-hidden="true" data-icon="&#xe601;" class="icon-expand btn"></a></dd>
			  <dd class="active"><a id="greenArrow" aria-hidden="true" data-icon="&#xe600;" class="icon-arrow-right btn arrowbtn"></a></dd>
			  <dd class="active"><a id="orangeArrow" aria-hidden="true" data-icon="&#xe600;" class="icon-arrow-right btn arrowbtn"></a></dd>
			  <dd class="active"><a id="redArrow" aria-hidden="true" data-icon="&#xe600;" class="icon-arrow-right btn arrowbtn"></a></dd>
			  <dd id="info" class=""><a id="infosEnabled" class="btn">Additional Information</a></dd>
			</dl>
		</div>
		<div class="medium-4 columns">	
			<div id="submit" class="button tiny radius success right">Continue</div>
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
@stop