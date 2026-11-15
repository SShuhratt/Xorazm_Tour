<?php

namespace App\Http\Controllers;

use App\Models\City;
use Inertia\Inertia;

class CityController extends Controller
{
    public function index(string $locale){
        app()->setLocale($locale);
        $cities = City::with(['translations', 'mainImage', 'images'])
            ->where('status', true)
            ->get();

        return Inertia::render('cities/index', [
            'cities' => $cities,
        ]);
    }

    public function show(string $locale, City $city){
        abort_unless($city->status, 404);
        app()->setLocale($locale);
        $city->load([
            'translations',
            'mainImage',
            'images',
            'tours' => fn ($q) => $q->where('status', 'active')->with(['translations', 'mainImage']),
        ]);
        return Inertia::render('cities/show', ['city' => $city, 'locale' => app()->getLocale()]);
    }
}
