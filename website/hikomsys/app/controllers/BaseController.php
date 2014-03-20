<?php

class BaseController extends Controller {

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

	public function dbconnect(){
		global $db, $host;

		$dbhost = 'localhost';
		$dbname = 'hikomsys';

		// Connect to test database
		$host = new Mongo("mongodb://$dbhost");
		$db = $host->selectDB("$dbname");

		//I should just return the $db rather than having it as a global var
	}

	public function dbdisconnect(){
		global $host;

		$host->close();
	}

}