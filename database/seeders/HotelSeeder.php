<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Hotel;
use App\Models\HotelTranslation;
use Illuminate\Database\Seeder;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hotels = [
            'khiva' => [
                [
                    'slug'   => 'orient-star-khiva',
                    'phone'  => '+998912345601',
                    'coords' => [41.3791, 60.3631],
                    'translations' => [
                        'en' => ['Orient Star Khiva', 'Ichan-Qala, Khiva', 'Historic hotel inside the old city walls.'],
                        'ru' => ['Ориент Стар Хива', 'Ичан-Кала, Хива', 'Исторический отель внутри старого города.'],
                        'uz' => ['Orient Star Xiva', 'Ichan-Qala, Xiva', 'Qadimiy shahar ichidagi tarixiy mehmonxona.'],
                    ],
                ],
                [
                    'slug'   => 'asia-khiva',
                    'phone'  => '+998912345602',
                    'coords' => [41.3779, 60.3620],
                    'translations' => [
                        'en' => ['Asia Khiva Hotel', 'Near Ichan-Qala', 'Comfortable hotel close to main attractions.'],
                        'ru' => ['Отель Азия Хива', 'Рядом с Ичан-Калой', 'Уютный отель рядом с достопримечательностями.'],
                        'uz' => ['Asia Xiva Mehmonxonasi', 'Ichan-Qala yaqinida', 'Qulay va markaziy joylashgan mehmonxona.'],
                    ],
                ],
                [
                    'slug'   => 'zarafshan-khiva',
                    'phone'  => '+998912345603',
                    'coords' => [41.3800, 60.3652],
                    'translations' => [
                        'en' => ['Zarafshan Khiva', 'Khiva center', 'Modern hotel with traditional design.'],
                        'ru' => ['Зарафшан Хива', 'Центр Хивы', 'Современный отель с традиционным стилем.'],
                        'uz' => ['Zarafshan Xiva', 'Xiva markazi', 'Zamonaviy va milliy uslubdagi mehmonxona.'],
                    ],
                ],
            ],

            'samarkand' => [
                [
                    'slug'   => 'registan-plaza',
                    'phone'  => '+998912345611',
                    'coords' => [39.6548, 66.9590],
                    'translations' => [
                        'en' => ['Registan Plaza', 'Near Registan Square', 'Hotel close to Samarkand’s main landmark.'],
                        'ru' => ['Регистан Плаза', 'Рядом с Регистаном', 'Отель рядом с главной площадью.'],
                        'uz' => ['Registan Plaza', 'Registon maydoni yaqinida', 'Asosiy diqqatga sazovor joyga yaqin mehmonxona.'],
                    ],
                ],
                [
                    'slug'   => 'emirhan-hotel',
                    'phone'  => '+998912345612',
                    'coords' => [39.6561, 66.9622],
                    'translations' => [
                        'en' => ['Emirhan Hotel', 'Samarkand old town', 'Boutique hotel with eastern atmosphere.'],
                        'ru' => ['Отель Эмирхан', 'Старый город Самарканда', 'Бутик-отель с восточной атмосферой.'],
                        'uz' => ['Emirhan Mehmonxonasi', 'Samarqand eski shahri', 'Sharqona muhitdagi butik mehmonxona.'],
                    ],
                ],
                [
                    'slug'   => 'silk-road-empire',
                    'phone'  => '+998912345613',
                    'coords' => [39.6530, 66.9575],
                    'translations' => [
                        'en' => ['Silk Road Empire', 'City center', 'Luxury hotel inspired by Silk Road history.'],
                        'ru' => ['Шелковый Путь Империя', 'Центр города', 'Роскошный отель в стиле Шелкового пути.'],
                        'uz' => ['Silk Road Empire', 'Shahar markazi', 'Ipak yo‘li ruhidagi hashamatli mehmonxona.'],
                    ],
                ],
            ],

            'bukhara' => [
                [
                    'slug'   => 'lyabi-house',
                    'phone'  => '+998912345621',
                    'coords' => [39.7742, 64.4278],
                    'translations' => [
                        'en' => ['Lyabi House', 'Lyabi-Hauz area', 'Traditional guest house in old Bukhara.'],
                        'ru' => ['Ляби Хауз', 'Район Ляби-Хауз', 'Традиционный гостевой дом.'],
                        'uz' => ['Lyabi House', 'Lyabi-Hauz hududi', 'An’anaviy mehmon uyi.'],
                    ],
                ],
                [
                    'slug'   => 'komil-hotel',
                    'phone'  => '+998912345622',
                    'coords' => [39.7755, 64.4291],
                    'translations' => [
                        'en' => ['Komil Hotel', 'Old city', 'Family-run hotel with national decor.'],
                        'ru' => ['Отель Комил', 'Старый город', 'Семейный отель с национальным интерьером.'],
                        'uz' => ['Komil Mehmonxonasi', 'Eski shahar', 'Milliy bezakdagi oilaviy mehmonxona.'],
                    ],
                ],
                [
                    'slug'   => 'amulett-hotel',
                    'phone'  => '+998912345623',
                    'coords' => [39.7738, 64.4269],
                    'translations' => [
                        'en' => ['Amulett Hotel', 'Historic center', 'Boutique hotel in a madrasa building.'],
                        'ru' => ['Отель Амулет', 'Исторический центр', 'Бутик-отель в здании медресе.'],
                        'uz' => ['Amulett Mehmonxonasi', 'Tarixiy markaz', 'Madrasada joylashgan butik mehmonxona.'],
                    ],
                ],
            ],

            'tashkent' => [
                [
                    'slug'   => 'hyatt-regency',
                    'phone'  => '+998712345631',
                    'coords' => [41.3111, 69.2797],
                    'translations' => [
                        'en' => ['Hyatt Regency Tashkent', 'City center', 'Luxury international hotel.'],
                        'ru' => ['Хаятт Ридженси Ташкент', 'Центр города', 'Роскошный международный отель.'],
                        'uz' => ['Hyatt Regency Toshkent', 'Shahar markazi', 'Xalqaro hashamatli mehmonxona.'],
                    ],
                ],
                [
                    'slug'   => 'lotte-hotel',
                    'phone'  => '+998712345632',
                    'coords' => [41.2999, 69.2405],
                    'translations' => [
                        'en' => ['Lotte City Hotel', 'Business district', 'Modern hotel for business travelers.'],
                        'ru' => ['Лотте Сити Отель', 'Деловой район', 'Современный бизнес-отель.'],
                        'uz' => ['Lotte City Mehmonxonasi', 'Biznes hududi', 'Biznes sayohatchilar uchun mehmonxona.'],
                    ],
                ],
                [
                    'slug'   => 'city-palace',
                    'phone'  => '+998712345633',
                    'coords' => [41.3150, 69.2850],
                    'translations' => [
                        'en' => ['City Palace Hotel', 'Amir Temur street', 'Classic hotel with large rooms.'],
                        'ru' => ['Сити Палас Отель', 'Улица Амира Темура', 'Классический отель с просторными номерами.'],
                        'uz' => ['City Palace Mehmonxonasi', 'Amir Temur ko‘chasi', 'Keng xonali klassik mehmonxona.'],
                    ],
                ],
            ],
        ];

        foreach ($hotels as $citySlug => $cityHotels) {
            $city = City::where('slug', $citySlug)->first();

            foreach ($cityHotels as $hotelData) {
                $hotel = Hotel::create([
                    'slug' => $hotelData['slug'],
                    'status' => true,
                    'phone_number' => $hotelData['phone'],
                    'latitude' => $hotelData['coords'][0],
                    'longitude' => $hotelData['coords'][1],
                ]);

                foreach ($hotelData['translations'] as $locale => [$title, $address, $description]) {
                    HotelTranslation::create([
                        'hotel_id'    => $hotel->id,
                        'city_id'     => $city->id,
                        'locale'      => $locale,
                        'title'       => $title,
                        'address'     => $address,
                        'description' => $description,
                    ]);
                }
            }
        }
    }
}
