@extends('layouts.default')

@section("styles")
@stop

@section("content")
	<div class="row">
		<table>
			<thead>
				<tr>
					<th>Username</th>
					<th>Email</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				@foreach($users as $user)
					<tr>
						<td>{{ $user->firstname }}</td>
						<td>{{ $user->email }}</td>
						<td>
							{{ HTML::linkRoute('users.show', 'Inspect this User', [$user->id], ['class'=>'small button radius']) }}

							@if(Auth::user()->username == 'd3orn')
								{{ HTML::linkRoute('users.edit', 'Edit this User', [$user->id], ['class'=>'small button radius']) }}
								{{ Form::open(['route' => ['users.destroy' , $user->id], ['class'=>'small button radius']]) }}
									{{ Form::hidden('_method', 'DELETE') }}
									{{ Form::submit('Delete') }}
								{{ Form::close() }}
							@endif
						</td>
					</tr>
				@endforeach
			</tbody>
		</table>
	</div>

@stop



