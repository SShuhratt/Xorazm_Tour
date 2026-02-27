<?php

namespace App\Models;

use App\Models\Conserns\HasTranslations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

use Illuminate\Database\Eloquent\Relations\MorphMany;

class Tour extends Model
{
    /** @use HasFactory<\Database\Factories\TourFactory> */
    use HasFactory;
    use HasTranslations;

    protected $fillable = [
        'slug',
        'status',
        'cost'
    ];

    public function translations(): HasMany
    {
        return $this->hasMany(TourTranslation::class);
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

    public function cities(): BelongsToMany
    {
        return $this->belongsToMany(City::class)
            ->withPivot('order')
            ->orderBy('pivot_order');
    }

    public function hotels(): BelongsToMany
    {
        return $this->belongsToMany(Hotel::class);
    }

    public function transports(): BelongsToMany
    {
        return $this->belongsToMany(Transport::class);
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(TourSchedule::class)->orderBy('day')->orderBy('time');
    }
}
