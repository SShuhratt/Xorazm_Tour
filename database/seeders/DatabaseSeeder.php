<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $adminName = config('auth.admin.name');
        $adminEmail = config('auth.admin.email');
        $adminPassword = config('auth.admin.password');

        if (! empty($adminEmail) && ! empty($adminPassword)) {
            $admin = User::updateOrCreate(
                ['email' => $adminEmail],
                [
                    'name'              => $adminName,
                    'password'          => Hash::make($adminPassword),
                    'email_verified_at' => now(),
                ]
            );
            $admin->is_admin = true;
            $admin->save();
        } else {
            $this->command?->warn('Skipping admin user creation: ADMIN_EMAIL or ADMIN_PASSWORD is not configured.');
        }

        $this->call(LanguageSeeder::class);
        $this->call(CitySeeder::class);
        $this->call(TransportSeeder::class);
        $this->call(HotelSeeder::class);
        $this->call(FestivalSeeder::class);
        $this->call(TourSeeder::class);
        $this->call(TourScheduleSeeder::class);
        $this->call(PostSeeder::class);
        $this->call(ImageSeeder::class);
        $this->call(DishSeeder::class);
    }
}
