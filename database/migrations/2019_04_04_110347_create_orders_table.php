<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable()->default(null);
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('count')->unsigned()->nullable()->default(null);
            $table->string('email')->nullable()->default(null);
            $table->string('phone')->nullable()->default(null);
            $table->string('name')->nullable()->default(null);
            $table->string('address')->nullable()->default(null);
            $table->integer('delivery_id')->unsigned()->nullable()->default(null);
            $table->foreign('delivery_id')->references('id')->on('delivery_type');
            $table->integer('payment_id')->unsigned()->nullable()->default(null);
            $table->foreign('payment_id')->references('id')->on('payment_type');
            $table->string('order_date')->nullable()->default(null);;
            $table->integer('status_id')->unsigned()->nullable()->default(null);
            $table->foreign('status_id')->references('id')->on('order_status');
            $table->string('decline_reason');
            $table->string('buyer_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
