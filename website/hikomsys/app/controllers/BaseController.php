<?php

class BaseController extends Controller {

	private $db, $connection;
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

		return $this->$db;
	}

	private function mongoConnect($hostName = 'localhost', $dbName){
		
		/*I should use this method
			$connection = new MongoClient( "mongodb://$hostName" )
		*/
		//@Deprecated
		// Connect to test database
		$this->$connection = new Mongo("mongodb://$hostName");//	, ['username' => '', 'password' => '', 'db' => '']
		$this->$db = $connection->selectDB("$dbName");
	}

	//I probably do not even have to close the db
	public function disconnectDb(){
		$connection->close();
	}

}