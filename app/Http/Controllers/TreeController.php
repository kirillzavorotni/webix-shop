<?php

namespace App\Http\Controllers;

use App\Category;

class TreeController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getData()
    {
        // $product = Product::find(2);
        // $product = Product::where('id', 2)->first();
        // $category = $product->category;
        // $manufacturer = $product->manufacturer;
        // $products = Product::find(1);
        // foreach ($products as $product) {
        //     $product ;
        // }

        // $categories = Category::all();
        // $categories = Category::with('products')->get();

        // for($i = 0; $i < count($categories); $i++) {
        //     $categories[$i]['data'] = $categories[$i]->products;
        // }

        // foreach ($categories as $category) {
        //     // $category->products;
        //     $category->products;
        // }

        // $products = $category->product;

        // return response()->json($categories, 200);

//        $categories = DB::table('category as c')
//            ->leftJoin('category as n_c', 'c.id', '=', 'n_c.parent_id')
//            ->where('c.parent_id')
//            ->get([
//                'c.id as parent_id',
//                'c.name as parent_name',
//                'n_c.id as category_id',
//                'n_c.name as category_name'
//            ]);

        $categories = Category::where('parent_id', null)->get();
         foreach ($categories as $category) {
             $child = Category::where('parent_id', $category['id'])->get();
             $category['data'] = $child;
         }

        return response()->json($categories, 200);
    }

}
