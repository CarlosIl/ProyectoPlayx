<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\DemoMail;
use App\Mail\VerificationMail;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function index()
    {
        $user_id = Auth::user()->id;
        $notificationsStd = DB::select("SELECT notifications.id, users.username, users.email, users.profile_picture, notifications.message, notifications.status, DATE_FORMAT(notifications.created_at, '%d/%m/%Y %H:%i') as created_at FROM `notifications` JOIN users on users.id = notifications.source_id WHERE notifications.target_id = ? ORDER BY notifications.created_at DESC LIMIT 3",[$user_id]);
        $notifications = json_decode(json_encode($notificationsStd), true);
        for ($i=0; $i < count($notifications); $i++) { 
            $profile_picture = $notifications[$i]["profile_picture"];
            $email = $notifications[$i]["email"];
            unset($notifications[$i]["email"]);
            if($profile_picture!=null){
                $notifications[$i]["profile_picture"] = asset("$email/$profile_picture");
            }
        }
        return $notifications;
    }

    public function reload(string $id)
    {
        $user_id = Auth::user()->id;
        $notificationsStd = DB::select("SELECT notifications.id, users.username, users.email, users.profile_picture, notifications.message, notifications.status, DATE_FORMAT(notifications.created_at, '%d/%m/%Y %H:%i') as created_at FROM `notifications` JOIN users on users.id = notifications.source_id WHERE notifications.target_id = ? AND notifications.id<? ORDER BY notifications.created_at DESC LIMIT 1",[$user_id, $id]);
        $notifications = json_decode(json_encode($notificationsStd), true);
        for ($i=0; $i < count($notifications); $i++) { 
            $profile_picture = $notifications[$i]["profile_picture"];
            $email = $notifications[$i]["email"];
            unset($notifications[$i]["email"]);
            if($profile_picture!=null){
                $notifications[$i]["profile_picture"] = asset("$email/$profile_picture");
            }
        }
        return $notifications;
    }

    public function saw(int $id)
    {
        $notify = Notification::find($id);
        $notify->status = 1;
        $notify->save();

        return response()->json([
            "success" => true,
            "message" => "Notification change succesfully",
        ], 200);
    }

    public function sendMail(array $mailData)
    {
        Mail::to($mailData["receiver"])->send(new DemoMail($mailData));
    }

    public function sendVerificationMail(array $mailData)
    {
        Mail::to($mailData["receiver"])->send(new VerificationMail($mailData));
    }
}
