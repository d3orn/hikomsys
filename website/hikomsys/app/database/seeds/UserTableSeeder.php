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

        User::create([
            'firstname' => 'Haidar',
            'lastname' => '',
            'email' => 'haidar@ese.com',
            'password' => Hash::make('98769876'),
            'username' => 'haidar',
            'picturepath' => 'img/dummy_picture.jpg'
        ]);

        User::create([
            'firstname' => 'Bledar',
            'lastname' => '',
            'email' => 'bledar@ese.com',
            'password' => Hash::make('98769876'),
            'username' => 'bledar',
            'picturepath' => 'img/dummy_picture.jpg'
        ]);

        User::create([
            'firstname' => 'Andrea',
            'lastname' => '',
            'email' => 'andrea@ese.com',
            'password' => Hash::make('98769876'),
            'username' => 'andrea',
            'picturepath' => 'img/dummy_picture.jpg'
        ]);

        User::create([
        	'firstname' => 'Mircea',
        	'lastname' => '',
        	'email' => 'mircea@ese.com',
        	'password' => Hash::make('98769876'),
        	'username' => 'mircea',
            'picturepath' => 'img/dummy_picture.jpg'
        ]);
    }

}
