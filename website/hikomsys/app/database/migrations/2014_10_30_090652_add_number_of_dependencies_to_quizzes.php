<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNumberOfDependenciesToQuizzes extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::table('quizzes', function($table)
        {
            $table->integer('number_of_correct_dependencies')
            $table->integer('number_of_missing_dependencies')
            $table->integer('number_of_wrong_dependencies');
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
            $table
            	->dropColumn('number_of_correct_dependencies')
            	->dropColumn('number_of_missing_dependencies')
            	->dropColumn('number_of_wrong_dependencies');
			 	});
	}

}
