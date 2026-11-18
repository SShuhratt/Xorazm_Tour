<?php

namespace Tests\Feature;

use App\Models\City;
use App\Models\Dish;
use App\Models\Festival;
use App\Models\Hotel;
use App\Models\Post;
use App\Models\Tour;
use App\Models\Transport;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicRoutesTest extends TestCase
{
    use RefreshDatabase;

    public function test_root_redirects_to_default_locale(): void
    {
        $this->get('/')->assertRedirect('/en');
    }

    public function test_public_localized_listing_and_static_pages_render(): void
    {
        $routes = [
            '/en',
            '/ru',
            '/uz',
            '/en/tours',
            '/en/cities',
            '/en/festivals',
            '/en/hotels',
            '/en/transports',
            '/en/dishes',
            '/en/about',
            '/en/contact',
            '/en/privacy',
            '/en/terms',
        ];

        foreach ($routes as $url) {
            $this->get($url)->assertOk();
        }
    }

    public function test_inactive_entities_return_404_on_public_show_routes(): void
    {
        $city = City::create(['slug' => 'inactive-city', 'status' => false]);
        $city->translations()->create(['locale' => 'en', 'name' => 'Inactive City', 'description' => 'Hidden']);

        $tour = Tour::create(['slug' => 'inactive-tour', 'status' => 'inactive', 'category' => 'cultural']);
        $tour->translations()->create(['locale' => 'en', 'title' => 'Inactive Tour', 'description' => 'Hidden']);

        $hotel = Hotel::create(['slug' => 'inactive-hotel', 'status' => false, 'city_id' => $city->id]);
        $hotel->translations()->create(['locale' => 'en', 'title' => 'Inactive Hotel', 'address' => '12 Heritage St', 'description' => 'Hidden']);

        $festival = Festival::create(['slug' => 'inactive-festival', 'status' => false, 'city_id' => $city->id]);
        $festival->translations()->create(['locale' => 'en', 'title' => 'Inactive Festival', 'description' => 'Hidden']);

        $transport = Transport::create(['slug' => 'inactive-bus', 'status' => false, 'capacity' => 10]);
        $transport->translations()->create(['locale' => 'en', 'name' => 'Inactive Bus', 'description' => 'Hidden']);

        $post = Post::create(['slug' => 'inactive-post', 'status' => false]);
        $post->translations()->create(['locale' => 'en', 'title' => 'Inactive Post', 'description' => 'Hidden']);

        $dish = Dish::create(['slug' => 'inactive-dish', 'status' => false]);
        $dish->translations()->create(['locale' => 'en', 'name' => 'Inactive Dish', 'description' => 'Hidden']);

        $this->get('/en/cities/inactive-city')->assertNotFound();
        $this->get('/en/tours/inactive-tour')->assertNotFound();
        $this->get('/en/hotels/inactive-hotel')->assertNotFound();
        $this->get('/en/festivals/inactive-festival')->assertNotFound();
        $this->get('/en/transports/inactive-bus')->assertNotFound();
        $this->get('/en/dishes/inactive-dish')->assertNotFound();
    }

    public function test_articles_section_and_admin_post_routes_are_disabled(): void
    {
        $post = Post::create(['slug' => 'hidden-story', 'status' => true]);
        $post->translations()->create(['locale' => 'en', 'title' => 'Hidden Story', 'description' => 'Disabled']);

        $this->get('/en/posts')->assertNotFound();
        $this->get('/ru/posts')->assertNotFound();
        $this->get('/uz/posts')->assertNotFound();
        $this->get('/en/posts/hidden-story')->assertNotFound();
        $this->get('/posts')->assertNotFound();

        $admin = User::factory()->admin()->create();
        $this->actingAs($admin)->get('/admin/posts')->assertNotFound();
        $this->actingAs($admin)->get('/admin/posts/create')->assertNotFound();

        $sitemap = $this->get('/sitemap.xml')->assertOk();
        $sitemap->assertDontSee('/posts', false);
    }

    public function test_active_entity_pages_and_dynamic_sitemap_work(): void
    {
        $city = City::create(['slug' => 'khiva', 'status' => true, 'latitude' => 41.3775, 'longitude' => 60.3594]);
        $city->translations()->create([
            'locale' => 'en',
            'name' => 'Khiva',
            'description' => 'Ancient Silk Road oasis',
            'era' => 'Ancient',
            'heritage_status' => 'UNESCO World Heritage Site',
        ]);

        $tour = Tour::create(['slug' => 'khiva-weekend', 'status' => 'active', 'category' => 'cultural', 'max_group_size' => 12]);
        $tour->translations()->create(['locale' => 'en', 'title' => 'Khiva Weekend', 'duration' => '2 Days', 'description' => 'Guided tour']);

        $this->get('/en/cities/khiva')->assertOk();
        $this->get('/en/tours/khiva-weekend')->assertOk();

        $sitemap = $this->get('/sitemap.xml');
        $sitemap->assertOk();
        $sitemap->assertHeader('Content-Type', 'application/xml; charset=UTF-8');
        $sitemap->assertSee('/en/cities/khiva', false);
        $sitemap->assertSee('/ru/tours/khiva-weekend', false);
    }

    public function test_language_switch_persists_locale_in_session_and_preserves_query(): void
    {
        $response = $this->from('/en/tours?category=cultural')->get('/language/ru');

        $response->assertRedirect('/ru/tours?category=cultural');
        $this->assertEquals('ru', session('locale'));
    }

    public function test_language_switch_from_admin_does_not_prefix_locale_onto_admin_url(): void
    {
        $response = $this->from('/admin/dashboard')->get('/language/uz');

        $response->assertRedirect('/admin/dashboard');
        $this->assertEquals('uz', session('locale'));
    }
}
