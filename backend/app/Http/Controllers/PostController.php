<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Models\PostFiles;
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
        return Post::all();
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
        $post->user_id = $request->user_id;
        $post->post = $request->post;

        $path = Auth::user()->email;
        
        if ($request->hasFile('post_file')) {
            $file_name = time() . '_' . request()->post_file->getClientOriginalName();
            Storage::disk('sftp')->put("$path/$file_name", fopen($request->file('post_file'), 'r+'));

            $post->file_name = $file_name;
        }

        $post->save();

        return response()->json([
            "message" => "Post creado",
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
                $path = Auth::user()->email;
                return Storage::disk('sftp')->download("$path/$fichero");
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
