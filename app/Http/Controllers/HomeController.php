<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Festival;
use App\Models\Post;
use App\Models\Tour;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index($locale) {
        app()->setLocale($locale);
        return Inertia::render('home', [
            'featuredTours' => Tour::with(['translations', 'mainImage'])->where('status', true)->take(3)->get(),
            'cities' => City::with(['translations', 'mainImage'])->where('status', true)->get(),
            'latestPosts' => Post::with(['translations', 'mainImage'])->latest()->take(3)->get(),
            'festivals' => Festival::with(['translations', 'mainImage'])->where('status', true)->take(4)->get(),
            'locale' => app()->getLocale(),
        ]);
    }
}

