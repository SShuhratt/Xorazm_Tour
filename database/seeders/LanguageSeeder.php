<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Language::firstOrCreate(['code' => 'uz'], ['name' => 'Uzbek']);
        Language::firstOrCreate(['code' => 'ru'], ['name' => 'Russian']);
        Language::firstOrCreate(['code' => 'en'], ['name' => 'English']);
    }
}
