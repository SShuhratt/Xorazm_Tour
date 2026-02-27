<?php

namespace App\Models;

use App\Models\Conserns\HasTranslations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Transport extends Model
{
    /** @use HasFactory<\Database\Factories\TransportFactory> */
    use HasFactory;
    use HasTranslations;

    protected $fillable = [
        'slug',
        'status',
        'capacity',
        'height',
        'width',
        'length',
    ];

    public function translations(): HasMany
    {
        return $this->hasMany(TransportTranslation::class, 'transport_id');
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
