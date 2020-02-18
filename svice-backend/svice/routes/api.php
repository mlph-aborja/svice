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

Route::post('/login', 'API\Auth\AuthController@login')
    ->name('login');
Route::get('/logout', 'API\Auth\AuthController@logout')
    ->name('logout');

Route::post('/customers/register', 'API\Auth\RegistrationController@registerCustomer')
    ->name('customer.register');
Route::post('/service-providers/register', 'API\Auth\RegistrationController@registerServiceProvider')
    ->name('service-provider.register');
Route::post('/admins/register', 'API\Auth\RegistrationController@registerAdmin')
    ->name('admin.register');

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/users/me', 'API\Auth\AuthController@getAuthenticatedUserDetails')
        ->name('users.me');

    Route::prefix('admin')->group(function () {
        Route::apiResource("/users", 'API\UserController')
            ->middleware('role.permission');
        Route::apiResource("/services", 'API\ServiceController')
            ->middleware('role.permission');
        Route::get("/admins", 'API\UserController@findAllAdmin')
            ->middleware('role.permission');
        Route::get("/customers", 'API\UserController@findAllCustomer')
            ->middleware('role.permission');
        Route::put('/users/{userId}/{role}', 'API\UserController@assignRole')
            ->name('admin.users.assignRole');
    });
});
