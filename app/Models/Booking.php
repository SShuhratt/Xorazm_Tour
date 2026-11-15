<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'inquiry_type',
        'tour_id',
        'dish_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'preferred_date',
        'guests_adults',
        'guests_children',
        'special_requests',
        'estimated_total',
        'status',
        'admin_notes',
        'locale',
    ];

    protected $casts = [
        'preferred_date' => 'date',
        'guests_adults' => 'integer',
        'guests_children' => 'integer',
        'estimated_total' => 'decimal:2',
    ];

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }

    public function dish(): BelongsTo
    {
        return $this->belongsTo(Dish::class);
    }
}

