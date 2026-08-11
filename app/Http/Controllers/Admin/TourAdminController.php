<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Hotel;
use App\Models\Image;
use App\Models\Tour;
use App\Models\TourSchedule;
use App\Models\TourScheduleTranslation;
use App\Models\TourTranslation;
use App\Models\Transport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TourAdminController extends Controller
{
    public function index()
    {
        $tours = Tour::with(['translations', 'mainImage', 'images', 'cities', 'hotels', 'transports', 'schedules.translations', 'schedules.images', 'schedules.mainImage'])
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('admin/tours/index', [
            'tours' => $tours,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/tours/edit', [
            'tour' => null,
            'cities' => City::with('translations')->get(),
            'hotels' => Hotel::with('translations')->get(),
            'transports' => Transport::with('translations')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'nullable|string|unique:tours,slug',
            'status' => 'required|boolean',
            'cost' => 'required|numeric',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'city_ids' => 'nullable|array',
            'hotel_ids' => 'nullable|array',
            'transport_ids' => 'nullable|array',
            'schedules' => 'nullable|array',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,webp,gif,mp4,webm,ogg,mov|max:51200',
        ]);

        $slug = $request->input('slug') ?: Str::slug($request->input('translations.en.title'));

        $tour = Tour::create([
            'slug' => $slug,
            'status' => $request->boolean('status', true) ? 'active' : 'inactive',
            'cost' => $request->input('cost'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['title'])) {
                $duration = !empty($trans['duration']) ? (int) preg_replace('/[^0-9]/', '', (string) $trans['duration']) : 0;
                TourTranslation::create([
                    'tour_id' => $tour->id,
                    'locale' => $locale,
                    'title' => $trans['title'],
                    'route' => $trans['route'] ?? '',
                    'duration' => $duration,
                    'description' => $trans['description'] ?? '',
                ]);
            }
        }

        if ($request->has('city_ids')) {
            $tour->cities()->sync($request->input('city_ids'));
        }
        if ($request->has('hotel_ids')) {
            $tour->hotels()->sync($request->input('hotel_ids'));
        }
        if ($request->has('transport_ids')) {
            $tour->transports()->sync($request->input('transport_ids'));
        }

        if ($request->has('schedules')) {
            foreach ($request->input('schedules') as $idx => $schedData) {
                if (!empty($schedData['day'])) {
                    $schedule = TourSchedule::create([
                        'tour_id' => $tour->id,
                        'day' => (int) $schedData['day'],
                        'time' => $schedData['time'] ?? '09:00',
                    ]);

                    foreach (['en', 'ru', 'uz'] as $locale) {
                        if (!empty($schedData['translations'][$locale]['title'])) {
                            TourScheduleTranslation::create([
                                'tour_schedule_id' => $schedule->id,
                                'locale' => $locale,
                                'title' => $schedData['translations'][$locale]['title'],
                                'description' => $schedData['translations'][$locale]['description'] ?? '',
                            ]);
                        }
                    }

                    if ($request->hasFile("schedules.{$idx}.image")) {
                        $path = $request->file("schedules.{$idx}.image")->store('images', 'public');
                        Image::create([
                            'imageable_type' => TourSchedule::class,
                            'imageable_id' => $schedule->id,
                            'path' => $path,
                            'is_main' => true,
                            'order' => 1,
                        ]);
                    }
                }
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::create([
                'imageable_type' => Tour::class,
                'imageable_id' => $tour->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.tours.index')->with('success', 'Tour created successfully.');
    }

    public function edit(Tour $tour)
    {
        $tour->load(['translations', 'mainImage', 'images', 'cities', 'hotels', 'transports', 'schedules.translations', 'schedules.images', 'schedules.mainImage']);

        return Inertia::render('admin/tours/edit', [
            'tour' => $tour,
            'cities' => City::with('translations')->get(),
            'hotels' => Hotel::with('translations')->get(),
            'transports' => Transport::with('translations')->get(),
        ]);
    }

    public function update(Request $request, Tour $tour)
    {
        $request->validate([
            'slug' => 'required|string|unique:tours,slug,' . $tour->id,
            'status' => 'required|boolean',
            'cost' => 'required|numeric',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'city_ids' => 'nullable|array',
            'hotel_ids' => 'nullable|array',
            'transport_ids' => 'nullable|array',
            'schedules' => 'nullable|array',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,webp,gif,mp4,webm,ogg,mov|max:51200',
        ]);

        $tour->update([
            'slug' => $request->input('slug'),
            'status' => $request->boolean('status') ? 'active' : 'inactive',
            'cost' => $request->input('cost'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['title'])) {
                $duration = !empty($trans['duration']) ? (int) preg_replace('/[^0-9]/', '', (string) $trans['duration']) : 0;
                TourTranslation::updateOrCreate(
                    ['tour_id' => $tour->id, 'locale' => $locale],
                    [
                        'title' => $trans['title'],
                        'route' => $trans['route'] ?? '',
                        'duration' => $duration,
                        'description' => $trans['description'] ?? '',
                    ]
                );
            }
        }

        $tour->cities()->sync($request->input('city_ids', []));
        $tour->hotels()->sync($request->input('hotel_ids', []));
        $tour->transports()->sync($request->input('transport_ids', []));

        if ($request->has('schedules')) {
            $existingSchedIds = [];
            foreach ($request->input('schedules') as $idx => $schedData) {
                if (!empty($schedData['day'])) {
                    $schedule = TourSchedule::updateOrCreate(
                        ['id' => $schedData['id'] ?? null, 'tour_id' => $tour->id],
                        ['day' => (int) $schedData['day'], 'time' => $schedData['time'] ?? '09:00']
                    );
                    $existingSchedIds[] = $schedule->id;

                    foreach (['en', 'ru', 'uz'] as $locale) {
                        if (!empty($schedData['translations'][$locale]['title'])) {
                            TourScheduleTranslation::updateOrCreate(
                                ['tour_schedule_id' => $schedule->id, 'locale' => $locale],
                                [
                                    'title' => $schedData['translations'][$locale]['title'],
                                    'description' => $schedData['translations'][$locale]['description'] ?? '',
                                ]
                            );
                        }
                    }

                    if ($request->hasFile("schedules.{$idx}.image")) {
                        $path = $request->file("schedules.{$idx}.image")->store('images', 'public');
                        Image::where('imageable_type', TourSchedule::class)
                            ->where('imageable_id', $schedule->id)
                            ->update(['is_main' => false]);

                        Image::create([
                            'imageable_type' => TourSchedule::class,
                            'imageable_id' => $schedule->id,
                            'path' => $path,
                            'is_main' => true,
                            'order' => 1,
                        ]);
                    }
                }
            }
            TourSchedule::where('tour_id', $tour->id)->whereNotIn('id', $existingSchedIds)->delete();
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::where('imageable_type', Tour::class)->where('imageable_id', $tour->id)->update(['is_main' => false]);
            Image::create([
                'imageable_type' => Tour::class,
                'imageable_id' => $tour->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.tours.edit', $tour->id)->with('success', 'Tour updated successfully.');
    }

    public function destroy(Tour $tour)
    {
        foreach ($tour->images as $image) {
            if ($image->path && !str_starts_with($image->path, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $image->path));
            }
            $image->delete();
        }
        $tour->translations()->delete();
        $tour->schedules()->delete();
        $tour->cities()->detach();
        $tour->hotels()->detach();
        $tour->transports()->detach();
        $tour->delete();

        return redirect()->route('admin.tours.index')->with('success', 'Tour deleted successfully.');
    }
}
