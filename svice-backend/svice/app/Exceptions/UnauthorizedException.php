<?php


namespace App\Exceptions;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UnauthorizedException extends HttpException
{
    public static function notLoggedIn(): self
    {
        return new static(Response::HTTP_FORBIDDEN, "User is not logged in.", null, []);
    }

    public static function invalidCredentials(): self
    {
        return new static(Response::HTTP_FORBIDDEN, "Invalid credentials.", null, []);
    }

    public static  function noPermission(): self
    {
        return new static(Response::HTTP_FORBIDDEN, "No Permission.", null, []);
    }
}
