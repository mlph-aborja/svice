<?php


namespace App\Contracts\Repositories;


interface PermissionRepositoryInterface extends BaseRepositoryInterface
{
    public function isExist (string $route, string $method): bool;
}
