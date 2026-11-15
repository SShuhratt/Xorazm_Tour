<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\CityTranslation;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            'khiva' => [
                'coords' => [41.3783, 60.3639],
                'translations' => [
                    'en' => [
                        'name' => 'Khiva',
                        'description' => 'Ancient city and open-air museum of Central Asia.',
                        'era' => 'X-XIX Centuries',
                        'heritage_status' => 'UNESCO World Heritage',
                        'recommended_time' => '2-3 Days Visit',
                        'highlights' => [
                            [
                                'id' => 1,
                                'title' => 'Kalta Minor Minaret',
                                'description' => 'Commissioned in 1851 by Muhammad Amin Khan, this massive minaret was intended to reach 70-80 meters, allowing one to see all the way to Bukhara. Construction halted at 29 meters after the Khan\'s death.',
                                'image' => '/XT_content/khiva/Photos/khiva1.jpg',
                                'time' => '1851',
                            ],
                            [
                                'id' => 2,
                                'title' => 'Islam Khodja Complex',
                                'description' => 'Built in 1908-1910, the complex features a minaret standing at 56.6 meters and a madrasah. It represents the peak of Khiva\'s late Islamic architectural traditions, offering a majestic view of the entire city.',
                                'image' => '/XT_content/khiva/Photos/khiva2.jpg',
                                'time' => '1910',
                            ],
                            [
                                'id' => 3,
                                'title' => 'Tosh Hovli Palace',
                                'description' => 'Constructed by Allah Kuli Khan in the 1830s, this labyrinthine palace contains over 150 rooms, featuring three main courtyards for reception, court, and harem, adorned with exquisite blue majolica.',
                                'image' => '/XT_content/khiva/Photos/khiva3.jpg',
                                'time' => '1830',
                            ],
                        ],
                    ],
                    'ru' => [
                        'name' => 'Хива',
                        'description' => 'Древний город и музей под открытым небом.',
                        'era' => 'X-XIX Века',
                        'heritage_status' => 'Наследие ЮНЕСКО',
                        'recommended_time' => '2-3 Дня',
                        'highlights' => [
                            [
                                'id' => 1,
                                'title' => 'Минарет Кальта-Минор',
                                'description' => 'Строительство этого массивного минарета началось в 1851 году по приказу Мухаммад Амин-хана. Планировалось достичь высоты 70-80 метров, но после его гибели стройка остановилась на высоте 29 метров.',
                                'image' => '/XT_content/khiva/Photos/khiva1.jpg',
                                'time' => '1851',
                            ],
                            [
                                'id' => 2,
                                'title' => 'Комплекс Ислам-Ходжа',
                                'description' => 'Построенный в 1908-1910 годах, этот комплекс включает в себя минарет высотой 56,6 метров и медресе, олицетворяя пик позднего исламского зодчества и открывая панорамный вид на весь город.',
                                'image' => '/XT_content/khiva/Photos/khiva2.jpg',
                                'time' => '1910',
                            ],
                            [
                                'id' => 3,
                                'title' => 'Дворец Таш-Хаули',
                                'description' => 'Построенный Аллакули-ханом в 1830-х годах, этот дворец-лабиринт содержит более 150 комнат с тремя главными дворами (для приемов, суда и гарема), украшенными изысканной голубой майоликой.',
                                'image' => '/XT_content/khiva/Photos/khiva3.jpg',
                                'time' => '1830',
                            ],
                        ],
                    ],
                    'uz' => [
                        'name' => 'Xiva',
                        'description' => 'Markaziy Osiyodagi qadimiy ochiq osmon ostidagi muzey shahar.',
                        'era' => 'X-XIX Asrlar',
                        'heritage_status' => 'YUNESKO Merosi',
                        'recommended_time' => '2-3 Kunlik Ziyorat',
                        'highlights' => [
                            [
                                'id' => 1,
                                'title' => 'Kalta Minor minorasi',
                                'description' => '1851-yilda Muhammad Aminxon tomonidan qurilishi boshlangan ushbu minoraning balandligi 70-80 metr bo\'lishi rejalashtirilgan edi. Xon vafotidan so\'ng qurilish 29 metrda to\'xtatilgan.',
                                'image' => '/XT_content/khiva/Photos/khiva1.jpg',
                                'time' => '1851',
                            ],
                            [
                                'id' => 2,
                                'title' => 'Islom Xo\'ja majmuasi',
                                'description' => '1908-1910 yillarda bunyod etilgan ushbu majmua 56.6 metrli minora va madrasani o\'z ichiga oladi. U Xiva me\'morchilik an\'analarining cho\'qqisi bo\'lib, butun shaharga go\'zal manzara ochadi.',
                                'image' => '/XT_content/khiva/Photos/khiva2.jpg',
                                'time' => '1910',
                            ],
                            [
                                'id' => 3,
                                'title' => 'Tosh Hovli saroyi',
                                'description' => '1830-yillarda Olloqulixon tomonidan qurilgan ushbu saroy 150 dan ortiq xonadan iborat bo\'lib, unda qabulxona, sud va haram uchun mo\'ljallangan hovlilar zangori koshinlar bilan bezatilgan.',
                                'image' => '/XT_content/khiva/Photos/khiva3.jpg',
                                'time' => '1830',
                            ],
                        ],
                    ],
                ],
            ],
            'samarkand' => [
                'coords' => [39.6542, 66.9597],
                'translations' => [
                    'en' => [
                        'name' => 'Samarkand',
                        'description' => 'Historic Silk Road city with rich architecture.',
                        'era' => 'XV-XVII Centuries',
                        'heritage_status' => 'UNESCO World Heritage',
                        'recommended_time' => '2-3 Days Visit',
                        'highlights' => [
                            [
                                'id' => 1,
                                'title' => 'Registan Square',
                                'description' => 'The majestic public square is the crown jewel of Central Asian architecture, featuring the Ulugh Beg, Sher-Dor, and Tilya-Kori madrasahs built between the 15th and 17th centuries.',
                                'image' => '/XT_content/samarkand/photos/samarkand2.jpg',
                                'time' => 'XV-XVII C.',
                            ],
                            [
                                'id' => 2,
                                'title' => 'Gur-e-Amir Mausoleum',
                                'description' => 'Known for its azure fluted dome, Gur-e-Amir serves as the final resting place of Timur (Tamerlane), his sons, and grandsons, including the astronomer Ulugh Beg.',
                                'image' => '/XT_content/samarkand/photos/samarkand6.jpg',
                                'time' => '1404',
                            ],
                            [
                                'id' => 3,
                                'title' => 'Shah-i-Zinda Ensemble',
                                'description' => 'A sacred necropolis dating from the 11th to 15th centuries, featuring stunning blue-and-turquoise mosaic tiles. It marks the legendary burial site of Kusam ibn Abbas.',
                                'image' => '/XT_content/khiva/Photos/khiva4.jpg',
                                'time' => 'XI-XV C.',
                            ],
                        ],
                    ],
                    'ru' => [
                        'name' => 'Самарканд',
                        'description' => 'Исторический город Великого Шелкового пути.',
                        'era' => 'XV-XVII Века',
                        'heritage_status' => 'Наследие ЮНЕСКО',
                        'recommended_time' => '2-3 Дня',
                        'highlights' => [
                            [
                                'id' => 1,
                                'title' => 'Площадь Регистан',
                                'description' => 'Эта величественная площадь — жемчужина среднеазиатской архитектуры, объединяющая медресе Улугбека, Шердор и Тилля-Кари, построенные в XV-XVII веках.',
                                'image' => '/XT_content/samarkand/photos/samarkand2.jpg',
                                'time' => 'XV-XVII вв.',
                            ],
                            [
                                'id' => 2,
                                'title' => 'Мавзолей Гур-Эмир',
                                'description' => 'Известный своим ребристым бирюзовым куполом, Гур-Эмир является усыпальницей великого завоевателя Амира Тимура (Тамерлана), его сыновей и внуков.',
                                'image' => '/XT_content/samarkand/photos/samarkand6.jpg',
                                'time' => '1404',
                            ],
                            [
                                'id' => 3,
                                'title' => 'Ансамбль Шахи-Зинда',
                                'description' => 'Священный некрополь XI-XV веков с потрясающей сине-голубой мозаикой, где, по преданию, похоронен двоюродный брат пророка Мухаммеда — Кусам ибн Аббас.',
                                'image' => '/XT_content/khiva/Photos/khiva4.jpg',
                                'time' => 'XI-XV вв.',
                            ],
                        ],
                    ],
                    'uz' => [
                        'name' => 'Samarqand',
                        'description' => 'Buyuk Ipak yo‘lining tarixiy shahri.',
                        'era' => 'XV-XVII Asrlar',
                        'heritage_status' => 'YUNESKO Merosi',
                        'recommended_time' => '2-3 Kunlik Ziyorat',
                        'highlights' => [
                            [
                                'id' => 1,
                                'title' => 'Registon maydoni',
                                'description' => 'Ushbu mahobatli maydon Markaziy Osiyo me\'morchiligining durdonasi bo\'lib, XV-XVII asrlarda qurilgan Ulug\'bek, Sherdor va Tillakori madrasalarini o\'z ichiga oladi.',
                                'image' => '/XT_content/samarkand/photos/samarkand2.jpg',
                                'time' => 'XV-XVII A.',
                            ],
                            [
                                'id' => 2,
                                'title' => 'Go\'ri Amir maqbarasi',
                                'description' => 'Zangori qaborgali gumbazi bilan mashhur bo\'lgan ushbu maqbarada buyuk sarkarda Amir Temur, uning o\'g\'illari va nabirasi Mirzo Ulug\'bek dafn etilgan.',
                                'image' => '/XT_content/samarkand/photos/samarkand6.jpg',
                                'time' => '1404',
                            ],
                            [
                                'id' => 3,
                                'title' => 'Shohi Zinda majmuasi',
                                'description' => 'XI-XV asrlarga oid muqaddas ziyoratgoh va maqbaralar majmuasi bo\'lib, zangori va feruza rang koshinlari kishini lol qoldiradi.',
                                'image' => '/XT_content/khiva/Photos/khiva4.jpg',
                                'time' => 'XI-XV A.',
                            ],
                        ],
                    ],
                ],
            ],
            'bukhara' => [
                'coords' => [39.7747, 64.4286],
                'translations' => [
                    'en' => [
                        'name' => 'Bukhara',
                        'description' => 'Well-preserved medieval city of Uzbekistan.',
                        'era' => 'V-XX Centuries',
                        'heritage_status' => 'UNESCO World Heritage',
                        'recommended_time' => '2-3 Days Visit',
                        'highlights' => [
                            [
                                'id' => 1,
                                'title' => 'Sitorai Mokhi-Khosa Palace',
                                'description' => 'The splendid summer palace of the last Emirs of Bukhara, blending traditional oriental architecture with European interior artistry, ornate mirrors, and royal gardens.',
                                'image' => '/XT_content/bukhara/photos/bukhara5.jpg',
                                'time' => '1912',
                            ],
                            [
                                'id' => 2,
                                'title' => 'Ark of Bukhara',
                                'description' => 'A monumental royal residence and fortress, the Ark was once home to the Emirs of Bukhara, housing palaces, temples, arsenals, and even a prison behind its high earthen walls.',
                                'image' => '/XT_content/bukhara/photos/bukhara1.jpg',
                                'time' => 'V C.',
                            ],
                            [
                                'id' => 3,
                                'title' => 'Chor Minor',
                                'description' => 'Built in 1807 by a wealthy Turkmen merchant, this unique structure features four turquoise-domed towers representing four major world religions or cardinal directions.',
                                'image' => '/XT_content/bukhara/photos/bukhara2.jpg',
                                'time' => '1807',
                            ],
                        ],
                    ],
                    'ru' => [
                        'name' => 'Бухара',
                        'description' => 'Хорошо сохранившийся средневековый город.',
                        'era' => 'V-XX Века',
                        'heritage_status' => 'Наследие ЮНЕСКО',
                        'recommended_time' => '2-3 Дня',
                        'highlights' => [
                            [
                                'id' => 1,
                                'title' => 'Дворец Ситораи Мохи-Хоса',
                                'description' => 'Великолепный летний дворец последних эмиров Бухары, сочетающий восточные традиции с европейским стилем, зеркальными залами и прекрасным садом.',
                                'image' => '/XT_content/bukhara/photos/bukhara5.jpg',
                                'time' => '1912',
                            ],
                            [
                                'id' => 2,
                                'title' => 'Арк Бухары',
                                'description' => 'Монументальная резиденция бухарских эмиров, за высокими глинобитными стенами которой располагавались дворцы, храмы, монетный двор и государственные учреждения.',
                                'image' => '/XT_content/bukhara/photos/bukhara1.jpg',
                                'time' => 'V в.',
                            ],
                            [
                                'id' => 3,
                                'title' => 'Чор-Минор',
                                'description' => 'Построенное в 1807 году богатым туркменским купцом, это уникальное здание украшено четырьмя бирюзовыми башнями-минаретами.',
                                'image' => '/XT_content/bukhara/photos/bukhara2.jpg',
                                'time' => '1807',
                            ],
                        ],
                    ],
                    'uz' => [
                        'name' => 'Buxoro',
                        'description' => 'Yaxshi saqlangan o‘rta asr shahri.',
                        'era' => 'V-XX Asrlar',
                        'heritage_status' => 'YUNESKO Merosi',
                        'recommended_time' => '2-3 Kunlik Ziyorat',
                        'highlights' => [
                            [
                                'id' => 1,
                                'title' => 'Sitorai Mohi-Xosa saroyi',
                                'description' => 'Buxoroning so\'nggi amirlarining yozgi qarorgohi. Sharqona nafis me\'morchilik va yevropacha hashamat uyg\'unlashgan noyob saroy majmuasi.',
                                'image' => '/XT_content/bukhara/photos/bukhara5.jpg',
                                'time' => '1912',
                            ],
                            [
                                'id' => 2,
                                'title' => 'Buxoro Arki',
                                'description' => 'Buxoro amirlarining qarorgohi bo\'lgan ushbu ko\'hna qal\'a devorlari ortida muzeylar, saroylar va tarixiy osori-atiqalar saqlanadi.',
                                'image' => '/XT_content/bukhara/photos/bukhara1.jpg',
                                'time' => 'V A.',
                            ],
                            [
                                'id' => 3,
                                'title' => 'Chor Minor darvozasi',
                                'description' => '1807-yilda badavlat turkman savdogari tomonidan qurilgan ushbu inshootning to\'rtta minorasi to\'rtta dunyo dinining ramziy bezaklarini o\'zida aks ettiradi.',
                                'image' => '/XT_content/bukhara/photos/bukhara2.jpg',
                                'time' => '1807',
                            ],
                        ],
                    ],
                ],
            ],
            'tashkent' => [
                'coords' => [41.2995, 69.2401],
                'translations' => [
                    'en' => [
                        'name' => 'Tashkent',
                        'description' => 'Capital and largest city of Uzbekistan.',
                        'era' => 'Modern & Ancient',
                        'heritage_status' => 'Capital City',
                        'recommended_time' => '1-2 Days Visit',
                        'highlights' => [
                            [
                                'id' => 1,
                                'title' => 'Hazrati Imam Complex',
                                'description' => 'This grand architectural complex houses the famous Uthman Quran (Muyi Muborak Madrasah), dating back to the 7th century, written on deerskin and stained with the blood of Caliph Uthman.',
                                'image' => '/XT_content/toshkent/photos/photo_2025-12-31_23-17-37.jpg',
                                'time' => 'VII C.',
                            ],
                            [
                                'id' => 2,
                                'title' => 'Chorsu Bazaar',
                                'description' => 'Operating for centuries on the Silk Road, this market is crowned by a giant blue dome. It is the perfect place to sample traditional Uzbek street food, spices, and crafts.',
                                'image' => '/XT_content/bukhara/photos/bukhara4.jpg',
                                'time' => 'XVI C.',
                            ],
                        ],
                    ],
                    'ru' => [
                        'name' => 'Ташкент',
                        'description' => 'Столица и крупнейший город Узбекистана.',
                        'era' => 'Современный и Древний',
                        'heritage_status' => 'Столица',
                        'recommended_time' => '1-2 Дня',
                        'highlights' => [
                            [
                                'id' => 1,
                                'title' => 'Комплекс Хазрет Имам',
                                'description' => 'В этом грандиозном архитектурном комплексе хранится знаменитый Коран Усмана (медресе Муйи Муборак), датируемый VII веком, написанный на оленьей коже.',
                                'image' => '/XT_content/toshkent/photos/photo_2025-12-31_23-17-37.jpg',
                                'time' => 'VII в.',
                            ],
                            [
                                'id' => 2,
                                'title' => 'Базар Чорсу',
                                'description' => 'Этот рынок, функционирующий на Шелковом пути на протяжении веков, увенчан гигантским синим куполом. Это идеальное место для дегустации специй и сладостей.',
                                'image' => '/XT_content/bukhara/photos/bukhara4.jpg',
                                'time' => 'XVI в.',
                            ],
                        ],
                    ],
                    'uz' => [
                        'name' => 'Toshkent',
                        'description' => 'O‘zbekistonning poytaxti va eng yirik shahri.',
                        'era' => 'Zamonaviy va Ko\'hna',
                        'heritage_status' => 'Poytaxt',
                        'recommended_time' => '1-2 Kunlik Ziyorat',
                        'highlights' => [
                            [
                                'id' => 1,
                                'title' => 'Hazrati Imom majmuasi',
                                'description' => 'Ushbu muhtasham majmuada dunyodagi eng qadimgi Qur\'oni Karim - Usmon Mus\'hafi (Muyi Muborak madrasasi) saqlanadi.',
                                'image' => '/XT_content/toshkent/photos/photo_2025-12-31_23-17-37.jpg',
                                'time' => 'VII A.',
                            ],
                            [
                                'id' => 2,
                                'title' => 'Chorsu bozori',
                                'description' => 'Asrlar davomida Ipak yo\'lida faoliyat ko\'rsatgan ushbu bozor o\'zining ko\'k gumbazi va sharqona muhiti, shirin mevalari hamda ziravorlari bilan mashhur.',
                                'image' => '/XT_content/bukhara/photos/bukhara4.jpg',
                                'time' => 'XVI A.',
                            ],
                        ],
                    ],
                ],
            ],
        ];

        foreach ($cities as $slug => $data) {
            $city = City::updateOrCreate(
                ['slug' => $slug],
                [
                    'status'    => true,
                    'latitude'  => $data['coords'][0],
                    'longitude' => $data['coords'][1],
                ]
            );

            foreach ($data['translations'] as $locale => $trans) {
                CityTranslation::updateOrCreate(
                    ['city_id' => $city->id, 'locale' => $locale],
                    [
                        'name'             => $trans['name'],
                        'description'      => $trans['description'],
                        'era'              => $trans['era'],
                        'heritage_status'  => $trans['heritage_status'],
                        'recommended_time' => $trans['recommended_time'],
                        'highlights'       => $trans['highlights'],
                    ]
                );
            }
        }
    }
}
