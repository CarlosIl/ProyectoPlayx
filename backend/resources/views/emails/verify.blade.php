<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
        img {
            width: 100px;
            height: 100px;
        }

        a{
            -webkit-appearance: button;
            -moz-appearance: button;
            appearance: button;
            text-decoration: none;
            background-color: #68A2FF;
            color: black;
            border: none;
            border-radius: 15px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <img src="{{ asset('imgs/PlayxLogo.png') }}">
    <h1>Verification Mail</h1>
    <p>Please verify your email with link bellow to continue setting up your Playx account</p>

    <p>Thank you</p>

    <a href="{{ route('user.verify', $mailData['token']) }}">
        See it yourself
    </a>
</body>
</html>