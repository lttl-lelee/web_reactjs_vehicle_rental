<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehicleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->integer('delivery_enable');
            $table->integer('delivery_fee');
            $table->integer('delivery_radius');
            $table->integer('delivery_radius_free');
            $table->string('description');
            $table->integer('discount_enable');
            $table->integer('fuel_consumption');
            $table->integer('fuel_type');
            $table->string('license_plates');
            $table->integer('limit_distance');
            $table->integer('month_discount');
            $table->integer('now_price');
            $table->integer('origin_price');
            $table->integer('out_limit_fee');
            $table->integer('week_discount');
            $table->date('yom');
            $table->integer('category_id');
            $table->integer('location_id');
            $table->integer('user_id');
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
        Schema::dropIfExists('vehicles');
    }
}
