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


// Route::get('/article/{id}', function ($id) {
//     return new ArticleResource(Article::findOrFail($id));
// });

// Route::get('/articles', function () {
//     return ArticleResource::collection(Article::all());
// });

// Route::put('/article/{id}', [ArticleController::class, 'update']);

// Route::delete('/article/{id}', [ArticleController::class, 'destroy']);

// Route::post('/articles', [ArticleController::class, 'store']);

//Posts

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
//Mail Verification
Route::get('account/verify/{token}', [AuthController::class, 'verifyAccount'])->name('user.verify');

Route::middleware('auth:api')->group( function(){

    //PostController
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{id}', [PostController::class, 'reload']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::post('/posts/image/{id}', [PostController::class, 'storeImage']);
    Route::get('/post/{id}', [PostController::class, 'show']);
    Route::put('/post/{id}', [PostController::class, 'update']);
    Route::delete('/post/{id}', [PostController::class, 'destroy']);

    Route::get('/post/descargar/{id}', [PostController::class, 'downloadFile']);

    //AuthController
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::get('/profile/{username}', [AuthController::class, 'getProfilePicture']);

    //FollowController
    Route::get('/follow/{id}', [FollowController::class, 'store']);
    Route::get('/unfollow/{id}', [FollowController::class, 'destroy']);
    Route::get('/followings', [FollowController::class, 'show_followings']);
    Route::get('/followers', [FollowController::class, 'show_followers']);

    //NotificationController
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notify/{id}', [NotificationController::class, 'saw']);
});