<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use App\Models\TourSchedule;
use App\Models\TourScheduleTranslation;

class TourScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $locales = ['en', 'ru', 'uz'];
        $tours = Tour::with('translations')->get();

        foreach ($tours as $tour) {
            $duration = $tour->translations
                ->where('locale', 'en')
                ->first()?->duration ?? 1;

            for ($day = 1; $day <= $duration; $day++) {

                $dayStart = 8 * 60;
                $dayEnd   = 18 * 60;
                $eventsCount = rand(2, 4);

                $timeSlots = [];
                for ($i = 0; $i < $eventsCount; $i++) {
                    // divide the remaining window roughly equally
                    $min = $dayStart + ($i * ($dayEnd - $dayStart) / $eventsCount);
                    $max = $dayStart + (($i + 1) * ($dayEnd - $dayStart) / $eventsCount) - 1;
                    $timeSlots[] = rand((int)$min, (int)$max);
                }


                sort($timeSlots);

                foreach ($timeSlots as $i => $minutes) {
                    $hour   = intdiv($minutes, 60);
                    $minute = $minutes % 60;
                    $time   = sprintf('%02d:%02d:00', $hour, $minute);

                    $schedule = TourSchedule::create([
                        'tour_id' => $tour->id,
                        'day' => $day,
                        'time' => $time,
                    ]);

                    foreach ($locales as $locale) {
                        $texts = $this->getEventTexts($day, $duration, $i + 1, $eventsCount, $locale);

                        TourScheduleTranslation::create([
                            'tour_schedule_id' => $schedule->id,
                            'locale' => $locale,
                            'title' => $texts['title'],
                            'description' => $texts['description'],
                        ]);
                    }
                }

            }
        }
    }

    private function getEventTexts(int $day, int $duration, int $eventNum, int $totalEvents, string $locale): array
    {
        // First event of the first day is always arrival
        if ($day === 1 && $eventNum === 1) {
            return [
                'title' => match($locale) {
                    'en' => 'Arrival',
                    'ru' => 'Прибытие',
                    'uz' => 'Kelish',
                },
                'description' => match($locale) {
                    'en' => 'Arrival and hotel check-in.',
                    'ru' => 'Прибытие и заселение в отель.',
                    'uz' => 'Kelish va mehmonxonaga joylashish.',
                }
            ];
        }

        if ($day === $duration && $eventNum === $totalEvents) {
            return [
                'title' => match($locale) {
                    'en' => 'Departure',
                    'ru' => 'Отъезд',
                    'uz' => 'Jo‘nab ketish',
                },
                'description' => match($locale) {
                    'en' => 'Free time and departure from the city.',
                    'ru' => 'Свободное время и отъезд.',
                    'uz' => 'Bo‘sh vaqt va jo‘nab ketish.',
                }
            ];
        }

        return [
            'title' => match($locale) {
                'en' => "Excursion #{$eventNum}",
                'ru' => "Экскурсия №{$eventNum}",
                'uz' => "Ekskursiya №{$eventNum}",
            },
            'description' => match($locale) {
                'en' => 'Guided tour or activity for this part of the day.',
                'ru' => 'Экскурсия или активность в этот период дня.',
                'uz' => 'Kun davomida ekskursiya yoki faoliyat.',
            }
        ];
    }
}
