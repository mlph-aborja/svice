<?php

namespace Tests\Feature;

use App\Eloquent\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed('DatabaseSeeder');
    }

    public function testAdminCanGetUsers ()
    {
        $admin = factory(User::class)->create();
        Passport::actingAs($admin);
        $response = $this->get("/api/users");
        $response->assertOk();
    }

    public function testUnAuthenticatedCannotGetUsers ()
    {
        $response = $this->get("/api/users");
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function testAdminCanGetUser ()
    {
        $admin = factory(User::class)->create();
        Passport::actingAs($admin);
        $user = User::first();
        $response = $this->get("/api/users/".$user->id);
        $response->assertOk();
    }

    public function testAdminCanCreateUser ()
    {
        $admin = factory(User::class)->create();
        Passport::actingAs($admin);
        $response = $this->post("/api/users",
                ["first_name"=>"Test 1",
                 "last_name" => "Test 1",
                "email" => "test@mail.com"]);
        $response->assertCreated();
    }

    public function testAdminCanUpdateUser ()
    {
        $user = User::first();
        $admin = factory(User::class)->create();
        Passport::actingAs($admin);

        $response = $this->put("/api/users/".$user->id,
            ["first_name"=>"Test Update",
                "last_name" => "Test Update",
                "email" => "test+2@mail.com"]);
        $response->assertOk();
    }

    public function testAdminCanDeleteUser ()
    {
        $user = User::first();
        $admin = factory(User::class)->create();
        Passport::actingAs($admin);

        $response = $this->delete("/api/users/".$user->id);
        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }
}
