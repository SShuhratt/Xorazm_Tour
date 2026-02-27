<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;

// Contact form endpoint
Route::post('/contact/send', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email',
        'subject' => 'required|string|max:255',
        'message' => 'required|string|max:5000',
    ]);

    try {
        // Send email to admin
        Mail::send('emails.contact', $validated, function ($message) use ($validated) {
            $message->to(config('mail.from.address'))
                ->replyTo($validated['email'])
                ->subject('New Contact Form Submission: ' . $validated['subject']);
        });

        return response()->json(['message' => 'Contact message sent successfully'], 200);
    } catch (\Exception $e) {
        \Log::error('Contact form error: ' . $e->getMessage());
        return response()->json(['error' => 'Failed to send message'], 500);
    }
});

// Newsletter subscription endpoint
Route::post('/newsletter/subscribe', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email|unique:newsletter_subscriptions,email',
    ]);

    try {
        // Store in database (if table exists) or just send confirmation email
        \DB::table('newsletter_subscriptions')->insertOrIgnore([
            'email' => $validated['email'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Send confirmation email
        Mail::raw(
            'Thank you for subscribing to Xorazm Tour newsletter!',
            function ($message) use ($validated) {
                $message->to($validated['email'])
                    ->subject('Welcome to Xorazm Tour Newsletter');
            }
        );

        return response()->json(['message' => 'Successfully subscribed'], 200);
    } catch (\Illuminate\Database\QueryException $e) {
        // Email already subscribed
        return response()->json(['message' => 'Already subscribed'], 200);
    } catch (\Exception $e) {
        \Log::error('Newsletter subscription error: ' . $e->getMessage());
        return response()->json(['error' => 'Failed to subscribe'], 500);
    }
});
