<?php

namespace App\Http\Middleware;

use App\Models\SiteVisit;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackSiteVisit
{
    private const BOT_PATTERN = '/bot|crawl|spider|slurp|mediapartners|facebookexternalhit|bingpreview|headlesschrome|lighthouse|curl|wget|python-requests/i';

    /**
     * Record public GET page visits for daily/weekly/monthly country analytics.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($this->shouldTrack($request, $response)) {
            try {
                SiteVisit::recordRequest($request);
            } catch (\Throwable) {
                // Analytics tracking must never disrupt public page rendering.
            }
        }

        return $response;
    }

    private function shouldTrack(Request $request, Response $response): bool
    {
        if (! $request->isMethod('GET')) {
            return false;
        }

        if ($response->getStatusCode() >= 400 || $response->isRedirection()) {
            return false;
        }

        // Skip partial Inertia reloads while still tracking full and client-side page visits.
        if ($request->headers->has('X-Inertia-Partial-Data')) {
            return false;
        }

        if ($request->is('admin', 'admin/*', 'login', 'logout', 'api/*', 'up', 'sitemap.xml', 'storage/*', 'build/*', 'language/*')) {
            return false;
        }

        $userAgent = (string) $request->userAgent();
        if ($userAgent !== '' && preg_match(self::BOT_PATTERN, $userAgent)) {
            return false;
        }

        return true;
    }
}
