<?php

// use Illuminate\Http\Request;

Route::group([

    'middleware' => 'api',
    // 'prefix' => 'auth'

], function () {

    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

    Route::post('file-upload', 'AuthController@uploadAvatar');

    Route::post('reset-password', 'ResetPasswordController@resetPassword');
    Route::post('reset-password-post', 'ResetPasswordController@changePassword');

});
