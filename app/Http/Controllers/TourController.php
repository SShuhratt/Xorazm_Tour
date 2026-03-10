<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use Inertia\Inertia;

class TourController extends Controller
{
    public function index(string $locale)
    {
        app()->setLocale($locale);
        $tours = Tour::with(['translations', 'mainImage'])
            ->where('status', 'active')
            ->get();

        return Inertia::render('tours/index', [
            'tours' => $tours,
        ]);
    }

    public function show(string $locale, Tour $tour)
    {
        app()->setLocale($locale);
        $tour->load([
            'translations',
            'mainImage',
            'images',
            'cities.translations',
            'transports.translations',
            'schedules' => function($query) {
                $query->orderBy('day')->orderBy('time');
            },
            'schedules.translations'
        ]);

        return Inertia::render('tours/show', [
            'tour' => $tour,
            'locale' => app()->getLocale(),
        ]);
    }
}
