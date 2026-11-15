<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\AdminCrudHelpers;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Hotel;
use App\Models\HotelTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HotelAdminController extends Controller
{
    use AdminCrudHelpers;

    public function index()
    {
        $hotels = Hotel::with(['translations', 'mainImage', 'images', 'city.translations'])
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
            'phone_number' => 'nullable|string|max:255',
            'stars' => 'nullable|integer|min:1|max:5',
            'price_from' => 'nullable|numeric|min:0',
            'email' => 'nullable|email|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'instagram_link' => 'nullable|string|max:255',
            'telegram_link' => 'nullable|string|max:255',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'translations.*.amenities' => 'nullable|array',
            'translations.*.rooms' => 'nullable|array',
            'city_id' => 'nullable|integer|exists:cities,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $slug = $this->generateUniqueSlug(
            Hotel::class,
            $request->input('slug'),
            (string) $request->input('translations.en.title')
        );

        DB::transaction(function () use ($request, $slug) {
            $hotel = Hotel::create([
                'city_id' => $request->input('city_id'),
                'slug' => $slug,
                'status' => $request->boolean('status', true),
                'phone_number' => $request->input('phone_number'),
                'stars' => $request->input('stars'),
                'price_from' => $request->input('price_from'),
                'email' => $request->input('email'),
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
                        'locale' => $locale,
                        'title' => $trans['title'],
                        'address' => $trans['address'] ?? '',
                        'description' => $trans['description'] ?? '',
                        'amenities' => is_array($trans['amenities'] ?? null)
                            ? array_values(array_filter($trans['amenities'], fn ($a) => trim((string) $a) !== ''))
                            : null,
                        'rooms' => is_array($trans['rooms'] ?? null)
                            ? array_values(array_filter($trans['rooms'], fn ($r) => !empty($r['type'])))
                            : null,
                    ]);
                }
            }

            if ($request->hasFile('image')) {
                $this->storeUploadedMainImage($request->file('image'), Hotel::class, $hotel->id);
            }
        });

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
            'phone_number' => 'nullable|string|max:255',
            'stars' => 'nullable|integer|min:1|max:5',
            'price_from' => 'nullable|numeric|min:0',
            'email' => 'nullable|email|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'instagram_link' => 'nullable|string|max:255',
            'telegram_link' => 'nullable|string|max:255',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'translations.*.amenities' => 'nullable|array',
            'translations.*.rooms' => 'nullable|array',
            'city_id' => 'nullable|integer|exists:cities,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        DB::transaction(function () use ($request, $hotel) {
            $hotel->update([
                'city_id' => $request->input('city_id'),
                'slug' => $request->input('slug'),
                'status' => $request->boolean('status'),
                'phone_number' => $request->input('phone_number'),
                'stars' => $request->input('stars'),
                'price_from' => $request->input('price_from'),
                'email' => $request->input('email'),
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
                            'title' => $trans['title'],
                            'address' => $trans['address'] ?? '',
                            'description' => $trans['description'] ?? '',
                            'amenities' => is_array($trans['amenities'] ?? null)
                                ? array_values(array_filter($trans['amenities'], fn ($a) => trim((string) $a) !== ''))
                                : null,
                            'rooms' => is_array($trans['rooms'] ?? null)
                                ? array_values(array_filter($trans['rooms'], fn ($r) => !empty($r['type'])))
                                : null,
                        ]
                    );
                } elseif ($locale !== 'en') {
                    HotelTranslation::where('hotel_id', $hotel->id)->where('locale', $locale)->delete();
                }
            }

            if ($request->hasFile('image')) {
                $this->storeUploadedMainImage($request->file('image'), Hotel::class, $hotel->id, true);
            }
        });

        return redirect()->route('admin.hotels.edit', $hotel->id)->with('success', 'Hotel updated successfully.');
    }

    public function destroy(Hotel $hotel)
    {
        DB::transaction(function () use ($hotel) {
            $this->deleteImagesFor(Hotel::class, $hotel->id);
            $hotel->translations()->delete();
            $hotel->delete();
        });

        return redirect()->route('admin.hotels.index')->with('success', 'Hotel deleted successfully.');
    }
}
