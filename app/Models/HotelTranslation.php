<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HotelTranslation extends Model
{
    /** @use HasFactory<\Database\Factories\HotelTranslationFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'hotel_id',
        'city_id',
        'locale',
        'title',
        'address',
        'description',
    ];

    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }
}
