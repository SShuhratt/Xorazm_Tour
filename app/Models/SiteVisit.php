<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class SiteVisit extends Model
{
    protected $fillable = [
        'visitor_hash',
        'visited_date',
        'country_code',
        'country_name',
        'path',
        'visits_count',
    ];

    protected $casts = [
        'visited_date' => 'date:Y-m-d',
        'visits_count' => 'integer',
    ];

    /**
     * ISO-3166 alpha-2 fallback names used when PHP intl is unavailable.
     *
     * @var array<string, string>
     */
    private const COUNTRY_NAMES = [
        'UZ' => 'Uzbekistan',
        'KZ' => 'Kazakhstan',
        'KG' => 'Kyrgyzstan',
        'TJ' => 'Tajikistan',
        'TM' => 'Turkmenistan',
        'RU' => 'Russia',
        'US' => 'United States',
        'GB' => 'United Kingdom',
        'DE' => 'Germany',
        'FR' => 'France',
        'IT' => 'Italy',
        'ES' => 'Spain',
        'NL' => 'Netherlands',
        'CH' => 'Switzerland',
        'AT' => 'Austria',
        'BE' => 'Belgium',
        'PL' => 'Poland',
        'CZ' => 'Czechia',
        'SE' => 'Sweden',
        'NO' => 'Norway',
        'TR' => 'Turkey',
        'AE' => 'United Arab Emirates',
        'SA' => 'Saudi Arabia',
        'QA' => 'Qatar',
        'IL' => 'Israel',
        'CN' => 'China',
        'JP' => 'Japan',
        'KR' => 'South Korea',
        'IN' => 'India',
        'MY' => 'Malaysia',
        'ID' => 'Indonesia',
        'SG' => 'Singapore',
        'AU' => 'Australia',
        'CA' => 'Canada',
        'BR' => 'Brazil',
        'UA' => 'Ukraine',
        'BY' => 'Belarus',
        'AZ' => 'Azerbaijan',
        'GE' => 'Georgia',
        'AM' => 'Armenia',
        'LOCAL' => 'Local / Preview',
        'XX' => 'Unknown',
    ];

    /**
     * Record a unique daily visitor hit (incrementing page views on repeat same-day visits).
     */
    public static function recordRequest(Request $request): void
    {
        $today = Carbon::today()->toDateString();
        $ip = (string) ($request->ip() ?? '0.0.0.0');
        $userAgent = substr((string) $request->userAgent(), 0, 255);
        $hash = hash('sha256', $ip . '|' . $userAgent . '|' . config('app.key'));
        [$countryCode, $countryName] = static::resolveCountry($request, $ip);
        $path = '/' . ltrim($request->path(), '/');

        DB::transaction(function () use ($hash, $today, $countryCode, $countryName, $path) {
            $updated = static::where('visitor_hash', $hash)
                ->whereDate('visited_date', $today)
                ->increment('visits_count');

            if ($updated === 0) {
                static::create([
                    'visitor_hash' => $hash,
                    'visited_date' => $today,
                    'country_code' => $countryCode,
                    'country_name' => $countryName,
                    'path' => mb_substr($path, 0, 255),
                    'visits_count' => 1,
                ]);
            }
        });
    }

    /**
     * Resolve country code and display name from CDN/edge headers or IP context.
     *
     * @return array{0: string, 1: string}
     */
    public static function resolveCountry(Request $request, ?string $ip = null): array
    {
        $headerCandidates = [
            $request->headers->get('CF-IPCountry'),
            $request->headers->get('X-Vercel-IP-Country'),
            $request->headers->get('CloudFront-Viewer-Country'),
            $request->headers->get('X-Country-Code'),
        ];

        foreach ($headerCandidates as $candidate) {
            $code = strtoupper(trim((string) $candidate));
            if (preg_match('/^[A-Z]{2}$/', $code) && ! in_array($code, ['XX', 'T1'], true)) {
                return [$code, static::countryNameForCode($code)];
            }
        }

        $ip ??= (string) ($request->ip() ?? '');
        if ($ip !== '' && filter_var($ip, FILTER_VALIDATE_IP) && ! filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
            return ['LOCAL', self::COUNTRY_NAMES['LOCAL']];
        }

        return ['XX', self::COUNTRY_NAMES['XX']];
    }

    public static function countryNameForCode(string $code): string
    {
        $normalized = strtoupper(trim($code));
        if (isset(self::COUNTRY_NAMES[$normalized])) {
            return self::COUNTRY_NAMES[$normalized];
        }

        if (class_exists(\Locale::class) && preg_match('/^[A-Z]{2}$/', $normalized)) {
            $resolved = \Locale::getDisplayRegion('-' . $normalized, 'en');
            if (is_string($resolved) && $resolved !== '' && $resolved !== $normalized) {
                return $resolved;
            }
        }

        return $normalized !== '' ? $normalized : self::COUNTRY_NAMES['XX'];
    }

    /**
     * Build daily, weekly, and monthly visitor totals, series, and country breakdowns for the admin dashboard.
     *
     * @return array<string, mixed>
     */
    public static function dashboardAnalytics(): array
    {
        $today = Carbon::today();
        $monthStart = $today->copy()->subMonths(5)->startOfMonth();

        $rows = static::query()
            ->whereDate('visited_date', '>=', $monthStart->toDateString())
            ->get(['visited_date', 'country_code', 'country_name', 'visits_count']);

        $totalVisitorsAllTime = static::count();

        $dailyRows = $rows->filter(fn (self $row) => static::rowDate($row)->isSameDay($today));
        $weeklyRows = $rows->filter(fn (self $row) => static::rowDate($row)->greaterThanOrEqualTo($today->copy()->subDays(6)));
        $monthlyRows = $rows->filter(fn (self $row) => static::rowDate($row)->greaterThanOrEqualTo($today->copy()->subDays(29)));

        return [
            'summary' => [
                'daily' => static::summarizeRows($dailyRows),
                'weekly' => static::summarizeRows($weeklyRows),
                'monthly' => static::summarizeRows($monthlyRows),
                'all_time_visitors' => $totalVisitorsAllTime,
            ],
            'periods' => [
                'daily' => [
                    'label' => 'Today & Last 14 Days',
                    'summary' => static::summarizeRows($dailyRows),
                    'series' => static::buildDailySeries($rows, $today, 14),
                    'countries' => static::buildCountryBreakdown($dailyRows),
                ],
                'weekly' => [
                    'label' => 'Last 7 Days & 8 Weeks',
                    'summary' => static::summarizeRows($weeklyRows),
                    'series' => static::buildWeeklySeries($rows, $today, 8),
                    'countries' => static::buildCountryBreakdown($weeklyRows),
                ],
                'monthly' => [
                    'label' => 'Last 30 Days & 6 Months',
                    'summary' => static::summarizeRows($monthlyRows),
                    'series' => static::buildMonthlySeries($rows, $today, 6),
                    'countries' => static::buildCountryBreakdown($monthlyRows),
                ],
            ],
        ];
    }

    private static function rowDate(self $row): Carbon
    {
        return $row->visited_date instanceof Carbon
            ? $row->visited_date
            : Carbon::parse((string) $row->visited_date);
    }

    /**
     * @param  Collection<int, self>  $rows
     * @return array{visitors: int, page_views: int}
     */
    private static function summarizeRows(Collection $rows): array
    {
        return [
            'visitors' => $rows->count(),
            'page_views' => (int) $rows->sum('visits_count'),
        ];
    }

    /**
     * @param  Collection<int, self>  $rows
     * @return array<int, array{label: string, visitors: int, page_views: int}>
     */
    private static function buildDailySeries(Collection $rows, Carbon $today, int $days): array
    {
        $grouped = $rows->groupBy(fn (self $row) => static::rowDate($row)->toDateString());
        $series = [];

        for ($i = $days - 1; $i >= 0; $i--) {
            $day = $today->copy()->subDays($i);
            $bucket = $grouped->get($day->toDateString(), collect());
            $series[] = [
                'label' => $day->format('M j'),
                'visitors' => $bucket->count(),
                'page_views' => (int) $bucket->sum('visits_count'),
            ];
        }

        return $series;
    }

    /**
     * @param  Collection<int, self>  $rows
     * @return array<int, array{label: string, visitors: int, page_views: int}>
     */
    private static function buildWeeklySeries(Collection $rows, Carbon $today, int $weeks): array
    {
        $grouped = $rows->groupBy(fn (self $row) => static::rowDate($row)->copy()->startOfWeek()->toDateString());
        $currentWeekStart = $today->copy()->startOfWeek();
        $series = [];

        for ($i = $weeks - 1; $i >= 0; $i--) {
            $weekStart = $currentWeekStart->copy()->subWeeks($i);
            $bucket = $grouped->get($weekStart->toDateString(), collect());
            $series[] = [
                'label' => $weekStart->format('M j'),
                'visitors' => $bucket->count(),
                'page_views' => (int) $bucket->sum('visits_count'),
            ];
        }

        return $series;
    }

    /**
     * @param  Collection<int, self>  $rows
     * @return array<int, array{label: string, visitors: int, page_views: int}>
     */
    private static function buildMonthlySeries(Collection $rows, Carbon $today, int $months): array
    {
        $grouped = $rows->groupBy(fn (self $row) => static::rowDate($row)->format('Y-m'));
        $currentMonthStart = $today->copy()->startOfMonth();
        $series = [];

        for ($i = $months - 1; $i >= 0; $i--) {
            $month = $currentMonthStart->copy()->subMonths($i);
            $bucket = $grouped->get($month->format('Y-m'), collect());
            $series[] = [
                'label' => $month->format('M Y'),
                'visitors' => $bucket->count(),
                'page_views' => (int) $bucket->sum('visits_count'),
            ];
        }

        return $series;
    }

    /**
     * @param  Collection<int, self>  $rows
     * @return array<int, array{country_code: string, country_name: string, visitors: int, page_views: int, share: float}>
     */
    private static function buildCountryBreakdown(Collection $rows): array
    {
        $totalVisitors = $rows->count();
        if ($totalVisitors === 0) {
            return [];
        }

        return $rows
            ->groupBy('country_code')
            ->map(function (Collection $countryRows, string $code) use ($totalVisitors) {
                $visitors = $countryRows->count();
                $first = $countryRows->first();

                return [
                    'country_code' => $code,
                    'country_name' => $first?->country_name ?: static::countryNameForCode($code),
                    'visitors' => $visitors,
                    'page_views' => (int) $countryRows->sum('visits_count'),
                    'share' => round(($visitors / $totalVisitors) * 100, 1),
                ];
            })
            ->sortByDesc('visitors')
            ->values()
            ->all();
    }
}

