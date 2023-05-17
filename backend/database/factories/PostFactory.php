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

        return [
            "user_id" =>intval(fake()->randomElement($users)),
            "post" => fake()->text(),
        ];
    }
}
