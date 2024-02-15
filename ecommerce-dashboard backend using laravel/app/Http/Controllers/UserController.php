<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    function register(Request $req )
    {
        // return "Hello";
         
        $user = new User;
        $user->name=$req->input('name');
        $user->email=$req->input('email');
        $user->password=Hash::make($req->input('password'));
        $user->save();
        return $user;
        // return $req->input();
    }

    function login(Request $req){
        $user = User::where('email', $req->email)->first();
        if (!$user || !Hash::check($req->input('password'), $user->password))
       {
        return response([
            'error'=>["Email or Password not matched"]
        ]);
       }
        return $user;

    }
}
