<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('category')->insert([
            ['name' => 'Phones', 'parent_id' => null],
            ['name' => 'Notebooks', 'parent_id' => null],
            // Phones
            ['name' => 'Apple', 'parent_id' => 1],
            ['name' => 'Samsung', 'parent_id' => 1],
            ['name' => 'Huawei', 'parent_id' => 1],
            // Notebooks
            ['name' => 'Apple', 'parent_id' => 2],
            ['name' => 'Huawei', 'parent_id' => 2],
            ['name' => 'Acer', 'parent_id' => 2],
        ]);
    }
}
