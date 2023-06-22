<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /** @test */
    public function create_user_succesfully()
    {
        $credentials = [
            "username" => "userPrueba",
            "email" => "userprueba@example.com",
            "password" => "12345678",
            "c_password" => "12345678",
        ];
        $response = $this->post('/api/register', $credentials);
        $response->assertStatus(200);
    }

    /** @test */
    public function password_too_short()
    {
        $credentials = [
            "username" => "userPrueba",
            "email" => "userprueba@example.com",
            "password" => "123456",
            "c_password" => "123456",
        ];
        $response = $this->post('/api/register', $credentials);
        $response->assertSessionHasErrors([
            'password' => 'The password field must be at least 8 characters.',
        ]);
    }

    /** @test */
    public function password_not_match()
    {
        $credentials = [
            "username" => "userPrueba",
            "email" => "userprueba@example.com",
            "password" => "12345678",
            "c_password" => "123456",
        ];
        $response = $this->post('/api/register', $credentials);
        $response->assertSessionHasErrors([
            'c_password' => 'The c password field must match password.',
        ]);
    }

    /** @test */
    public function user_already_exists()
    {
        $credentials = [
            "username" => "userPrueba2",
            "email" => "userprueba2@example.com",
            "password" => "12345678",
            "c_password" => "12345678",
        ];
        User::create($credentials);
        $response = $this->post('/api/register', $credentials);
        $response->assertSessionHasErrors([
            'username' => 'The username has already been taken.',
        ]);
    }
}
