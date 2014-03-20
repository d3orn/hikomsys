<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersprojectsTable extends Migration {

public function up()
	{
		Schema::create('usersprojects', function(Blueprint $table)
		{
			$table
				->integer("user_id")
				->nullable()
				->default(null);
			$table
				->integer("project_id")
				->nullable()
				->default(null);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('usersprojects');
	}

}