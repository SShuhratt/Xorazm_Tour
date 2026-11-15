<?php

namespace Tests\Feature;

use App\Mail\BookingConfirmationMail;
use App\Mail\BookingOperatorNotificationMail;
use App\Models\Booking;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_create_tour_booking_with_server_side_tier_estimation(): void
    {
        Mail::fake();

        $tour = Tour::create([
            'slug' => 'classic-khiva',
            'status' => 'active',
            'category' => 'cultural',
            'cost' => 700,
        ]);
        $tour->translations()->create([
            'locale' => 'en',
            'title' => 'Classic Khiva & Bukhara',
            'description' => 'Tour',
            'pricing_tiers' => [
                ['group_size' => '2 – 3 people', 'price_per_person' => '600'],
                ['group_size' => '4 – 6 people', 'price_per_person' => '500'],
            ],
        ]);

        // Honeypot check
        $this->postJson('/api/v1/bookings', [
            'tour_id' => $tour->id,
            'customer_name' => 'Bot',
            'customer_email' => 'bot@example.com',
            'customer_phone' => '+998901234567',
            'guests_adults' => 2,
            'website' => 'https://bot.example.com',
        ])->assertCreated();
        $this->assertDatabaseCount('bookings', 0);

        // Valid booking: 4 adults matches tier "4 – 6 people" ($500 * 4 = $2000), ignoring tampered client total
        $response = $this->postJson('/api/v1/bookings', [
            'inquiry_type' => 'tour',
            'tour_id' => $tour->id,
            'customer_name' => 'Jane Doe',
            'customer_email' => 'Jane@Example.com',
            'customer_phone' => '+998 90 555 44 33',
            'preferred_date' => now()->addWeeks(2)->toDateString(),
            'guests_adults' => 4,
            'guests_children' => 1,
            'special_requests' => 'Vegetarian meals please',
            'estimated_total' => 1,
            'locale' => 'en',
        ]);

        $response->assertCreated();
        $response->assertJsonPath('status', 'new');
        $this->assertEquals(2250.0, (float) $response->json('estimated_total'));

        $booking = Booking::firstOrFail();
        $this->assertEquals('jane@example.com', $booking->customer_email);
        $this->assertEquals(2250.0, (float) $booking->estimated_total);

        Mail::assertQueued(BookingConfirmationMail::class);
        Mail::assertQueued(BookingOperatorNotificationMail::class);
    }

    public function test_admin_can_update_booking_status_and_export_csv_with_formula_escaping(): void
    {
        $admin = User::factory()->admin()->create();

        $booking = Booking::create([
            'reference' => 'XT-2026-TEST01',
            'inquiry_type' => 'tour',
            'customer_name' => '=SUM(A1:A2)',
            'customer_email' => 'client@example.com',
            'customer_phone' => '+998901112233',
            'guests_adults' => 2,
            'guests_children' => 0,
            'status' => 'new',
            'locale' => 'en',
        ]);

        $this->actingAs($admin)
            ->patch("/admin/bookings/{$booking->id}", [
                'status' => 'confirmed',
                'admin_notes' => 'Confirmed with guide',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('bookings', [
            'id' => $booking->id,
            'status' => 'confirmed',
            'admin_notes' => 'Confirmed with guide',
        ]);

        $exportResponse = $this->actingAs($admin)->get('/admin/bookings/export');
        $exportResponse->assertOk();
        $csv = $exportResponse->streamedContent();
        $this->assertStringContainsString('XT-2026-TEST01', $csv);
        $this->assertStringContainsString("'=SUM(A1:A2)", $csv);
    }
}
