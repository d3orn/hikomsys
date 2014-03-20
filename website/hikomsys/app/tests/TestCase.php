<?php

class TestCase extends Illuminate\Foundation\Testing\TestCase {

	public function tearDown(){
		Mockery::close();
	}

	/**
	 * Creates the application.
	 *
	 * @return \Symfony\Component\HttpKernel\HttpKernelInterface
	 */
	public function createApplication()
	{
		$unitTesting = true;

		$testEnvironment = 'testing';

		return require __DIR__.'/../../bootstrap/start.php';
	}

	public function __call($method, $args)
	{
	    if (in_array($method, ['get', 'post', 'put', 'patch', 'delete']))
	    {
	        return $this->call($method, $args[0]);
	    }

	    throw new BadMethodCallException;
	}

	public function assertRequestOk(){
		$this->assertTrue($this->client->getResponse()->isOk());
	}

	public function assertViewReceives($prop, $val = null){
		$response = $this->client->getResponse();
		$prop = $response->getOriginalContent()->$prop;

		if($val){
			return $this->assertEquals($val, $prop);
		}
		$this->assertTrue(!! $prop);
	}

	public function assertRedirectedTo($uri){
		$response = $this->client->getResponse();
		$redirectedTo = $response->headers->get('Location');

		$this->assertEquals(302, $response->getStatusCode());
		$this->assertEquals("http://localhost/$uri", $redirectedTo);
	}

}
