<?php

namespace App\Eloquent\Models;

use App\Eloquent\Pivots\RolePermission;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Auditable as useAuditable;

class Permission extends Model
{
    use useAuditable;

    protected $fillable = [
        'name',
        'key',
        'route',
        'method'
    ];

    public function getPrimaryKey ()
    {
        return $this->primaryKey;
    }

    public function roles ()
    {
        return $this->belongsToMany(Role::class, "role_permission");
    }

}
