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

					<!-- we will also add show, edit, and delete buttons -->
					<td>

						<!-- delete the nerd (uses the destroy method DESTROY /nerds/{id} -->
						<!-- we will add this later since its a little more complicated than the other two buttons -->
						{{ Form::open(array('url' => 'nerds/' . $user->id, 'class' => 'pull-right')) }}
							{{ Form::hidden('_method', 'DELETE') }}
							{{ Form::submit('Delete this Nerd', array('class' => 'btn btn-warning')) }}
						{{ Form::close() }}

						<!-- show the nerd (uses the show method found at GET /nerds/{id} -->
						<a class="btn btn-small btn-success" href="{{ URL::to('nerds/' . $user->id) }}">Show this Nerd</a>

						<!-- edit this nerd (uses the edit method found at GET /nerds/{id}/edit -->
						<a class="btn btn-small btn-info" href="{{ URL::to('nerds/' . $user->id . '/edit') }}">Edit this Nerd</a>

					</td>
				</tr>
			@endforeach
		</tbody>
	</table>

	
@stop



