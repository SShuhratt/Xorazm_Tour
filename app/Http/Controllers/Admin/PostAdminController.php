<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Post;
use App\Models\PostTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostAdminController extends Controller
{
    public function index()
    {
        $posts = Post::with(['translations', 'mainImage', 'images'])
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/posts/edit', [
            'post' => null,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'nullable|string|unique:posts,slug',
            'status' => 'required|boolean',
            'source_link' => 'nullable|string',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $slug = $request->input('slug') ?: Str::slug($request->input('translations.en.title'));

        $post = Post::create([
            'slug' => $slug,
            'status' => $request->boolean('status', true),
            'source_link' => $request->input('source_link'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['title'])) {
                PostTranslation::create([
                    'post_id' => $post->id,
                    'locale' => $locale,
                    'title' => $trans['title'],
                    'description' => $trans['description'] ?? '',
                ]);
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::create([
                'imageable_type' => Post::class,
                'imageable_id' => $post->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.posts.index')->with('success', 'Post created successfully.');
    }

    public function edit(Post $post)
    {
        $post->load(['translations', 'mainImage', 'images']);

        return Inertia::render('admin/posts/edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'slug' => 'required|string|unique:posts,slug,' . $post->id,
            'status' => 'required|boolean',
            'source_link' => 'nullable|string',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $post->update([
            'slug' => $request->input('slug'),
            'status' => $request->boolean('status'),
            'source_link' => $request->input('source_link'),
        ]);

        foreach (['en', 'ru', 'uz'] as $locale) {
            $trans = $request->input("translations.{$locale}");
            if (!empty($trans['title'])) {
                PostTranslation::updateOrCreate(
                    ['post_id' => $post->id, 'locale' => $locale],
                    [
                        'title' => $trans['title'],
                        'description' => $trans['description'] ?? '',
                    ]
                );
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            Image::where('imageable_type', Post::class)->where('imageable_id', $post->id)->update(['is_main' => false]);
            Image::create([
                'imageable_type' => Post::class,
                'imageable_id' => $post->id,
                'path' => $path,
                'is_main' => true,
                'order' => 1,
            ]);
        }

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post)
    {
        foreach ($post->images as $image) {
            if ($image->path && !str_starts_with($image->path, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $image->path));
            }
            $image->delete();
        }
        $post->translations()->delete();
        $post->delete();

        return redirect()->route('admin.posts.index')->with('success', 'Post deleted successfully.');
    }
}
