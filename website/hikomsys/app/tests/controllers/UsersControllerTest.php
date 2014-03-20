<?php

class UsersControllerTest extends TestCase{
	
	public function testAll(){
		$mock = Mockery::mock('Illuminate\Auth\UserInterface');
		$mock->shouldReceive('all')->once()->andReturn($mock);

		App::instance('Illuminate\Auth\UserInterface', $mock);

		$response = $this->get('users/showall');

		$this->assertRequestOk();

		$this->assertViewHas('users');

		$users = $response->original->getData()['users'];
 
   		$this->assertInstanceOf('Illuminate\Auth\UserInterface', $users);

	}

	public function testIndex(){
		$response = $this->get('users');

		$this->assertTrue($response->isOk());

		$this->assertRequestOk();
	}

	public function testCreate(){
		$response = $this->get('users/create');

		$this->assertTrue($response->isOk());

		$this->assertRequestOk();	
	}

	public function testStorePass(){
		Validator::shouldReceive('make')
			->once()
			->andReturn(Mockery::mock(['fails' => false]));

		$mock = Mockery::mock('Illuminate\Auth\UserInterface');
		$mock->shouldReceive('create')->once();
		App::instance('Illuminate\Auth\UserInterface', $mock);

		Input::replace($input = [
			'firstname' => 'Example',
			'lastname' => 'Test',
			'email' => 'test@test.com',
			'username' => 'test',
			'password' => 'password',
			'password_confirmation' => 'password'
			]);

		$this->call('POST', 'users', $input);

		$this->assertRedirectedTo('users');
		//$this->assertRedirectedToRoute('users.index');
	}

	public function testStoreFail(){
		Validator::shouldReceive('make')
			->once()
			->andReturn(Mockery::mock(['fails' => true]));

		Input::replace($input = [
			'firstname' => 'Example',
			'lastname' => 'Test',
			'email' => 'test@test.com',
			'username' => 'test',
			'password' => 'pass',
			'password_confirmation' => 'pass'
			]);

		$this->call('POST', 'users', $input);

		$this->assertRedirectedTo('users/create');
		//$this->assertRedirectedToRoute('users.create');
	}

	public function testShow(){
		$mock = Mockery::mock('Illuminate\Auth\UserInterface');
		$mock->shouldReceive('findOrFail')->once()->andReturn($mock);

		App::instance('Illuminate\Auth\UserInterface', $mock);

		//View::shouldReceive('make')->once()->with('users.show');

		$response = $this->get('users/1');

		$this->assertRequestOk();

		$this->assertViewHas('user');

		$user = $response->original->getData()['user'];
 
   		$this->assertInstanceOf('Illuminate\Auth\UserInterface', $user);



	}
	public function testEdit(){}
	public function testUpdate(){}
	public function testDestroy(){}

}