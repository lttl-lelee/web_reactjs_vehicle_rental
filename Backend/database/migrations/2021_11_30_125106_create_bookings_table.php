<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('amount')->nullable();
            $table->datetime('create_time');
            $table->datetime('end_time');
            $table->datetime('return_time');
            $table->datetime('start_time');
            $table->String('status')->default(0);
            $table->bigInteger('deposit_id');
            $table->bigInteger('promotion_id');
            $table->bigInteger('user_id');
            $table->bigInteger('vehicle_id');
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
        Schema::dropIfExists('bookings');
    }
}
