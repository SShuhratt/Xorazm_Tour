<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    protected $fillable = [
        'imageable_id',
        'imageable_type',
        'path',
        'is_main',
        'order',
    ];

    /**
     * Resolve the public-facing filesystem disk (s3/R2 in cloud mode, public locally).
     */
    public static function publicDisk(): string
    {
        return config('filesystems.default') === 's3' ? 's3' : 'public';
    }

    protected static function booted(): void
    {
        static::deleting(function (Image $image) {
            $disk = static::publicDisk();
            $rawPath = $image->getRawOriginal('path');
            if ($rawPath && ! str_starts_with($rawPath, 'http')) {
                $storagePath = ltrim(str_replace('/storage/', '', $rawPath), '/');
                try {
                    Storage::disk($disk)->delete($storagePath);
                    if ($disk !== 'public') {
                        Storage::disk('public')->delete($storagePath);
                    }
                } catch (\Throwable $e) {
                    // Ignore if file already removed
                }
            }
        });
    }

    public function imageable(): MorphTo
    {
        return $this->morphTo();
    }

    public function translations(): HasMany
    {
        return $this->hasMany(ImageTranslations::class);
    }

    protected function path(): Attribute
    {
        return Attribute::make(
            get: function (string $value): string {
                if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
                    return $value;
                }

                $cleanPath = ltrim($value, '/');
                $disk = static::publicDisk();

                if ($disk === 'public') {
                    if (! Storage::disk('public')->exists($cleanPath) && file_exists(public_path($cleanPath))) {
                        return '/' . $cleanPath;
                    }

                    return '/storage/' . $cleanPath;
                }

                return Storage::disk($disk)->url($cleanPath);
            },
        );
    }
}
