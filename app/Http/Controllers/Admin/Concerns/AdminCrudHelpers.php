<?php

namespace App\Http\Controllers\Admin\Concerns;

use App\Models\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait AdminCrudHelpers
{
    protected function generateUniqueSlug(string $modelClass, ?string $requestedSlug, string $fallbackTitle, ?int $ignoreId = null): string
    {
        $base = Str::slug($requestedSlug ?: $fallbackTitle);
        if ($base === '') {
            $base = 'item';
        }

        $candidate = $base;
        $suffix = 1;

        while (
            $modelClass::query()
                ->where('slug', $candidate)
                ->when($ignoreId !== null, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $candidate = "{$base}-{$suffix}";
            $suffix++;
        }

        return $candidate;
    }

    protected function storeUploadedMainImage(UploadedFile $file, string $imageableType, int $imageableId, bool $clearExistingMain = false): Image
    {
        $disk = Image::publicDisk();
        $path = $file->store('images', $disk);

        if ($clearExistingMain) {
            Image::where('imageable_type', $imageableType)
                ->where('imageable_id', $imageableId)
                ->update(['is_main' => false]);
        }

        return Image::create([
            'imageable_type' => $imageableType,
            'imageable_id' => $imageableId,
            'path' => $path,
            'is_main' => true,
            'order' => 1,
        ]);
    }

    protected function deleteImagesFor(string $imageableType, int $imageableId): void
    {
        $disk = Image::publicDisk();
        $images = Image::where('imageable_type', $imageableType)
            ->where('imageable_id', $imageableId)
            ->get();

        foreach ($images as $image) {
            $rawPath = ltrim((string) $image->getRawOriginal('path'), '/');
            if ($rawPath !== '' && !str_starts_with($rawPath, 'http') && !str_starts_with($rawPath, 'XT_content/')) {
                $relative = str_starts_with($rawPath, 'storage/') ? substr($rawPath, 8) : $rawPath;
                Storage::disk($disk)->delete($relative);
            }
            $image->delete();
        }
    }
}

