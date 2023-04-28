<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\DemoMail;
use App\Mail\VerificationMail;

class NotificationController extends Controller
{
    public function index()
    {
        $id = Auth::user()->id;
        return Notification::where('user_id', $id)->get();
    }

    public function saw(int $id)
    {
        $notify = Notification::find($id);
        $notify->status = 1;
        $notify->save();

        return response()->json([
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
