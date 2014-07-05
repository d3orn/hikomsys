<?php

App::bind('Illuminate\Auth\UserInterface', 'User');

//UserController
Route::get('/', ['as' => 'home', 'uses' => 'UsersController@index']);
Route::get('users/showall' ,['as' => 'users.showall', 'uses' => 'UsersController@showall']);
Route::resource('users' , 'UsersController');

//SessionController
Route::get('login', ['as' => 'sessions.login', 'uses' => 'SessionsController@create']);
Route::get('logout',['as' => 'sessions.logout', 'uses' => 'SessionsController@destroy']);
Route::resource('sessions' , 'SessionsController', ['only' => ['store']]);

//ProjectsController
Route::get('projects/showall' ,['as' => 'projects.showall', 'uses' => 'ProjectsController@showall']);
Route::get('projects/random', ['as' => 'projects.random', 'uses' => 'ProjectsController@random']);
Route::resource('projects', 'ProjectsController', ['only' => ['index', 'store', 'show']]);  

//QuizzesController
Route::get('quizzes/showall/{quizzes}', array('uses' => 'QuizzesController@showall'));
Route::post('quizzes/sendJSON', array('uses' => 'QuizzesController@sendJSON'));
Route::get('quizzes/visualization', array('uses' => 'QuizzesController@visualization'));
Route::get('quizzes/success', array('uses' => 'QuizzesController@success'));

//Probablly I can add the points to sendJSON
//Route::post('quizzes/calculate-points', array('uses' => 'QuizzesController@calculatePoints'));
Route::post('quizzes/green-points', array('uses' => 'QuizzesController@greenPoints'));
Route::post('quizzes/red-points', array('uses' => 'QuizzesController@redPoints'));
Route::post('quizzes/create-result', array('uses' => 'QuizzesController@createResults'));
Route::resource('quizzes', 'QuizzesController', ['only' => ['index', 'show', 'store', 'edit']]); 