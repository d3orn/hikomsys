<?php

class BaseController extends Controller {

	private $db, $connection;

    public function __construct()
    {
    	$this->beforeFilter(function(){
			if(Auth::guest()) 
				return Redirect::route('sessions.login');
		}, array('except' => ['create','store']));
		//$this->beforeFilter('auth', ['except' => 'login']);
		//$this->beforeFilter('csrf', ['on' => 'post']);
    }

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout()
	{
		if ( ! is_null($this->layout))
		{
			$this->layout = View::make($this->layout);
		}
	}

	public function getDb($hostName, $dbName)
	{
		self::mongoConnect($hostName, $dbName);

		return $this->db;
	}

	private function mongoConnect($hostName = 'localhost', $dbName){
		
		/*I should use this method
			$connection = new MongoClient( "mongodb://$hostName" )
			figure out how it is about closing the connection if it happens automaticly or if
			I need a dbdisc function
		*/
		//@Deprecated
		// Connect to test database
		$this->connection = new Mongo("mongodb://$hostName");//	, ['username' => '', 'password' => '', 'db' => '']
		$this->db = $this->connection->selectDB("$dbName");
	}

}