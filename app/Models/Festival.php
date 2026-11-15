<?php

namespace App\Models;

use App\Models\Concerns\HasTranslations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Festival extends Model
{
    /** @use HasFactory<\Database\Factories\FestivalFactory> */
    use HasFactory;
    use HasTranslations;

    protected $fillable = [
        'city_id',
        'slug',
        'status',
        'longitude',
        'latitude',
        'video_url',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function city(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function translations(): HasMany
    {
        return $this->hasMany(FestivalTranslation::class);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable')
            ->orderBy('order');
    }

    public function mainImage()
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('is_main', true);
    }
}
