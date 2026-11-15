<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Hotel;
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
        $defaultIncluded = [
            'en' => [
                'Double hotel accommodation (4 nights + early check-in) with breakfast',
                'All meet-and-greet services and transfers during excursions in a comfortable, air-conditioned minibus',
                'Guide services (4 days)',
                'Entrance fees to museums and attractions',
                'Melon tasting',
                'Meals: 2 lunches (including a masterclass) and 2 dinners, as specified in the tour program',
                'Folklore concert',
            ],
            'ru' => [
                'Двухместное проживание в отеле (4 ночи + ранний заезд) с завтраком',
                'Все встречи/проводы и трансферы на экскурсиях в комфортабельном микроавтобусе с кондиционером',
                'Услуги гида (4 дня)',
                'Входные билеты в музеи и достопримечательности',
                'Дегустация дыни',
                'Питание: 2 обеда (включая мастер-класс) и 2 ужина по программе',
                'Фольклорный концерт',
            ],
            'uz' => [
                'Mehmonxonada 2 kishilik joylashish (4 kecha + erta kirish) va nonushta',
                'Qulay, konditsionerli mikroavtobusda kutib olish/kuzatish va barcha ekskursiya transferlari',
                'Gid xizmatlari (4 kun)',
                'Muzeylar va tarixiy obidalarga kirish chiptalari',
                'Qovun tatib ko\'rish (degustatsiya)',
                'Ovqatlanish: dastur bo\'yicha 2 tushlik (master-klass bilan) va 2 kechki ovqat',
                'Folklor konsert dasturi',
            ],
        ];

        $defaultNotIncluded = [
            'en' => [
                'Airfare',
                'Meals (2 lunches and 2 dinners): guides recommend restaurants and book tables for the group, but payment is made on-site based on actual consumption',
                'Camel riding and boat trips on Lake Akchakul: paid separately on-site (approx. $10 per person)',
                'Additional services at the Arda Khiva complex',
            ],
            'ru' => [
                'Авиабилеты',
                'Питание (2 обеда и 2 ужина): гиды рекомендуют рестораны и бронируют столы, оплата на месте по чеку',
                'Катание на верблюдах и прогулка на лодке по озеру Акчакуль (оплачивается на месте, ~$10 с чел)',
                'Дополнительные платные услуги в комплексе Арда Хива',
            ],
            'uz' => [
                'Aviachiptalar',
                'Dasturda ko\'rsatilmagan ovqatlanish (2 tushlik va 2 kechki ovqat joyida to\'lanadi)',
                'Aqchako\'l ko\'lida tuya minish va qayiqda sayr qilish (joyida to\'lanadi, ~kishiga $10)',
                'Arda Xiva majmuasidagi qo\'shimcha pullik xizmatlar',
            ],
        ];

        $defaultPricingTiers = [
            'en' => [
                ['group_size' => '4 – 6 people', 'price_per_person' => 600],
                ['group_size' => '8 – 10 people', 'price_per_person' => 550],
                ['group_size' => '12 – 14 people', 'price_per_person' => 500],
            ],
            'ru' => [
                ['group_size' => '4 – 6 человек', 'price_per_person' => 600],
                ['group_size' => '8 – 10 человек', 'price_per_person' => 550],
                ['group_size' => '12 – 14 человек', 'price_per_person' => 500],
            ],
            'uz' => [
                ['group_size' => '4 – 6 kishi', 'price_per_person' => 600],
                ['group_size' => '8 – 10 kishi', 'price_per_person' => 550],
                ['group_size' => '12 – 14 kishi', 'price_per_person' => 500],
            ],
        ];

        $tours = [
            [
                'slug' => 'classic-uzbekistan',
                'category' => 'cultural',
                'cost' => 600,
                'max_group_size' => 14,
                'single_supplement' => 100,
                'pricing_tiers' => $defaultPricingTiers['en'],
                'cities' => ['khiva', 'bukhara', 'samarkand'],
                'transports' => ['tourist-bus', 'afrosiyob-train'],
                'translations' => [
                    'en' => [
                        'title' => 'Classic Uzbekistan Tour',
                        'route' => 'Khiva – Bukhara – Samarkand',
                        'custom_transport' => 'Plane, air-conditioned minibus',
                        'duration' => 7,
                        'description' => 'Discover the ancient Silk Road cities of Uzbekistan with full service and comfort.',
                        'included' => $defaultIncluded['en'],
                        'not_included' => $defaultNotIncluded['en'],
                    ],
                    'ru' => [
                        'title' => 'Классический тур по Узбекистану',
                        'route' => 'Хива – Бухара – Самарканд',
                        'custom_transport' => 'Самолет, комфортабельный микроавтобус с кондиционером',
                        'duration' => 7,
                        'description' => 'Путешествие по древним городам Великого Шелкового пути с полным сопровождением.',
                        'included' => $defaultIncluded['ru'],
                        'not_included' => $defaultNotIncluded['ru'],
                    ],
                    'uz' => [
                        'title' => 'Klassik O‘zbekiston sayohati',
                        'route' => 'Xiva – Buxoro – Samarqand',
                        'custom_transport' => 'Samolyot, konditsionerli mikroavtobus',
                        'duration' => 7,
                        'description' => 'Buyuk Ipak yo‘lining qadimiy shaharlarini to‘liq xizmat va qulaylik bilan kashf eting.',
                        'included' => $defaultIncluded['uz'],
                        'not_included' => $defaultNotIncluded['uz'],
                    ],
                ],
            ],
            [
                'slug' => 'khiva-bukhara-tashkent',
                'category' => 'adventure',
                'cost' => 650,
                'max_group_size' => 14,
                'single_supplement' => 120,
                'pricing_tiers' => [
                    ['group_size' => '4 – 6 people', 'price_per_person' => 650],
                    ['group_size' => '8 – 10 people', 'price_per_person' => 590],
                    ['group_size' => '12 – 14 people', 'price_per_person' => 530],
                ],
                'cities' => ['khiva', 'bukhara', 'tashkent'],
                'transports' => ['tourist-bus', 'afrosiyob-train'],
                'translations' => [
                    'en' => [
                        'title' => 'Khiva-Bukhara-Tashkent Adventure',
                        'route' => 'Khiva – Bukhara – Tashkent',
                        'custom_transport' => 'High-speed Afrosiyob train, air-conditioned bus',
                        'duration' => 8,
                        'description' => 'Experience Uzbekistan’s highlights including the modern capital and historic desert fortresses.',
                        'included' => $defaultIncluded['en'],
                        'not_included' => $defaultNotIncluded['en'],
                    ],
                    'ru' => [
                        'title' => 'Приключение Хива-Бухара-Ташкент',
                        'route' => 'Хива – Бухара – Ташкент',
                        'custom_transport' => 'Скоростной поезд Афросиаб, автобус с кондиционером',
                        'duration' => 8,
                        'description' => 'Путешествие по основным достопримечательностям Узбекистана, включая столицу.',
                        'included' => $defaultIncluded['ru'],
                        'not_included' => $defaultNotIncluded['ru'],
                    ],
                    'uz' => [
                        'title' => 'Xiva-Buxoro-Toshkent sarguzashti',
                        'route' => 'Xiva – Buxoro – Toshkent',
                        'custom_transport' => 'Tezkor Afrosiyob poyezdi, qulay avtobus',
                        'duration' => 8,
                        'description' => 'O‘zbekistonning eng diqqatga sazovor joylarini, poytaxtni ham kashf eting.',
                        'included' => $defaultIncluded['uz'],
                        'not_included' => $defaultNotIncluded['uz'],
                    ],
                ],
            ],
            [
                'slug' => 'samarkand-tashkent-bukhara',
                'category' => 'premium',
                'cost' => 580,
                'max_group_size' => 12,
                'single_supplement' => 90,
                'pricing_tiers' => $defaultPricingTiers['en'],
                'cities' => ['samarkand', 'tashkent', 'bukhara'],
                'transports' => ['afrosiyob-train', 'tourist-bus'],
                'translations' => [
                    'en' => [
                        'title' => 'Samarkand-Tashkent-Bukhara Highlights',
                        'route' => 'Samarkand – Tashkent – Bukhara',
                        'custom_transport' => 'Plane, air-conditioned minibus',
                        'duration' => 7,
                        'description' => 'Visit iconic sites across Uzbekistan’s cultural heart.',
                        'included' => $defaultIncluded['en'],
                        'not_included' => $defaultNotIncluded['en'],
                    ],
                    'ru' => [
                        'title' => 'Основные достопримечательности Самарканд-Ташкент-Бухара',
                        'route' => 'Самарканд – Ташкент – Бухара',
                        'custom_transport' => 'Самолет, микроавтобус с кондиционером',
                        'duration' => 7,
                        'description' => 'Посетите культовые места в культурном сердце Узбекистана.',
                        'included' => $defaultIncluded['ru'],
                        'not_included' => $defaultNotIncluded['ru'],
                    ],
                    'uz' => [
                        'title' => 'Samarqand-Toshkent-Buxoro asosiy diqqatga sazovor joylar',
                        'route' => 'Samarqand – Toshkent – Buxoro',
                        'custom_transport' => 'Samolyot, qulay mikroavtobus',
                        'duration' => 7,
                        'description' => 'O‘zbekistonning madaniy yuragidagi mashhur joylarni ziyorat qiling.',
                        'included' => $defaultIncluded['uz'],
                        'not_included' => $defaultNotIncluded['uz'],
                    ],
                ],
            ],
            [
                'slug' => 'khiva-tashkent-tour',
                'category' => 'adventure',
                'cost' => 500,
                'max_group_size' => 14,
                'single_supplement' => 80,
                'pricing_tiers' => $defaultPricingTiers['en'],
                'cities' => ['khiva', 'tashkent'],
                'transports' => ['tourist-bus'],
                'translations' => [
                    'en' => [
                        'title' => 'Khiva to Tashkent Express',
                        'route' => 'Khiva – Tashkent',
                        'custom_transport' => 'Domestic flight & Mercedes Sprinter',
                        'duration' => 5,
                        'description' => 'Quick tour from the ancient west to the capital.',
                        'included' => $defaultIncluded['en'],
                        'not_included' => $defaultNotIncluded['en'],
                    ],
                    'ru' => [
                        'title' => 'Экспресс Хива-Ташкент',
                        'route' => 'Хива – Ташкент',
                        'custom_transport' => 'Внутренний авиаперелет и Mercedes Sprinter',
                        'duration' => 5,
                        'description' => 'Быстрое путешествие с древнего запада до столицы.',
                        'included' => $defaultIncluded['ru'],
                        'not_included' => $defaultNotIncluded['ru'],
                    ],
                    'uz' => [
                        'title' => 'Xiva-Toshkent ekspress sayohati',
                        'route' => 'Xiva – Toshkent',
                        'custom_transport' => 'Ichki aviaparvoz va Mercedes Sprinter',
                        'duration' => 5,
                        'description' => 'Qadimiy g‘arbdan poytaxtga tezkor sayohat.',
                        'included' => $defaultIncluded['uz'],
                        'not_included' => $defaultNotIncluded['uz'],
                    ],
                ],
            ],
            [
                'slug' => 'bukhara-samarkand-tour',
                'category' => 'cultural',
                'cost' => 450,
                'max_group_size' => 14,
                'single_supplement' => 70,
                'pricing_tiers' => $defaultPricingTiers['en'],
                'cities' => ['bukhara', 'samarkand'],
                'transports' => ['afrosiyob-train'],
                'translations' => [
                    'en' => [
                        'title' => 'Bukhara-Samarkand Cultural Tour',
                        'route' => 'Bukhara – Samarkand',
                        'custom_transport' => 'Afrosiyob high-speed train',
                        'duration' => 4,
                        'description' => 'Explore two of Uzbekistan’s most historic cities.',
                        'included' => $defaultIncluded['en'],
                        'not_included' => $defaultNotIncluded['en'],
                    ],
                    'ru' => [
                        'title' => 'Культурный тур Бухара-Самарканд',
                        'route' => 'Бухара – Самарканд',
                        'custom_transport' => 'Высокоскоростной поезд Афросиаб',
                        'duration' => 4,
                        'description' => 'Исследуйте два исторических города Узбекистана.',
                        'included' => $defaultIncluded['ru'],
                        'not_included' => $defaultNotIncluded['ru'],
                    ],
                    'uz' => [
                        'title' => 'Buxoro-Samarqand madaniy sayohat',
                        'route' => 'Buxoro – Samarqand',
                        'custom_transport' => 'Afrosiyob tezyurar poyezdi',
                        'duration' => 4,
                        'description' => 'O‘zbekistonning eng qadimiy ikki shahrini o‘rganing.',
                        'included' => $defaultIncluded['uz'],
                        'not_included' => $defaultNotIncluded['uz'],
                    ],
                ],
            ],
            [
                'slug' => 'samarkand-tashkent-tour',
                'category' => 'cultural',
                'cost' => 420,
                'max_group_size' => 14,
                'single_supplement' => 60,
                'pricing_tiers' => $defaultPricingTiers['en'],
                'cities' => ['samarkand', 'tashkent'],
                'transports' => ['tourist-bus'],
                'translations' => [
                    'en' => [
                        'title' => 'Samarkand-Tashkent Leisure',
                        'route' => 'Samarkand – Tashkent',
                        'custom_transport' => 'Air-conditioned tourist minibus',
                        'duration' => 4,
                        'description' => 'Short and comfortable tour covering historical and modern highlights.',
                        'included' => $defaultIncluded['en'],
                        'not_included' => $defaultNotIncluded['en'],
                    ],
                    'ru' => [
                        'title' => 'Краткий тур Самарканд-Ташкент',
                        'route' => 'Самарканд – Ташкент',
                        'custom_transport' => 'Туристический микроавтобус с кондиционером',
                        'duration' => 4,
                        'description' => 'Короткий и комфортный тур по историческим и современным достопримечательностям.',
                        'included' => $defaultIncluded['ru'],
                        'not_included' => $defaultNotIncluded['ru'],
                    ],
                    'uz' => [
                        'title' => 'Samarqand-Toshkent qisqa sayohat',
                        'route' => 'Samarqand – Toshkent',
                        'custom_transport' => 'Konditsionerli sayyohlik mikroavtobusi',
                        'duration' => 4,
                        'description' => 'Tarixiy va zamonaviy diqqatga sazovor joylarni qamrab oluvchi qisqa va qulay sayohat.',
                        'included' => $defaultIncluded['uz'],
                        'not_included' => $defaultNotIncluded['uz'],
                    ],
                ],
            ],
        ];

        foreach ($tours as $data) {
            $tour = Tour::updateOrCreate(
                ['slug' => $data['slug']],
                [
                    'status' => 'active',
                    'category' => $data['category'] ?? 'cultural',
                    'cost'   => $data['cost'],
                    'max_group_size' => $data['max_group_size'] ?? null,
                    'single_supplement' => $data['single_supplement'] ?? null,
                    'pricing_tiers' => $data['pricing_tiers'] ?? null,
                ]
            );

            if (!empty($data['cities'])) {
                $citySync = [];
                foreach ($data['cities'] as $index => $citySlug) {
                    $city = City::where('slug', $citySlug)->first();
                    if ($city) {
                        $citySync[$city->id] = ['order' => $index + 1];

                        $hotels = Hotel::where('city_id', $city->id)
                            ->pluck('id')
                            ->unique();

                        foreach ($hotels as $hotelId) {
                            $tour->hotels()->syncWithoutDetaching($hotelId);
                        }
                    }
                }
                $tour->cities()->sync($citySync);
            }

            if (!empty($data['transports'])) {
                $transportIds = [];
                foreach ($data['transports'] as $slug) {
                    $transport = Transport::where('slug', $slug)->first();
                    if ($transport) {
                        $transportIds[] = $transport->id;
                    }
                }
                $tour->transports()->sync($transportIds);
            }

            foreach ($data['translations'] as $locale => $t) {
                TourTranslation::updateOrCreate(
                    ['tour_id' => $tour->id, 'locale' => $locale],
                    [
                        'title'            => $t['title'],
                        'route'            => $t['route'] ?? '',
                        'custom_transport' => $t['custom_transport'] ?? null,
                        'duration'         => $t['duration'] ?? 1,
                        'description'      => $t['description'] ?? '',
                        'included'         => $t['included'] ?? [],
                        'not_included'     => $t['not_included'] ?? [],
                        'pricing_tiers'    => $t['pricing_tiers'] ?? ($defaultPricingTiers[$locale] ?? []),
                    ]
                );
            }
        }
    }
}
