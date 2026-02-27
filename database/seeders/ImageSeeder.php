<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Image;
use App\Models\City;
use App\Models\Hotel;
use App\Models\Transport;
use App\Models\Festival;
use App\Models\Tour;
use App\Models\TourSchedule;
use App\Models\Post;

class ImageSeeder extends Seeder
{
    public function run(): void
    {
        $locales = ['en', 'ru', 'uz'];

        $models = [
            ['model' => new City, 'prefix' => 'city'],
            ['model' => new Hotel, 'prefix' => 'hotel'],
            ['model' => new Transport, 'prefix' => 'transport'],
            ['model' => new Festival, 'prefix' => 'festival'],
        ];

        foreach ($models as $m) {
            foreach ($m['model']::all() as $item) {
                $this->createImages($item, "{$m['prefix']}_{$item->slug}", $locales);
            }
        }



        $tours = Tour::with('schedules')->get();
        foreach ($tours as $tour) {
            $this->createImages($tour, "tour_{$tour->slug}", $locales);

            foreach ($tour->schedules as $schedule) {
                $this->createImages($schedule, "tour_{$tour->slug}_day{$schedule->day}_event{$schedule->id}", $locales);
            }
        }

        // Posts
        foreach (Post::all() as $post) {
            $this->createImages($post, "post_{$post->slug}", $locales);
        }
    }

    protected function createImages($item, $basePath, $locales)
    {
        // Main image
        $mainImage = Image::create([
            'imageable_type' => get_class($item),
            'imageable_id'   => $item->id,
            'path'           => "images/{$basePath}_main.jpg",
            'is_main'        => true,
            'order'          => 0,
        ]);

        foreach ($locales as $locale) {
            $mainImage->translations()->create([
                'locale' => $locale,
                'alt' => ucfirst($locale) . " main image of {$basePath}",
            ]);
        }

        // Additional images
        $additionalCount = rand(3, 8);
        for ($i = 1; $i <= $additionalCount; $i++) {
            $img = Image::create([
                'imageable_type' => get_class($item),
                'imageable_id'   => $item->id,
                'path'           => "images/{$basePath}_{$i}.jpg",
                'is_main'        => false,
                'order'          => $i,
            ]);

            foreach ($locales as $locale) {
                $img->translations()->create([
                    'locale' => $locale,
                    'alt' => ucfirst($locale) . " image {$i} of {$basePath}",
                ]);
            }
        }
    }
}
