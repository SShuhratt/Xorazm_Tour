<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Casts\Attribute;
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
            get: fn (string $value) => str_starts_with($value, 'http') ? $value : Storage::url($value),
        );
    }
}

