<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewsletterWelcomeMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $subscriberEmail,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to Xorazm Tour Newsletter',
        );
    }

    public function content(): Content
    {
        return new Content(
            htmlString: '<p>Thank you for subscribing to Xorazm Tour newsletter!</p><p>We will share curated Silk Road itineraries, seasonal Khorezm festivals, and special offers with you.</p>',
        );
    }
}

