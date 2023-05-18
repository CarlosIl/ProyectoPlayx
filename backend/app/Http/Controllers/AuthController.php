<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Models\UserVerify;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create($request->validated());
        
        //PARA VERIFICACIÓN DE EMAIL
        // $token = Str::random(64);
        // Con PHP
        // $time = now();
        // $expired = Date("Y-m-d H:i:s", strtotime("30 minutes", strtotime($time)));

        // UserVerify::create([
        //     'user_id' => $user->id,
        //     'token' => $token,
        //     'expires_at' => Carbon::now()->addMinutes(30),
        // ]);

        // $mailData = [
        //     'receiver' => $user->email,
        //     'subject' => 'Email Verification Mail',
        //     'title' => 'Email Verification Mail',
        //     'body' => "Please verify your email with bellow link",
        //     'token' => $token,
        // ];
        // (new NotificationController)->sendVerificationMail($mailData);

        // return response()->json([
        //     "message" => "Se ha enviado un correo de verificación",
        // ], 200);

        $user->is_email_verified = 1;
        $user->save();

        $path = $user->email;
        Storage::disk('public')->makeDirectory($path);

        $success['username'] =  $user->username;

        return response()->json([
            "success" => true,
            "message" => "El usuario ha sido registrado",
            "username" => $user,
        ], 200);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = Auth::getProvider()->retrieveByCredentials($request->validated());
        if(!$user){
            return response()->json([
                "message" => "No se encuentra su cuenta en la base de datos",
            ], 404);            
        }
        else if($user->is_email_verified == 0){
            return response()->json([
                "message" => "Debe activar la cuenta antes de poder loguearse",
            ], 404);
        }
        Auth::login($user);
        $success['token'] =  $user->createToken('tokenLogin')->accessToken;
        // $success['username'] =  $user->username;

        return response()->json([
            "success" => true,
            "message" => "El usuario ha iniciado sesión",
            // "username" => $success['username'],
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

    public function verifyAccount(string $token)
    {
        $verifyUser = UserVerify::where('token', $token)->first();
  
        $message = 'Sorry your email cannot be identified.';
        $status = 404;
  
        if(!is_null($verifyUser) ){
            $id = $verifyUser->user_id;
            $user = User::find($id);
            // return dd($user);
              
            if($user->is_email_verified == 0) {
                $user->is_email_verified = 1;
                $user->save();
                $verifyUser->where('user_id', $id)->delete();
                $message = "Your e-mail is verified. You can now login.";
            } else {
                $message = "Your e-mail is already verified. You can now login.";
            }
            $status = 200;
        }
  
        return response()->json([
            "message" => $message,
        ], $status);
    }

    public function getMyUser()
    {
        $user = Auth::user();
        return response()->json([
            "success" => true,
            "user" => $user,
        ], 200);
    }

    public function getUserInfo(string $username)
    {
        $userStd = DB::select("SELECT users.profile_picture, users.firstName, users.lastName, (SELECT COUNT(*) FROM `follows` WHERE target_id = users.id) AS followers, (SELECT COUNT(*) FROM `follows` WHERE source_id = users.id) AS followings FROM `users` WHERE username = ?",[$username]);
        return $user = json_decode(json_encode($userStd), true);
    }

    public function getAllUsers()
    {
        $usersStd = DB::select("SELECT users.username, users.email, users.profile_picture FROM `users`");
        $users = json_decode(json_encode($usersStd), true);
        for ($i=0; $i < count($users); $i++) { 
            $profile_picture = $users[$i]["profile_picture"];
            $email = $users[$i]["email"];
            unset($users[$i]["email"]);
            if($profile_picture!=null){
                $users[$i]["profile_picture"] = asset("$email/$profile_picture");
            }
        }
        return $users;
    }

    // public function sendProfilePicture(Request $request)
    // {
    //     $path = $user->email;
        
    //     if ($request->hasFile('profile_picture')) {
    //         $file_name = time() . '_' . request()->profile_picture->getClientOriginalName();
    //         Storage::disk('sftp')->put("$path/$file_name", fopen($request->file('profile_picture'), 'r+'));

    //         $user->profile_picture = $file_name;
    //     }
    // }

    public function getProfilePicture(string $username)
    {
        $user = User::where('username',$username)->get();
        $path = $user[0]["email"];
        $profile_picture = $user[0]["profile_picture"];
        return response()->json([
            "success" => true,
            "url" => asset("$path/$profile_picture"),
        ], 200);
        // return asset("$user->email/$user->profile_picture");
        // return Storage::disk('sftp')->download("$user->email/$user->profile_picture");
    }
}
