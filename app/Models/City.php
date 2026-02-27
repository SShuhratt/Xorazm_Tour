<?php

namespace App\Models;

use App\Models\Conserns\HasTranslations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class City extends Model
{
    /** @use HasFactory<\Database\Factories\CityFactory> */
    use HasFactory;
    use HasTranslations;
    protected $fillable = [
        'slug',
        'status',
        'longitude',
        'latitude',
    ];

    public function translations(): HasMany
    {
        return $this->hasMany(CityTranslation::class);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable')
            ->orderBy('order');
    }

    public function tours(): BelongsToMany
    {
        return $this->belongsToMany(Tour::class)
            ->withPivot('order')
            ->orderBy('pivot_order'); // ensures same sequence as defined in tour
    }

    public function mainImage(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('is_main', true);
    }
}

