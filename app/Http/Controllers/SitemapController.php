<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Dish;
use App\Models\Festival;
use App\Models\Hotel;
use App\Models\Post;
use App\Models\Tour;
use App\Models\Transport;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    private const LOCALES = ['en', 'ru', 'uz'];

    public function index(): Response
    {
        $baseUrl = rtrim(config('app.url') ?: url('/'), '/');

        $staticPaths = [
            ['path' => '', 'priority' => '1.0', 'changefreq' => 'daily'],
            ['path' => '/tours', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['path' => '/cities', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['path' => '/festivals', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['path' => '/hotels', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['path' => '/transports', 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['path' => '/dishes', 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['path' => '/posts', 'priority' => '0.7', 'changefreq' => 'weekly'],
            ['path' => '/about', 'priority' => '0.6', 'changefreq' => 'monthly'],
            ['path' => '/contact', 'priority' => '0.6', 'changefreq' => 'monthly'],
            ['path' => '/privacy', 'priority' => '0.3', 'changefreq' => 'yearly'],
            ['path' => '/terms', 'priority' => '0.3', 'changefreq' => 'yearly'],
        ];

        $urls = [];

        foreach ($staticPaths as $item) {
            foreach (self::LOCALES as $locale) {
                $urls[] = $this->buildEntry(
                    $baseUrl,
                    $item['path'],
                    $locale,
                    $item['priority'],
                    $item['changefreq'],
                    now()->toAtomString(),
                    includeDefault: $item['path'] === ''
                );
            }
        }

        $dynamicCollections = [
            ['prefix' => '/tours/', 'items' => Tour::where('status', 'active')->get(['slug', 'updated_at']), 'priority' => '0.8'],
            ['prefix' => '/cities/', 'items' => City::where('status', true)->get(['slug', 'updated_at']), 'priority' => '0.8'],
            ['prefix' => '/festivals/', 'items' => Festival::where('status', true)->get(['slug', 'updated_at']), 'priority' => '0.7'],
            ['prefix' => '/hotels/', 'items' => Hotel::where('status', true)->get(['slug', 'updated_at']), 'priority' => '0.7'],
            ['prefix' => '/transports/', 'items' => Transport::where('status', true)->get(['slug', 'updated_at']), 'priority' => '0.6'],
            ['prefix' => '/posts/', 'items' => Post::where('status', true)->get(['slug', 'updated_at']), 'priority' => '0.6'],
            ['prefix' => '/dishes/', 'items' => Dish::where('status', true)->get(['slug', 'updated_at']), 'priority' => '0.6'],
        ];

        foreach ($dynamicCollections as $collection) {
            foreach ($collection['items'] as $entity) {
                $path = $collection['prefix'] . $entity->slug;
                $lastmod = $entity->updated_at ? $entity->updated_at->toAtomString() : now()->toAtomString();
                foreach (self::LOCALES as $locale) {
                    $urls[] = $this->buildEntry(
                        $baseUrl,
                        $path,
                        $locale,
                        $collection['priority'],
                        'weekly',
                        $lastmod
                    );
                }
            }
        }

        $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
            . "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">\n"
            . implode("\n", $urls)
            . "\n</urlset>\n";

        return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
    }

    private function buildEntry(
        string $baseUrl,
        string $path,
        string $locale,
        string $priority,
        string $changefreq,
        string $lastmod,
        bool $includeDefault = false
    ): string {
        $loc = htmlspecialchars($baseUrl . '/' . $locale . $path, ENT_XML1);
        $alternates = '';
        foreach (self::LOCALES as $altLocale) {
            $href = htmlspecialchars($baseUrl . '/' . $altLocale . $path, ENT_XML1);
            $alternates .= "\n    <xhtml:link rel=\"alternate\" hreflang=\"{$altLocale}\" href=\"{$href}\"/>";
        }
        if ($includeDefault) {
            $defaultHref = htmlspecialchars($baseUrl . '/en' . $path, ENT_XML1);
            $alternates .= "\n    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$defaultHref}\"/>";
        }

        return "  <url>\n"
            . "    <loc>{$loc}</loc>{$alternates}\n"
            . "    <lastmod>{$lastmod}</lastmod>\n"
            . "    <changefreq>{$changefreq}</changefreq>\n"
            . "    <priority>{$priority}</priority>\n"
            . "  </url>";
    }
}

