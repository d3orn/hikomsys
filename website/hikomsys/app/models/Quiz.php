<?php

class Quiz extends Eloquent {
	
	public $timestamps = false;
	protected $fillable = array('userId', 'userId');

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'quizzes';

}