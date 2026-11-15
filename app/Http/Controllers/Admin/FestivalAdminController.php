<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\AdminCrudHelpers;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Festival;
use App\Models\FestivalTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FestivalAdminController extends Controller
{
    use AdminCrudHelpers;

    public function index()
    {
        $festivals = Festival::with(['translations', 'mainImage', 'images', 'city.translations'])
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
            'video_url' => 'nullable|string|max:255',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'translations.*.event_season' => 'nullable|string|max:255',
            'translations.*.festival_type' => 'nullable|string|max:255',
            'translations.*.highlight' => 'nullable|string|max:255',
            'city_id' => 'nullable|integer|exists:cities,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $slug = $this->generateUniqueSlug(
            Festival::class,
            $request->input('slug'),
            (string) $request->input('translations.en.title')
        );

        DB::transaction(function () use ($request, $slug) {
            $festival = Festival::create([
                'city_id' => $request->input('city_id'),
                'slug' => $slug,
                'status' => $request->boolean('status', true),
                'latitude' => $request->input('latitude'),
                'longitude' => $request->input('longitude'),
                'video_url' => $request->input('video_url'),
            ]);

            foreach (['en', 'ru', 'uz'] as $locale) {
                $trans = $request->input("translations.{$locale}");
                if (!empty($trans['title'])) {
                    FestivalTranslation::create([
                        'festival_id' => $festival->id,
                        'locale' => $locale,
                        'title' => $trans['title'],
                        'description' => $trans['description'] ?? '',
                        'event_season' => $trans['event_season'] ?? null,
                        'festival_type' => $trans['festival_type'] ?? null,
                        'highlight' => $trans['highlight'] ?? null,
                    ]);
                }
            }

            if ($request->hasFile('image')) {
                $this->storeUploadedMainImage($request->file('image'), Festival::class, $festival->id);
            }
        });

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
            'video_url' => 'nullable|string|max:255',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'translations.*.event_season' => 'nullable|string|max:255',
            'translations.*.festival_type' => 'nullable|string|max:255',
            'translations.*.highlight' => 'nullable|string|max:255',
            'city_id' => 'nullable|integer|exists:cities,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        DB::transaction(function () use ($request, $festival) {
            $festival->update([
                'city_id' => $request->input('city_id'),
                'slug' => $request->input('slug'),
                'status' => $request->boolean('status'),
                'latitude' => $request->input('latitude'),
                'longitude' => $request->input('longitude'),
                'video_url' => $request->input('video_url'),
            ]);

            foreach (['en', 'ru', 'uz'] as $locale) {
                $trans = $request->input("translations.{$locale}");
                if (!empty($trans['title'])) {
                    FestivalTranslation::updateOrCreate(
                        ['festival_id' => $festival->id, 'locale' => $locale],
                        [
                            'title' => $trans['title'],
                            'description' => $trans['description'] ?? '',
                            'event_season' => $trans['event_season'] ?? null,
                            'festival_type' => $trans['festival_type'] ?? null,
                            'highlight' => $trans['highlight'] ?? null,
                        ]
                    );
                } elseif ($locale !== 'en') {
                    FestivalTranslation::where('festival_id', $festival->id)->where('locale', $locale)->delete();
                }
            }

            if ($request->hasFile('image')) {
                $this->storeUploadedMainImage($request->file('image'), Festival::class, $festival->id, true);
            }
        });

        return redirect()->route('admin.festivals.edit', $festival->id)->with('success', 'Festival updated successfully.');
    }

    public function destroy(Festival $festival)
    {
        DB::transaction(function () use ($festival) {
            $this->deleteImagesFor(Festival::class, $festival->id);
            $festival->translations()->delete();
            $festival->delete();
        });

        return redirect()->route('admin.festivals.index')->with('success', 'Festival deleted successfully.');
    }
}
