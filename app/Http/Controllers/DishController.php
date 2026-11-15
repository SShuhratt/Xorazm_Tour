<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Inertia\Inertia;

class DishController extends Controller
{
    public function index(string $locale)
    {
        app()->setLocale($locale);
        $dishes = Dish::with(['translations', 'mainImage', 'images'])
            ->where('status', true)
            ->get();

        return Inertia::render('dishes/index', [
            'dbDishes' => $dishes,
        ]);
    }

    public function show(string $locale, string $slug)
    {
        app()->setLocale($locale);
        $dish = Dish::with(['translations', 'mainImage', 'images'])
            ->where('slug', $slug)
            ->where('status', true)
            ->first();

        abort_unless((bool) $dish, 404);

        return Inertia::render('dishes/show', [
            'slug' => $slug,
            'dbDish' => $dish,
        ]);
    }
}
