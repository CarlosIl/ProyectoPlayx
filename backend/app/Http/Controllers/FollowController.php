<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FollowController extends Controller
{
    public function store(int $id)
    {
        $new_follow = User::find($id);
        $user = Auth::user();

        if($id == $user->id){
            return response()->json([
                "message" => "No puedes seguirte a ti mismo",
            ], 404);
        }

        $follow = new Follow();
        $follow->source_id = $user->id;
        $follow->target_id = $id;
        $follow->save();

        // $mailData = [
        //     'receiver' => $new_follow->email,
        //     'subject' => 'New Follow in Playx',
        //     'title' => 'New Follow',
        //     'body' => "$user->username ha empezado ha seguirte",
        //     'action' => "http://www.google.com",
        // ];
        // (new NotificationController)->sendMail($mailData);

        $noti = new Notification();
        $noti->user_id = $id;
        $noti->message = "$user->username ha empezado ha seguirte";
        $noti->save();

        return response()->json([
            "message" => "$user->username ha empezado ha seguir a $new_follow->username",
            "follow" => $follow,
        ], 200);
    }

    public function destroy(int $id)
    {
        $old_follow = User::find($id);
        $user = Auth::user();

        // $response = DB::statement('DELETE FROM follows WHERE source_id = ? AND target_id = ?',[$user->id, $id]);

        Follow::where('source_id', $user->id)->where('target_id', $id)->delete();

        return response()->json([
            "message" => "$user->username ha dejado de seguir a $old_follow->username",
        ], 200);
    }

    public function show_followings()
    {
        $user = Auth::user();
        $followings = Follow::where('source_id', $user->id)->get();
        $data = [];
        foreach ($followings as $key => $user_following) {
            // return $user_following;
            array_push($data, User::find($user_following->target_id));
        }
        return $data;
    }

    public function show_followers()
    {
        $user = Auth::user();
        $followers = Follow::where('target_id', $user->id)->get();
        $data = [];
        foreach ($followers as $key => $user_followers) {
            // return $user_following;
            array_push($data, User::find($user_followers->source_id));
        }
        return $data;
    }
}
