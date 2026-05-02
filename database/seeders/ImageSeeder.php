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
                    'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?auto=format&fit=crop&w=1000&q=80', // Khiva
                    'https://images.unsplash.com/photo-1628172901389-98336338b813?auto=format&fit=crop&w=1000&q=80', // Bukhara
                    'https://images.unsplash.com/photo-1540960300165-025732b130f1?auto=format&fit=crop&w=1000&q=80', // Samarkand
                ],
                'khiva-bukhara-tashkent' => [
                    'https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&w=1000&q=80', // Khiva 2
                    'https://images.unsplash.com/photo-1588168333991-ad1893361847?auto=format&fit=crop&w=1000&q=80', // Bukhara 2
                    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=80', // Tashkent
                ],
                'silk-road-adventure' => [
                    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80', // Caravan
                    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80', // Desert
                    'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1000&q=80', // Wall
                ],
            ],
            'hotel' => [
                'orient-star-khiva' => [
                    'https://images.unsplash.com/photo-1584442111166-5198ec56e297?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
                ],
                'asia-khiva' => [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
                ],
                'hyatt-regency' => [
                    'https://images.unsplash.com/photo-1551882547-ff43c61f3630?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
                ],
                'registan-plaza' => [
                    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80',
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
            $images = array_filter($files, fn($file) => str_ends_with(strtolower($file), '.jpg'));
            if (!empty($images)) {
                return array_values($images);
            }
        }

        // Fallback to everything in XT_content
        $dir = 'XT_content';
        if (Storage::disk('public')->exists($dir)) {
            $files = Storage::disk('public')->allFiles($dir);
            $images = array_filter($files, fn($file) => str_ends_with(strtolower($file), '.jpg'));
            if (!empty($images)) {
                return array_values($images);
            }
        }

        return [];
    }
}
