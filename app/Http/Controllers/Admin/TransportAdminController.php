<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Transport;
use App\Models\TransportTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TransportAdminController extends Controller
{
    public function index()
    {
        $transports = Transport::with(['translations', 'mainImage', 'images'])
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('admin/transports/index', [
            'transports' => $transports,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/transports/edit', [
            'transport' => null,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'nullable|string|unique:transports,slug',
            'status' => 'required|boolean',
            'capacity' => 'required|integer',
            'height' => 'nullable|numeric',
            'width' => 'nullable|numeric',
            'length' => 'nullable|numeric',
            'translations' => 'required|array',
            'translations.en.name' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $slug = $request->input('slug') ?: Str::slug($request->input('translations.en.name'));

        $transport = Transport::create([
            'slug' => $slug,
            'status' => $request->boolean('status', true),
            'capacity' => $request->input('capacity'),
            'height' => $request->input('height'),
            'width' => $request->input('width'),
            'length' => $request->input('length'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['name'])) {
                TransportTranslation::create([
                    'transport_id' => $transport->id,
                    'locale' => $locale,
                    'name' => $trans['name'],
                    'description' => $trans['description'] ?? '',
                ]);
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::create([
                'imageable_type' => Transport::class,
                'imageable_id' => $transport->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.transports.index')->with('success', 'Transport created successfully.');
    }

    public function edit(Transport $transport)
    {
        $transport->load(['translations', 'mainImage', 'images']);

        return Inertia::render('admin/transports/edit', [
            'transport' => $transport,
        ]);
    }

    public function update(Request $request, Transport $transport)
    {
        $request->validate([
            'slug' => 'required|string|unique:transports,slug,' . $transport->id,
            'status' => 'required|boolean',
            'capacity' => 'required|integer',
            'height' => 'nullable|numeric',
            'width' => 'nullable|numeric',
            'length' => 'nullable|numeric',
            'translations' => 'required|array',
            'translations.en.name' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $transport->update([
            'slug' => $request->input('slug'),
            'status' => $request->boolean('status'),
            'capacity' => $request->input('capacity'),
            'height' => $request->input('height'),
            'width' => $request->input('width'),
            'length' => $request->input('length'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['name'])) {
                TransportTranslation::updateOrCreate(
                    ['transport_id' => $transport->id, 'locale' => $locale],
                    [
                        'name' => $trans['name'],
                        'description' => $trans['description'] ?? '',
                    ]
                );
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::where('imageable_type', Transport::class)->where('imageable_id', $transport->id)->update(['is_main' => false]);
            Image::create([
                'imageable_type' => Transport::class,
                'imageable_id' => $transport->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.transports.edit', $transport->id)->with('success', 'Transport updated successfully.');
    }

    public function destroy(Transport $transport)
    {
        foreach ($transport->images as $image) {
            if ($image->path && !str_starts_with($image->path, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $image->path));
            }
            $image->delete();
        }
        $transport->translations()->delete();
        $transport->delete();

        return redirect()->route('admin.transports.index')->with('success', 'Transport deleted successfully.');
    }
}
