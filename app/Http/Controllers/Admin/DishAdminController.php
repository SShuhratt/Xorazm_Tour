<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dish;
use App\Models\DishTranslation;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DishAdminController extends Controller
{
    public function index()
    {
        $dishes = Dish::with(['translations', 'mainImage', 'images'])
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('admin/dishes/index', [
            'dishes' => $dishes,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/dishes/edit', [
            'dish' => null,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'nullable|string|unique:dishes,slug',
            'status' => 'required|boolean',
            'origin_region' => 'nullable|string',
            'category' => 'nullable|string',
            'translations' => 'required|array',
            'translations.en.name' => 'required|string',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,webp,gif,mp4,webm,ogg,mov|max:51200',
        ]);

        $slug = $request->input('slug') ?: Str::slug($request->input('translations.en.name'));

        $dish = Dish::create([
            'slug' => $slug,
            'status' => $request->boolean('status', true),
            'origin_region' => $request->input('origin_region'),
            'category' => $request->input('category'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['name'])) {
                DishTranslation::create([
                    'dish_id' => $dish->id,
                    'locale' => $locale,
                    'name' => $trans['name'],
                    'short_description' => $trans['short_description'] ?? '',
                    'description' => $trans['description'] ?? '',
                ]);
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::create([
                'imageable_type' => Dish::class,
                'imageable_id' => $dish->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.dishes.index')->with('success', 'National dish created successfully.');
    }

    public function edit(Dish $dish)
    {
        $dish->load(['translations', 'mainImage', 'images']);

        return Inertia::render('admin/dishes/edit', [
            'dish' => $dish,
        ]);
    }

    public function update(Request $request, Dish $dish)
    {
        $request->validate([
            'slug' => 'required|string|unique:dishes,slug,' . $dish->id,
            'status' => 'required|boolean',
            'origin_region' => 'nullable|string',
            'category' => 'nullable|string',
            'translations' => 'required|array',
            'translations.en.name' => 'required|string',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,webp,gif,mp4,webm,ogg,mov|max:51200',
        ]);

        $dish->update([
            'slug' => $request->input('slug'),
            'status' => $request->boolean('status'),
            'origin_region' => $request->input('origin_region'),
            'category' => $request->input('category'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['name'])) {
                DishTranslation::updateOrCreate(
                    ['dish_id' => $dish->id, 'locale' => $locale],
                    [
                        'name' => $trans['name'],
                        'short_description' => $trans['short_description'] ?? '',
                        'description' => $trans['description'] ?? '',
                    ]
                );
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::where('imageable_type', Dish::class)->where('imageable_id', $dish->id)->update(['is_main' => false]);
            Image::create([
                'imageable_type' => Dish::class,
                'imageable_id' => $dish->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.dishes.edit', $dish->id)->with('success', 'National dish updated successfully.');
    }

    public function destroy(Dish $dish)
    {
        foreach ($dish->images as $image) {
            if ($image->path && !str_starts_with($image->path, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $image->path));
            }
            $image->delete();
        }
        $dish->translations()->delete();
        $dish->delete();

        return redirect()->route('admin.dishes.index')->with('success', 'National dish deleted successfully.');
    }
}
