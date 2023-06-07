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

        $usersStd = DB::select("SELECT id FROM users");
        $users = json_decode(json_encode($usersStd), true);

        $sql = DB::select('SELECT MIN(id) as min, MAX(id) as max FROM posts');
        $min_posts = intval($sql[0]->min);
        $max_posts = intval($sql[0]->max);

        return [
            "user_id" =>intval(fake()->randomNumber($users)),
            "post" => fake()->text(),
            "comment_id" =>intval(fake()->numberBetween($min_posts, $max_posts)),
        ];
    }
}
