<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\UserRole;
use App\User;
use App\Order;
use App\Category;
use App\Product;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function checkAdmin()
    {
        $id = Auth::id();
        if (UserRole::where('user_id', $id)->first()->role_id == 1) {
            return response()->json('admin', 200);
        }
        return response()->json('user', 200);
    }

    public function getUsers()
    {
        $id = Auth::id();
        if (UserRole::where('user_id', $id)->first()->role_id == 1) {
            $users = User::where('id', '!=', $id)->get();
            return response()->json($users, 200);
        }

        return redirect('/');
    }

    public function userUpdate(Request $request)
    {
        $id = Auth::id();
        if (UserRole::where('user_id', $id)->first()->role_id == 1) {
            $json = $request->getContent();
            $data = json_decode($json, true);

            $user = User::find($data['id']);
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->save();

            return response()->json($user, 200);
        }

        return redirect('/');
    }

    public function allOrders(Request $request)
    {
        $id = Auth::id();
        if (UserRole::where('user_id', $id)->first()->role_id == 1) {
            $orders = Order::all();
            return response()->json($orders, 200);
        }

        return redirect('/');
    }

    public function updateOrderStatus(Request $request)
    {
        $id = Auth::id();
        if (UserRole::where('user_id', $id)->first()->role_id == 1) {
            $json = $request->getContent();
            $data = json_decode($json, true);

            $order = Order::find($data['id']);
            $order->status_id = $data['status_id'];
            $order->decline_reason = $data['decline_reason'];
            $order->save();
            return response()->json($order, 200);
        }

        return redirect('/');
    }

    public function addPicture(Request $request)
    {
        $id = Auth::id();
        if (UserRole::where('user_id', $id)->first()->role_id == 1) {

            $file = $request->file('upload');

            $destinationPath = public_path('img');
            $extensionFile = $file->getClientOriginalExtension();
            $filename =  md5(uniqid().'_'.$file->getClientOriginalName()).'.'.$extensionFile;
            $file->move($destinationPath, $filename);

            return response()->json(array("status" => "server", "filename" => $filename ), 200);
        }

        return redirect('/');
    }

    public function getGroups(Request $request)
    {
        $id = Auth::id();
        if (UserRole::where('user_id', $id)->first()->role_id == 1) {

            $groups = Category::where('parent_id', null)->get();

            return response()->json($groups, 200);
        }

        return redirect('/');
    }

    public function getManufacturers(Request $request)
    {
        $id = Auth::id();
        if (UserRole::where('user_id', $id)->first()->role_id == 1) {
            $manuf = Category::where('parent_id', '!=', null)->distinct()->get('name');

            return response()->json($manuf, 200);
        }

        return redirect('/');
    }

    public function addProduct(Request $request)
    {
        $id = Auth::id();
        if (UserRole::where('user_id', $id)->first()->role_id == 1) {
            $json = $request->getContent();
            $data = json_decode($json, true);

            $category_id = Category::where('parent_id', $data['groupId'])->where('name', $data['featurersName'])->first();
            if(isset($category_id->id)) {
                $product = Product::create([
                    'name' => $data['name'],
                    'price' => $data['price'],
                    'image' => isset($data['picture']) ? $data['picture'] : 'default.png',
                    'category_id' => $category_id->id,
                ]);
                return response()->json($product, 200);
            }

            $category = Category::create([
                'name' => $data['featurersName'],
                'parent_id' => $data['groupId'],
            ]);

            $product = Product::create([
                'name' => $data['name'],
                'price' => $data['price'],
                'image' => isset($data['picture']) ? $data['picture'] : 'default.png',
                'category_id' => $category->id,
            ]);

            return response()->json($product, 200);
        }

        return redirect('/');
    }
}
