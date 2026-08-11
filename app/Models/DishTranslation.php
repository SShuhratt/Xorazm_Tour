<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DishTranslation extends Model
{
    use HasFactory;

    protected $fillable = [
        'dish_id',
        'locale',
        'name',
        'short_description',
        'description',
    ];

    public function dish(): BelongsTo
    {
        return $this->belongsTo(Dish::class);
    }
}
