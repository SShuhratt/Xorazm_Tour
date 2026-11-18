<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\City;
use App\Models\Dish;
use App\Models\Festival;
use App\Models\Hotel;
use App\Models\SiteVisit;
use App\Models\Tour;
use App\Models\Transport;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardAdminController extends Controller
{
    public function index()
    {
        $stats = [
            'cities_count' => City::count(),
            'tours_count' => Tour::count(),
            'hotels_count' => Hotel::count(),
            'festivals_count' => Festival::count(),
            'transports_count' => Transport::count(),
            'dishes_count' => Dish::count(),
            'bookings_count' => Booking::count(),
            'new_bookings_count' => Booking::where('status', 'new')->count(),
            'subscribers_count' => DB::table('newsletter_subscriptions')->count(),
        ];

        $latestTours = Tour::with(['translations', 'mainImage'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'visitorStats' => SiteVisit::dashboardAnalytics(),
            'latestTours' => $latestTours,
        ]);
    }
}
