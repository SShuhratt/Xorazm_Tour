<?php

namespace App\Models;

use App\Models\Conserns\HasTranslations;
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
        'slug',
        'status',
        'longitude',
        'latitude',
    ];

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
