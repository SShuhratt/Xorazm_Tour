<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Hotel;
use App\Models\HotelTranslation;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class HotelAdminController extends Controller
{
    public function index()
    {
        $hotels = Hotel::with(['translations', 'mainImage', 'images'])
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('admin/hotels/index', [
            'hotels' => $hotels,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/hotels/edit', [
            'hotel' => null,
            'cities' => City::with('translations')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'nullable|string|unique:hotels,slug',
            'status' => 'required|boolean',
            'phone_number' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'instagram_link' => 'nullable|string',
            'telegram_link' => 'nullable|string',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'city_id' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $slug = $request->input('slug') ?: Str::slug($request->input('translations.en.title'));

        $hotel = Hotel::create([
            'slug' => $slug,
            'status' => $request->boolean('status', true),
            'phone_number' => $request->input('phone_number'),
            'latitude' => $request->input('latitude'),
            'longitude' => $request->input('longitude'),
            'instagram_link' => $request->input('instagram_link'),
            'telegram_link' => $request->input('telegram_link'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['title'])) {
                HotelTranslation::create([
                    'hotel_id' => $hotel->id,
                    'city_id' => $request->input('city_id', 1),
                    'locale' => $locale,
                    'title' => $trans['title'],
                    'address' => $trans['address'] ?? '',
                    'description' => $trans['description'] ?? '',
                ]);
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::create([
                'imageable_type' => Hotel::class,
                'imageable_id' => $hotel->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.hotels.index')->with('success', 'Hotel created successfully.');
    }

    public function edit(Hotel $hotel)
    {
        $hotel->load(['translations', 'mainImage', 'images']);

        return Inertia::render('admin/hotels/edit', [
            'hotel' => $hotel,
            'cities' => City::with('translations')->get(),
        ]);
    }

    public function update(Request $request, Hotel $hotel)
    {
        $request->validate([
            'slug' => 'required|string|unique:hotels,slug,' . $hotel->id,
            'status' => 'required|boolean',
            'phone_number' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'instagram_link' => 'nullable|string',
            'telegram_link' => 'nullable|string',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'city_id' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $hotel->update([
            'slug' => $request->input('slug'),
            'status' => $request->boolean('status'),
            'phone_number' => $request->input('phone_number'),
            'latitude' => $request->input('latitude'),
            'longitude' => $request->input('longitude'),
            'instagram_link' => $request->input('instagram_link'),
            'telegram_link' => $request->input('telegram_link'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['title'])) {
                HotelTranslation::updateOrCreate(
                    ['hotel_id' => $hotel->id, 'locale' => $locale],
                    [
                        'city_id' => $request->input('city_id', 1),
                        'title' => $trans['title'],
                        'address' => $trans['address'] ?? '',
                        'description' => $trans['description'] ?? '',
                    ]
                );
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::where('imageable_type', Hotel::class)->where('imageable_id', $hotel->id)->update(['is_main' => false]);
            Image::create([
                'imageable_type' => Hotel::class,
                'imageable_id' => $hotel->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.hotels.edit', $hotel->id)->with('success', 'Hotel updated successfully.');
    }

    public function destroy(Hotel $hotel)
    {
        foreach ($hotel->images as $image) {
            if ($image->path && !str_starts_with($image->path, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $image->path));
            }
            $image->delete();
        }
        $hotel->translations()->delete();
        $hotel->delete();

        return redirect()->route('admin.hotels.index')->with('success', 'Hotel deleted successfully.');
    }
}
