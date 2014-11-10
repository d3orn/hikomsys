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
            'username' => '',
            'picturepath' => 'img/dummy_picture.jpg'
        ]);

        User::create([
            'firstname' => 'Bledar',
            'lastname' => '',
            'email' => 'bledar@ese.com',
            'password' => Hash::make('98769876'),
            'username' => '',
            'picturepath' => 'img/dummy_picture.jpg'
        ]);

        User::create([
            'lastname' => '',
            'email' => 'andrea@ese.com',
            'password' => Hash::make('98769876'),
            'username' => '',
            'picturepath' => 'img/dummy_picture.jpg'
        ]);

        User::create([
        	'firstname' => 'Mircea',
        	'lastname' => '',
        	'email' => 'mircea@ese.com',
        	'password' => Hash::make('98769876'),
        	'username' => '',
            'picturepath' => 'img/dummy_picture.jpg'
        ]);
    }

}
