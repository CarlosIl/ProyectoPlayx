<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\Article;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\PostController;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\NotificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Posts

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
//Mail Verification
Route::get('account/verify/{token}', [AuthController::class, 'verifyAccount'])->name('user.verify');

Route::middleware('auth:api')->group( function(){

    //PostController
    Route::get('/posts/home', [PostController::class, 'index']);
    Route::get('/posts/home/{id}', [PostController::class, 'reload']);
    Route::get('/posts/profile/{username}', [PostController::class, 'getPostsX']);
    Route::get('/posts/profile/{username}/{id}', [PostController::class, 'reloadPostsX']);
    Route::get('/posts/follows', [PostController::class, 'getPostsFollows']);
    Route::get('/posts/follows/{id}', [PostController::class, 'reloadPostsFollows']);
    Route::get('/comments/{id}', [PostController::class, 'getComments']);
    Route::get('/comments/{id}/{post_id}', [PostController::class, 'reloadComments']);

    Route::post('/posts', [PostController::class, 'store']);
    Route::post('/posts/image/{id}', [PostController::class, 'storeImage']);
    Route::get('/post/{id}', [PostController::class, 'show']);
    Route::put('/post/{id}', [PostController::class, 'update']);
    Route::delete('/post/{id}', [PostController::class, 'destroy']);

    Route::get('/post/descargar/{id}', [PostController::class, 'downloadFile']);

    //AuthController
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getMyUser']);
    Route::get('/userbox/{username}', [AuthController::class, 'getUserInfo']);
    Route::get('/users', [AuthController::class, 'getAllUsers']);
    Route::get('/profile/{username}', [AuthController::class, 'getProfilePicture']);
    Route::post('/user', [AuthController::class, 'modifyMyUser']);
    Route::post('/profile_picture', [AuthController::class, 'changeProfilePicture']);
    Route::delete('/user', [AuthController::class, 'deleteMyUser']);
    Route::get('/user/{id}', [AuthController::class, 'getUser']);
    Route::post('/user/{id}', [AuthController::class, 'modifyUser']);
    Route::delete('/user/{id}', [AuthController::class, 'deleteUser']);

    //FollowController
    Route::get('/follow/{username}', [FollowController::class, 'store']);
    Route::get('/unfollow/{username}', [FollowController::class, 'destroy']);
    Route::get('/followings', [FollowController::class, 'show_followings']);
    Route::get('/followers', [FollowController::class, 'show_followers']);

    //NotificationController
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notifications/id/{id}', [NotificationController::class, 'reload']);
    Route::get('/notify/{id}', [NotificationController::class, 'saw']);
    Route::get('/notifications/not_seen', [NotificationController::class, 'not_seen']);

    //LikeController
    Route::get('/like/{id}', [LikeController::class, 'store']);
    Route::get('/unlike/{id}', [LikeController::class, 'destroy']);
});