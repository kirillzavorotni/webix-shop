<?php

use Illuminate\Database\Seeder;

class DeliveryTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('delivery_type')->insert([
            ['value' => 'Master'],
            ['value' => 'Visa'],
        ]);
    }
}
