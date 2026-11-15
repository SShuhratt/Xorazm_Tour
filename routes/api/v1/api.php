<?php

use App\Http\Controllers\BookingController;
use App\Mail\ContactFormMail;
use App\Mail\NewsletterWelcomeMail;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

// Contact form endpoint (throttled + honeypot protected)
Route::post('/contact/send', function (Request $request) {
    if ($request->filled('website')) {
        return response()->json(['message' => 'Contact message sent successfully'], 200);
    }

    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'subject' => 'required|string|max:255',
        'message' => 'required|string|max:5000',
    ]);

    try {
        $recipient = config('mail.from.address') ?: 'xorazmtour@gmail.com';
        Mail::to($recipient)->queue(new ContactFormMail(
            senderName: $validated['name'],
            senderEmail: $validated['email'],
            subjectLine: $validated['subject'],
            contactMessage: $validated['message'],
        ));

        return response()->json(['message' => 'Contact message sent successfully'], 200);
    } catch (\Throwable $e) {
        Log::error('Contact form error: ' . $e->getMessage());

        return response()->json(['error' => 'Failed to send message'], 500);
    }
})->middleware('throttle:5,1');

// Newsletter subscription endpoint (throttled + honeypot + proper duplicate/error handling)
Route::post('/newsletter/subscribe', function (Request $request) {
    if ($request->filled('website')) {
        return response()->json(['message' => 'Successfully subscribed'], 200);
    }

    $validated = $request->validate([
        'email' => 'required|email|max:255',
    ]);

    $normalizedEmail = strtolower(trim($validated['email']));

    try {
        $alreadySubscribed = DB::table('newsletter_subscriptions')
            ->where('email', $normalizedEmail)
            ->exists();

        if ($alreadySubscribed) {
            return response()->json(['message' => 'Already subscribed'], 409);
        }

        DB::table('newsletter_subscriptions')->insert([
            'email' => $normalizedEmail,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Mail::to($normalizedEmail)->queue(new NewsletterWelcomeMail($normalizedEmail));

        return response()->json(['message' => 'Successfully subscribed'], 200);
    } catch (QueryException $e) {
        $sqlState = $e->errorInfo[0] ?? $e->getCode();
        if (in_array((string) $sqlState, ['23000', '23505'], true)) {
            return response()->json(['message' => 'Already subscribed'], 409);
        }

        Log::error('Newsletter database error: ' . $e->getMessage());

        return response()->json(['error' => 'Failed to subscribe'], 500);
    } catch (\Throwable $e) {
        Log::error('Newsletter subscription error: ' . $e->getMessage());

        return response()->json(['error' => 'Failed to subscribe'], 500);
    }
})->middleware('throttle:10,1');

// Tour booking & custom gastro inquiry endpoint
Route::post('/bookings', [BookingController::class, 'store'])->middleware('throttle:10,1');
