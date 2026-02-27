<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImageTranslations extends Model
{
    /** @use HasFactory<\Database\Factories\ImageTranslationsFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'image_id',
        'locale',
        'alt',
    ];

    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }
}
