<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'API\Auth\LoginController@login');

Route::post('/customer/register', 'API\Auth\RegistrationController@registerCustomer');
Route::post('/service-provider/register', 'API\Auth\RegistrationController@registerServiceProvider');

Route::group(['middleware' => 'auth:api'], function(){
    Route::post('/details', 'API\Auth\AuthController@getAuthenticatedUserDetails');
});
