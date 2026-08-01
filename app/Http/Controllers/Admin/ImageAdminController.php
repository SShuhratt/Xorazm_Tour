<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageAdminController extends Controller
{
    /**
     * Upload an image and attach to an imageable model.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
            'imageable_type' => 'required|string',
            'imageable_id' => 'required|integer',
            'is_main' => 'nullable|boolean',
        ]);

        $path = $request->file('image')->store('images', 'public');
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

        return back()->with('success', 'Image uploaded successfully.');
    }

    /**
     * Delete an image.
     */
    public function destroy(Image $image)
    {
        if ($image->path && !str_starts_with($image->path, 'http')) {
            $storagePath = str_replace('/storage/', '', $image->path);
            Storage::disk('public')->delete($storagePath);
        }

        $image->delete();

        return back()->with('success', 'Image deleted successfully.');
    }

    /**
     * Set an image as the main image.
     */
    public function setMain(Image $image)
    {
        Image::where('imageable_type', $image->imageable_type)
            ->where('imageable_id', $image->imageable_id)
            ->update(['is_main' => false]);

        $image->update(['is_main' => true]);

        return back()->with('success', 'Main image updated.');
    }
}
