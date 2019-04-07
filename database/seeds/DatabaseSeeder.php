<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(CategoriesSeeder::class);
        $this->call(ProductsSeeder::class);
        $this->call(DeliveryTypeSeeder::class);
        $this->call(PaymentTypeSeeder::class);
        $this->call(OrderStatusSeeder::class);
        $this->call(RolesTableSeeder::class);
    }
}
