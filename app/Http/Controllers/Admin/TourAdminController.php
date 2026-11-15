<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\AdminCrudHelpers;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Hotel;
use App\Models\Tour;
use App\Models\TourSchedule;
use App\Models\TourScheduleTranslation;
use App\Models\TourTranslation;
use App\Models\Transport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TourAdminController extends Controller
{
    use AdminCrudHelpers;

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
            'category' => ['nullable', 'string', Rule::in(['cultural', 'adventure', 'premium'])],
            'max_group_size' => 'nullable|integer|min:1|max:500',
            'cost' => 'nullable|numeric',
            'single_supplement' => 'nullable|numeric',
            'pricing_tiers' => 'nullable|array',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'city_ids' => 'nullable|array',
            'hotel_ids' => 'nullable|array',
            'transport_ids' => 'nullable|array',
            'schedules' => 'nullable|array',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,webp,gif,mp4,webm,ogg,mov|max:51200',
        ]);

        $slug = $this->generateUniqueSlug(
            Tour::class,
            $request->input('slug'),
            (string) $request->input('translations.en.title')
        );

        $pricingTiers = $this->filterPricingTiers($request->input('pricing_tiers'));
        $cost = $this->resolveTourCost($request, $pricingTiers);

        DB::transaction(function () use ($request, $slug, $pricingTiers, $cost) {
            $tour = Tour::create([
                'slug' => $slug,
                'status' => $request->boolean('status', true) ? 'active' : 'inactive',
                'category' => $request->input('category') ?: 'cultural',
                'max_group_size' => $request->input('max_group_size'),
                'cost' => $cost,
                'single_supplement' => $request->input('single_supplement'),
                'pricing_tiers' => $pricingTiers,
            ]);

            $this->syncTranslations($request, $tour, false);
            $this->syncRelations($request, $tour);
            $this->syncSchedules($request, $tour, false);

            if ($request->hasFile('image')) {
                $this->storeUploadedMainImage($request->file('image'), Tour::class, $tour->id);
            }
        });

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
            'category' => ['nullable', 'string', Rule::in(['cultural', 'adventure', 'premium'])],
            'max_group_size' => 'nullable|integer|min:1|max:500',
            'cost' => 'nullable|numeric',
            'single_supplement' => 'nullable|numeric',
            'pricing_tiers' => 'nullable|array',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'city_ids' => 'nullable|array',
            'hotel_ids' => 'nullable|array',
            'transport_ids' => 'nullable|array',
            'schedules' => 'nullable|array',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,webp,gif,mp4,webm,ogg,mov|max:51200',
        ]);

        $pricingTiers = $this->filterPricingTiers($request->input('pricing_tiers'));
        $cost = $this->resolveTourCost($request, $pricingTiers) ?? $tour->cost;

        DB::transaction(function () use ($request, $tour, $pricingTiers, $cost) {
            $tour->update([
                'slug' => $request->input('slug'),
                'status' => $request->boolean('status') ? 'active' : 'inactive',
                'category' => $request->input('category') ?: ($tour->category ?: 'cultural'),
                'max_group_size' => $request->input('max_group_size'),
                'cost' => $cost,
                'single_supplement' => $request->input('single_supplement'),
                'pricing_tiers' => $pricingTiers,
            ]);

            $this->syncTranslations($request, $tour, true);
            $this->syncRelations($request, $tour);
            $this->syncSchedules($request, $tour, true);

            if ($request->hasFile('image')) {
                $this->storeUploadedMainImage($request->file('image'), Tour::class, $tour->id, true);
            }
        });

        return redirect()->route('admin.tours.edit', $tour->id)->with('success', 'Tour updated successfully.');
    }

    public function destroy(Tour $tour)
    {
        DB::transaction(function () use ($tour) {
            $this->deleteImagesFor(Tour::class, $tour->id);

            foreach ($tour->schedules as $schedule) {
                $this->deleteImagesFor(TourSchedule::class, $schedule->id);
                $schedule->translations()->delete();
                $schedule->delete();
            }

            $tour->translations()->delete();
            $tour->cities()->detach();
            $tour->hotels()->detach();
            $tour->transports()->detach();
            $tour->delete();
        });

        return redirect()->route('admin.tours.index')->with('success', 'Tour deleted successfully.');
    }

    private function filterPricingTiers(mixed $tiers): ?array
    {
        if (!is_array($tiers)) {
            return null;
        }

        return array_values(array_filter($tiers, function ($tier) {
            return !empty($tier['group_size']) || (isset($tier['price_per_person']) && $tier['price_per_person'] !== '');
        }));
    }

    private function resolveTourCost(Request $request, ?array $pricingTiers): mixed
    {
        $cost = $request->input('cost');
        if ($cost !== null && $cost !== '') {
            return $cost;
        }

        $allPrices = [];
        foreach (['en', 'ru', 'uz'] as $loc) {
            $tiers = $request->input("translations.{$loc}.pricing_tiers", []);
            if (is_array($tiers)) {
                foreach ($tiers as $tier) {
                    if (isset($tier['price_per_person']) && is_numeric($tier['price_per_person'])) {
                        $allPrices[] = (float) $tier['price_per_person'];
                    }
                }
            }
        }
        if ($allPrices === [] && is_array($pricingTiers)) {
            foreach ($pricingTiers as $tier) {
                if (isset($tier['price_per_person']) && is_numeric($tier['price_per_person'])) {
                    $allPrices[] = (float) $tier['price_per_person'];
                }
            }
        }

        return $allPrices !== [] ? min($allPrices) : null;
    }

    private function syncTranslations(Request $request, Tour $tour, bool $deleteCleared): void
    {
        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['title'])) {
                $duration = !empty($trans['duration']) ? trim((string) $trans['duration']) : null;
                $included = !empty($trans['included']) && is_array($trans['included'])
                    ? array_values(array_filter($trans['included'], fn ($item) => trim((string) $item) !== ''))
                    : [];
                $notIncluded = !empty($trans['not_included']) && is_array($trans['not_included'])
                    ? array_values(array_filter($trans['not_included'], fn ($item) => trim((string) $item) !== ''))
                    : [];
                $transPricingTiers = $this->filterPricingTiers($trans['pricing_tiers'] ?? null) ?? [];

                TourTranslation::updateOrCreate(
                    ['tour_id' => $tour->id, 'locale' => $locale],
                    [
                        'title' => $trans['title'],
                        'route' => $trans['route'] ?? '',
                        'custom_transport' => $trans['custom_transport'] ?? null,
                        'duration' => $duration,
                        'description' => $trans['description'] ?? '',
                        'included' => $included,
                        'not_included' => $notIncluded,
                        'pricing_tiers' => $transPricingTiers,
                    ]
                );
            } elseif ($deleteCleared && $locale !== 'en') {
                TourTranslation::where('tour_id', $tour->id)->where('locale', $locale)->delete();
            }
        }
    }

    private function syncRelations(Request $request, Tour $tour): void
    {
        $cityIds = $request->input('city_ids', []);
        if (is_array($cityIds)) {
            $citySync = [];
            foreach (array_values($cityIds) as $index => $cityId) {
                $citySync[(int) $cityId] = ['order' => $index + 1];
            }
            $tour->cities()->sync($citySync);
        }

        $tour->hotels()->sync($request->input('hotel_ids', []));
        $tour->transports()->sync($request->input('transport_ids', []));
    }

    private function syncSchedules(Request $request, Tour $tour, bool $isUpdate): void
    {
        if (!$request->has('schedules')) {
            return;
        }

        $existingSchedIds = [];
        foreach ($request->input('schedules') as $idx => $schedData) {
            if (empty($schedData['day'])) {
                continue;
            }

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
                } elseif ($isUpdate && $locale !== 'en') {
                    TourScheduleTranslation::where('tour_schedule_id', $schedule->id)
                        ->where('locale', $locale)
                        ->delete();
                }
            }

            if ($request->hasFile("schedules.{$idx}.image")) {
                $this->storeUploadedMainImage(
                    $request->file("schedules.{$idx}.image"),
                    TourSchedule::class,
                    $schedule->id,
                    $isUpdate
                );
            }
        }

        if ($isUpdate) {
            $removedSchedules = TourSchedule::where('tour_id', $tour->id)
                ->whereNotIn('id', $existingSchedIds)
                ->get();

            foreach ($removedSchedules as $removed) {
                $this->deleteImagesFor(TourSchedule::class, $removed->id);
                $removed->translations()->delete();
                $removed->delete();
            }
        }
    }
}
