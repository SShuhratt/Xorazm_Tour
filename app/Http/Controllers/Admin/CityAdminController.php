<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\AdminCrudHelpers;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\CityTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CityAdminController extends Controller
{
    use AdminCrudHelpers;

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
            'translations.*.description' => 'nullable|string',
            'translations.*.era' => 'nullable|string|max:255',
            'translations.*.heritage_status' => 'nullable|string|max:255',
            'translations.*.recommended_time' => 'nullable|string|max:255',
            'translations.*.highlights' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $slug = $this->generateUniqueSlug(
            City::class,
            $request->input('slug'),
            (string) $request->input('translations.en.name')
        );

        DB::transaction(function () use ($request, $slug) {
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
                        'era' => $trans['era'] ?? null,
                        'heritage_status' => $trans['heritage_status'] ?? null,
                        'recommended_time' => $trans['recommended_time'] ?? null,
                        'highlights' => is_array($trans['highlights'] ?? null)
                            ? array_values(array_filter($trans['highlights'], fn ($h) => !empty($h['title'])))
                            : null,
                    ]);
                }
            }

            if ($request->hasFile('image')) {
                $this->storeUploadedMainImage($request->file('image'), City::class, $city->id);
            }
        });

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
            'translations.*.description' => 'nullable|string',
            'translations.*.era' => 'nullable|string|max:255',
            'translations.*.heritage_status' => 'nullable|string|max:255',
            'translations.*.recommended_time' => 'nullable|string|max:255',
            'translations.*.highlights' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        DB::transaction(function () use ($request, $city) {
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
                        [
                            'name' => $trans['name'],
                            'description' => $trans['description'] ?? '',
                            'era' => $trans['era'] ?? null,
                            'heritage_status' => $trans['heritage_status'] ?? null,
                            'recommended_time' => $trans['recommended_time'] ?? null,
                            'highlights' => is_array($trans['highlights'] ?? null)
                                ? array_values(array_filter($trans['highlights'], fn ($h) => !empty($h['title'])))
                                : null,
                        ]
                    );
                } elseif ($locale !== 'en') {
                    CityTranslation::where('city_id', $city->id)->where('locale', $locale)->delete();
                }
            }

            if ($request->hasFile('image')) {
                $this->storeUploadedMainImage($request->file('image'), City::class, $city->id, true);
            }
        });

        return redirect()->route('admin.cities.edit', $city->id)->with('success', 'City updated successfully.');
    }

    public function destroy(City $city)
    {
        DB::transaction(function () use ($city) {
            $this->deleteImagesFor(City::class, $city->id);
            $city->translations()->delete();
            $city->delete();
        });

        return redirect()->route('admin.cities.index')->with('success', 'City deleted successfully.');
    }
}
