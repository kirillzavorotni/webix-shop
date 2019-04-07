<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function makeOrder(Request $request)
    {
        $id = Auth::id();
        $json = $request->getContent();
        $data = json_decode($json, true);

        $products = DB::table('cart')
            ->join('product', 'product.id', '=', 'cart.product_id')
            ->where('cart.user_id', $id)
            ->select('product.name', 'cart.count')
            ->get();

        $productArray = array();

        foreach($products as $product) {
            $productArray[] = array(
                'address' => $data['deliverAddress'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'delivery_id' => $data['deliverType'],
                'payment_id' => $data['paymentType'],
                'order_date' => $data['order_date'],
                'status_id' => 1,
                'count' => $product->count,
                'name' => $product->name,
                'user_id' => $id,
                'buyer_name' => $data['name'],
                'decline_reason' => 'no decline reason'
            );
        }

        DB::table('orders')->insert($productArray);
        Cart::where('user_id', $id)->delete();
        return response()->json($data, 200);
    }

    public function getUserOrder()
    {
        $id = Auth::id();
        $userOrders = Order::where('user_id', $id)->get();
        return response()->json($userOrders, 200);
    }
}
