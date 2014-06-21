<?php

class Project extends Eloquent {
	
	public static $rules = array(
   		'name'=>'alpha_num|between:3,50'
    );

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'projects';
}

