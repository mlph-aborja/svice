<?php

namespace App\Contracts\Repositories;

use Illuminate\Database\Eloquent\Model;

/**
 * Interface BaseRepositoryInterface
 * @package App\Contracts\Repositories
 */

interface BaseRepositoryInterface
{
    /**
     * @param array $attributes
     * @return Model
     */
    public function create(array $attributes): Model;

    /**
     * @param $id
     * @return Model|null
     */
    public function find($id): ?Model;

    /**
     * @param Model $model
     */
    public function delete(Model $model): void;

    /**
     * @param Model $model
     * @param array $attributes
     * @return Model
     */
    public function update(Model $model, array $attributes): Model;
}
