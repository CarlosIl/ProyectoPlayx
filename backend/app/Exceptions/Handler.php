<?php

namespace App\Exceptions;

use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\Mailer\Exception\TransportException;
use Throwable;
use TypeError;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    //Database connection fails
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof QueryException) {
            return response()->json([
                "message" => "Can't connect to database",
            ], 500);
        //Mail connection fails
        }else if ($exception instanceof TransportException) {
            return response()->json([
                "message" => "Can't send verify mail. Please wait a bit and try again",
            ], 500);
        }

        return parent::render($request, $exception);
    }

}
