@extends('layouts.default')

@section("styles")
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

@section("content")

	<div class="row">
		<div class="medium-12 column">
			<h2>{{ $projectName }}</h2>
		</div>
	</div>
	<div class="row">
		<div class="medium-10 columns" id="ranking">
			@if($ranking)
				<ol>
					@foreach($ranking as $userranking)
						<li>
						@if($userranking->username == Auth::user()->username)
							<ul class='current-user'>
						@else
							<ul>
						@endif
								<li>{{ $userranking->username }}</li>
								<li>
									{{ $userranking->result. "%"}}
								</li>
								@if($userranking->username == Auth::user()->username)
									<li class="progress success">
								@else
									<li class="progress">
								@endif
									{{ "<span class=\"meter\" style=\"width: ".$userranking->result."%\"></span>" }}
								</li>
								<li>
									{{ HTML::linkRoute('quizzes.show', "Checkout!", [$userranking->id]) }}
								</li>
							</ul>
						</li>
					@endforeach

				</ol>
			@endif
		</div>
	</div>

@stop

