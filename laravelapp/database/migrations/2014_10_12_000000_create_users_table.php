<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('avatar_link')->nullable();
            $table->integer('banned')->default(0);
            $table->date('dob')->nullable();
            $table->string('email')->unique();
            $table->string('full_name')->nullable();
            $table->char('gender', 2)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->string('phone')->nullable();
            $table->string('role')->default('ROLE_USER');
            $table->string('username')->nullable();
            $table->integer('license_id')->default(1);
            $table->integer('response_id')->nullable();
            $table->integer('wallet_id')->nullable();
            
            $table->foreignId('current_team_id')->nullable();
            $table->string('profile_photo_path', 2048)->nullable();
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
        Schema::dropIfExists('users');
    }
}
