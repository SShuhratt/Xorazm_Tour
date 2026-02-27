<?php

namespace App\Models;

use App\Models\Conserns\HasTranslations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TourSchedule extends Model
{
    /** @use HasFactory<\Database\Factories\TourScheduleFactory> */
    use HasFactory;
    use HasTranslations;

    protected $fillable = [
        'tour_id',
        'day',
        'time',
        'description'
    ];

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }

    public function translations(): HasMany
    {
        return $this->hasMany(TourScheduleTranslation::class);
    }
}
