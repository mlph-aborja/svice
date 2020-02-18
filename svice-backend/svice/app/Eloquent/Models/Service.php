<?php

namespace App;

use App\Eloquent\User;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name'
    ];

    public function getPrimaryKey()
    {
        return $this->primaryKey;
    }

    /**
     * Get the user that owns the service.
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
