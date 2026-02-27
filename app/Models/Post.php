<?php

namespace App\Models;

use App\Models\Conserns\HasTranslations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    use HasTranslations;

    protected $fillable = [
        'slug',
        'status',
        'source_link',
    ];

    public function translations(): HasMany
    {
        return $this->hasMany(PostTranslation::class);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable')
            ->orderBy('order');
    }

    public function mainImage(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('is_main', true);
    }
}
