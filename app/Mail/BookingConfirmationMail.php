<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingConfirmationMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public Booking $booking) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Xorazm Tour Booking Request Received (' . $this->booking->reference . ')',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-confirmation',
            with: [
                'booking' => $this->booking->loadMissing(['tour.translations', 'dish.translations']),
            ],
        );
    }
}

