<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDifferentPointsQuizzesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::table('quizzes', function($table)
        {
            $table->float('red_points');
            $table->float('green_points');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('quizzes', function($table)
        {
            $table->dropColumn('red_points');
            $table->dropColumn('green_points');
        });
	}

}
