<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\CityTranslation;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CityAdminController extends Controller
{
    public function index()
    {
        $cities = City::with(['translations', 'mainImage', 'images'])
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('admin/cities/index', [
            'cities' => $cities,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/cities/edit', [
            'city' => null,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'nullable|string|unique:cities,slug',
            'status' => 'required|boolean',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'translations' => 'required|array',
            'translations.en.name' => 'required|string',
            'translations.en.description' => 'nullable|string',
            'translations.ru.name' => 'nullable|string',
            'translations.ru.description' => 'nullable|string',
            'translations.uz.name' => 'nullable|string',
            'translations.uz.description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $slug = $request->input('slug') ?: Str::slug($request->input('translations.en.name'));

        $city = City::create([
            'slug' => $slug,
            'status' => $request->boolean('status', true),
            'latitude' => $request->input('latitude'),
            'longitude' => $request->input('longitude'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['name'])) {
                CityTranslation::create([
                    'city_id' => $city->id,
                    'locale' => $locale,
                    'name' => $trans['name'],
                    'description' => $trans['description'] ?? '',
                ]);
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::create([
                'imageable_type' => City::class,
                'imageable_id' => $city->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.cities.index')->with('success', 'City created successfully.');
    }

    public function edit(City $city)
    {
        $city->load(['translations', 'mainImage', 'images']);

        return Inertia::render('admin/cities/edit', [
            'city' => $city,
        ]);
    }

    public function update(Request $request, City $city)
    {
        $request->validate([
            'slug' => 'required|string|unique:cities,slug,' . $city->id,
            'status' => 'required|boolean',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'translations' => 'required|array',
            'translations.en.name' => 'required|string',
            'translations.en.description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $city->update([
            'slug' => $request->input('slug'),
            'status' => $request->boolean('status'),
            'latitude' => $request->input('latitude'),
            'longitude' => $request->input('longitude'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['name'])) {
                CityTranslation::updateOrCreate(
                    ['city_id' => $city->id, 'locale' => $locale],
                    ['name' => $trans['name'], 'description' => $trans['description'] ?? '']
                );
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::where('imageable_type', City::class)->where('imageable_id', $city->id)->update(['is_main' => false]);
            Image::create([
                'imageable_type' => City::class,
                'imageable_id' => $city->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.cities.index')->with('success', 'City updated successfully.');
    }

    public function destroy(City $city)
    {
        foreach ($city->images as $image) {
            if ($image->path && !str_starts_with($image->path, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $image->path));
            }
            $image->delete();
        }
        $city->translations()->delete();
        $city->delete();

        return redirect()->route('admin.cities.index')->with('success', 'City deleted successfully.');
    }
}
