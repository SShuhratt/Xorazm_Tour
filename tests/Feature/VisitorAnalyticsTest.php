<?php

namespace Tests\Feature;

use App\Models\SiteVisit;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class VisitorAnalyticsTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_visits_record_country_headers_and_deduplicate_daily_visitors(): void
    {
        $this->withHeaders([
            'CF-IPCountry' => 'UZ',
            'User-Agent' => 'Mozilla/5.0 VisitorOne',
        ])->get('/en/about')->assertOk();

        // Repeat same-day visit by same visitor should increment visits_count rather than adding a duplicate row
        $this->withHeaders([
            'CF-IPCountry' => 'UZ',
            'User-Agent' => 'Mozilla/5.0 VisitorOne',
        ])->get('/en/contact')->assertOk();

        // Different visitor from Vercel country header (clear persisted CF header from prior test call)
        $this->flushHeaders();
        $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.12'])
            ->withHeaders([
                'X-Vercel-IP-Country' => 'DE',
                'User-Agent' => 'Mozilla/5.0 VisitorTwo',
            ])
            ->get('/en/about')
            ->assertOk();

        $this->assertDatabaseCount('site_visits', 2);
        $this->assertDatabaseHas('site_visits', [
            'country_code' => 'UZ',
            'country_name' => 'Uzbekistan',
            'visits_count' => 2,
        ]);
        $this->assertDatabaseHas('site_visits', [
            'country_code' => 'DE',
            'country_name' => 'Germany',
            'visits_count' => 1,
        ]);
    }

    public function test_admin_routes_are_excluded_and_dashboard_receives_daily_weekly_monthly_country_stats(): void
    {
        $admin = User::factory()->admin()->create();
        $today = Carbon::today();

        SiteVisit::create([
            'visitor_hash' => hash('sha256', 'v1'),
            'visited_date' => $today->toDateString(),
            'country_code' => 'UZ',
            'country_name' => 'Uzbekistan',
            'path' => '/en',
            'visits_count' => 3,
        ]);

        SiteVisit::create([
            'visitor_hash' => hash('sha256', 'v2'),
            'visited_date' => $today->copy()->subDays(3)->toDateString(),
            'country_code' => 'US',
            'country_name' => 'United States',
            'path' => '/en/tours',
            'visits_count' => 2,
        ]);

        SiteVisit::create([
            'visitor_hash' => hash('sha256', 'v3'),
            'visited_date' => $today->copy()->subDays(20)->toDateString(),
            'country_code' => 'FR',
            'country_name' => 'France',
            'path' => '/en/cities',
            'visits_count' => 1,
        ]);

        $response = $this->actingAs($admin)->get(route('admin.dashboard'));

        $response->assertOk()->assertInertia(fn (AssertableInertia $page) => $page
            ->component('admin/dashboard')
            ->where('visitorStats.summary.daily.visitors', 1)
            ->where('visitorStats.summary.daily.page_views', 3)
            ->where('visitorStats.summary.weekly.visitors', 2)
            ->where('visitorStats.summary.monthly.visitors', 3)
            ->where('visitorStats.summary.all_time_visitors', 3)
            ->has('visitorStats.periods.daily.countries', 1)
            ->has('visitorStats.periods.weekly.countries', 2)
            ->has('visitorStats.periods.monthly.countries', 3)
        );

        // Visiting admin dashboard should not have created an extra site_visits row
        $this->assertDatabaseCount('site_visits', 3);
    }
}
