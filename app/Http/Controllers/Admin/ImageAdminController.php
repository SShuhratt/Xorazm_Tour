<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageAdminController extends Controller
{
    /**
     * Upload an image or video and attach to a model.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|file|mimes:jpeg,png,jpg,webp,gif,mp4,webm,ogg,mov|max:51200',
            'imageable_type' => 'required|string',
            'imageable_id' => 'required|integer',
            'is_main' => 'nullable|boolean',
        ]);

        $file = $request->file('image');
        $isMediaVideo = str_starts_with($file->getMimeType(), 'video/');
        $folder = $isMediaVideo ? 'videos' : 'images';
        $path = $file->store($folder, 'public');
        $isMain = $request->boolean('is_main');

        $type = $request->input('imageable_type');
        $id = $request->input('imageable_id');

        if ($isMain) {
            Image::where('imageable_type', $type)
                ->where('imageable_id', $id)
                ->update(['is_main' => false]);
        }

        $image = Image::create([
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
        if ($image->path && !str_starts_with($image->path, 'http')) {
            $storagePath = str_replace('/storage/', '', $image->path);
            Storage::disk('public')->delete($storagePath);
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
