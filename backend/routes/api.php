<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\Article;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\PostController;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\PostResource;
use App\Models\Post;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/article/{id}', function ($id) {
    return new ArticleResource(Article::findOrFail($id));
});

Route::get('/articles', function () {
    return ArticleResource::collection(Article::all());
});

Route::put('/article/{id}', [ArticleController::class, 'update']);

Route::delete('/article/{id}', [ArticleController::class, 'destroy']);

Route::post('/articles', [ArticleController::class, 'store']);

//Posts
Route::get('/posts', function () {
    return PostResource::collection(Post::all());
});

Route::post('/posts', [PostController::class, 'store']);

Route::get('/post/{id}', function ($id) {
    return new PostResource(Post::findOrFail($id));
});

Route::put('/post/{id}', [PostController::class, 'update']);

Route::delete('/post/{id}', [PostController::class, 'destroy']);