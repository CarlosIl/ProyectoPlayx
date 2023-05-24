<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Notification;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function store(string $id)
    {
        $user = Auth::user();

        $like = new Like();
        $like->post_id = $id;
        $like->user_id = $user->id;
        $like->save();

        $post = Post::find($id);

        if($user->id != $post->user_id){
            $noti = new Notification();
            $noti->source_id = $user->id;
            $noti->target_id = $post->user_id;
            $noti->post_id = $id;
            $noti->type = "like";
            $noti->status = 0;
            $noti->save();
        }

        return response()->json([
            "success" => true,
            "like" => $like,
        ], 200);
    }

    public function destroy(string $id)
    {
        $user = Auth::user();
        $post = Post::find($id);

        Like::where('post_id', $id)->where('user_id', $user->id)->delete();
        Notification::where('source_id', $user->id)->where('target_id', $post->user_id)->where('post_id', $id)->where('type', 'like')->delete();

        return response()->json([
            "success" => true,
        ], 200);
    }
}
