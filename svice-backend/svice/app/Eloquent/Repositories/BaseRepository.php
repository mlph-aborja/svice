<?php


namespace App\Eloquent\Repositories;

use App\Contracts\Repositories\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements BaseRepositoryInterface
{
    /**
     * The type of the model in string
     * @var string
     */
    protected $type;

    public function __construct(string $type)
    {
        $this->type = $type;
    }

    /**
     * @return string
     */
    public function getModelClassName(): string
    {
        return $this->type;
    }

    /**
     * @inheritDoc
     */
    public function create(array $attributes): Model
    {
        $model = new $this->type();
        return $this->save($model, $attributes);
    }

    /**
     * @inheritDoc
     */
    public function find($id): ?Model
    {
        return $this->type::find($id);
    }

    /**
     * @inheritDoc
     */
    public function delete(Model $model): void
    {
        $model->delete();
    }

    /**
     * @inheritDoc
     */
    public function update(Model $model, array $attributes): Model
    {
        return $this->save($model, $attributes);
    }

    /**
     * @param array $attributes
     */
    private function save(Model $model, array $attributes): Model
    {
        foreach ($model->getFillable() as $column) {
            if (array_key_exists($column, $attributes)) {
                $model->$column = array_get($attributes, $column);
            }
        }
        $model->save();
        return $model;
    }

    /**
     * @inheritDoc
     */
    public function all(): Collection
    {
        return $this->type::all();
    }

    /**
     * @inheritDoc
     */
    public function findAndUpdate($id, array $attributes): Model
    {
        $this->model = $this->find($id);
        return $this->update($this->model, $attributes);
    }

    /**
     * @inheritDoc
     */
    public function findAndDelete($id): void
    {
        $this->model = $this->find($id);
        $this->delete($this->model);
    }
}
