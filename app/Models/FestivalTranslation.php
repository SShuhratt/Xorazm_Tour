<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FestivalTranslation extends Model
{
    /** @use HasFactory<\Database\Factories\FestivalTranslationFactory> */
    use HasFactory;

    //public $timestamps = false;

    protected $fillable = [
        'festival_id',
        'city_id',
        'locale',
        'title',
        'description',
    ];

    public function festival(): BelongsTo
    {
        return $this->belongsTo(Festival::class);
    }


}
