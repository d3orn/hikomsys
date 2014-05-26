<?php

class UserTableSeeder extends Seeder {

    public function run()
    {
        DB::table('users')->delete();

        User::create([
        	'firstname' => 'Dominique', 
        	'lastname' => 'Rahm', 
        	'email' => 'd@r.com', 
        	'password' => Hash::make('dddddd'),
        	'username' => 'd3orn',
            'picturepath' => 'img/dummy_picture.jpg'
        ]);
    }

}