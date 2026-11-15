<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingOperatorNotificationMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public Booking $booking) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '[New Booking] ' . $this->booking->reference . ' — ' . $this->booking->customer_name,
            replyTo: [new Address($this->booking->customer_email, $this->booking->customer_name)],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-operator',
            with: [
                'booking' => $this->booking->loadMissing(['tour.translations', 'dish.translations']),
            ],
        );
    }
}

