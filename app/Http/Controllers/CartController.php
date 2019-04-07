<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function addProduct(Request $request)
    {
        $json = $request->getContent();
        $data = json_decode($json, true);

        $id = Auth::id();

        $products = Cart::where(['user_id' => $id, 'product_id' => $data['id']])->get();
        $productName = null;
        if ($products->count()) {
            $product = $products->first();
            $product->count = $product->count + $data['count'];
            $product->save();
        } else {
            $product = new Cart;
            $product->fill([
                'user_id' => $id,
                'product_id' => $data['id'],
                'count' => $data['count'],
            ]);
            $product->save();
        }

        $products = Cart::where('user_id', $id)->get();
        $countAll = 0;
        foreach($products as $product) {
            $countAll = $countAll + $product->count;
        }

        return response()->json(array(
            'allCount' => $countAll,
            'product_name' => $data['name'],
            'product_count' => $data['count']
        ), 200);
    }

    public function getCount()
    {
        $id = Auth::id();
        $products = Cart::where('user_id', $id)->get();
        $countAll = 0;
        foreach($products as $product) {
            $countAll = $countAll + $product->count;
        }

        return response()->json(array('count' => $countAll), 200);
    }

    public function getUserProducts()
    {
        $id = Auth::id();
        $products = DB::table('cart')
            ->join('product', 'product.id', '=', 'cart.product_id')
            ->where('cart.user_id', $id)
            ->select('cart.id','cart.count', 'product.price', 'product.name', 'product.image')
            ->get();

        foreach($products as $product) {
            $product->sum = $product->price * $product->count;
        }

        return response()->json($products, 200);
    }

    public function removeProduct(Request $request)
    {
        $json = $request->getContent();
        $data = json_decode($json, true);
        Cart::destroy($data['id']);

        $id = Auth::id();
        $products = Cart::where('user_id', $id)->get();
        $countAll = 0;
        foreach($products as $product) {
            $countAll = $countAll + $product->count;
        }

        return response()->json(array(
            'allCount' => $countAll,
            'removeId' => $data['id'],
        ), 200);
    }

}
