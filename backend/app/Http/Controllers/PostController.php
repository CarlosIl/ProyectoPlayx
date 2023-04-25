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
        $post = Post::create($request->validated());

        $path = Auth::user()->email;
        
        if ($request->hasFile('post_file')) {
            $file_name = time() . '_' . request()->post_file->getClientOriginalName();
            Storage::disk('sftp')->put("$path/$file_name", fopen($request->file('post_file'), 'r+'));

            $file = new PostFiles();

            $file->file_name = $file_name;
            $file->id_post = $post->id;
    
            $file->save();
        }

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

            // $ficherosStd = DB::select('SELECT id,file_name FROM post_files WHERE id_post = ?',[$id]);
            // $ficheros_post = json_decode(json_encode($ficherosStd), true);

            // if(count($ficheros_post) >= 1){
            //     $path = Auth::user()->email;
                
            //     foreach ($ficheros_post as $fichero) {
            //         $file_name = $fichero["file_name"];
            //         return Storage::disk('sftp')->download("$path/$file_name");
            //     }
            // }

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
            $ficherosStd = DB::select('SELECT id,file_name FROM post_files WHERE id_post = ?',[$id]);
            $ficheros_post = json_decode(json_encode($ficherosStd), true);

            if(count($ficheros_post) >= 1){
                $path = Auth::user()->email;
                
                foreach ($ficheros_post as $fichero) {
                    $file_name = $fichero["file_name"];
                    return Storage::disk('sftp')->download("$path/$file_name");
                }
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
            $post->id_source = $request->id_source;
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
        if (Post::where('id', $id)->exists()) {
            $ficherosStd = DB::select('SELECT id FROM post_files WHERE id_post = ?',[$id]);
            $ficheros_post = json_decode(json_encode($ficherosStd), true);

            // return $ficheros_post;

            if(count($ficheros_post) >= 1){
                $path = Auth::user()->email;
                
                foreach ($ficheros_post as $fichero) {
                    $file = PostFiles::find($fichero["id"]);
                    $file_name = $file->file_name;
            
                    Storage::disk("sftp")->delete("$path/$file_name");
            
                    $file->delete();
                }
            }

            $post = Post::find($id);
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
