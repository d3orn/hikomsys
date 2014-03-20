@extends('layouts.default')

@section("header")
@stop

@section("content")
	<table class="table table-striped table-bordered">
		<thead>
			<tr>
				<td>ID</td>
				<td>Firstname</td>
				<td>Email</td>
				<td>Actions</td>
			</tr>
		</thead>
		<tbody>
			@foreach($users as $user)
				<tr>
					<td>{{ $user->id }}</td>
					<td>{{ $user->firstname }}</td>
					<td>{{ $user->email }}</td>
					<td>

						<!-- delete the nerd (uses the destroy method DESTROY /nerds/{id} -->
						<!-- we will add this later since its a little more complicated than the other two buttons -->
						{{ Form::open(array('url' => 'nerds/' . $user->id, 'class' => 'pull-right')) }}
							{{ Form::hidden('_method', 'DELETE') }}
							{{ Form::submit('Delete this Nerd', array('class' => 'btn btn-warning')) }}
						{{ Form::close() }}

						{{ HTML::linkRoute('users.show', 'Inspect this User', [$user->id]) }}

						@if(Auth::user()->username == 'd3orn')
							{{ HTML::linkRoute('users.edit', 'Edit this User', [Auth::user()->id]) }}
						@endif
					</td>
				</tr>
			@endforeach
		</tbody>
	</table>

	
@stop



