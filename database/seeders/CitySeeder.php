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
                    'en' => ['Khiva', 'Ancient city and open-air museum of Central Asia.'],
                    'ru' => ['Хива', 'Древний город и музей под открытым небом.'],
                    'uz' => ['Xiva', 'Markaziy Osiyodagi qadimiy ochiq osmon ostidagi muzey shahar.'],
                ],
            ],
            'samarkand' => [
                'coords' => [39.6542, 66.9597],
                'translations' => [
                    'en' => ['Samarkand', 'Historic Silk Road city with rich architecture.'],
                    'ru' => ['Самарканд', 'Исторический город Великого Шелкового пути.'],
                    'uz' => ['Samarqand', 'Buyuk Ipak yo‘lining tarixiy shahri.'],
                ],
            ],
            'bukhara' => [
                'coords' => [39.7747, 64.4286],
                'translations' => [
                    'en' => ['Bukhara', 'Well-preserved medieval city of Uzbekistan.'],
                    'ru' => ['Бухара', 'Хорошо сохранившийся средневековый город.'],
                    'uz' => ['Buxoro', 'Yaxshi saqlangan o‘rta asr shahri.'],
                ],
            ],
            'tashkent' => [
                'coords' => [41.2995, 69.2401],
                'translations' => [
                    'en' => ['Tashkent', 'Capital and largest city of Uzbekistan.'],
                    'ru' => ['Ташкент', 'Столица и крупнейший город Узбекистана.'],
                    'uz' => ['Toshkent', 'O‘zbekistonning poytaxti va eng yirik shahri.'],
                ],
            ],
        ];

        foreach ($cities as $slug => $data) {
            $city = City::create([
                'slug'      => $slug,
                'status'    => true,
                'latitude'  => $data['coords'][0],
                'longitude' => $data['coords'][1],
            ]);

            foreach ($data['translations'] as $locale => [$name, $desc]) {
                CityTranslation::create([
                    'city_id'     => $city->id,
                    'locale'      => $locale,
                    'name'        => $name,
                    'description' => $desc,
                ]);
            }
        }
    }
}
