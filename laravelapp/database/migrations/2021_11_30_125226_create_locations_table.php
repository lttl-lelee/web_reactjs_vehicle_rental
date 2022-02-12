<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->integer('district_code');
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->integer('province_code');
            $table->string('str_address')->nullable();
            $table->string('street')->nullable();
            $table->integer('ward_code');
            $table->integer('user_id')->nullable();
            $table->tinyInteger('default_address');
            $table->string('name')->nullable();
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
        Schema::dropIfExists('locations');
    }
}
