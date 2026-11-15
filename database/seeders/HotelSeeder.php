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
                    'phone'  => '+998 91 234 56 01',
                    'stars'  => 3,
                    'price_from' => 65,
                    'email'  => 'orient-star@xorazmtour.uz',
                    'coords' => [41.3791, 60.3631],
                    'translations' => [
                        'en' => [
                            'title' => 'Orient Star Khiva',
                            'address' => 'Ichan-Qala, Khiva',
                            'description' => 'Historic hotel inside the old city walls.',
                            'amenities' => ['Historic Madrasa setting', 'Traditional courtyard', 'Free High-speed WiFi', 'Air Conditioning', 'On-site Restaurant'],
                            'rooms' => [
                                ['type' => 'Standard Single', 'spec' => 'Cozy single bed room in authentic cell', 'price' => '$65'],
                                ['type' => 'Double / Twin Bed', 'spec' => 'Comfortable room for two with historical decor', 'price' => '$85'],
                                ['type' => "Khan's Suite", 'spec' => 'Premium spacious cell with traditional ornaments', 'price' => '$140'],
                            ],
                        ],
                        'ru' => [
                            'title' => 'Ориент Стар Хива',
                            'address' => 'Ичан-Кала, Хива',
                            'description' => 'Исторический отель внутри старого города.',
                            'amenities' => ['Историческое медресе', 'Традиционный двор', 'Бесплатный Wi-Fi', 'Кондиционер', 'Ресторан на территории'],
                            'rooms' => [
                                ['type' => 'Стандартный одноместный', 'spec' => 'Уютный номер в аутентичной келье', 'price' => '$65'],
                                ['type' => 'Двухместный номер', 'spec' => 'Комфортный номер для двоих с историческим декором', 'price' => '$85'],
                                ['type' => 'Ханский Люкс', 'spec' => 'Просторная келья премиум-класса с орнаментами', 'price' => '$140'],
                            ],
                        ],
                        'uz' => [
                            'title' => 'Orient Star Xiva',
                            'address' => 'Ichan-Qala, Xiva',
                            'description' => 'Qadimiy shahar ichidagi tarixiy mehmonxona.',
                            'amenities' => ['Tarixiy madrasa binosi', 'Milliy hovli', 'Bepul tezkor WiFi', 'Konditsioner', 'Restoran'],
                            'rooms' => [
                                ['type' => 'Standard Single', 'spec' => 'Haqiqiy hujrada shinam 1 kishilik xona', 'price' => '$65'],
                                ['type' => 'Double / Twin Bed', 'spec' => 'Tarixiy bezakli 2 kishilik shinam xona', 'price' => '$85'],
                                ['type' => 'Xon xonasi Suite', 'spec' => 'Milliy naqshlar bilan bezatilgan premium hujra', 'price' => '$140'],
                            ],
                        ],
                    ],
                ],
                [
                    'slug'   => 'asia-khiva',
                    'phone'  => '+998 91 234 56 02',
                    'stars'  => 4,
                    'price_from' => 55,
                    'email'  => 'asia-khiva@xorazmtour.uz',
                    'coords' => [41.3779, 60.3620],
                    'translations' => [
                        'en' => [
                            'title' => 'Asia Khiva Hotel',
                            'address' => 'Near Ichan-Qala',
                            'description' => 'Comfortable hotel close to main attractions.',
                            'amenities' => ['Outdoor Swimming Pool', 'Finnish Sauna', 'High-speed WiFi', 'Lounge Bar', '24/7 Room Service'],
                            'rooms' => [
                                ['type' => 'Standard Single', 'spec' => 'Modern clean single room', 'price' => '$55'],
                                ['type' => 'Double / Twin Bed', 'spec' => 'Spacious twin bed room near the pool', 'price' => '$75'],
                                ['type' => 'Family Room', 'spec' => 'Two interconnected bedrooms for family', 'price' => '$110'],
                            ],
                        ],
                        'ru' => [
                            'title' => 'Отель Азия Хива',
                            'address' => 'Рядом с Ичан-Калой',
                            'description' => 'Уютный отель рядом с достопримечательностями.',
                            'amenities' => ['Открытый бассейн', 'Финская сауна', 'Высокоскоростной Wi-Fi', 'Лаундж-бар', 'Круглосуточный сервис'],
                            'rooms' => [
                                ['type' => 'Стандартный одноместный', 'spec' => 'Современный чистый номер', 'price' => '$55'],
                                ['type' => 'Двухместный номер', 'spec' => 'Просторный номер с двумя кроватями у бассейна', 'price' => '$75'],
                                ['type' => 'Семейный номер', 'spec' => 'Две смежные спальни для семьи', 'price' => '$110'],
                            ],
                        ],
                        'uz' => [
                            'title' => 'Asia Xiva Mehmonxonasi',
                            'address' => 'Ichan-Qala yaqinida',
                            'description' => 'Qulay va markaziy joylashgan mehmonxona.',
                            'amenities' => ['Ochiq suzish havzasi', 'Fin saunasi', 'Tezkor WiFi', 'Lounge bar', '24/7 Xona xizmati'],
                            'rooms' => [
                                ['type' => 'Standard Single', 'spec' => 'Zamonaviy va toza bir kishilik xona', 'price' => '$55'],
                                ['type' => 'Double / Twin Bed', 'spec' => 'Hovuz yaqinidagi keng ikki kishilik xona', 'price' => '$75'],
                                ['type' => 'Oilaviy xona', 'spec' => "Oila uchun mo'ljallangan keng xona", 'price' => '$110'],
                            ],
                        ],
                    ],
                ],
                [
                    'slug'   => 'zarafshan-khiva',
                    'phone'  => '+998 91 234 56 03',
                    'stars'  => 4,
                    'price_from' => 70,
                    'email'  => 'zarafshan-khiva@xorazmtour.uz',
                    'coords' => [41.3800, 60.3652],
                    'translations' => [
                        'en' => [
                            'title' => 'Zarafshan Khiva',
                            'address' => 'Khiva center',
                            'description' => 'Modern hotel with traditional design.',
                            'amenities' => ['Boutique Design', 'Terraced Panoramic View', 'Cozy Courtyard', 'Buffet Breakfast', 'Full Air-conditioning'],
                            'rooms' => [
                                ['type' => 'Standard Single', 'spec' => 'Charming single stay with carved wood', 'price' => '$70'],
                                ['type' => 'Double / Twin Bed', 'spec' => 'Traditional styling with modern luxury', 'price' => '$95'],
                                ['type' => 'Deluxe Suite', 'spec' => 'Top floor panoramic view suite', 'price' => '$150'],
                            ],
                        ],
                        'ru' => [
                            'title' => 'Зарафшан Хива',
                            'address' => 'Центр Хивы',
                            'description' => 'Современный отель с традиционным стилем.',
                            'amenities' => ['Бутик-дизайн', 'Терраса с панорамным видом', 'Уютный внутренний дворик', 'Завтрак шведский стол', 'Кондиционер'],
                            'rooms' => [
                                ['type' => 'Стандартный одноместный', 'spec' => 'Очаровательный номер с резным деревом', 'price' => '$70'],
                                ['type' => 'Двухместный номер', 'spec' => 'Традиционный стиль с современным комфортом', 'price' => '$95'],
                                ['type' => 'Делюкс Люкс', 'spec' => 'Люкс на верхнем этаже с панорамным видом', 'price' => '$150'],
                            ],
                        ],
                        'uz' => [
                            'title' => 'Zarafshan Xiva',
                            'address' => 'Xiva markazi',
                            'description' => 'Zamonaviy va milliy uslubdagi mehmonxona.',
                            'amenities' => ['Butik dizayn', 'Panoramali ayvon', 'Ichki hovli', 'Shved stoli nonushta', 'Konditsioner'],
                            'rooms' => [
                                ['type' => 'Standard Single', 'spec' => "O'ymakor yog'ochli shinam 1 kishilik xona", 'price' => '$70'],
                                ['type' => 'Double / Twin Bed', 'spec' => 'Zamonaviy qulayliklarga ega milliy xona', 'price' => '$95'],
                                ['type' => 'Deluxe Suite', 'spec' => 'Panoramali manzara va hashamatli lyuks xona', 'price' => '$150'],
                            ],
                        ],
                    ],
                ],
            ],

            'samarkand' => [
                [
                    'slug'   => 'registan-plaza',
                    'phone'  => '+998 91 234 56 11',
                    'stars'  => 4,
                    'price_from' => 120,
                    'email'  => 'registan-plaza@xorazmtour.uz',
                    'coords' => [39.6548, 66.9590],
                    'translations' => [
                        'en' => [
                            'title' => 'Registan Plaza',
                            'address' => 'Near Registan Square',
                            'description' => "Hotel close to Samarkand's main landmark.",
                            'amenities' => ['Grand Lobby lounge', 'Conference Meeting Rooms', 'Fitness Gym Center', 'High-speed WiFi', 'Fine dining Restaurant'],
                            'rooms' => [
                                ['type' => 'Business Comfort Single', 'spec' => 'Spacious room with work desk', 'price' => '$120'],
                                ['type' => 'Deluxe Double', 'spec' => 'Premium room with king bed', 'price' => '$160'],
                                ['type' => 'Presidential Suite', 'spec' => 'Executive high-floor royal suite', 'price' => '$300'],
                            ],
                        ],
                        'ru' => [
                            'title' => 'Регистан Плаза',
                            'address' => 'Рядом с Регистаном',
                            'description' => 'Отель рядом с главной площадью.',
                            'amenities' => ['Гранд Лобби лаундж', 'Конференц-залы', 'Фитнес-центр', 'Скоростной Wi-Fi', 'Изысканный ресторан'],
                            'rooms' => [
                                ['type' => 'Бизнес Комфорт Одноместный', 'spec' => 'Просторный номер с рабочим столом', 'price' => '$120'],
                                ['type' => 'Делюкс Двухместный', 'spec' => 'Премиум номер с большой кроватью', 'price' => '$160'],
                                ['type' => 'Президентский Люкс', 'spec' => 'Представительский королевский люкс на верхнем этаже', 'price' => '$300'],
                            ],
                        ],
                        'uz' => [
                            'title' => 'Registan Plaza',
                            'address' => 'Registon maydoni yaqinida',
                            'description' => 'Asosiy diqqatga sazovor joyga yaqin mehmonxona.',
                            'amenities' => ['Keng vestibyul va bar', 'Konferens zallar', 'Fitnes sport zali', 'Tezkor WiFi', 'Milliy va Yevropa restorani'],
                            'rooms' => [
                                ['type' => 'Business Comfort Single', 'spec' => 'Ish stoli bilan jihozlangan keng xona', 'price' => '$120'],
                                ['type' => 'Deluxe Double', 'spec' => 'Katta qirollik karavotli premium xona', 'price' => '$160'],
                                ['type' => 'Presidential Suite', 'spec' => 'Eng yuqori qavatdagi qirollik lyuks xonasi', 'price' => '$300'],
                            ],
                        ],
                    ],
                ],
                [
                    'slug'   => 'emirhan-hotel',
                    'phone'  => '+998 91 234 56 12',
                    'stars'  => 4,
                    'price_from' => 90,
                    'email'  => 'emirhan@xorazmtour.uz',
                    'coords' => [39.6561, 66.9622],
                    'translations' => [
                        'en' => [
                            'title' => 'Emirhan Hotel',
                            'address' => 'Samarkand old town',
                            'description' => 'Boutique hotel with eastern atmosphere.',
                            'amenities' => ['Eastern Palace architecture', 'Swimming Pool', 'Gourmet restaurant', 'Complimentary parking', 'Free high-speed WiFi'],
                            'rooms' => [
                                ['type' => 'Comfort Single', 'spec' => 'Elegant room in pastel colors', 'price' => '$90'],
                                ['type' => 'Superior Double', 'spec' => 'Carved gold-leaf details, spacious stay', 'price' => '$130'],
                                ['type' => 'Royal Suite', 'spec' => 'Palace-style luxury suite', 'price' => '$220'],
                            ],
                        ],
                        'ru' => [
                            'title' => 'Отель Эмирхан',
                            'address' => 'Старый город Самарканда',
                            'description' => 'Бутик-отель с восточной атмосферой.',
                            'amenities' => ['Архитектура восточного дворца', 'Бассейн', 'Ресторан изысканной кухни', 'Бесплатная парковка', 'Скоростной Wi-Fi'],
                            'rooms' => [
                                ['type' => 'Комфорт Одноместный', 'spec' => 'Элегантный номер в пастельных тонах', 'price' => '$90'],
                                ['type' => 'Супериор Двухместный', 'spec' => 'Резные детали из сусального золота, простор', 'price' => '$130'],
                                ['type' => 'Королевский Люкс', 'spec' => 'Роскошный люкс в дворцовом стиле', 'price' => '$220'],
                            ],
                        ],
                        'uz' => [
                            'title' => 'Emirhan Mehmonxonasi',
                            'address' => 'Samarqand eski shahri',
                            'description' => 'Sharqona muhitdagi butik mehmonxona.',
                            'amenities' => ['Sharqona saroy uslubidagi dizayn', 'Suzish havzasi', 'Restoran', 'Bepul avtoturargoh', 'Tezkor WiFi'],
                            'rooms' => [
                                ['type' => 'Comfort Single', 'spec' => 'Yumshoq ranglardagi shinam xona', 'price' => '$90'],
                                ['type' => 'Superior Double', 'spec' => 'Oltin suvi yugurtirilgan naqshli keng xona', 'price' => '$130'],
                                ['type' => 'Royal Suite', 'spec' => 'Qirol saroyi uslubidagi hashamatli lyuks', 'price' => '$220'],
                            ],
                        ],
                    ],
                ],
                [
                    'slug'   => 'silk-road-empire',
                    'phone'  => '+998 91 234 56 13',
                    'stars'  => 5,
                    'price_from' => 110,
                    'email'  => 'silkroad-empire@xorazmtour.uz',
                    'coords' => [39.6530, 66.9575],
                    'translations' => [
                        'en' => [
                            'title' => 'Silk Road Empire',
                            'address' => 'City center',
                            'description' => 'Luxury hotel inspired by Silk Road history.',
                            'amenities' => ['Luxury wellness spa', 'Historical theme', 'Complimentary WiFi', 'Bar lounge', 'Premium Airport Transfer'],
                            'rooms' => [
                                ['type' => 'Imperial Single', 'spec' => 'Silk road themed luxury single room', 'price' => '$110'],
                                ['type' => 'Imperial Double', 'spec' => 'Authentic caravan style premium comfort', 'price' => '$150'],
                                ['type' => 'Emperor Suite', 'spec' => 'Grand suite with historical antiquities', 'price' => '$280'],
                            ],
                        ],
                        'ru' => [
                            'title' => 'Шелковый Путь Империя',
                            'address' => 'Центр города',
                            'description' => 'Роскошный отель в стиле Шелкового пути.',
                            'amenities' => ['Роскошный велнес-спа', 'Историческая тематика', 'Бесплатный Wi-Fi', 'Бар-лаундж', 'Трансфер премиум-класса'],
                            'rooms' => [
                                ['type' => 'Императорский Одноместный', 'spec' => 'Роскошный номер в стиле Шелкового пути', 'price' => '$110'],
                                ['type' => 'Императорский Двухместный', 'spec' => 'Аутентичный стиль караван-сарая', 'price' => '$150'],
                                ['type' => 'Императорский Люкс', 'spec' => 'Великолепный люкс с историческим антиквариатом', 'price' => '$280'],
                            ],
                        ],
                        'uz' => [
                            'title' => 'Silk Road Empire',
                            'address' => 'Shahar markazi',
                            'description' => 'Ipak yo‘li ruhidagi hashamatli mehmonxona.',
                            'amenities' => ["Hashamatli sog'lomlashtirish spa", "Ipak yo'li mavzusidagi dizayn", 'Bepul WiFi', 'Bar lounge', 'Premium transfer xizmati'],
                            'rooms' => [
                                ['type' => 'Imperial Single', 'spec' => "Ipak yo'li uslubidagi hashamatli 1 kishilik xona", 'price' => '$110'],
                                ['type' => 'Imperial Double', 'spec' => 'Karvonsaroy uslubidagi premium qulaylik', 'price' => '$150'],
                                ['type' => 'Emperor Suite', 'spec' => 'Qadimiy eksponatlar bilan jihozlangan keng lyuks', 'price' => '$280'],
                            ],
                        ],
                    ],
                ],
            ],

            'bukhara' => [
                [
                    'slug'   => 'lyabi-house',
                    'phone'  => '+998 91 234 56 21',
                    'stars'  => 3,
                    'price_from' => 50,
                    'email'  => 'lyabi-house@xorazmtour.uz',
                    'coords' => [39.7742, 64.4278],
                    'translations' => [
                        'en' => [
                            'title' => 'Lyabi House',
                            'address' => 'Lyabi-Hauz area',
                            'description' => 'Traditional guest house in old Bukhara.',
                            'amenities' => ['Traditional architecture', 'Courtyard tea drinking', 'Free WiFi', 'Modern air conditioning'],
                            'rooms' => [
                                ['type' => 'Budget Single', 'spec' => 'Cozy room looking at the courtyard', 'price' => '$50'],
                                ['type' => 'Standard Double', 'spec' => 'Comfortable beds with local fabrics', 'price' => '$70'],
                                ['type' => 'Bukhara Family Room', 'spec' => 'Spacious national style family stay', 'price' => '$100'],
                            ],
                        ],
                        'ru' => [
                            'title' => 'Ляби Хауз',
                            'address' => 'Район Ляби-Хауз',
                            'description' => 'Традиционный гостевой дом.',
                            'amenities' => ['Традиционная архитектура', 'Чай во внутреннем дворике', 'Бесплатный Wi-Fi', 'Кондиционер'],
                            'rooms' => [
                                ['type' => 'Бюджетный Одноместный', 'spec' => 'Уютный номер с видом на дворик', 'price' => '$50'],
                                ['type' => 'Стандартный Двухместный', 'spec' => 'Удобные кровати с местным текстилем', 'price' => '$70'],
                                ['type' => 'Семейный номер Бухара', 'spec' => 'Просторный номер для семьи в национальном стиле', 'price' => '$100'],
                            ],
                        ],
                        'uz' => [
                            'title' => 'Lyabi House',
                            'address' => 'Lyabi-Hauz hududi',
                            'description' => 'An’anaviy mehmon uyi.',
                            'amenities' => ["Milliy me'morchilik", "Shinam hovlida choyxo'rlik", 'Bepul WiFi', 'Konditsioner'],
                            'rooms' => [
                                ['type' => 'Budget Single', 'spec' => 'Hovliga qaragan shinam bir kishilik xona', 'price' => '$50'],
                                ['type' => 'Standard Double', 'spec' => 'Milliy matolar bilan bezatilgan shinam xona', 'price' => '$70'],
                                ['type' => 'Buxoro oilaviy xonasi', 'spec' => 'Milliy uslubdagi keng oilaviy xona', 'price' => '$100'],
                            ],
                        ],
                    ],
                ],
                [
                    'slug'   => 'komil-hotel',
                    'phone'  => '+998 91 234 56 22',
                    'stars'  => 4,
                    'price_from' => 60,
                    'email'  => 'komil-hotel@xorazmtour.uz',
                    'coords' => [39.7755, 64.4291],
                    'translations' => [
                        'en' => [
                            'title' => 'Komil Hotel',
                            'address' => 'Old city',
                            'description' => 'Family-run hotel with national decor.',
                            'amenities' => ['19th-century house setting', 'Ganch carving decorations', 'On-site Restaurant', 'Free WiFi'],
                            'rooms' => [
                                ['type' => 'Standard Single', 'spec' => 'Beautiful wood carved single stay', 'price' => '$60'],
                                ['type' => 'Traditional Twin', 'spec' => 'Authentic decoration room with two beds', 'price' => '$80'],
                                ['type' => 'Zal-Luxury Suite', 'spec' => 'Spectacular room with original 19th-century paintings', 'price' => '$130'],
                            ],
                        ],
                        'ru' => [
                            'title' => 'Отель Комил',
                            'address' => 'Старый город',
                            'description' => 'Семейный отель с национальным интерьером.',
                            'amenities' => ['Дом 19 века', 'Настенная резьба по ганчу', 'Ресторан', 'Бесплатный Wi-Fi'],
                            'rooms' => [
                                ['type' => 'Стандартный Одноместный', 'spec' => 'Красивый номер с резьбой по дереву', 'price' => '$60'],
                                ['type' => 'Традиционный Двухместный', 'spec' => 'Аутентичный номер с двумя кроватями', 'price' => '$80'],
                                ['type' => 'Зал-Люкс', 'spec' => 'Впечатляющий люкс с оригинальной росписью 19 века', 'price' => '$130'],
                            ],
                        ],
                        'uz' => [
                            'title' => 'Komil Mehmonxonasi',
                            'address' => 'Eski shahar',
                            'description' => 'Milliy bezakdagi oilaviy mehmonxona.',
                            'amenities' => ['19-asrga oid xonadon muhiti', 'Ganchkorlik bezaklari', 'Restoran', 'Bepul WiFi'],
                            'rooms' => [
                                ['type' => 'Standard Single', 'spec' => "O'ymakor yog'och bezakli shinam 1 kishilik xona", 'price' => '$60'],
                                ['type' => 'Traditional Twin', 'spec' => 'Milliy naqshlar bilan bezatilgan 2 kishilik xona', 'price' => '$80'],
                                ['type' => 'Zal-Luxury Suite', 'spec' => '19-asrga oid devoriy rasmlarga ega hashamatli lyuks', 'price' => '$130'],
                            ],
                        ],
                    ],
                ],
                [
                    'slug'   => 'amulett-hotel',
                    'phone'  => '+998 91 234 56 23',
                    'stars'  => 4,
                    'price_from' => 75,
                    'email'  => 'amulett@xorazmtour.uz',
                    'coords' => [39.7738, 64.4269],
                    'translations' => [
                        'en' => [
                            'title' => 'Amulett Hotel',
                            'address' => 'Historic center',
                            'description' => 'Boutique hotel in a madrasa building.',
                            'amenities' => ['Madrasa build structure', 'Historical Library', 'Courtyard Breakfast', 'WiFi connection', 'Souvenir craft shop'],
                            'rooms' => [
                                ['type' => 'Standard Single', 'spec' => 'Cell room with cozy brick archways', 'price' => '$75'],
                                ['type' => 'Double / Twin Bed', 'spec' => 'Warm historical atmosphere room', 'price' => '$95'],
                                ['type' => 'Vazir Suite', 'spec' => 'Spacious historic suite cell', 'price' => '$150'],
                            ],
                        ],
                        'ru' => [
                            'title' => 'Отель Амулет',
                            'address' => 'Исторический центр',
                            'description' => 'Бутик-отель в здании медресе.',
                            'amenities' => ['Здание медресе', 'Историческая библиотека', 'Завтрак во дворике', 'Wi-Fi подключение', 'Сувенирный магазин'],
                            'rooms' => [
                                ['type' => 'Стандартный Одноместный', 'spec' => 'Келья с уютными кирпичными арками', 'price' => '$75'],
                                ['type' => 'Двухместный номер', 'spec' => 'Теплая комната с исторической атмосферой', 'price' => '$95'],
                                ['type' => 'Вазир Люкс', 'spec' => 'Просторная историческая келья-люкс', 'price' => '$150'],
                            ],
                        ],
                        'uz' => [
                            'title' => 'Amulett Mehmonxonasi',
                            'address' => 'Tarixiy markaz',
                            'description' => 'Madrasada joylashgan butik mehmonxona.',
                            'amenities' => ['Qadimiy madrasa binosi', 'Kutubxona', 'Hovlida milliy nonushta', 'WiFi aloqasi', "Suvenirlar do'koni"],
                            'rooms' => [
                                ['type' => 'Standard Single', 'spec' => "G'ishtin gumbazli shinam hujra xona", 'price' => '$75'],
                                ['type' => 'Double / Twin Bed', 'spec' => 'Tarixiy iliq muhitga ega shinam xona', 'price' => '$95'],
                                ['type' => 'Vazir Suite', 'spec' => 'Keng va tarixiy premium hujra', 'price' => '$150'],
                            ],
                        ],
                    ],
                ],
            ],

            'tashkent' => [
                [
                    'slug'   => 'hyatt-regency',
                    'phone'  => '+998 71 234 56 31',
                    'stars'  => 5,
                    'price_from' => 180,
                    'email'  => 'tashkent-regency@hyatt-xorazmtour.uz',
                    'coords' => [41.3111, 69.2797],
                    'translations' => [
                        'en' => [
                            'title' => 'Hyatt Regency Tashkent',
                            'address' => 'City center',
                            'description' => 'Luxury international hotel.',
                            'amenities' => ['Indoor Swimming Pool', 'Luxury spa wellness', 'Modern Fitness Center', 'Meeting Conference rooms', 'High-speed WiFi'],
                            'rooms' => [
                                ['type' => 'King Room', 'spec' => 'Modern 1 King Bed room with city views', 'price' => '$180'],
                                ['type' => 'Club Access Double', 'spec' => 'Club lounge entry, premium room', 'price' => '$230'],
                                ['type' => 'Executive Suite', 'spec' => 'Extra large panoramic suite with living area', 'price' => '$400'],
                            ],
                        ],
                        'ru' => [
                            'title' => 'Хаятт Ридженси Ташкент',
                            'address' => 'Центр города',
                            'description' => 'Роскошный международный отель.',
                            'amenities' => ['Крытый бассейн', 'Роскошный спа-центр', 'Современный фитнес-центр', 'Конференц-залы', 'Скоростной Wi-Fi'],
                            'rooms' => [
                                ['type' => 'Королевский номер', 'spec' => 'Современный номер с кроватью King и видом на город', 'price' => '$180'],
                                ['type' => 'Клубный двухместный', 'spec' => 'Доступ в клубный лаундж, премиум-номер', 'price' => '$230'],
                                ['type' => 'Представительский Люкс', 'spec' => 'Очень большой панорамный люкс с гостиной', 'price' => '$400'],
                            ],
                        ],
                        'uz' => [
                            'title' => 'Hyatt Regency Toshkent',
                            'address' => 'Shahar markazi',
                            'description' => 'Xalqaro hashamatli mehmonxona.',
                            'amenities' => ['Yopiq hovuz', 'Hashamatli Spa majmuasi', 'Zamonaviy fitnes markazi', 'Majlislar zali', 'Tezkor WiFi'],
                            'rooms' => [
                                ['type' => 'King Room', 'spec' => 'Shahar manzarasiga ega shinam 1 qirollik karavotli xona', 'price' => '$180'],
                                ['type' => 'Club Access Double', 'spec' => 'Klub zaliga kirish huquqiga ega premium xona', 'price' => '$230'],
                                ['type' => 'Executive Suite', 'spec' => 'Keng mehmonxonali panoramali hashamatli lyuks', 'price' => '$400'],
                            ],
                        ],
                    ],
                ],
                [
                    'slug'   => 'lotte-hotel',
                    'phone'  => '+998 71 234 56 32',
                    'stars'  => 4,
                    'price_from' => 130,
                    'email'  => 'lotte-tashkent@lotte-xorazmtour.uz',
                    'coords' => [41.2999, 69.2405],
                    'translations' => [
                        'en' => [
                            'title' => 'Lotte City Hotel',
                            'address' => 'Business district',
                            'description' => 'Modern hotel for business travelers.',
                            'amenities' => ['Historic facade architecture', 'Outdoor garden pool', 'Spa salon', 'Fitness room', 'Executive business Lounge'],
                            'rooms' => [
                                ['type' => 'Superior Single', 'spec' => 'Charming rooms with classical decor', 'price' => '$130'],
                                ['type' => 'Deluxe Twin', 'spec' => 'Spacious double bed room looking at the opera house', 'price' => '$170'],
                                ['type' => 'Premier Suite', 'spec' => 'Luxury high-end suite with classic details', 'price' => '$320'],
                            ],
                        ],
                        'ru' => [
                            'title' => 'Лотте Сити Отель',
                            'address' => 'Деловой район',
                            'description' => 'Современный бизнес-отель.',
                            'amenities' => ['Исторический фасад', 'Открытый бассейн в саду', 'Спа-салон', 'Фитнес-зал', 'Представительский бизнес-лаундж'],
                            'rooms' => [
                                ['type' => 'Супериор Одноместный', 'spec' => 'Очаровательные номера в классическом декоре', 'price' => '$130'],
                                ['type' => 'Делюкс Двухместный', 'spec' => 'Просторный номер с видом на оперный театр', 'price' => '$170'],
                                ['type' => 'Премьер Люкс', 'spec' => 'Роскошный люкс высокого класса с классическими деталями', 'price' => '$320'],
                            ],
                        ],
                        'uz' => [
                            'title' => 'Lotte City Mehmonxonasi',
                            'address' => 'Biznes hududi',
                            'description' => 'Biznes sayohatchilar uchun mehmonxona.',
                            'amenities' => ['Tarixiy fasad', "Bog' ichidagi ochiq hovuz", 'Spa saloni', 'Fitnes zal', 'Biznes zal'],
                            'rooms' => [
                                ['type' => 'Superior Single', 'spec' => 'Klassik bezakli shinam bir kishilik xona', 'price' => '$130'],
                                ['type' => 'Deluxe Twin', 'spec' => 'Opera teatriga qaragan keng ikki kishilik xona', 'price' => '$170'],
                                ['type' => 'Premier Suite', 'spec' => 'Klassik uslubdagi hashamatli eng yuqori toifali lyuks', 'price' => '$320'],
                            ],
                        ],
                    ],
                ],
                [
                    'slug'   => 'city-palace',
                    'phone'  => '+998 71 234 56 33',
                    'stars'  => 4,
                    'price_from' => 115,
                    'email'  => 'city-palace@xorazmtour.uz',
                    'coords' => [41.3150, 69.2850],
                    'translations' => [
                        'en' => [
                            'title' => 'City Palace Hotel',
                            'address' => 'Amir Temur street',
                            'description' => 'Classic hotel with large rooms.',
                            'amenities' => ['Indoor & Outdoor Pools', 'Tennis sport court', 'Gourmet Restaurant', 'Complimentary WiFi', 'Business Center'],
                            'rooms' => [
                                ['type' => 'Standard Single', 'spec' => 'Cozy comfortable single room', 'price' => '$115'],
                                ['type' => 'Comfort Double / Twin', 'spec' => 'Spacious room with modern details', 'price' => '$150'],
                                ['type' => 'Presidential Suite', 'spec' => 'Luxury high floor suite with royal services', 'price' => '$290'],
                            ],
                        ],
                        'ru' => [
                            'title' => 'Сити Палас Отель',
                            'address' => 'Улица Амира Темура',
                            'description' => 'Классический отель с просторными номерами.',
                            'amenities' => ['Крытый и открытый бассейны', 'Теннисный корт', 'Ресторан изысканной кухни', 'Бесплатный Wi-Fi', 'Бизнес-центр'],
                            'rooms' => [
                                ['type' => 'Стандартный Одноместный', 'spec' => 'Уютный комфортабельный номер', 'price' => '$115'],
                                ['type' => 'Комфорт Двухместный', 'spec' => 'Просторный номер с современными деталями', 'price' => '$150'],
                                ['type' => 'Президентский Люкс', 'spec' => 'Роскошный люкс на высоком этаже с королевским обслуживанием', 'price' => '$290'],
                            ],
                        ],
                        'uz' => [
                            'title' => 'City Palace Mehmonxonasi',
                            'address' => 'Amir Temur ko‘chasi',
                            'description' => 'Keng xonali klassik mehmonxona.',
                            'amenities' => ['Yopiq va ochiq hovuzlar', 'Tennis korti', 'Restoran', 'Bepul WiFi', 'Biznes markazi'],
                            'rooms' => [
                                ['type' => 'Standard Single', 'spec' => 'Klassik va qulay bir kishilik xona', 'price' => '$115'],
                                ['type' => 'Comfort Double / Twin', 'spec' => 'Zamonaviy jihozlangan keng ikki kishilik xona', 'price' => '$150'],
                                ['type' => 'Presidential Suite', 'spec' => 'Hashamatli va qirollik xizmatiga ega keng lyuks', 'price' => '$290'],
                            ],
                        ],
                    ],
                ],
            ],
        ];

        foreach ($hotels as $citySlug => $cityHotels) {
            $city = City::where('slug', $citySlug)->first();

            foreach ($cityHotels as $hotelData) {
                $hotel = Hotel::updateOrCreate(
                    ['slug' => $hotelData['slug']],
                    [
                        'city_id'      => $city?->id,
                        'status'       => true,
                        'phone_number' => $hotelData['phone'],
                        'stars'        => $hotelData['stars'],
                        'price_from'   => $hotelData['price_from'],
                        'email'        => $hotelData['email'],
                        'latitude'     => $hotelData['coords'][0],
                        'longitude'    => $hotelData['coords'][1],
                    ]
                );

                foreach ($hotelData['translations'] as $locale => $trans) {
                    HotelTranslation::updateOrCreate(
                        ['hotel_id' => $hotel->id, 'locale' => $locale],
                        [
                            'title'       => $trans['title'],
                            'address'     => $trans['address'],
                            'description' => $trans['description'],
                            'amenities'   => $trans['amenities'],
                            'rooms'       => $trans['rooms'],
                        ]
                    );
                }
            }
        }
    }
}
