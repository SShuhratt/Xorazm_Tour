<?php

namespace Database\Seeders;

use App\Models\Dish;
use App\Models\DishTranslation;
use App\Models\Image;
use Illuminate\Database\Seeder;

class DishSeeder extends Seeder
{
    public function run(): void
    {
        $dishes = [
            'xorazm' => [
                'origin_region' => 'Xorazm',
                'category' => 'Xamirli taom',
                'image' => '/XT_content/national-dishes/photo_2025-12-31_23-16-34.jpg',
                'translations' => [
                    'uz' => [
                        'name' => "Shivit-Osh (Xiva Lag'moni)",
                        'short_description' => "Shivit suvi qo'shib tayyorlangan yashil xamirdan tayyorlanadigan, o'ziga xos sous bilan tortiladigan qadimiy Xiva taomi.",
                        'description' => "Shivit-Osh — Xorazm vohasining, xususan Xivaning eng mashhur va o'ziga xos milliy taomlaridan biridir. Uning xamiri yangi uzilgan shivit suvi bilan qorilgani sababli yashil rangga kiradi. Ustiga go'shtli va sabzavotli maxsus sous hamda qatiq quyib tortiladi.",
                    ],
                    'en' => [
                        'name' => "Shivit-Osh (Khiva Dill Pasta)",
                        'short_description' => "An ancient green pasta dish made with fresh dill juice, served with a savory meat stew and dynamic yogurt sauce.",
                        'description' => "Shivit-Osh is one of the most famous and unique culinary masterpieces of the Khorezm oasis. Its dough is kneaded with fresh dill juice, giving it a vibrant green color and a fresh herbaceous aroma.",
                    ],
                    'ru' => [
                        'name' => "Шивит-Ош (Хорезмский Лагман)",
                        'short_description' => "Древнее блюдо Хивы, приготовленное из зеленого теста на основе укропного сока с мясным соусом.",
                        'description' => "Шивит-Ош — одна из самых известных гастрономических визитных карточек Хорезмского оазиса. Тесто замешивается на свежевыжатом соке укропа.",
                    ],
                ],
            ],
            'qoraqalpogiston' => [
                'origin_region' => "Qoraqalpog'iston",
                'category' => "Go'shtli va xamirli taom",
                'image' => 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
                'translations' => [
                    'uz' => [
                        'name' => "Jujeri Gurtik (Qoraqalpoq Beshbarmog'i)",
                        'short_description' => "Yassi to'rtburchak xamirlar ustiga maxsus pishirilgan kurka go'shti va piyozli qayla qo'shib tortiladigan milliy qoraqalpoq taomi.",
                        'description' => "Jujeri Gurtik — qoraqalpoq xalqining eng sevimli milliy taomidir. Bu taom odatda kurka go'shti bilan tayyorlanadi.",
                    ],
                    'en' => [
                        'name' => "Jujeri Gurtik (Karakalpak Beshbarmak)",
                        'short_description' => "Traditional Karakalpak dish featuring wide flat dough sheets topped with slow-boiled turkey and a rich onion broth.",
                        'description' => "Jujeri Gurtik is the cornerstone of Karakalpak national cuisine. It typically features turkey meat simmered for hours.",
                    ],
                    'ru' => [
                        'name' => "Жужери Гуртик (Каракалпакский Бешбармак)",
                        'short_description' => "Национальное каракалпакское блюдо из плоских пластин теста с отварной индейкой и луковым бульоном.",
                        'description' => "Жужери Гуртик — любимое традиционное блюдо каракалпаков. Готовится из мяса индейки, которое медленно варится до нежности.",
                    ],
                ],
            ],
            'tashkent' => [
                'origin_region' => 'Toshkent',
                'category' => 'Guruchli taom (Osh)',
                'image' => '/XT_content/national-dishes/photo_2025-12-31_23-16-31.jpg',
                'translations' => [
                    'uz' => [
                        'name' => "Toshkent To'y Palovi",
                        'short_description' => "O'zbekistonning ramzi bo'lgan, mayiz, no'xat, behi va kashnich urug'lari bilan boyitilgan klassik to'y palovi.",
                        'description' => "Toshkent to'y palovi o'zining oltin rang tusga egaligi, mayiz va no'xatning shirin va nordon uyg'unligi bilan mashhur.",
                    ],
                    'en' => [
                        'name' => "Tashkent Festive Plov",
                        'short_description' => "The legendary celebratory rice dish featuring sweet raisins, chickpeas, quince, tender meat, and quail eggs.",
                        'description' => "Toshkent Festive Plov is the crown jewel of Uzbek cuisine. Known for its golden-amber color, it balances rich flavors.",
                    ],
                    'ru' => [
                        'name' => "Ташкентский Свадебный Плов",
                        'short_description' => "Символ узбекской кухни с добавлением нута, изюма, айвы, казы и перепелиных яиц.",
                        'description' => "Ташкентский свадебный плов знаменит своим золотистым оттенком и кисло-сладким вкусом.",
                    ],
                ],
            ],
            'samarkand' => [
                'origin_region' => 'Samarqand',
                'category' => 'Guruchli taom (Osh)',
                'image' => '/XT_content/national-dishes/photo_2025-12-31_23-16-31 (2).jpg',
                'translations' => [
                    'uz' => [
                        'name' => "Samarqand Bosma Palovi",
                        'short_description' => "Qatlam-qatlam qilib tayyorlanadigan, guruchi oppoq va don-don bo'lib turadigan mashhur Samarqand oshi.",
                        'description' => "Samarqand oshi o'zining o'ziga xos pishirish texnologiyasi bilan ajralib turadi. Go'sht, piyoz, sabzi va guruch qatlam shaklida bosib pishiriladi.",
                    ],
                    'en' => [
                        'name' => "Samarkand Layered Plov",
                        'short_description' => "A distinct style of plov cooked in strict layers without stirring, leaving the rice white and fluffy.",
                        'description' => "Unlike other regional variations, Samarkand Plov is cooked in vertical layers.",
                    ],
                    'ru' => [
                        'name' => "Самаркандский Плов",
                        'short_description' => "Знаменитый слоеный плов, ингредиенты которого не перемешиваются при варке.",
                        'description' => "Самаркандский плов отличается уникальной технологией приготовления.",
                    ],
                ],
            ],
            'bukhara' => [
                'origin_region' => 'Buxoro',
                'category' => 'Xamirli pishiriq',
                'image' => '/XT_content/national-dishes/photo_2025-12-31_23-16-36.jpg',
                'translations' => [
                    'uz' => [
                        'name' => "Olot Somsasi",
                        'short_description' => "Yupqa xamirdan tayyorlanadigan, ichi nihoyatda sersuv va go'shtli bo'lgan o'ziga xos Buxoro somsasi.",
                        'description' => "Olot somsasi o'zining noodatiy tayyorlanish uslubi va shakli bilan mashhur.",
                    ],
                    'en' => [
                        'name' => "Alat Somsa",
                        'short_description' => "Thin, crispy dough pocket filled with minced beef and onions that steam into a rich, juicy broth inside.",
                        'description' => "Alat Somsa is legendary for its super-thin wrapper and juicy filling.",
                    ],
                    'ru' => [
                        'name' => "Алатская Самса",
                        'short_description' => "Особая бухарская самса из тонкого теста с сочной начинкой из мяса и лука с бульоном внутри.",
                        'description' => "Алатская самса славится своим хрустящим тонким тестом и сочной начинкой.",
                    ],
                ],
            ],
            'fergana' => [
                'origin_region' => "Farg'ona",
                'category' => 'Guruchli taom (Osh)',
                'image' => '/XT_content/national-dishes/photo_2025-12-31_23-16-38.jpg',
                'translations' => [
                    'uz' => [
                        'name' => "Devzira Palovi (Qora Palov)",
                        'short_description' => "Farg'onaning qizg'ish Devzira guruchidan, qo'y go'shti va zira bilan achchiq qilib tayyorlanadigan to'yimli oshi.",
                        'description' => "Devzira oshi — Farg'ona vodiysining faxri.",
                    ],
                    'en' => [
                        'name' => "Devzira Plov (Fergana Dark Plov)",
                        'short_description' => "Made with the indigenous reddish-brown Devzira rice, slow-cooked lamb, and pungent whole garlic bulbs.",
                        'description' => "Devzira Plov is the pride of the Fergana Valley.",
                    ],
                    'ru' => [
                        'name' => "Девзира Плов (Ферганский Темный Плов)",
                        'short_description' => "Сытный плов из красноватого ферганского риса Девзира с бараниной, зирой и чесноком.",
                        'description' => "Девзира плов — гордость Ферганской долины.",
                    ],
                ],
            ],
            'andijan' => [
                'origin_region' => 'Andijon',
                'category' => 'Qozon taomi',
                'image' => 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80',
                'translations' => [
                    'uz' => [
                        'name' => "Andijon Dimlamasi",
                        'short_description' => "Sabzavotlar va go'shtning o'z suvida, qozon qopqog'i mahkam yopilib dimlab pishiriladigan nihoyatda sersuv taomi.",
                        'description' => "Andijon dimlamasi — sabzavotlar va go'shtning eng tabiiy ta'mini saqlab qoluvchi ajoyib taomdir.",
                    ],
                    'en' => [
                        'name' => "Andijan Dimlama",
                        'short_description' => "A slow-cooked, juicy dish where meat and layered garden vegetables steam entirely in their own juices.",
                        'description' => "Andijan Dimlama is a masterpiece of rustic cooking.",
                    ],
                    'ru' => [
                        'name' => "Андижанская Димлама",
                        'short_description' => "Сочное блюдо из мяса и слоев овощей, томящееся в собственном соку под плотно закрытой крышкой.",
                        'description' => "Андижанская димлама — блюдо, сохраняющее естественный вкус сезонных овощей.",
                    ],
                ],
            ],
            'namangan' => [
                'origin_region' => 'Namangan',
                'category' => "Qovurma go'shtli taom",
                'image' => 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80',
                'translations' => [
                    'uz' => [
                        'name' => "Namangan Qozon Kabobi",
                        'short_description' => "Qozonda kartoshka bilan birga oltin rangda qovurilgan va dimlangan qo'y go'shtining ajoyib uyg'unligi.",
                        'description' => "Namangan qozon kabobi o'zining oddiyligi va ajoyib ta'mi bilan mashhur.",
                    ],
                    'en' => [
                        'name' => "Namangan Kazan Kabob",
                        'short_description' => "Succulent lamb chops and whole potatoes fried to a crisp golden crust, then steamed together in a kazan.",
                        'description' => "Namangan Kazan Kabob is celebrated for its crispy textures.",
                    ],
                    'ru' => [
                        'name' => "Наманганский Казан-Кабоб",
                        'short_description' => "Обжаренные до золотистой корочки ребра ягненка с цельным картофелем, томленые в казане.",
                        'description' => "Наманганский казан-кабоб ценится за хрустящую корочку.",
                    ],
                ],
            ],
            'kashkadarya' => [
                'origin_region' => 'Qashqadaryo',
                'category' => 'Tandir go\'sht',
                'image' => 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
                'translations' => [
                    'uz' => [
                        'name' => "Qashqadaryo Tandoor Kabobi",
                        'short_description' => "Archa shoxlari yordamida maxsus loy tandirda pishiriladigan, o'ziga xos xushbo'y va mayin go'shtli taom.",
                        'description' => "Qashqadaryo tandoor kabobi butun O'zbekistonda afsonaviy taom hisoblanadi.",
                    ],
                    'en' => [
                        'name' => "Kashkadarya Tandir Kabob",
                        'short_description' => "Legendary spit-roasted mutton cooked inside a clay oven, infused with wild juniper branches for a smoky forest aroma.",
                        'description' => "Kashkadarya Tandir Kabob is iconic.",
                    ],
                    'ru' => [
                        'name' => "Кашкадарьинский Тандыр-Кабоб",
                        'short_description' => "Легендарная баранина, запеченная в глиняном тандыре с хвоей горного арчи для неповторимого аромата.",
                        'description' => "Кашкадарьинский тандыр-кабоб — визитная карточка региона.",
                    ],
                ],
            ],
            'surkhandarya' => [
                'origin_region' => 'Surxondaryo',
                'category' => 'Yengil taom va salat',
                'image' => 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80',
                'translations' => [
                    'uz' => [
                        'name' => "Meva va Go'shtli Shakarob",
                        'short_description' => "Pishirilgan go'sht suvi, yangi uzilgan pomidor, piyoz va tog' giyohlari bilan tayyorlanadigan issiq va nordon Surxon taomi.",
                        'description' => "Surxondaryo shakarobi shunchaki salat emas, balki to'liq issiq taom hisoblanadi.",
                    ],
                    'en' => [
                        'name' => "Surkhandarya Shakarob",
                        'short_description' => "A hot, tangy dish made by mashing fresh tomatoes and onions directly into boiling meat broth, served with local bread.",
                        'description' => "Surkhandarya Shakarob defies the definition of a salad.",
                    ],
                    'ru' => [
                        'name' => "Сурхандарьинский Шакароб",
                        'short_description' => "Горячее пикантное блюдо из свежих томатов, лука и зелени, залитых кипящим бульоном с мясом.",
                        'description' => "Сурхандарьинский шакароб — это полноценное сытное блюдо.",
                    ],
                ],
            ],
            'jizzakh' => [
                'origin_region' => 'Jizzax',
                'category' => 'Ulkan xamirli pishiriq',
                'image' => 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=800&q=80',
                'translations' => [
                    'uz' => [
                        'name' => "Jizzax Somsasi",
                        'short_description' => "O'zining ulkan o'lchami, sergo'shtligi va sersuvligi bilan tanilgan mashhur Jizzax somsasi.",
                        'description' => "Jizzax somsasi — somsalarning podshohi hisoblanadi.",
                    ],
                    'en' => [
                        'name' => "Giant Jizzakh Somsa",
                        'short_description' => "A colossal puff pastry pie stuffed with hand-cut meat and onions, famous for its grand scale and rich gravy.",
                        'description' => "Jizzakh Somsa is the king of meat pastries.",
                    ],
                    'ru' => [
                        'name' => "Джизакская Самса",
                        'short_description' => "Огромная самса из слоеного теста с начинкой из рубленого мяса и лука, известная своими масштабами.",
                        'description' => "Джизакская самса — королева среди самсы.",
                    ],
                ],
            ],
            'syrdarya' => [
                'origin_region' => 'Sirdaryo',
                'category' => "Baliqli sho'rva",
                'image' => 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
                'translations' => [
                    'uz' => [
                        'name' => "Sirdaryo Baliq Sho'rvasi",
                        'short_description' => "Sirdaryoning yangi tutilgan baliqlaridan va sabzavotlardan tayyorlanadigan shifobaxsh sho'rva.",
                        'description' => "Sirdaryo baliq sho'rvasi daryo bo'yida yashovchi aholining sevimli taomidir.",
                    ],
                    'en' => [
                        'name' => "Syrdarya Fish Soup",
                        'short_description' => "A light, healthy soup brewed from fresh river fish, aromatic root vegetables, and wild herbs.",
                        'description' => "Syrdarya Fish Soup is a local delicacy tied to the banks of Central Asia's longest river.",
                    ],
                    'ru' => [
                        'name' => "Сырдарьинская Уха",
                        'short_description' => "Целебный прозрачный суп, сваренный из свежевыловленной речной рыбы с овощами и зеленью.",
                        'description' => "Сырдарьинский рыбный суп — излюбленное блюдо жителей Присирдарья.",
                    ],
                ],
            ],
            'navoi' => [
                'origin_region' => 'Navoiy',
                'category' => "Dimlama go'shtli taom",
                'image' => 'https://images.unsplash.com/photo-1603360946369-fa99d57eead2?w=800&q=80',
                'translations' => [
                    'uz' => [
                        'name' => "Navoiy Sahro Surbasi",
                        'short_description' => "Sahro sharoitida o'simliklar va qo'y go'shtini qum ostida yoki qozonda uzoq vaqt dimlab pishiriladigan qadimiy cho'l taomi.",
                        'description' => "Sahro surbasi — Qizilqum sahrosining chorvadorlari orasida mashhur bo'lgan cho'l taomidir.",
                    ],
                    'en' => [
                        'name' => "Navoiy Desert Surba",
                        'short_description' => "An ancient nomadic recipe where lamb is slow-cooked with wild sage and desert onions in a tightly sealed kazan.",
                        'description' => "Navoiy Desert Surba is a nomadic delicacy from the heart of the Kyzylkum Desert.",
                    ],
                    'ru' => [
                        'name' => "Навоийская Пустынная Сурба",
                        'short_description' => "Древнее блюдо кочевников из баранины, томленой в казане с диким луком и травами пустыни.",
                        'description' => "Навоийская сурба — традиционное блюдо пастухов пустыни Кызылкум.",
                    ],
                ],
            ],
        ];

        foreach ($dishes as $slug => $dishData) {
            $dish = Dish::firstOrCreate(
                ['slug' => $slug],
                [
                    'status' => true,
                    'origin_region' => $dishData['origin_region'],
                    'category' => $dishData['category'],
                ]
            );

            foreach (['uz', 'en', 'ru'] as $locale) {
                if (isset($dishData['translations'][$locale])) {
                    DishTranslation::updateOrCreate(
                        ['dish_id' => $dish->id, 'locale' => $locale],
                        [
                            'name' => $dishData['translations'][$locale]['name'],
                            'short_description' => $dishData['translations'][$locale]['short_description'],
                            'description' => $dishData['translations'][$locale]['description'],
                        ]
                    );
                }
            }

            if (!empty($dishData['image'])) {
                Image::firstOrCreate(
                    [
                        'imageable_type' => Dish::class,
                        'imageable_id' => $dish->id,
                        'path' => $dishData['image'],
                    ],
                    [
                        'is_main' => true,
                        'order' => 1,
                    ]
                );
            }
        }
    }
}
