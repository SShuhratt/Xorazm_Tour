<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TourTranslation extends Model
{
    /** @use HasFactory<\Database\Factories\TourTranslationFactory> */
    use HasFactory;

    protected $fillable = [
        'tour_id',
        'locale',
        'title',
        'route',
        'duration',
        'description',
    ];

    public function transport(): BelongsTo
    {
        return $this->belongsTo(Transport::class);
    }
}
