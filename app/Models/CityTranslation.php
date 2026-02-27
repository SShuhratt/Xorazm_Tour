<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CityTranslation extends Model
{
    /** @use HasFactory<\Database\Factories\CityTranslationFactory> */
    use HasFactory;

    //public $timestamps = false;

    protected $fillable = [
        'city_id',
        'locale',       // uz, ru, en
        'name',
        'description',
    ];

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }
}

