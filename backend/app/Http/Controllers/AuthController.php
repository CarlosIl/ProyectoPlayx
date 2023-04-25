<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create($request->validated());

        $path = $user->email;
        Storage::disk('sftp')->makeDirectory($path);

        $success['username'] =  $user->username;

        return response()->json([
            "message" => "El usuario ha sido registrado",
            "username" => $success['username'],
        ], 200);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = Auth::getProvider()->retrieveByCredentials($request->validated());
        Auth::login($user);
        $success['token'] =  $user->createToken('tokenLogin')->accessToken;
        $success['username'] =  $user->username;

        return response()->json([
            "message" => "El usuario ha iniciado sesión",
            "username" => $success['username'],
            "token" => $success['token'],
        ], 200);
    }

    public function logout()
    {
        Session::flush();

        Auth::user()->tokens->each(function($token, $key) {
            $token->delete();
        });

        return response()->json([
            "message" => "EL usuario se ha cerrado sesión",
        ]);
        // Auth::logout();
    }
}
