<?php

namespace App\Eloquent\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as useAuditable;

class Role extends Model implements Auditable
{
    use useAuditable;

    const ROLE_NAME_CUSTOMER = "CUSTOMER";
    const ROLE_NAME_ADMIN = "ADMIN";
    const ROLE_NAME_SERVICE_PROVIDER = "SERVICE PROVIDER";

    protected $fillable = [
        'name'
    ];

    public function getPrimaryKey ()
    {
        return $this->primaryKey;
    }

    public function users()
    {
        return $this->hasMany('App\Eloquent\Models\User', 'role_id', 'id');
    }
}
