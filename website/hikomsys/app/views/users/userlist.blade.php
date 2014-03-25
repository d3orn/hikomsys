@extends('layouts.default')

@section("styles")
@stop

@section("content")
	<div class="row">
		<div class="large-12 medium-12 columns">
			<table>
				<thead>
					<tr>
						<th>Username</th>
						<th>Email</th>
						<th>Actions</th>
						@if(Auth::user()->username == 'd3orn')
							<th>Delete</th>
						@endif
					</tr>
				</thead>
				<tbody>
					@foreach($users as $user)
						<tr>
							<td>{{ $user->firstname }}</td>
							<td>{{ $user->email }}</td>
							<td>
								{{ HTML::linkRoute('users.show', 'Inspect', [$user->id], ['class'=>'small button radius']) }}

								@if(Auth::user()->username == 'd3orn')
									{{ HTML::linkRoute('users.edit', 'Edit', [$user->id], ['class'=>'small button success radius']) }}
									</td>
									<td>{{ Form::open(['route' => ['users.destroy' , $user->id]]) }}
										{{ Form::hidden('_method', 'DELETE') }}
										{{ Form::submit('Delete', ['class' => 'small button alert radius']) }}
									{{ Form::close() }}
								@endif
							</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>
	</div>

@stop



