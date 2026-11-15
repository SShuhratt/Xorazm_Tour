<?php

namespace Tests\Feature;

use App\Mail\ContactFormMail;
use App\Mail\NewsletterWelcomeMail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactAndNewsletterTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_form_queues_email_and_ignores_honeypot(): void
    {
        Mail::fake();

        $honeypot = $this->postJson('/api/v1/contact/send', [
            'name' => 'Bot',
            'email' => 'bot@example.com',
            'subject' => 'Spam',
            'message' => 'Buy links',
            'website' => 'https://spam.example.com',
        ]);
        $honeypot->assertOk();
        Mail::assertNothingQueued();

        $valid = $this->postJson('/api/v1/contact/send', [
            'name' => 'Alice Traveler',
            'email' => 'alice@example.com',
            'subject' => 'Private Khiva Tour',
            'message' => 'Hello, I want to book a 3-day trip in October.',
        ]);
        $valid->assertOk();
        Mail::assertQueued(ContactFormMail::class);
    }

    public function test_newsletter_subscription_stores_unique_email_and_queues_welcome_mail(): void
    {
        Mail::fake();

        // Honeypot returns 200 without storing
        $this->postJson('/api/v1/newsletter/subscribe', [
            'email' => 'bot@example.com',
            'website' => 'spam-site',
        ])->assertOk();
        $this->assertDatabaseMissing('newsletter_subscriptions', ['email' => 'bot@example.com']);
        Mail::assertNothingQueued();

        // Valid subscription stores and queues welcome mail
        $first = $this->postJson('/api/v1/newsletter/subscribe', [
            'email' => 'Traveler@Example.com',
        ]);
        $first->assertOk();
        $this->assertEquals(1, DB::table('newsletter_subscriptions')->where('email', 'traveler@example.com')->count());
        Mail::assertQueued(NewsletterWelcomeMail::class);

        // Duplicate returns 409 conflict
        $duplicate = $this->postJson('/api/v1/newsletter/subscribe', [
            'email' => 'traveler@example.com',
        ]);
        $duplicate->assertStatus(409);
    }
}

