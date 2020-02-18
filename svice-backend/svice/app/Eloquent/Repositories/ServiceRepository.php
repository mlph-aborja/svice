<?php


namespace App\Eloquent\Repositories;

use App\Contracts\Repositories\ServiceRepositoryInterface;
use App\Service;

class ServiceRepository extends BaseRepository implements ServiceRepositoryInterface
{
    public function __construct()
    {
        parent::__construct(Service::class);
    }
}
