<?php

use App\User;
use App\Message;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    Blade::setContentTags('[%', '%]');

    return view('welcome');
});


get('/users',function () {
	return response()->json(User::all());
});

get('/user/tickets',function () {
	return response()->json([
		// 'ht'=>[
		1=>['name'=>'合同1'],
		2=>['name'=>'合同2']
		// ],
		// 'kq'=>[1=>'请假单1',2=>'请假单2']
		]);
});

get('/messages',function () {
	return response()->json(Message::all());
});

get('/messages/privateMessage/{sendto_username}',function ($sendto_username) {
	return response()->json(Message::where('sendto_username', $sendto_username)->get());
});

post('post/store', 'App\Http\Controllers\PostController@store');
