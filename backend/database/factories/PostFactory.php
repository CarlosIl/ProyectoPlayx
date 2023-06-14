<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $users = DB::select('SELECT MIN(id) as min, MAX(id) as max FROM users');
        $min_users = intval($users[0]->min);
        $max_users = intval($users[0]->max);

        $posts = DB::select('SELECT MIN(id) as min, MAX(id) as max FROM posts');
        $min_posts = intval($posts[0]->min);
        $max_posts = intval($posts[0]->max);
        $comment_id = intval(fake()->numberBetween($min_posts, $max_posts));

        return [
            "user_id" =>intval(fake()->numberBetween($min_users, $max_users)),
            "post" => fake()->text(),
            "comment_id" => 7,
        ];
    }
}
