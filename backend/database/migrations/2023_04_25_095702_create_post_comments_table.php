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
        Schema::create('post_comment', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_post');
            $table->foreign("id_post")->references('id')->on('posts');
            $table->unsignedBigInteger('id_user');
            $table->foreign("id_user")->references('id')->on('users');
            $table->text('comment');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_comment');
    }
};
