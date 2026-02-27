<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\HotelTranslation;
use App\Models\Tour;
use App\Models\TourTranslation;
use App\Models\Transport;
use Illuminate\Database\Seeder;

class TourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tours = [
            [
                'slug' => 'classic-uzbekistan',
                'cost' => 1200,
                'cities' => ['khiva', 'bukhara', 'samarkand'],
                'transports' => ['tourist-bus', 'afrosiyob-train'], // corrected
                'translations' => [
                    'en' => [
                        'title' => 'Classic Uzbekistan Tour',
                        'route' => 'Khiva – Bukhara – Samarkand',
                        'duration' => 7,
                        'description' => 'Discover the ancient Silk Road cities of Uzbekistan.',
                    ],
                    'ru' => [
                        'title' => 'Классический тур по Узбекистану',
                        'route' => 'Хива – Бухара – Самарканд',
                        'duration' => 7,
                        'description' => 'Путешествие по древним городам Великого Шелкового пути.',
                    ],
                    'uz' => [
                        'title' => 'Klassik O‘zbekiston sayohati',
                        'route' => 'Xiva – Buxoro – Samarqand',
                        'duration' => 7,
                        'description' => 'Buyuk Ipak yo‘lining qadimiy shaharlarini kashf eting.',
                    ],
                ],
            ],
            [
                'slug' => 'khiva-bukhara-tashkent',
                'cost' => 1350,
                'cities' => ['khiva', 'bukhara', 'tashkent'],
                'transports' => ['tourist-bus', 'afrosiyob-train'],
                'translations' => [
                    'en' => [
                        'title' => 'Khiva-Bukhara-Tashkent Adventure',
                        'route' => 'Khiva – Bukhara – Tashkent',
                        'duration' => 8,
                        'description' => 'Experience Uzbekistan’s highlights including the modern capital.',
                    ],
                    'ru' => [
                        'title' => 'Приключение Хива-Бухара-Ташкент',
                        'route' => 'Хива – Бухара – Ташкент',
                        'duration' => 8,
                        'description' => 'Путешествие по основным достопримечательностям Узбекистана, включая столицу.',
                    ],
                    'uz' => [
                        'title' => 'Xiva-Buxoro-Toshkent sarguzashti',
                        'route' => 'Xiva – Buxoro – Toshkent',
                        'duration' => 8,
                        'description' => 'O‘zbekistonning eng diqqatga sazovor joylarini, poytaxtni ham kashf eting.',
                    ],
                ],
            ],
            [
                'slug' => 'samarkand-tashkent-bukhara',
                'cost' => 1250,
                'cities' => ['samarkand', 'tashkent', 'bukhara'],
                'transports' => ['afrosiyob-train', 'tourist-bus'],
                'translations' => [
                    'en' => [
                        'title' => 'Samarkand-Tashkent-Bukhara Highlights',
                        'route' => 'Samarkand – Tashkent – Bukhara',
                        'duration' => 7,
                        'description' => 'Visit iconic sites across Uzbekistan’s cultural heart.',
                    ],
                    'ru' => [
                        'title' => 'Основные достопримечательности Самарканд-Ташкент-Бухара',
                        'route' => 'Самарканд – Ташкент – Бухара',
                        'duration' => 7,
                        'description' => 'Посетите культовые места в культурном сердце Узбекистана.',
                    ],
                    'uz' => [
                        'title' => 'Samarqand-Toshkent-Buxoro asosiy diqqatga sazovor joylar',
                        'route' => 'Samarqand – Toshkent – Buxoro',
                        'duration' => 7,
                        'description' => 'O‘zbekistonning madaniy yuragidagi mashhur joylarni ziyorat qiling.',
                    ],
                ],
            ],
            [
                'slug' => 'khiva-tashkent-tour',
                'cost' => 1100,
                'cities' => ['khiva', 'tashkent'],
                'transports' => ['tourist-bus'],
                'translations' => [
                    'en' => [
                        'title' => 'Khiva to Tashkent Express',
                        'route' => 'Khiva – Tashkent',
                        'duration' => 5,
                        'description' => 'Quick tour from the ancient west to the capital.',
                    ],
                    'ru' => [
                        'title' => 'Экспресс Хива-Ташкент',
                        'route' => 'Хива – Ташкент',
                        'duration' => 5,
                        'description' => 'Быстрое путешествие с древнего запада до столицы.',
                    ],
                    'uz' => [
                        'title' => 'Xiva-Toshkent ekspress sayohati',
                        'route' => 'Xiva – Toshkent',
                        'duration' => 5,
                        'description' => 'Qadimiy g‘arbdan poytaxtga tezkor sayohat.',
                    ],
                ],
            ],
            [
                'slug' => 'bukhara-samarkand-tour',
                'cost' => 1000,
                'cities' => ['bukhara', 'samarkand'],
                'transports' => ['afrosiyob-train'],
                'translations' => [
                    'en' => [
                        'title' => 'Bukhara-Samarkand Cultural Tour',
                        'route' => 'Bukhara – Samarkand',
                        'duration' => 4,
                        'description' => 'Explore two of Uzbekistan’s most historic cities.',
                    ],
                    'ru' => [
                        'title' => 'Культурный тур Бухара-Самарканд',
                        'route' => 'Бухара – Самарканд',
                        'duration' => 4,
                        'description' => 'Исследуйте два исторических города Узбекистана.',
                    ],
                    'uz' => [
                        'title' => 'Buxoro-Samarqand madaniy sayohat',
                        'route' => 'Buxoro – Samarqand',
                        'duration' => 4,
                        'description' => 'O‘zbekistonning eng qadimiy ikki shahrini o‘rganing.',
                    ],
                ],
            ],
            [
                'slug' => 'samarkand-tashkent-tour',
                'cost' => 950,
                'cities' => ['samarkand', 'tashkent'],
                'transports' => ['tourist-bus'],
                'translations' => [
                    'en' => [
                        'title' => 'Samarkand-Tashkent Leisure',
                        'route' => 'Samarkand – Tashkent',
                        'duration' => 4,
                        'description' => 'Short and comfortable tour covering historical and modern highlights.',
                    ],
                    'ru' => [
                        'title' => 'Краткий тур Самарканд-Ташкент',
                        'route' => 'Самарканд – Ташкент',
                        'duration' => 4,
                        'description' => 'Короткий и комфортный тур по историческим и современным достопримечательностям.',
                    ],
                    'uz' => [
                        'title' => 'Samarqand-Toshkent qisqa sayohat',
                        'route' => 'Samarqand – Toshkent',
                        'duration' => 4,
                        'description' => 'Tarixiy va zamonaviy diqqatga sazovor joylarni qamrab oluvchi qisqa va qulay sayohat.',
                    ],
                ],
            ],
        ];


        foreach ($tours as $data) {
            $tour = Tour::create([
                'slug'   => $data['slug'],
                'status' => 'active',
                'cost'   => $data['cost'],
            ]);

            foreach ($data['cities'] as $index => $citySlug) {
                $city = City::where('slug', $citySlug)->first();
                $tour->cities()->attach($city->id, ['order' => $index + 1]);

                $hotels = HotelTranslation::where('city_id', $city->id)
                    ->pluck('hotel_id')
                    ->unique();

                foreach ($hotels as $hotelId) {
                    $tour->hotels()->syncWithoutDetaching($hotelId);
                }
            }

            foreach ($data['transports'] as $slug) {
                $transport = Transport::where('slug', $slug)->first();
                $tour->transports()->attach($transport->id);
            }

            foreach ($data['translations'] as $locale => $t) {
                TourTranslation::create([
                    'tour_id'     => $tour->id,
                    'locale'      => $locale,
                    'title'       => $t['title'],
                    'route'       => $t['route'],
                    'duration'    => $t['duration'],
                    'description' => $t['description'],
                ]);
            }
        }
    }
}
