<?php

class Quiz extends Eloquent {
	
	protected $fillable = array('user_id', 'project_id');

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'quizzes';

}