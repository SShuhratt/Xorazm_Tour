<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Dish;
use App\Models\Festival;
use App\Models\Hotel;
use App\Models\Image;
use App\Models\Post;
use App\Models\Tour;
use App\Models\TourSchedule;
use App\Models\Transport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ImageAdminController extends Controller
{
    /**
     * Allowed morph targets for media uploads.
     *
     * @var array<int, class-string>
     */
    private const ALLOWED_IMAGEABLE_TYPES = [
        City::class,
        Tour::class,
        TourSchedule::class,
        Hotel::class,
        Festival::class,
        Transport::class,
        Post::class,
        Dish::class,
    ];

    /**
     * Upload an image or video and attach to an existing allowlisted model.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|file|mimes:jpeg,png,jpg,webp,gif,mp4,webm,ogg,mov|max:51200',
            'imageable_type' => ['required', 'string', Rule::in(self::ALLOWED_IMAGEABLE_TYPES)],
            'imageable_id' => 'required|integer|min:1',
            'is_main' => 'nullable|boolean',
        ]);

        /** @var class-string<\Illuminate\Database\Eloquent\Model> $type */
        $type = $request->input('imageable_type');
        $id = (int) $request->input('imageable_id');

        if (! $type::query()->whereKey($id)->exists()) {
            return back()->withErrors([
                'imageable_id' => 'The selected target record does not exist.',
            ]);
        }

        $file = $request->file('image');
        $isMediaVideo = str_starts_with((string) $file->getMimeType(), 'video/');
        $folder = $isMediaVideo ? 'videos' : 'images';
        $path = $file->store($folder, Image::publicDisk());
        $isMain = $request->boolean('is_main');

        if ($isMain) {
            Image::where('imageable_type', $type)
                ->where('imageable_id', $id)
                ->update(['is_main' => false]);
        }

        Image::create([
            'imageable_type' => $type,
            'imageable_id' => $id,
            'path' => $path,
            'is_main' => $isMain,
            'order' => Image::where('imageable_type', $type)->where('imageable_id', $id)->count() + 1,
        ]);

        return back()->with('success', 'Media file uploaded successfully.');
    }

    /**
     * Delete a media item.
     */
    public function destroy(Image $image)
    {
        $rawPath = $image->getRawOriginal('path');
        if ($rawPath && ! str_starts_with($rawPath, 'http')) {
            $storagePath = ltrim(str_replace('/storage/', '', $rawPath), '/');
            Storage::disk(Image::publicDisk())->delete($storagePath);
        }

        $image->delete();

        return back()->with('success', 'Media item deleted successfully.');
    }

    /**
     * Set a media item as the main item.
     */
    public function setMain(Image $image)
    {
        Image::where('imageable_type', $image->imageable_type)
            ->where('imageable_id', $image->imageable_id)
            ->update(['is_main' => false]);

        $image->update(['is_main' => true]);

        return back()->with('success', 'Main media updated.');
    }
}
