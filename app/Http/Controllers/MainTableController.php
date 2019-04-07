<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Category;

class MainTableController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getData(Request $request)
    {
        $products = Product::all();
        return response()->json($products, 200);
    }

    public function getProducts(Request $request)
    {
        $json = $request->getContent();
        $data = json_decode($json, true);

        $category = Category::find($data['id']);

        if (!$category->parent_id) {
            $categories = Category::where('parent_id', $data['id'])->get();
            $ids = array();
            foreach ($categories as $category) {
                $ids[] = $category->id;
            }
            $products = Product::whereIn('category_id', $ids)->get();
            return response()->json($products, 200);
        }

        $products = Product::where('category_id', $data['id'])->get();
        return response()->json($products, 200);
    }
}
