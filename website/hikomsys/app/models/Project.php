<?php

class Project extends Eloquent {
	
	private $rules = [
   		'name'=>'alpha_dash|between:3,50'
    ];

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'projects';

    private $errors;

    public function validate($data)
    {
        // make a new validator object
        $v = Validator::make($data, $this->rules);
        // check for failure
        if ($v->fails())
        {
            // set errors and return false
            $this->errors = $v->messages();
            return false;
        }

        // validation pass
        return true;
    }

    public function errors()
    {
        return $this->errors;
    }
}

