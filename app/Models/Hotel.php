<?php

namespace App\Models;

use App\Models\Concerns\HasTranslations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Hotel extends Model
{
    /** @use HasFactory<\Database\Factories\HotelFactory> */
    use HasFactory;
    use HasTranslations;

    protected $fillable = [
        'city_id',
        'slug',
        'status',
        'phone_number',
        'stars',
        'price_from',
        'email',
        'longitude',
        'latitude',
        'instagram_link',
        'telegram_link',
    ];

    protected $casts = [
        'status' => 'boolean',
        'stars' => 'integer',
        'price_from' => 'decimal:2',
    ];

    public function city(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function translations(): HasMany
    {
        return $this->hasMany(HotelTranslation::class);
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
