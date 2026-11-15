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
                    'slug'      => 'qovun-sayli',
                    'coords'    => [41.3770, 60.3600],
                    'video_url' => '/XT_content/festivals/Qovun-sayli/qovun-sayli.mp4',
                    'translations' => [
                        'en' => [
                            'title' => 'Qovun Sayli (Melon Festival)',
                            'description' => 'Qovun Sayli (Melon Festival) is a spectacular annual celebration held in the ancient fortress of Ichan-Kala, Khiva. This vibrant festival showcases the legendary sweetness and rich variety of Khorezmian melons, which have been famous since the Silk Road era. Visitors can enjoy live folk music, traditional dances (including the energetic Lazgi), masterclasses by local craftsmen, and tastings of over 30 different kinds of delicious melons grown in the oasis. It is a true feast of colors, taste, and hospitality.',
                            'event_season' => 'August (Annual)',
                            'festival_type' => 'Harvest & Tasting',
                            'highlight' => '30+ Melon Varieties & Folk Performances',
                        ],
                        'ru' => [
                            'title' => 'Ковун Сайли (Праздник дыни)',
                            'description' => 'Ковун Сайли (Праздник дыни) — это зрелищное ежегодное празднование, проходящее в древней крепости Ичан-Кала в Хиве. Этот яркий фестиваль демонстрирует легендарную сладость и богатое разнообразие хорезмских дынь, славящихся еще со времен Великого шелкового пути. Посетители могут насладиться живой народной музыкой, традиционными танцами (включая зажигательный Лазги), мастер-классами местных ремесленников и дегустацией более 30 различных видов вкуснейших дынь, выращенных в оазисе. Это настоящий праздник красок, вкуса и гостеприимства.',
                            'event_season' => 'Август (Ежегодно)',
                            'festival_type' => 'Праздник Урожая',
                            'highlight' => 'Дегустация 30+ сортов дынь и фольклор',
                        ],
                        'uz' => [
                            'title' => 'Qovun sayli (Melon Festival)',
                            'description' => 'Qovun sayli — Xivaning qadimiy Ichan-Qal\'a me\'moriy majmuasida har yili o\'tkaziladigan ajoyib hosil bayramidir. Ushbu yorqin festival buyuk Ipak yo\'li davridan beri mashhur bo\'lgan Xorazm qovunlarining betakror shirinligi va xilma-xilligini namoyish etadi. Ziyoratchilar jonli xalq musiqasi, an\'anaviy raqs tomoshalari (jumladan, olovli Lazgi), hunarmandlar mahorat darslari va vohada yetishtirilgan 30 dan ortiq eng sara qovun turlaridan tatib ko\'rishlari mumkin. Bu chinakam ranglar, lazzat va mehmondo\'stlik bayramidir.',
                            'event_season' => 'Avgust (Har yili)',
                            'festival_type' => 'Hosil bayrami',
                            'highlight' => '30 dan ortiq qovun navlari va xalq o\'yinlari',
                        ],
                    ],
                ],
                [
                    'slug'   => 'lazgi-dance-festival',
                    'coords' => [41.3795, 60.3625],
                    'translations' => [
                        'en' => [
                            'title' => 'Lazgi Dance Festival',
                            'description' => 'International festival dedicated to the traditional Lazgi dance.',
                            'event_season' => 'April (Biennial)',
                            'festival_type' => 'Dance & Music',
                            'highlight' => 'International Dance Teams & Masterclasses',
                        ],
                        'ru' => [
                            'title' => 'Фестиваль танца Лазги',
                            'description' => 'Международный фестиваль традиционного танца Лазги.',
                            'event_season' => 'Апрель (Раз в 2 года)',
                            'festival_type' => 'Танцы и Музыка',
                            'highlight' => 'Международные труппы и мастер-классы',
                        ],
                        'uz' => [
                            'title' => 'Lazgi raqs festivali',
                            'description' => 'Anʼanaviy Lazgi raqsiga bagʻishlangan xalqaro festival.',
                            'event_season' => 'Aprel (Har 2 yilda)',
                            'festival_type' => 'Raqs va musiqa',
                            'highlight' => 'Xalqaro guruhlar va mahorat darslari',
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
                            'title' => 'Sharq Taronalari',
                            'description' => 'International music festival of Eastern countries.',
                            'event_season' => 'August (Biennial)',
                            'festival_type' => 'World Music',
                            'highlight' => 'Eastern Classical Melodies & International Contest',
                        ],
                        'ru' => [
                            'title' => 'Шарк Тароналари',
                            'description' => 'Международный музыкальный фестиваль восточных стран.',
                            'event_season' => 'Август (Раз в 2 года)',
                            'festival_type' => 'Этническая музыка',
                            'highlight' => 'Восточные мотивы и международный конкурс',
                        ],
                        'uz' => [
                            'title' => 'Sharq taronalari',
                            'description' => 'Sharq mamlakatlari xalqaro musiqa festivali.',
                            'event_season' => 'Avgust (Har 2 yilda)',
                            'festival_type' => 'Jahon musiqasi',
                            'highlight' => 'Sharq taronalari va xalqaro tanlov',
                        ],
                    ],
                ],
                [
                    'slug'   => 'samarkand-artisan-festival',
                    'coords' => [39.6570, 66.9600],
                    'translations' => [
                        'en' => [
                            'title' => 'Samarkand Artisan Festival',
                            'description' => 'Festival showcasing traditional crafts and handmade art.',
                            'event_season' => 'September (Annual)',
                            'festival_type' => 'Handmade Crafts',
                            'highlight' => 'Ceramic, Silk & Gold Embroidery Bazaar',
                        ],
                        'ru' => [
                            'title' => 'Фестиваль ремёсел Самарканда',
                            'description' => 'Фестиваль традиционных ремёсел и прикладного искусства.',
                            'event_season' => 'Сентябрь (Ежегодно)',
                            'festival_type' => 'Ремесленный фестиваль',
                            'highlight' => 'Керамика, шелк и золотое шитье',
                        ],
                        'uz' => [
                            'title' => 'Samarqand hunarmandlar festivali',
                            'description' => 'Anʼanaviy hunarmandchilik va amaliy sanʼat festivali.',
                            'event_season' => 'Sentabr (Har yili)',
                            'festival_type' => 'Amaliy san\'at',
                            'highlight' => 'Kulolchilik, ipak va zardo\'zlik bozorlari',
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
                            'title' => 'Silk and Spices Festival',
                            'description' => 'Festival reviving Silk Road traditions of trade and culture.',
                            'event_season' => 'May (Annual)',
                            'festival_type' => 'Cultural Bazaar',
                            'highlight' => 'Spices, Silks, Carpets & Grand Caravan Parade',
                        ],
                        'ru' => [
                            'title' => 'Фестиваль шелка и специй',
                            'description' => 'Фестиваль возрождения традиций Великого шелкового пути.',
                            'event_season' => 'Май (Ежегодно)',
                            'festival_type' => 'Культурный базар',
                            'highlight' => 'Специи, ковры, шелк и шествие караванов',
                        ],
                        'uz' => [
                            'title' => 'Ipak va ziravorlar festivali',
                            'description' => 'Buyuk Ipak yoʻli savdo va madaniyat anʼanalarini jonlantiruvchi festival.',
                            'event_season' => 'May (Har yili)',
                            'festival_type' => 'Madaniy bozor',
                            'highlight' => 'Ziravorlar, ipak gilamlar va karvon paradi',
                        ],
                    ],
                ],
                [
                    'slug'   => 'bukhara-folk-festival',
                    'coords' => [39.7765, 64.4275],
                    'translations' => [
                        'en' => [
                            'title' => 'Bukhara Folk Festival',
                            'description' => 'Festival of traditional music, dance, and folklore.',
                            'event_season' => 'October (Annual)',
                            'festival_type' => 'Folklore Heritage',
                            'highlight' => 'Puppet Theatre, Street Acrobatics & Costumes',
                        ],
                        'ru' => [
                            'title' => 'Фольклорный фестиваль Бухары',
                            'description' => 'Фестиваль традиционной музыки, танцев и фольклора.',
                            'event_season' => 'Октябрь (Ежегодно)',
                            'festival_type' => 'Фольклорный фестиваль',
                            'highlight' => 'Кукольные театры, канатоходцы и костюмы',
                        ],
                        'uz' => [
                            'title' => 'Buxoro folklor festivali',
                            'description' => 'Anʼanaviy musiqa, raqs va folklorga bagʻishlangan festival.',
                            'event_season' => 'Oktabr (Har yili)',
                            'festival_type' => 'Folklor merosi',
                            'highlight' => 'Qo\'g\'irchoq teatri va milliy liboslar',
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
                            'title' => 'Tashkent International Film Festival',
                            'description' => 'Major international cinema event in Central Asia.',
                            'event_season' => 'September (Annual)',
                            'festival_type' => 'Cinema Arts',
                            'highlight' => 'World Film Premieres & Red Carpet Stars',
                        ],
                        'ru' => [
                            'title' => 'Ташкентский международный кинофестиваль',
                            'description' => 'Крупнейшее международное кинособытие Центральной Азии.',
                            'event_season' => 'Сентябрь (Ежегодно)',
                            'festival_type' => 'Киноискусство',
                            'highlight' => 'Мировые кинопремьеры и звездные гости',
                        ],
                        'uz' => [
                            'title' => 'Toshkent xalqaro kinofestivali',
                            'description' => 'Markaziy Osiyodagi yirik xalqaro kino tadbiri.',
                            'event_season' => 'Sentabr (Har yili)',
                            'festival_type' => 'Kino san\'ati',
                            'highlight' => 'Jahon premyeralari va yulduzlar tashrifi',
                        ],
                    ],
                ],
                [
                    'slug'   => 'tashkent-food-festival',
                    'coords' => [41.2950, 69.2500],
                    'translations' => [
                        'en' => [
                            'title' => 'Tashkent Food Festival',
                            'description' => 'Festival celebrating Uzbek and international cuisine.',
                            'event_season' => 'June (Annual)',
                            'festival_type' => 'Gastronomy',
                            'highlight' => 'Mega Pilaf Cook-offs & Traditional street eats',
                        ],
                        'ru' => [
                            'title' => 'Гастрономический фестиваль Ташкента',
                            'description' => 'Фестиваль узбекской и мировой кухни.',
                            'event_season' => 'Июнь (Ежегодно)',
                            'festival_type' => 'Гастрономия',
                            'highlight' => 'Приготовление мега-плова и уличная еда',
                        ],
                        'uz' => [
                            'title' => 'Toshkent taomlar festivali',
                            'description' => 'Oʻzbek va jahon oshxonasiga bagʻishlangan festival.',
                            'event_season' => 'Iyun (Har yili)',
                            'festival_type' => 'Gastronomiya',
                            'highlight' => 'Mega palov tayyorlash va milliy taomlar',
                        ],
                    ],
                ],
            ],
        ];

        foreach ($festivals as $citySlug => $cityFestivals) {
            $city = City::where('slug', $citySlug)->firstOrFail();

            foreach ($cityFestivals as $data) {
                $festival = Festival::updateOrCreate(
                    ['slug' => $data['slug']],
                    [
                        'city_id'   => $city->id,
                        'status'    => true,
                        'latitude'  => $data['coords'][0],
                        'longitude' => $data['coords'][1],
                        'video_url' => $data['video_url'] ?? null,
                    ]
                );

                foreach ($data['translations'] as $locale => $trans) {
                    FestivalTranslation::updateOrCreate(
                        ['festival_id' => $festival->id, 'locale' => $locale],
                        [
                            'title'         => $trans['title'],
                            'description'   => $trans['description'],
                            'event_season'  => $trans['event_season'],
                            'festival_type' => $trans['festival_type'],
                            'highlight'     => $trans['highlight'],
                        ]
                    );
                }
            }
        }
    }
}
