<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users_verify', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->foreign("user_id")->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->string('token');
            $table->timestamp('created_at');
            $table->timestamp('expires_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_verify');
    }
};
