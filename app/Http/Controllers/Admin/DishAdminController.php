<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\AdminCrudHelpers;
use App\Http\Controllers\Controller;
use App\Models\Dish;
use App\Models\DishTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DishAdminController extends Controller
{
    use AdminCrudHelpers;

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
            'origin_region' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'translations' => 'required|array',
            'translations.en.name' => 'required|string',
            'translations.*.origin' => 'nullable|string|max:255',
            'translations.*.type' => 'nullable|string|max:255',
            'translations.*.history' => 'nullable|string',
            'translations.*.ingredients' => 'nullable|array',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,webp,gif,mp4,webm,ogg,mov|max:51200',
        ]);

        $slug = $this->generateUniqueSlug(
            Dish::class,
            $request->input('slug'),
            (string) $request->input('translations.en.name')
        );

        DB::transaction(function () use ($request, $slug) {
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
                        'origin' => $trans['origin'] ?? null,
                        'type' => $trans['type'] ?? null,
                        'short_description' => $trans['short_description'] ?? '',
                        'description' => $trans['description'] ?? '',
                        'history' => $trans['history'] ?? null,
                        'ingredients' => is_array($trans['ingredients'] ?? null)
                            ? array_values(array_filter($trans['ingredients'], fn ($i) => trim((string) $i) !== ''))
                            : null,
                    ]);
                }
            }

            if ($request->hasFile('image')) {
                $this->storeUploadedMainImage($request->file('image'), Dish::class, $dish->id);
            }
        });

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
            'origin_region' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'translations' => 'required|array',
            'translations.en.name' => 'required|string',
            'translations.*.origin' => 'nullable|string|max:255',
            'translations.*.type' => 'nullable|string|max:255',
            'translations.*.history' => 'nullable|string',
            'translations.*.ingredients' => 'nullable|array',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,webp,gif,mp4,webm,ogg,mov|max:51200',
        ]);

        DB::transaction(function () use ($request, $dish) {
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
                            'origin' => $trans['origin'] ?? null,
                            'type' => $trans['type'] ?? null,
                            'short_description' => $trans['short_description'] ?? '',
                            'description' => $trans['description'] ?? '',
                            'history' => $trans['history'] ?? null,
                            'ingredients' => is_array($trans['ingredients'] ?? null)
                                ? array_values(array_filter($trans['ingredients'], fn ($i) => trim((string) $i) !== ''))
                                : null,
                        ]
                    );
                } elseif ($locale !== 'en') {
                    DishTranslation::where('dish_id', $dish->id)->where('locale', $locale)->delete();
                }
            }

            if ($request->hasFile('image')) {
                $this->storeUploadedMainImage($request->file('image'), Dish::class, $dish->id, true);
            }
        });

        return redirect()->route('admin.dishes.edit', $dish->id)->with('success', 'National dish updated successfully.');
    }

    public function destroy(Dish $dish)
    {
        DB::transaction(function () use ($dish) {
            $this->deleteImagesFor(Dish::class, $dish->id);
            $dish->translations()->delete();
            $dish->delete();
        });

        return redirect()->route('admin.dishes.index')->with('success', 'National dish deleted successfully.');
    }
}
