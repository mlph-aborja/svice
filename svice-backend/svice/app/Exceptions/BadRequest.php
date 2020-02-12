<?php


namespace App\Exceptions;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class BadRequest extends HttpException
{
    public static function invalidRole($role): self
    {
        return new static(Response::HTTP_BAD_REQUEST,
            'Role '.$role.' does not exist.',
            null, []);
    }
}
