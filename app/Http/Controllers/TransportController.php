<?php

namespace App\Http\Controllers;


use App\Models\Transport;
use Inertia\Inertia;

class TransportController extends Controller
{
    public function index(string $locale){
        app()->setLocale($locale);
        $transports = Transport::with(['translations', 'mainImage'])
            ->where('status', true)
            ->get();

        return Inertia::render('transports/index', [
            'transports' => $transports,
        ]);
    }

    public function show(string $locale, Transport $transport){
        app()->setLocale($locale);
        $transport->load(['translations', 'mainImage', 'images']);
        return Inertia::render('transports/show', ['transport' => $transport]);
    }
}
