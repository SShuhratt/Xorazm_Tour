<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransportTranslation extends Model
{
    /** @use HasFactory<\Database\Factories\TransportTranslationFactory> */
    use HasFactory;

    protected $fillable = [
        'transport_id',
        'locale',
        'name',
        'description',
    ];

    public function transport(): BelongsTo
    {
        return $this->belongsTo(Transport::class);
    }
}
