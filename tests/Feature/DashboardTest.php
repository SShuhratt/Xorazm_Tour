<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get(route('dashboard'))->assertRedirect(route('login'));
        $this->get(route('admin.dashboard'))->assertRedirect(route('login'));
    }

    public function test_non_admin_users_cannot_access_admin_dashboard()
    {
        $user = User::factory()->create(['is_admin' => false]);

        $this->actingAs($user)
            ->get(route('dashboard'))
            ->assertForbidden();

        $this->actingAs($user)
            ->get(route('admin.dashboard'))
            ->assertForbidden();
    }

    public function test_admin_users_can_visit_the_admin_dashboard()
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('dashboard'))
            ->assertRedirect(route('admin.dashboard'));

        $this->actingAs($admin)
            ->get(route('admin.dashboard'))
            ->assertOk();
    }
}
