<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Image;
use App\Models\City;
use App\Models\Hotel;
use App\Models\Transport;
use App\Models\Festival;
use App\Models\Tour;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

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
                $this->createImages($item, $m['prefix'], $locales);
            }
        }

        $tours = Tour::with('schedules')->get();
        foreach ($tours as $tour) {
            $this->createImages($tour, "tour", $locales);

            foreach ($tour->schedules as $schedule) {
                $this->createImages($schedule, "schedule", $locales);
            }
        }

        foreach (Post::all() as $post) {
            $this->createImages($post, "post", $locales);
        }
    }

    protected function createImages($item, $prefix, $locales)
    {
        $images = $this->getImagesForItem($item, $prefix);
        if (empty($images)) return;

        // Shuffle images to get a random main image if one is not specifically named "_main"
        $mainImageFile = $images[0];
        foreach ($images as $img) {
            if (str_contains(strtolower($img), 'main')) {
                $mainImageFile = $img;
                break;
            }
        }

        $mainImageFileStr = $mainImageFile;

        // Main image
        $mainImage = Image::create([
            'imageable_type' => get_class($item),
            'imageable_id'   => $item->id,
            'path'           => $mainImageFileStr,
            'is_main'        => true,
            'order'          => 0,
        ]);

        foreach ($locales as $locale) {
            $mainImage->translations()->create([
                'locale' => $locale,
                'alt' => ucfirst($locale) . " main image of {$item->slug}",
            ]);
        }

        // Additional images (up to 4)
        $additionalImages = array_diff($images, [$mainImageFile]);
        shuffle($additionalImages);
        $additionalImages = array_slice($additionalImages, 0, 4);

        $order = 1;
        foreach ($additionalImages as $addImg) {
            $img = Image::create([
                'imageable_type' => get_class($item),
                'imageable_id'   => $item->id,
                'path'           => $addImg,
                'is_main'        => false,
                'order'          => $order++,
            ]);

            foreach ($locales as $locale) {
                $img->translations()->create([
                    'locale' => $locale,
                    'alt' => ucfirst($locale) . " image {$order} of {$item->slug}",
                ]);
            }
        }
    }

    protected function getImagesForItem($item, $prefix)
    {
        $curatedImages = [
            'tour' => [
                'classic-uzbekistan' => [
                    'XT_content/samarkand/photos/samarkand2.jpg',
                    'XT_content/bukhara/photos/bukhara1.jpg',
                    'XT_content/khiva/Photos/khiva1.jpg',
                ],
                'khiva-bukhara-tashkent' => [
                    'XT_content/khiva/Photos/khiva2.jpg',
                    'XT_content/bukhara/photos/bukhara2.jpg',
                    'XT_content/other/photo_2025-12-31_23-14-32.jpg',
                ],
                'silk-road-adventure' => [
                    'XT_content/other/photo_2025-07-26_13-34-11.jpg',
                    'XT_content/other/photo_2025-12-31_23-16-28.jpg',
                    'XT_content/other/photo_2025-12-31_23-18-05.jpg',
                ],
            ],
            'hotel' => [
                'orient-star-khiva' => [
                    'XT_content/khiva/Photos/khiva_main.jpg',
                    'XT_content/khiva/Photos/khiva5.jpg',
                ],
                'asia-khiva' => [
                    'XT_content/khiva/Photos/khiva3.jpg',
                    'XT_content/khiva/Photos/khiva4.jpg',
                ],
                'hyatt-regency' => [
                    'XT_content/other/photo_2023-03-17_13-56-03.jpg',
                    'XT_content/other/photo_2025-12-31_23-14-44.jpg',
                ],
                'registan-plaza' => [
                    'XT_content/samarkand/photos/samarkand6.jpg',
                    'XT_content/other/photo_2025-12-31_23-15-30.jpg',
                ],
            ],
            'festival' => [
                'qovun-sayli' => [
                    'XT_content/festivals/Qovun-sayli/photo_2025-12-31_23-16-28.jpg',
                    'XT_content/festivals/Qovun-sayli/photo_2023-03-17_13-56-03.jpg',
                    'XT_content/festivals/Qovun-sayli/photo_2025-12-31_23-18-45.jpg',
                    'XT_content/festivals/Qovun-sayli/photo_2025-12-31_23-18-05.jpg',
                    'XT_content/festivals/Qovun-sayli/photo_2025-12-31_23-18-46.jpg',
                    'XT_content/festivals/Qovun-sayli/photo_2025-12-31_23-21-23.jpg',
                    'XT_content/festivals/Qovun-sayli/photo_2023-03-17_13-56-04.jpg',
                    'XT_content/festivals/Qovun-sayli/photo_2025-12-31_23-16-22.jpg',
                    'XT_content/festivals/Qovun-sayli/photo_2025-12-31_23-21-17.jpg',
                    'XT_content/festivals/Qovun-sayli/photo_2025-12-31_23-17-33.jpg',
                ],
                'lazgi-dance-festival' => [
                    'XT_content/festivals/Lazgi-festival/photo_2025-12-31_23-14-32.jpg',
                    'XT_content/festivals/Lazgi-festival/photo_2025-12-31_23-14-57.jpg',
                    'XT_content/festivals/Lazgi-festival/photo_2025-12-31_23-28-12.jpg',
                    'XT_content/festivals/Lazgi-festival/photo_2025-12-31_23-14-44.jpg',
                    'XT_content/festivals/Lazgi-festival/photo_2025-12-31_23-15-19.jpg',
                    'XT_content/festivals/Lazgi-festival/photo_2025-12-31_23-16-45 (2).jpg',
                    'XT_content/festivals/Lazgi-festival/photo_2025-12-31_23-14-31 (2).jpg',
                    'XT_content/festivals/Lazgi-festival/photo_2025-12-31_23-15-30.jpg',
                    'XT_content/festivals/Lazgi-festival/photo_2025-12-31_23-14-31.jpg',
                    'XT_content/festivals/Lazgi-festival/photo_2025-12-31_23-16-27.jpg',
                ],
                'sharq-taronalari' => [
                    'XT_content/samarkand/photos/samarkand2.jpg',
                    'XT_content/samarkand/photos/samarkand6.jpg',
                ],
                'samarkand-artisan-festival' => [
                    'XT_content/samarkand/photos/samarkand6.jpg',
                    'XT_content/samarkand/photos/samarkand2.jpg',
                ],
                'silk-and-spices-festival' => [
                    'XT_content/bukhara/photos/bukhara1.jpg',
                    'XT_content/bukhara/photos/bukhara6.jpg',
                    'XT_content/bukhara/photos/bukhara5.jpg',
                ],
                'bukhara-folk-festival' => [
                    'XT_content/bukhara/photos/bukhara2.jpg',
                    'XT_content/bukhara/photos/bukhara4.jpg',
                ],
                'tashkent-international-film-festival' => [
                    'XT_content/toshkent/photos/photo_2025-12-31_23-17-37.jpg',
                ],
                'tashkent-food-festival' => [
                    'XT_content/national-dishes/photo_2025-12-31_23-16-31.jpg',
                    'XT_content/national-dishes/photo_2025-12-31_23-16-31 (2).jpg',
                    'XT_content/national-dishes/photo_2025-12-31_23-16-38.jpg',
                    'XT_content/national-dishes/photo_2025-12-31_23-16-36.jpg',
                    'XT_content/national-dishes/photo_2025-12-31_23-16-34.jpg',
                ],
            ],
        ];

        $slug = $item->slug ?? null;
        if ($slug && isset($curatedImages[$prefix][$slug])) {
            return $curatedImages[$prefix][$slug];
        }

        // Try specific city folder first
        if ($prefix === 'city' && $slug) {
            $dir = 'XT_content/' . strtolower($slug);
            if (Storage::disk('public')->exists($dir)) {
                $files = Storage::disk('public')->allFiles($dir);
                $images = array_filter($files, fn($file) => str_ends_with(strtolower($file), '.jpg'));
                if (!empty($images)) {
                    return array_values($images);
                }
            }
        }

        // Fallback to "other" folder or all images
        $dir = 'XT_content/other';
        if (Storage::disk('public')->exists($dir)) {
            $files = Storage::disk('public')->allFiles($dir);
            $images = array_filter($files, fn($file) => str_ends_with(strtolower($file), '.jpg') && !str_contains($file, 'photo_2019-07-16_10-35-43'));
            if (!empty($images)) {
                return array_values($images);
            }
        }

        // Fallback to everything in XT_content
        $dir = 'XT_content';
        if (Storage::disk('public')->exists($dir)) {
            $files = Storage::disk('public')->allFiles($dir);
            $images = array_filter($files, fn($file) => str_ends_with(strtolower($file), '.jpg') && !str_contains($file, 'photo_2019-07-16_10-35-43'));
            if (!empty($images)) {
                return array_values($images);
            }
        }

        return [];
    }
}
