<?php

namespace App\Http\Controllers;

use App\Models\Festival;
use Inertia\Inertia;

class FestivalController extends Controller
{
    public function index(string $locale){
        app()->setLocale($locale);
        $festivals = Festival::with(['translations', 'mainImage'])
            ->where('status', true)
            ->get();

        return Inertia::render('festivals/index', [
            'festivals' => $festivals,
        ]);
    }

    public function show(string $locale, Festival $festival)
    {
        app()->setLocale($locale);
        $festival->load(['mainImage', 'translations', 'images']);
        return Inertia::render('festivals/show', [
            'festival' => $festival,
        ]);
    }
}
