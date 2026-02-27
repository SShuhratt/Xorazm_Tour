<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Festival;
use App\Models\FestivalTranslation;
use Illuminate\Database\Seeder;

class FestivalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $festivals = [
            'khiva' => [
                [
                    'slug'   => 'khiva-ancient-culture-festival',
                    'coords' => [41.3770, 60.3600],
                    'translations' => [
                        'en' => [
                            'Khiva Ancient Culture Festival',
                            'Festival celebrating Khiva’s ancient traditions, crafts, and folklore.'
                        ],
                        'ru' => [
                            'Фестиваль древней культуры Хивы',
                            'Фестиваль, посвящённый древним традициям, ремёслам и фольклору Хивы.'
                        ],
                        'uz' => [
                            'Xiva qadimiy madaniyat festivali',
                            'Xivaning qadimiy anʼanalari, hunarmandchiligi va folkloriga bagʻishlangan festival.'
                        ],
                    ],
                ],
                [
                    'slug'   => 'lazgi-dance-festival',
                    'coords' => [41.3795, 60.3625],
                    'translations' => [
                        'en' => [
                            'Lazgi Dance Festival',
                            'International festival dedicated to the traditional Lazgi dance.'
                        ],
                        'ru' => [
                            'Фестиваль танца Лазги',
                            'Международный фестиваль традиционного танца Лазги.'
                        ],
                        'uz' => [
                            'Lazgi raqs festivali',
                            'Anʼanaviy Lazgi raqsiga bagʻishlangan xalqaro festival.'
                        ],
                    ],
                ],
            ],

            'samarkand' => [
                [
                    'slug'   => 'sharq-taronalari',
                    'coords' => [39.6545, 66.9750],
                    'translations' => [
                        'en' => [
                            'Sharq Taronalari',
                            'International music festival of Eastern countries.'
                        ],
                        'ru' => [
                            'Шарк Тароналари',
                            'Международный музыкальный фестиваль восточных стран.'
                        ],
                        'uz' => [
                            'Sharq taronalari',
                            'Sharq mamlakatlari xalqaro musiqa festivali.'
                        ],
                    ],
                ],
                [
                    'slug'   => 'samarkand-artisan-festival',
                    'coords' => [39.6570, 66.9600],
                    'translations' => [
                        'en' => [
                            'Samarkand Artisan Festival',
                            'Festival showcasing traditional crafts and handmade art.'
                        ],
                        'ru' => [
                            'Фестиваль ремёсел Самарканда',
                            'Фестиваль традиционных ремёсел и прикладного искусства.'
                        ],
                        'uz' => [
                            'Samarqand hunarmandlar festivali',
                            'Anʼanaviy hunarmandchilik va amaliy sanʼat festivali.'
                        ],
                    ],
                ],
            ],

            'bukhara' => [
                [
                    'slug'   => 'silk-and-spices-festival',
                    'coords' => [39.7750, 64.4200],
                    'translations' => [
                        'en' => [
                            'Silk and Spices Festival',
                            'Festival reviving Silk Road traditions of trade and culture.'
                        ],
                        'ru' => [
                            'Фестиваль шелка и специй',
                            'Фестиваль возрождения традиций Великого шелкового пути.'
                        ],
                        'uz' => [
                            'Ipak va ziravorlar festivali',
                            'Buyuk Ipak yoʻli savdo va madaniyat anʼanalarini jonlantiruvchi festival.'
                        ],
                    ],
                ],
                [
                    'slug'   => 'bukhara-folk-festival',
                    'coords' => [39.7765, 64.4275],
                    'translations' => [
                        'en' => [
                            'Bukhara Folk Festival',
                            'Festival of traditional music, dance, and folklore.'
                        ],
                        'ru' => [
                            'Фольклорный фестиваль Бухары',
                            'Фестиваль традиционной музыки, танцев и фольклора.'
                        ],
                        'uz' => [
                            'Buxoro folklor festivali',
                            'Anʼanaviy musiqa, raqs va folklorga bagʻishlangan festival.'
                        ],
                    ],
                ],
            ],

            'tashkent' => [
                [
                    'slug'   => 'tashkent-international-film-festival',
                    'coords' => [41.3100, 69.2800],
                    'translations' => [
                        'en' => [
                            'Tashkent International Film Festival',
                            'Major international cinema event in Central Asia.'
                        ],
                        'ru' => [
                            'Ташкентский международный кинофестиваль',
                            'Крупнейшее международное кинособытие Центральной Азии.'
                        ],
                        'uz' => [
                            'Toshkent xalqaro kinofestivali',
                            'Markaziy Osiyodagi yirik xalqaro kino tadbiri.'
                        ],
                    ],
                ],
                [
                    'slug'   => 'tashkent-food-festival',
                    'coords' => [41.2950, 69.2500],
                    'translations' => [
                        'en' => [
                            'Tashkent Food Festival',
                            'Festival celebrating Uzbek and international cuisine.'
                        ],
                        'ru' => [
                            'Гастрономический фестиваль Ташкента',
                            'Фестиваль узбекской и мировой кухни.'
                        ],
                        'uz' => [
                            'Toshkent taomlar festivali',
                            'Oʻzbek va jahon oshxonasiga bagʻishlangan festival.'
                        ],
                    ],
                ],
            ],
        ];

        foreach ($festivals as $citySlug => $cityFestivals) {
            $city = City::where('slug', $citySlug)->firstOrFail();

            foreach ($cityFestivals as $data) {
                $festival = Festival::create([
                    'slug' => $data['slug'],
                    'status' => true,
                    'latitude' => $data['coords'][0],
                    'longitude' => $data['coords'][1],
                ]);

                foreach ($data['translations'] as $locale => [$title, $description]) {
                    FestivalTranslation::create([
                        'festival_id' => $festival->id,
                        'city_id' => $city->id,
                        'locale' => $locale,
                        'title' => $title,
                        'description' => $description,
                    ]);
                }
            }
        }

    }
}
