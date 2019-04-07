<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getUserName()
    {
        $id = Auth::id();
        $userName = User::find($id)->name;

        return response()->json($userName, 200);
    }
}
