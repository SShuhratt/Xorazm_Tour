<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Festival;
use App\Models\Hotel;
use App\Models\Tour;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index($locale) {
        app()->setLocale($locale);
        return Inertia::render('home', [
            'featuredTours' => Tour::with(['translations', 'mainImage'])->where('status', 'active')->take(3)->get(),
            'cities' => City::with(['translations', 'mainImage'])->where('status', true)->get(),
            'festivals' => Festival::with(['translations', 'mainImage'])->where('status', true)->take(4)->get(),
            'hotels' => Hotel::with(['translations', 'mainImage'])->where('status', true)->take(3)->get(),
            'locale' => app()->getLocale(),
        ]);
    }
}

