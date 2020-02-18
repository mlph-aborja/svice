<?php

namespace App\Providers;

use function foo\func;
use Illuminate\Support\ServiceProvider;
use App\Eloquent\Repositories\RoleRepository;
use App\Eloquent\Repositories\UserRepository;
use App\Eloquent\Repositories\ServiceRepository;
use App\Eloquent\Repositories\PermissionRepository;
use App\Contracts\Repositories\RoleRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use App\Contracts\Repositories\ServiceRepositoryInterface;
use App\Contracts\Repositories\PermissionRepositoryInterface;

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
        $this->app->singleton(PermissionRepositoryInterface::class, function () {
            return new PermissionRepository();
        });
        $this->app->singleton(ServiceRepositoryInterface::class, function () {
            return new ServiceRepository();
        });
    }
}
