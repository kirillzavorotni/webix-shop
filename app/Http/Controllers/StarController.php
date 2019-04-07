<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Star;
use App\Product;

class StarController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function checkClick(Request $request)
    {
        $json = $request->getContent();
        $data = json_decode($json, true);

        $id = Auth::id();
        $stars = Star::where("user_id", $id)->where("product_id", $data['id'])->count();

        if ($stars) {
            return response()->json(array('clicked' => true), 200);
        }

        return response()->json(array('clicked' => false), 200);
    }

    public function setRating(Request $request)
    {
        $json = $request->getContent();
        $data = json_decode($json, true);

        $id = Auth::id();
        $stars = Star::where("user_id", $id)->where("product_id", $data['id'])->count();

        if ($stars) {
            return response()->json($data, 200);
        }

        // change rating in products
        $currentProduct = Product::find($data['id']);
        $curRating = $currentProduct->rating;
        $currentProduct->rating = ++$curRating;
        $currentProduct->save();

        // create(save) star for current user_id
        $star = Star::create([
            'user_id' => $id,
            'product_id' => $data['id'],
            'push_star' => 1,
        ]);

        $star['new_rating'] = $curRating;

        return response()->json($star, 200);
    }
}
