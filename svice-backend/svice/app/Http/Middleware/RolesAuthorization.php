<?php

namespace App\Http\Middleware;

use App\Eloquent\Models\Role;
use App\Exceptions\UnauthorizedException;
use Closure;
use Illuminate\Support\Facades\Auth;

class RolesAuthorization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::guest()) {
            throw UnauthorizedException::notLoggedIn();
        }
        // Authorize Admin Role
        if (!$request->user()->role()->where('name', Role::ROLE_NAME_ADMIN)->exists())
        {
            throw UnauthorizedException::noPermission();
        }
        return $next($request);
    }
}
