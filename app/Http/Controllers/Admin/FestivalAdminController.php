<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Festival;
use App\Models\FestivalTranslation;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FestivalAdminController extends Controller
{
    public function index()
    {
        $festivals = Festival::with(['translations', 'mainImage', 'images'])
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('admin/festivals/index', [
            'festivals' => $festivals,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/festivals/edit', [
            'festival' => null,
            'cities' => City::with('translations')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'nullable|string|unique:festivals,slug',
            'status' => 'required|boolean',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'city_id' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $slug = $request->input('slug') ?: Str::slug($request->input('translations.en.title'));

        $festival = Festival::create([
            'slug' => $slug,
            'status' => $request->boolean('status', true),
            'latitude' => $request->input('latitude'),
            'longitude' => $request->input('longitude'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['title'])) {
                FestivalTranslation::create([
                    'festival_id' => $festival->id,
                    'city_id' => $request->input('city_id', 1),
                    'locale' => $locale,
                    'title' => $trans['title'],
                    'description' => $trans['description'] ?? '',
                ]);
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::create([
                'imageable_type' => Festival::class,
                'imageable_id' => $festival->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.festivals.index')->with('success', 'Festival created successfully.');
    }

    public function edit(Festival $festival)
    {
        $festival->load(['translations', 'mainImage', 'images']);

        return Inertia::render('admin/festivals/edit', [
            'festival' => $festival,
            'cities' => City::with('translations')->get(),
        ]);
    }

    public function update(Request $request, Festival $festival)
    {
        $request->validate([
            'slug' => 'required|string|unique:festivals,slug,' . $festival->id,
            'status' => 'required|boolean',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'city_id' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $festival->update([
            'slug' => $request->input('slug'),
            'status' => $request->boolean('status'),
            'latitude' => $request->input('latitude'),
            'longitude' => $request->input('longitude'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['title'])) {
                FestivalTranslation::updateOrCreate(
                    ['festival_id' => $festival->id, 'locale' => $locale],
                    [
                        'city_id' => $request->input('city_id', 1),
                        'title' => $trans['title'],
                        'description' => $trans['description'] ?? '',
                    ]
                );
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::where('imageable_type', Festival::class)->where('imageable_id', $festival->id)->update(['is_main' => false]);
            Image::create([
                'imageable_type' => Festival::class,
                'imageable_id' => $festival->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.festivals.edit', $festival->id)->with('success', 'Festival updated successfully.');
    }

    public function destroy(Festival $festival)
    {
        foreach ($festival->images as $image) {
            if ($image->path && !str_starts_with($image->path, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $image->path));
            }
            $image->delete();
        }
        $festival->translations()->delete();
        $festival->delete();

        return redirect()->route('admin.festivals.index')->with('success', 'Festival deleted successfully.');
    }
}
