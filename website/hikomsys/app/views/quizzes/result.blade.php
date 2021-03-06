@extends('layouts.default')
@section('styles')
	{{ HTML::style('css/style.css') }}
@stop

@section('content')
	
	<div class="row">
		<div class="medium-12 columns">
			<h2>Your Result</h2>
			<p>Click below to show/hide the dependencies you would like to see and the points rewarded for those dependencies.</p>
		</div>
	</div>
	<div class="row">
		<div class="medium-6 columns">
			<div id="flipbox">
				<div class="row collapse">
					<div class="medium-4 columns" id="menu-list">
						<div class="row">
							<div class="medium-12 columns" id="menu">
								<ul>
									<li id="green"><span>Show Correct</span></li>
									<li id="orange"><span>Show Missing</span></li>
									<li id="red"><span>Show Wrong</span></li>
								</ul>
							</div>
						</div>
					</div>
					<div id="flipped" class="medium-8 columns"><p>Points: 0 (0)</p></div>
				</div>
			</div>
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