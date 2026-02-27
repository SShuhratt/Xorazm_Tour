<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TourScheduleTranslation extends Model
{
    /** @use HasFactory<\Database\Factories\TourScheduleTranslationFactory> */
    use HasFactory;

    protected $fillable = [
        'tour_schedule_id',
        'locale',
        'title',
        'description'
    ];

    public function schedule(): BelongsTo
    {
        return $this->belongsTo(TourSchedule::class, 'tour_schedule_id');
    }
}
