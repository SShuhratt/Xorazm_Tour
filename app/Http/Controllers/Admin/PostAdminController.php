<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\AdminCrudHelpers;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PostAdminController extends Controller
{
    use AdminCrudHelpers;

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
            'source_link' => 'nullable|string|max:500',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $slug = $this->generateUniqueSlug(
            Post::class,
            $request->input('slug'),
            (string) $request->input('translations.en.title')
        );

        DB::transaction(function () use ($request, $slug) {
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
                $this->storeUploadedMainImage($request->file('image'), Post::class, $post->id);
            }
        });

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
            'source_link' => 'nullable|string|max:500',
            'translations' => 'required|array',
            'translations.en.title' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        DB::transaction(function () use ($request, $post) {
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
                } elseif ($locale !== 'en') {
                    PostTranslation::where('post_id', $post->id)->where('locale', $locale)->delete();
                }
            }

            if ($request->hasFile('image')) {
                $this->storeUploadedMainImage($request->file('image'), Post::class, $post->id, true);
            }
        });

        return redirect()->route('admin.posts.edit', $post->id)->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post)
    {
        DB::transaction(function () use ($post) {
            $this->deleteImagesFor(Post::class, $post->id);
            $post->translations()->delete();
            $post->delete();
        });

        return redirect()->route('admin.posts.index')->with('success', 'Post deleted successfully.');
    }
}
