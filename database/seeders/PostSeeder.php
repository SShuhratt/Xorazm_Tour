<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\PostTranslation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            'khiva' => [
                ['title' => 'Khiva Historical Insights', 'description' => 'Exploring the ancient city walls and minarets.'],
                ['title' => 'Khiva Cultural Tour', 'description' => 'Discover local traditions and museums.'],
            ],
            'samarkand' => [
                ['title' => 'Samarkand Architecture', 'description' => 'Admire the Registan and other monuments.'],
                ['title' => 'Samarkand Silk Road Legacy', 'description' => 'Trace the historic Silk Road routes.'],
            ],
            'bukhara' => [
                ['title' => 'Bukhara Old Town', 'description' => 'Walk through the historic madrassas and bazaars.'],
                ['title' => 'Bukhara Fortress Tour', 'description' => 'Explore the Ark Fortress and surrounding sites.'],
            ],
            'tashkent' => [
                ['title' => 'Tashkent City Highlights', 'description' => 'Modern and historical attractions in the capital.'],
                ['title' => 'Tashkent Culinary Journey', 'description' => 'Taste local Uzbek cuisine and street food.'],
            ],
        ];

        $locales = [
            'en' => function ($data) { return $data; },
            'ru' => function ($data) {
                return match ($data['title']) {
                    'Khiva Historical Insights'  => ['title' => 'Исторические достопримечательности Хивы', 'description' => 'Исследуем древние городские стены и минареты.'],
                    'Khiva Cultural Tour'        => ['title' => 'Культурный тур по Хиве', 'description' => 'Откройте для себя местные традиции и музеи.'],
                    'Samarkand Architecture'     => ['title' => 'Архитектура Самарканда', 'description' => 'Полюбуйтесь Регистаном и другими памятниками.'],
                    'Samarkand Silk Road Legacy' => ['title' => 'Наследие Шёлкового пути Самарканда', 'description' => 'Следуйте по историческим маршрутам Шёлкового пути.'],
                    'Bukhara Old Town'           => ['title' => 'Старый город Бухары', 'description' => 'Прогулка по историческим медресе и базарам.'],
                    'Bukhara Fortress Tour'      => ['title' => 'Тур по крепости Бухары', 'description' => 'Исследуйте крепость Арк и окрестности.'],
                    'Tashkent City Highlights'   => ['title' => 'Основные достопримечательности Ташкента', 'description' => 'Современные и исторические достопримечательности столицы.'],
                    'Tashkent Culinary Journey'  => ['title' => 'Кулинарное путешествие по Ташкенту', 'description' => 'Попробуйте местную узбекскую кухню и уличную еду.'],
                    default => $data,
                };
            },
            'uz' => function ($data) {
                return match ($data['title']) {
                    'Khiva Historical Insights'  => ['title' => 'Xiva Tarixiy Ma\'lumotlar', 'description' => 'Qadimiy shahar devorlari va minoralarni o‘rganish.'],
                    'Khiva Cultural Tour'        => ['title' => 'Xiva Madaniy Sayohati', 'description' => 'Mahalliy an’analar va muzeylarni kashf eting.'],
                    'Samarkand Architecture'     => ['title' => 'Samarqand Arxitekturasi', 'description' => 'Registon va boshqa yodgorliklarga nazar tashlang.'],
                    'Samarkand Silk Road Legacy' => ['title' => 'Samarqand Ipak Yo‘li Merosi', 'description' => 'Tarixiy Ipak Yo‘li yo‘llarini kuzating.'],
                    'Bukhara Old Town'           => ['title' => 'Buxoro Eski Shahar', 'description' => 'Tarixiy madrasalar va bozorlar bo‘ylab sayr qiling.'],
                    'Bukhara Fortress Tour'      => ['title' => 'Buxoro Qal\'a Sayohati', 'description' => 'Ark qal’asi va atrofini o‘rganing.'],
                    'Tashkent City Highlights'   => ['title' => 'Toshkent Shahri Asosiy Joylari', 'description' => 'Poytaxtdagi zamonaviy va tarixiy diqqatga sazovor joylar.'],
                    'Tashkent Culinary Journey'  => ['title' => 'Toshkentta Oshxona Sayohati', 'description' => 'Mahalliy o‘zbek taomlarini va ko‘cha ovqatlarini tatib ko‘ring.'],
                    default => $data,
                };
            },
        ];

        foreach ($cities as $citySlug => $posts) {
            foreach ($posts as $postData) {
                $post = Post::create([
                    'slug'        => Str::slug($postData['title']),
                    'published'   => true,
                    'source_link' => null,
                ]);

                foreach ($locales as $locale => $callback) {
                    $trans = $callback($postData);
                    PostTranslation::create([
                        'post_id'     => $post->id,
                        'locale'      => $locale,
                        'title'       => $trans['title'],
                        'description' => $trans['description'],
                    ]);
                }
            }
        }
    }
}
