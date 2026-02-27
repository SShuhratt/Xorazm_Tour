<?php

namespace App\Http\Controllers;

use App\Models\City;
use Inertia\Inertia;

class CityController extends Controller
{
    public function index(string $locale){
        app()->setLocale($locale);
        $cities = City::with(['translations', 'mainImage'])
            ->where('status', true)
            ->get();

        return Inertia::render('cities/index', [
            'cities' => $cities,
        ]);
    }

    public function show(string $locale, City $city){
        app()->setLocale($locale);
        $city ->load(['translations', 'mainImage', 'images']);
        return Inertia::render('cities/show', ['city' => $city, 'locale' => app()->getLocale()]);
    }
}
