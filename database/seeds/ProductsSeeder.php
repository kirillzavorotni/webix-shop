<?php

use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('product')->insert([
            // phones
            // apple
            ['name' => 'Apple iPhone 7', 'category_id' => 3, 'price' => 1100, 'rating' => 1],
            ['name' => 'Apple iPhone X', 'category_id' => 3, 'price' => 1999, 'rating' => 2],
            ['name' => 'Apple iPhone XR', 'category_id' => 3, 'price' => 1649, 'rating' => 1],
            ['name' => 'Apple iPhone XS', 'category_id' => 3, 'price' => 2449, 'rating' => 3],
            ['name' => 'Apple iPhone 8', 'category_id' => 3, 'price' => 1488, 'rating' => 2],

            // samsung
            ['name' => 'Samsung Galaxy A30', 'cateoryg_id' => 4, 'price' => 499, 'rating' => 1],
            ['name' => 'Samsung Galaxy A50', 'category_id' => 4, 'price' => 689, 'rating' => 2],
            ['name' => 'Samsung Galaxy S10+', 'category_id' => 4, 'price' => 2185, 'rating' => 1],
            ['name' => 'Samsung Galaxy S8 Dual SIM', 'category_id' => 4, 'price' => 995, 'rating' => 3],
            ['name' => 'Samsung Galaxy S10e', 'category_id' => 4, 'price' => 1615, 'rating' => 2],

            // huawei
            ['name' => 'Huawei P20 Pro', 'category_id' => 5, 'price' => 1300, 'rating' => 1],
            ['name' => 'Huawei P20 Lite', 'category_id' => 5, 'price' => 560, 'rating' => 2],
            ['name' => 'Huawei P Smart 2019', 'category_id' => 5, 'price' => 493, 'rating' => 1],
            ['name' => 'Huawei Mate 10 Lite', 'category_id' => 5, 'price' => 470, 'rating' => 3],
            ['name' => 'Huawei Mate 20 Lite', 'category_id' => 5, 'price' => 594, 'rating' => 2],


            // notebooks
            // apple
            ['name' => 'Apple MacBook Air 13" 2017', 'category_id' => 6, 'price' => 2129, 'rating' => 1],
            ['name' => 'Apple MacBook Pro 15" Touch Bar', 'category_id' => 6, 'price' => 6100, 'rating' => 2],
            ['name' => 'Apple MacBook Pro 13"', 'category_id' => 6, 'price' => 2949, 'rating' => 1],
            ['name' => 'Apple MacBook Air 13" 2018', 'category_id' => 6, 'price' => 2999, 'rating' => 3],
            ['name' => 'Apple MacBook Pro 13" Touch Bar', 'category_id' => 6, 'price' => 4099, 'rating' => 2],

            // huawei
            ['name' => 'Huawei MateBook X Pro MACH-W19', 'category_id' => 7, 'price' => 3553, 'rating' => 1],
            ['name' => 'Huawei MateBook X WT-W09', 'category_id' => 7, 'price' => 2786, 'rating' => 2],

            // acer
            ['name' => 'Acer Spin 1 SP111-32N-C1AJ', 'category_id' => 8, 'price' => 599, 'rating' => 1],
            ['name' => 'Acer Nitro 5 AN515-31-59LU', 'category_id' => 8, 'price' => 1548, 'rating' => 2],
            ['name' => 'Acer Aspire 5 A515-52G-59SD', 'category_id' => 8, 'price' => 1890, 'rating' => 1],
            ['name' => 'Acer Extensa EX2540-31PH', 'category_id' => 8, 'price' => 717, 'rating' => 2],
        ]);
    }
}
