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
        Schema::create('user_followings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_source');
            $table->foreign("id_source")->references('id')->on('users');
            $table->unsignedBigInteger('id_target');
            $table->foreign("id_target")->references('id')->on('users');
            $table->enum('status', ['new', 'rejected', 'active'])->default('new');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_followings');
    }
};
