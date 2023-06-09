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
    //Para recoger todos los posts de cualquier usuario, incluido el propio.
    public function index()
    {
        $user_id = Auth::user()->id;
        $postsStd = DB::select("SELECT posts.id, users.email, users.username, users.profile_picture, posts.post, posts.file_name, posts.comment_id, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id) AS likes, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id AND user_id = ?) AS user_like, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id ORDER BY posts.created_at DESC LIMIT 7",[$user_id]);
        $posts = json_decode(json_encode($postsStd), true);
        for ($i=0; $i < count($posts); $i++) { 

            $email = $posts[$i]["email"];
            unset($posts[$i]["email"]);

            $profile_picture = $posts[$i]["profile_picture"];
            $file_name = $posts[$i]["file_name"];

            if($profile_picture!=null){
                $posts[$i]["profile_picture"] = asset("$email/$profile_picture");
            }else{
                $posts[$i]["profile_picture"] = env('DEFAULT_PROFILE_PICTURE_PATH');
            }

            if($file_name != null){
                $posts[$i]["file_name"] = asset("$email/$file_name");
            }
        }
        return $posts;
    }

    public function reload(string $id)
    {
        $user_id = Auth::user()->id;
        $postsStd = DB::select("SELECT posts.id, users.email, users.username, users.profile_picture, posts.post, posts.file_name, posts.comment_id, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id) AS likes, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id AND user_id = ?) AS user_like, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id WHERE posts.id<? ORDER BY posts.created_at DESC LIMIT 3",[$user_id,$id]);
        $posts = json_decode(json_encode($postsStd), true);
        for ($i=0; $i < count($posts); $i++) { 

            $email = $posts[$i]["email"];
            unset($posts[$i]["email"]);

            $profile_picture = $posts[$i]["profile_picture"];
            $file_name = $posts[$i]["file_name"];

            if($profile_picture!=null){
                $posts[$i]["profile_picture"] = asset("$email/$profile_picture");
            }else{
                $posts[$i]["profile_picture"] = env('DEFAULT_PROFILE_PICTURE_PATH');
            }

            if($file_name != null){
                $posts[$i]["file_name"] = asset("$email/$file_name");
            }
        }
        return $posts;
    }

    //Para recoger los posts de un usuario en específico
    public function getPostsX(string $username)
    {
        $user_id = Auth::user()->id;
        $postsStd = DB::select("SELECT posts.id, users.email, users.username, users.profile_picture, posts.post, posts.file_name, posts.comment_id, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id) AS likes, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id AND user_id = ?) AS user_like, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id WHERE users.username = ? ORDER BY posts.created_at DESC LIMIT 7",[$user_id,$username]);
        $posts = json_decode(json_encode($postsStd), true);
        for ($i=0; $i < count($posts); $i++) { 

            $email = $posts[$i]["email"];
            unset($posts[$i]["email"]);

            $profile_picture = $posts[$i]["profile_picture"];
            $file_name = $posts[$i]["file_name"];

            if($profile_picture!=null){
                $posts[$i]["profile_picture"] = asset("$email/$profile_picture");
            }else{
                $posts[$i]["profile_picture"] = env('DEFAULT_PROFILE_PICTURE_PATH');
            }

            if($file_name != null){
                $posts[$i]["file_name"] = asset("$email/$file_name");
            }
        }
        return $posts;
    }

    public function reloadPostsX(string $username, string $id)
    {
        $user_id = Auth::user()->id;
        $postsStd = DB::select("SELECT posts.id, users.email, users.username, users.profile_picture, posts.post, posts.file_name, posts.comment_id, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id) AS likes, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id AND user_id = ?) AS user_like, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id WHERE users.username = ? AND posts.id<? ORDER BY posts.created_at DESC LIMIT 3",[$user_id,$username,$id]);
        $posts = json_decode(json_encode($postsStd), true);
        for ($i=0; $i < count($posts); $i++) { 

            $email = $posts[$i]["email"];
            unset($posts[$i]["email"]);

            $profile_picture = $posts[$i]["profile_picture"];
            $file_name = $posts[$i]["file_name"];

            if($profile_picture!=null){
                $posts[$i]["profile_picture"] = asset("$email/$profile_picture");
            }else{
                $posts[$i]["profile_picture"] = env('DEFAULT_PROFILE_PICTURE_PATH');
            }

            if($file_name != null){
                $posts[$i]["file_name"] = asset("$email/$file_name");
            }
        }
        return $posts;
    }

    //Para recoger los posts de los usuarios a los que siguen
    public function getPostsFollows()
    {
        $user_id = Auth::user()->id;
        $postsStd = DB::select("SELECT posts.id, users.email, users.username, users.profile_picture, posts.post, posts.file_name, posts.comment_id, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id) AS likes, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id AND user_id = ?) AS user_like, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id JOIN follows on users.id = follows.target_id WHERE follows.source_id = ? ORDER BY posts.created_at DESC LIMIT 7",[$user_id,$user_id]);
        $posts = json_decode(json_encode($postsStd), true);
        for ($i=0; $i < count($posts); $i++) { 

            $email = $posts[$i]["email"];
            unset($posts[$i]["email"]);

            $profile_picture = $posts[$i]["profile_picture"];
            $file_name = $posts[$i]["file_name"];

            if($profile_picture!=null){
                $posts[$i]["profile_picture"] = asset("$email/$profile_picture");
            }else{
                $posts[$i]["profile_picture"] = env('DEFAULT_PROFILE_PICTURE_PATH');
            }

            if($file_name != null){
                $posts[$i]["file_name"] = asset("$email/$file_name");
            }
        }
        return $posts;
    }

    public function reloadPostsFollows(string $id)
    {
        $user_id = Auth::user()->id;
        $postsStd = DB::select("SELECT posts.id, users.email, users.username, users.profile_picture, posts.post, posts.file_name, posts.comment_id, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id) AS likes, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id AND user_id = ?) AS user_like, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id JOIN follows on users.id = follows.target_id WHERE follows.source_id = ? AND posts.id<? ORDER BY posts.created_at DESC LIMIT 3",[$user_id,$user_id,$id]);
        $posts = json_decode(json_encode($postsStd), true);
        for ($i=0; $i < count($posts); $i++) { 

            $email = $posts[$i]["email"];
            unset($posts[$i]["email"]);

            $profile_picture = $posts[$i]["profile_picture"];
            $file_name = $posts[$i]["file_name"];

            if($profile_picture!=null){
                $posts[$i]["profile_picture"] = asset("$email/$profile_picture");
            }else{
                $posts[$i]["profile_picture"] = env('DEFAULT_PROFILE_PICTURE_PATH');
            }

            if($file_name != null){
                $posts[$i]["file_name"] = asset("$email/$file_name");
            }
        }
        return $posts;
    }

    public function getComments(string $id)
    {
        $postsStd = DB::select("SELECT posts.id, users.email, users.username, users.profile_picture, posts.post, posts.file_name, posts.comment_id, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id WHERE posts.comment_id=? ORDER BY posts.created_at DESC LIMIT 10",[$id]);
        $posts = json_decode(json_encode($postsStd), true);
        for ($i=0; $i < count($posts); $i++) { 

            $email = $posts[$i]["email"];
            unset($posts[$i]["email"]);

            $profile_picture = $posts[$i]["profile_picture"];
            $file_name = $posts[$i]["file_name"];

            if($profile_picture!=null){
                $posts[$i]["profile_picture"] = asset("$email/$profile_picture");
            }else{
                $posts[$i]["profile_picture"] = env('DEFAULT_PROFILE_PICTURE_PATH');
            }

            if($file_name != null){
                $posts[$i]["file_name"] = asset("$email/$file_name");
            }
        }
        return $posts;
    }

    public function reloadComments(string $id, string $posts_id)
    {
        $postsStd = DB::select("SELECT posts.id, users.email, users.username, users.profile_picture, posts.post, posts.file_name, posts.comment_id, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id WHERE posts.comment_id=? AND posts.id<? ORDER BY posts.created_at DESC LIMIT 3",[$id,$posts_id]);
        $posts = json_decode(json_encode($postsStd), true);
        for ($i=0; $i < count($posts); $i++) { 

            $email = $posts[$i]["email"];
            unset($posts[$i]["email"]);

            $profile_picture = $posts[$i]["profile_picture"];
            $file_name = $posts[$i]["file_name"];

            if($profile_picture!=null){
                $posts[$i]["profile_picture"] = asset("$email/$profile_picture");
            }else{
                $posts[$i]["profile_picture"] = env('DEFAULT_PROFILE_PICTURE_PATH');
            }

            if($file_name != null){
                $posts[$i]["file_name"] = asset("$email/$file_name");
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

        $post->comment_id = $request->comment_id;

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
        $user_id = Auth::user()->id;
        $postsStd = DB::select("SELECT posts.id, users.email, users.username, users.profile_picture, posts.post, posts.file_name, posts.comment_id, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id) AS likes, (SELECT COUNT(*) FROM likes WHERE post_id = posts.id AND user_id = ?) AS user_like, DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i') AS created_at FROM `posts` JOIN users on posts.user_id = users.id WHERE posts.id=?",[$user_id,$id]);
        $posts = json_decode(json_encode($postsStd), true);
        for ($i=0; $i < count($posts); $i++) { 

            $email = $posts[$i]["email"];
            unset($posts[$i]["email"]);

            $profile_picture = $posts[$i]["profile_picture"];
            $file_name = $posts[$i]["file_name"];

            if($profile_picture!=null){
                $posts[$i]["profile_picture"] = asset("$email/$profile_picture");
            }else{
                $posts[$i]["profile_picture"] = env('DEFAULT_PROFILE_PICTURE_PATH');
            }

            if($file_name != null){
                $posts[$i]["file_name"] = asset("$email/$file_name");
            }
        }
        return $posts;
        // if ($post = Post::find($id)) {
        //     return response()->json([
        //         "message" => "El post se ha encontrado",
        //         "post" => $post,
        //     ], 202);
        // } else {
        //     return response()->json([
        //         "message" => "El post no ha sido encontrado"
        //     ], 404);
        // }
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
