<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DishController extends Controller
{
    public function index(string $locale)
    {
        app()->setLocale($locale);
        return Inertia::render('dishes/index');
    }

    public function show(string $locale, string $slug)
    {
        app()->setLocale($locale);
        return Inertia::render('dishes/show', [
            'slug' => $slug,
        ]);
    }
}
