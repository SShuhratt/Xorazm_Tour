<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Inertia\Inertia;

class HotelController extends Controller
{
    public function index(string $locale){
        app()->setLocale($locale);
        $hotels = Hotel::with(['translations', 'mainImage', 'images', 'city.translations'])
            ->where('status', true)
            ->get();

        return Inertia::render('hotels/index', [
            'hotels' => $hotels,
        ]);
    }

    public function show(string $locale, Hotel $hotel){
        abort_unless($hotel->status, 404);
        app()->setLocale($locale);
        $hotel->load(['translations', 'mainImage', 'images', 'city.translations']);
        return Inertia::render('hotels/show', ['hotel' => $hotel, 'locale' => app()->getLocale()]);
    }
}
