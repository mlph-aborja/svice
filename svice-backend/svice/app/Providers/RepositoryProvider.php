<?php

namespace App\Providers;

use App\Contracts\Repositories\RoleRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use App\Eloquent\Repositories\RoleRepository;
use App\Eloquent\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(UserRepositoryInterface::class, function () {
            return new UserRepository();
        });
        $this->app->singleton(RoleRepositoryInterface::class, function () {
            return new RoleRepository();
        });
    }
}
