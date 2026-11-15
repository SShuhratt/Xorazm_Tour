<?php

namespace Tests\Feature;

use App\Models\City;
use App\Models\Image;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_cannot_access_admin_crud_endpoints(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $this->actingAs($user)->get('/admin/cities')->assertForbidden();
        $this->actingAs($user)->get('/admin/tours')->assertForbidden();
        $this->actingAs($user)->get('/admin/bookings')->assertForbidden();
    }

    public function test_admin_can_create_city_and_clear_optional_translations_on_update(): void
    {
        Storage::fake('public');
        $admin = User::factory()->admin()->create();

        $storeResponse = $this->actingAs($admin)->post('/admin/cities', [
            'status' => true,
            'latitude' => 41.3775,
            'longitude' => 60.3594,
            'translations' => [
                'en' => [
                    'name' => 'Ichan Kala',
                    'description' => 'Historic walled inner town',
                    'era' => '18th Century',
                    'heritage_status' => 'UNESCO Site',
                    'recommended_time' => '2 Days',
                    'highlights' => [
                        ['name' => 'Kalta Minor', 'description' => 'Iconic turquoise minaret'],
                    ],
                ],
                'ru' => [
                    'name' => 'Ичан-Кала',
                    'description' => 'Исторический центр',
                ],
                'uz' => [
                    'name' => '',
                    'description' => '',
                ],
            ],
        ]);

        $storeResponse->assertRedirect('/admin/cities');
        $city = City::where('slug', 'ichan-kala')->firstOrFail();
        $this->assertDatabaseHas('city_translations', ['city_id' => $city->id, 'locale' => 'en', 'name' => 'Ichan Kala']);
        $this->assertDatabaseHas('city_translations', ['city_id' => $city->id, 'locale' => 'ru', 'name' => 'Ичан-Кала']);
        $this->assertDatabaseMissing('city_translations', ['city_id' => $city->id, 'locale' => 'uz']);

        // Clearing Russian title on update deletes the ru translation row cleanly
        $updateResponse = $this->actingAs($admin)->put("/admin/cities/{$city->id}", [
            'slug' => 'ichan-kala',
            'status' => true,
            'latitude' => 41.3775,
            'longitude' => 60.3594,
            'translations' => [
                'en' => [
                    'name' => 'Ichan Kala Updated',
                    'description' => 'Updated inner town',
                ],
                'ru' => [
                    'name' => '',
                    'description' => '',
                ],
            ],
        ]);

        $updateResponse->assertRedirect();
        $this->assertDatabaseHas('city_translations', ['city_id' => $city->id, 'locale' => 'en', 'name' => 'Ichan Kala Updated']);
        $this->assertDatabaseMissing('city_translations', ['city_id' => $city->id, 'locale' => 'ru']);
    }

    public function test_admin_tour_creation_generates_unique_slug_and_persists_category(): void
    {
        $admin = User::factory()->admin()->create();
        $city = City::create(['slug' => 'khiva', 'status' => true]);
        $city->translations()->create(['locale' => 'en', 'name' => 'Khiva', 'description' => 'City']);

        $payload = [
            'status' => true,
            'category' => 'adventure',
            'max_group_size' => 10,
            'cost' => 450,
            'city_ids' => [$city->id],
            'translations' => [
                'en' => [
                    'title' => 'Desert Fortresses Expedition',
                    'duration' => '3 Days',
                    'description' => 'Explore Kyzylkum fortresses',
                    'pricing_tiers' => [
                        ['group_size' => '2 - 4 people', 'price_per_person' => '500'],
                    ],
                ],
            ],
            'schedules' => [
                [
                    'day' => 1,
                    'time' => '09:00',
                    'translations' => [
                        'en' => ['title' => 'Ayaz Kala', 'description' => 'Morning departure'],
                    ],
                ],
            ],
        ];

        $this->actingAs($admin)->post('/admin/tours', $payload)->assertRedirect('/admin/tours');
        $this->actingAs($admin)->post('/admin/tours', $payload)->assertRedirect('/admin/tours');

        $this->assertDatabaseHas('tours', ['slug' => 'desert-fortresses-expedition', 'category' => 'adventure', 'max_group_size' => 10]);
        $this->assertDatabaseHas('tours', ['slug' => 'desert-fortresses-expedition-1', 'category' => 'adventure']);
        $this->assertCount(2, Tour::all());
    }

    public function test_image_upload_enforces_polymorphic_model_allowlist(): void
    {
        Storage::fake('public');
        $admin = User::factory()->admin()->create();
        $tinyPng = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=');
        $file = UploadedFile::fake()->createWithContent('photo.png', $tinyPng);

        $badResponse = $this->actingAs($admin)->postJson('/admin/images/upload', [
            'imageable_type' => User::class,
            'imageable_id' => $admin->id,
            'image' => $file,
        ]);
        $badResponse->assertStatus(422);

        $city = City::create(['slug' => 'urgench', 'status' => true]);
        $city->translations()->create(['locale' => 'en', 'name' => 'Urgench', 'description' => 'Capital']);

        $okResponse = $this->actingAs($admin)->postJson('/admin/images/upload', [
            'imageable_type' => City::class,
            'imageable_id' => $city->id,
            'image' => UploadedFile::fake()->createWithContent('urgench.png', $tinyPng),
        ]);
        $okResponse->assertRedirect();
        $this->assertDatabaseHas('images', [
            'imageable_type' => City::class,
            'imageable_id' => $city->id,
        ]);
        $img = Image::where('imageable_id', $city->id)->firstOrFail();
        Storage::disk('public')->assertExists($img->url);
    }
}
