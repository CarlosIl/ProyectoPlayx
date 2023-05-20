<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Models\PostFiles;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $postsStd = DB::select("SELECT posts.id, users.email, users.username, users.profile_picture, posts.post, posts.file_name, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id ORDER BY posts.created_at DESC LIMIT 7");
        $posts = json_decode(json_encode($postsStd), true);
        for ($i=0; $i < count($posts); $i++) { 
            $profile_picture = $posts[$i]["profile_picture"];
            $email = $posts[$i]["email"];
            unset($posts[$i]["email"]);
            if($profile_picture!=null){
                $posts[$i]["profile_picture"] = asset("$email/$profile_picture");
            }
        }
        return $posts;
    }

    public function reload(string $id)
    {
        $postsStd = DB::select("SELECT posts.id, users.email, users.username, users.profile_picture, posts.post, posts.file_name, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id WHERE posts.id<? ORDER BY posts.created_at DESC LIMIT 2",[$id]);
        $posts = json_decode(json_encode($postsStd), true);
        for ($i=0; $i < count($posts); $i++) { 
            $profile_picture = $posts[$i]["profile_picture"];
            $email = $posts[$i]["email"];
            unset($posts[$i]["email"]);
            if($profile_picture!=null){
                $posts[$i]["profile_picture"] = asset("$email/$profile_picture");
            }
        }
        return $posts;
    }

    public function getPostsX(string $username)
    {
        $postsStd = DB::select("SELECT posts.id, users.username, posts.post, posts.file_name, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id WHERE users.username = ? ORDER BY posts.created_at DESC LIMIT 7",[$username]);
        return $posts = json_decode(json_encode($postsStd), true);
    }

    public function reloadPostsX(string $username, string $id)
    {
        $postsStd = DB::select("SELECT posts.id, users.username, posts.post, posts.file_name, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id WHERE users.username = ? AND posts.id<? ORDER BY posts.created_at DESC LIMIT 5",[$username,$id]);
        return $posts = json_decode(json_encode($postsStd), true);
    }

    public function getPostsFollows()
    {
        $user_id = Auth::user()->id;
        $postsStd = DB::select("SELECT posts.id, users.email, users.username, users.profile_picture, posts.post, posts.file_name, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id JOIN follows on users.id = follows.target_id WHERE follows.source_id = ? ORDER BY posts.created_at DESC LIMIT 7",[$user_id]);
        $posts = json_decode(json_encode($postsStd), true);
        for ($i=0; $i < count($posts); $i++) { 
            $profile_picture = $posts[$i]["profile_picture"];
            $email = $posts[$i]["email"];
            unset($posts[$i]["email"]);
            if($profile_picture!=null){
                $posts[$i]["profile_picture"] = asset("$email/$profile_picture");
            }
        }
        return $posts;
    }

    public function reloadPostsFollows(string $id)
    {
        $user_id = Auth::user()->id;
        $postsStd = DB::select("SELECT posts.id, users.email, users.username, users.profile_picture, posts.post, posts.file_name, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id JOIN follows on users.id = follows.target_id WHERE follows.source_id = ? AND posts.id<? ORDER BY posts.created_at DESC LIMIT 7",[$user_id,$id]);
        $posts = json_decode(json_encode($postsStd), true);
        for ($i=0; $i < count($posts); $i++) { 
            $profile_picture = $posts[$i]["profile_picture"];
            $email = $posts[$i]["email"];
            unset($posts[$i]["email"]);
            if($profile_picture!=null){
                $posts[$i]["profile_picture"] = asset("$email/$profile_picture");
            }
        }
        return $posts;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        $post = new Post();
        $post->user_id = Auth::user()->id;
        $post->post = $request->post;

        $path = Auth::user()->email;
        
        if ($request->hasFile('post_file')) {
            $file_name = time() . '_' . request()->post_file->getClientOriginalName();
            Storage::disk('public')->put("$path/$file_name", fopen($request->file('post_file'), 'r+'));

            $post->file_name = $file_name;
        }

        $post->save();

        return response()->json([
            "message" => "Post creado",
            "post" => $post->id,
        ], 200);
        
    }

    public function storeImage(Request $request, string $id){

        $request->validate([
            'post_file' =>  'required|file'
        ]);

        $post = Post::find($id);
        $path = Auth::user()->email;

        if ($request->hasFile('post_file')) {
            $file_name = time() . '_' . request()->post_file->getClientOriginalName();
            Storage::disk('public')->put("$path/$file_name", fopen($request->file('post_file'), 'r+'));

            $post->file_name = $file_name;
        }

        $post->save();

        return response()->json([
            "message" => "Post actualizado",
            "post" => $post,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if ($post = Post::find($id)) {
            return response()->json([
                "message" => "El post se ha encontrado",
                "post" => $post,
            ], 202);
        } else {
            return response()->json([
                "message" => "El post no ha sido encontrado"
            ], 404);
        }
    }

    public function downloadFile(string $id)
    {
        if ($post = Post::find($id)) {
            $fichero = $post->file_name;
            if ($fichero) {
                $user_id = $post->user_id;
                $user = User::find($user_id);
                $path = $user->email;
                
                return response()->json([
                    "success" => true,
                    "url" => asset("$path/$fichero"),
                ], 200);
                // return Storage::disk('sftp')->download("$path/$fichero");
            }

            return response()->json([
                "message" => "El post no contiene ningún fichero",
                "post" => $post,
            ], 404);
        }
        else {
            return response()->json([
                "message" => "El post no ha sido encontrado"
            ], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, string $id)
    {
        if (Post::where('id', $id)->exists()) {
            $post = Post::find($id);
            $post->user_id = $request->user_id;
            $post->post = $request->post;

            $post->save();
            return response()->json([
                "message" => "Post updated succesfully"
            ], 200);
        }else{
            return response()->json([
                "message" => "Post not found"
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if ($post = Post::find($id)) {
            $fichero = $post->file_name;
            if ($fichero) {
                $path = Auth::user()->email;
                Storage::disk('sftp')->delete("$path/$fichero");
            }
            $post->delete();

            return response()->json([
                "message" => "El post ha sido eliminado"
            ], 202);
        }else{
            return response()->json([
                "message" => "El post no ha sido encontrado"
            ], 404);
        }
    }
}
