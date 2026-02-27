<?php

namespace Database\Seeders;

use App\Models\Transport;
use App\Models\TransportTranslation;
use Illuminate\Database\Seeder;

class TransportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $transports = [
            'sedan' => [
                'capacity' => 3,
                'size' => [1.45, 1.75, 4.5],
                'translations' => [
                    'en' => ['Sedan', 'Comfortable car for individual tourists.'],
                    'ru' => ['Седан', 'Комфортный автомобиль для индивидуальных туристов.'],
                    'uz' => ['Sedan', 'Yakka sayohatchilar uchun qulay avtomobil.'],
                ],
            ],
            'minivan' => [
                'capacity' => 6,
                'size' => [1.9, 2.0, 5.2],
                'translations' => [
                    'en' => ['Minivan', 'Ideal for families and small groups.'],
                    'ru' => ['Минивэн', 'Идеален для семей и небольших групп.'],
                    'uz' => ['Miniven', 'Oilalar va kichik guruhlar uchun qulay.'],
                ],
            ],
            'minibus' => [
                'capacity' => 15,
                'size' => [2.6, 2.2, 6.7],
                'translations' => [
                    'en' => ['Minibus', 'Best choice for group tours.'],
                    'ru' => ['Микроавтобус', 'Лучший вариант для групповых туров.'],
                    'uz' => ['Mikroavtobus', 'Guruhli turlar uchun eng yaxshi tanlov.'],
                ],
            ],
            'tourist-bus' => [
                'capacity' => 45,
                'size' => [3.4, 2.5, 12.0],
                'translations' => [
                    'en' => ['Tourist Bus', 'Large bus for mass tourism routes.'],
                    'ru' => ['Туристический автобус', 'Большой автобус для массовых туров.'],
                    'uz' => ['Turistik avtobus', 'Katta sayohat guruhlari uchun.'],
                ],
            ],
            'afrosiyob-train' => [
                'capacity' => 300,
                'size' => [3.9, 3.2, 200.0],
                'translations' => [
                    'en' => ['High-speed Train', 'Afrosiyob train between major cities.'],
                    'ru' => ['Скоростной поезд', 'Поезд Афросиаб между городами.'],
                    'uz' => ['Tezyurar poyezd', 'Shaharlararo Afrosiyob poyezdi.'],
                ],
            ],
            'domestic-flight' => [
                'capacity' => 150,
                'size' => [12.0, 35.0, 37.0],
                'translations' => [
                    'en' => ['Domestic Flight', 'Fastest way between distant cities.'],
                    'ru' => ['Внутренний рейс', 'Самый быстрый способ передвижения.'],
                    'uz' => ['Ichki reys', 'Uzoq masofalar uchun tezkor transport.'],
                ],
            ],
        ];

        foreach ($transports as $slug => $data) {
            $transport = Transport::create([
                'slug' => $slug,
                'status' => true,
                'capacity' => $data['capacity'],
                'height' => $data['size'][0],
                'width' => $data['size'][1],
                'length' => $data['size'][2],
            ]);

            foreach ($data['translations'] as $locale => [$name, $desc]) {
                TransportTranslation::create([
                    'transport_id' => $transport->id,
                    'locale' => $locale,
                    'name' => $name,
                    'description' => $desc,
                ]);
            }
        }
    }
}
