@extends('layouts.default')

@section("styles")
@stop

@section("content")
	<table class="table table-striped">
		<thead>
			<tr>
				<th>ID</th>
				<th>Firstname</th>
				<th>Email</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			@foreach($users as $user)
				<tr>
					<td>{{ $user->id }}</td>
					<td>{{ $user->firstname }}</td>
					<td>{{ $user->email }}</td>
					<td>
						{{ HTML::linkRoute('users.show', 'Inspect this User', [$user->id]) }}

						@if(Auth::user()->username == 'd3orn')
							{{ HTML::linkRoute('users.edit', 'Edit this User', [$user->id]) }}
							{{ Form::open(['route' => ['users.destroy' , $user->id]]) }}
								{{ Form::hidden('_method', 'DELETE') }}
								{{ Form::submit('Delete') }}
							{{ Form::close() }}
						@endif
					</td>
				</tr>
			@endforeach
		</tbody>
	</table>

@stop



