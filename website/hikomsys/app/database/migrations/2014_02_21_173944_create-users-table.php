<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments("id");
			$table
				->string("firstname")
				->nullable()
				->default(null);
			$table
				->string("lastname")
				->nullable()
				->default(null);
			$table
				->string("email")->unique()
				->nullable()
				->default(null);
			$table
				->string("password")
				->nullable()
				->default(null);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}