import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Post, Tour } from '@/types';
import {
    MapPin,
    Map,
    Building2,
    Calendar,
    Bus,
    FileText,
    Utensils,
    Users,
    CalendarCheck,
    Plus,
    ArrowRight,
    Compass,
    TrendingUp,
    Globe,
    Eye,
} from 'lucide-react';

interface Stats {
    cities_count: number;
    tours_count: number;
    hotels_count: number;
    festivals_count: number;
    transports_count: number;
    posts_count: number;
    dishes_count?: number;
    bookings_count?: number;
    new_bookings_count?: number;
    subscribers_count: number;
}

interface VisitorPeriodSummary {
    visitors: number;
    page_views: number;
}

interface VisitorSeriesPoint {
    label: string;
    visitors: number;
    page_views: number;
}

interface VisitorCountryRow {
    country_code: string;
    country_name: string;
    visitors: number;
    page_views: number;
    share: number;
}

interface VisitorPeriodData {
    label: string;
    summary: VisitorPeriodSummary;
    series: VisitorSeriesPoint[];
    countries: VisitorCountryRow[];
}

type VisitorTimeframe = 'daily' | 'weekly' | 'monthly';

interface VisitorStats {
    summary: {
        daily: VisitorPeriodSummary;
        weekly: VisitorPeriodSummary;
        monthly: VisitorPeriodSummary;
        all_time_visitors: number;
    };
    periods: Record<VisitorTimeframe, VisitorPeriodData>;
}

interface AdminDashboardProps {
    stats: Stats;
    visitorStats?: VisitorStats;
    latestTours: Tour[];
    latestPosts: Post[];
}

const emptyPeriodData = (label: string): VisitorPeriodData => ({
    label,
    summary: { visitors: 0, page_views: 0 },
    series: [],
    countries: [],
});

const defaultVisitorStats: VisitorStats = {
    summary: {
        daily: { visitors: 0, page_views: 0 },
        weekly: { visitors: 0, page_views: 0 },
        monthly: { visitors: 0, page_views: 0 },
        all_time_visitors: 0,
    },
    periods: {
        daily: emptyPeriodData('Today & Last 14 Days'),
        weekly: emptyPeriodData('Last 7 Days & 8 Weeks'),
        monthly: emptyPeriodData('Last 30 Days & 6 Months'),
    },
};

const TIMEFRAME_OPTIONS: { key: VisitorTimeframe; label: string; periodHint: string }[] = [
    { key: 'daily', label: 'Daily', periodHint: 'Today' },
    { key: 'weekly', label: 'Weekly', periodHint: 'Last 7 days' },
    { key: 'monthly', label: 'Monthly', periodHint: 'Last 30 days' },
];

const defaultStats: Stats = {
    cities_count: 0,
    tours_count: 0,
    hotels_count: 0,
    festivals_count: 0,
    transports_count: 0,
    posts_count: 0,
    dishes_count: 0,
    bookings_count: 0,
    new_bookings_count: 0,
    subscribers_count: 0,
};

export default function AdminDashboard({
    stats = defaultStats,
    visitorStats = defaultVisitorStats,
    latestTours = [],
    latestPosts = [],
}: Partial<AdminDashboardProps>) {
    const safeStats = { ...defaultStats, ...stats };
    const safeVisitorStats = visitorStats ?? defaultVisitorStats;
    const [timeframe, setTimeframe] = useState<VisitorTimeframe>('daily');

    const activePeriod = safeVisitorStats.periods[timeframe] ?? emptyPeriodData('');
    const maxSeriesVisitors = Math.max(1, ...activePeriod.series.map((point) => point.visitors));

    const statCards = [
        { label: 'Cities', count: safeStats.cities_count, href: '/admin/cities', icon: MapPin, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { label: 'Tours', count: safeStats.tours_count, href: '/admin/tours', icon: Map, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { label: 'Hotels', count: safeStats.hotels_count, href: '/admin/hotels', icon: Building2, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Festivals', count: safeStats.festivals_count, href: '/admin/festivals', icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'Transports', count: safeStats.transports_count, href: '/admin/transports', icon: Bus, color: 'text-rose-400', bg: 'bg-rose-500/10' },
        { label: 'Posts', count: safeStats.posts_count, href: '/admin/posts', icon: FileText, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
        { label: 'National Dishes', count: safeStats.dishes_count || 0, href: '/admin/dishes', icon: Utensils, color: 'text-orange-400', bg: 'bg-orange-500/10' },
        { label: `Bookings (${safeStats.new_bookings_count || 0} new)`, count: safeStats.bookings_count || 0, href: '/admin/bookings', icon: CalendarCheck, color: 'text-lime-400', bg: 'bg-lime-500/10' },
        { label: 'Subscribers', count: safeStats.subscribers_count, href: '#', icon: Users, color: 'text-gold', bg: 'bg-gold/10' },
    ];

    return (
        <AdminLayout title="System Overview">
            <Head title="Admin Dashboard - Xorazm Tour" />

            <div className="space-y-8">
                {/* Welcome Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-navy to-slate-900 border border-slate-800 p-8 shadow-xl">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-4 border border-gold/30">
                            <Compass className="w-3.5 h-3.5" />
                            Xorazm Tourism Management
                        </div>
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                            Welcome to Admin Dashboard
                        </h1>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            Manage all website contents, upload and replace high-resolution media, create tours, cities, hotels, festivals, transports, and blog posts with multi-language support.
                        </p>
                    </div>

                    {/* Quick Add Actions */}
                    <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap gap-3">
                        <Link
                            href="/admin/tours/create"
                            className="px-4 py-2 bg-gold text-slate-950 text-xs font-bold rounded-xl hover:bg-gold-light transition-all flex items-center gap-2 shadow-lg shadow-gold/10"
                        >
                            <Plus className="w-4 h-4" /> Add New Tour
                        </Link>
                        <Link
                            href="/admin/cities/create"
                            className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl hover:bg-slate-700 transition-all flex items-center gap-2 border border-slate-700"
                        >
                            <Plus className="w-4 h-4" /> Add City
                        </Link>
                        <Link
                            href="/admin/hotels/create"
                            className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl hover:bg-slate-700 transition-all flex items-center gap-2 border border-slate-700"
                        >
                            <Plus className="w-4 h-4" /> Add Hotel
                        </Link>
                        <Link
                            href="/admin/posts/create"
                            className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl hover:bg-slate-700 transition-all flex items-center gap-2 border border-slate-700"
                        >
                            <Plus className="w-4 h-4" /> Add Blog Post
                        </Link>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {statCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Link
                                key={card.label}
                                href={card.href}
                                className="group bg-slate-900 border border-slate-800 hover:border-gold/40 p-5 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 flex flex-col justify-between"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                                        <Icon className={`w-5 h-5 ${card.color}`} />
                                    </div>
                                    <TrendingUp className="w-4 h-4 text-slate-600 group-hover:text-gold transition-colors" />
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-gold transition-colors">
                                        {card.count}
                                    </div>
                                    <div className="text-xs text-slate-400 font-medium">{card.label}</div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Visitor Analytics (Daily / Weekly / Monthly + Country Breakdown) */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
                        <div>
                            <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                                <Globe className="w-5 h-5 text-gold" />
                                Visitor Traffic &amp; Countries
                            </h2>
                            <p className="text-xs text-slate-400 mt-1">
                                Unique visitors and page views grouped by timeframe and country ({activePeriod.label}).
                            </p>
                        </div>

                        <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800 self-start">
                            {TIMEFRAME_OPTIONS.map((option) => {
                                const isActive = timeframe === option.key;
                                return (
                                    <button
                                        key={option.key}
                                        type="button"
                                        onClick={() => setTimeframe(option.key)}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                            isActive
                                                ? 'bg-gold text-slate-950 shadow-sm'
                                                : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Daily / Weekly / Monthly / All-Time Summary */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4">
                            <div className="text-xs text-slate-400 font-medium">Daily Visitors (Today)</div>
                            <div className="text-2xl font-bold text-white mt-1">
                                {safeVisitorStats.summary.daily.visitors.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                                <Eye className="w-3 h-3" /> {safeVisitorStats.summary.daily.page_views.toLocaleString()} views
                            </div>
                        </div>

                        <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4">
                            <div className="text-xs text-slate-400 font-medium">Weekly Visitors (7d)</div>
                            <div className="text-2xl font-bold text-white mt-1">
                                {safeVisitorStats.summary.weekly.visitors.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                                <Eye className="w-3 h-3" /> {safeVisitorStats.summary.weekly.page_views.toLocaleString()} views
                            </div>
                        </div>

                        <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4">
                            <div className="text-xs text-slate-400 font-medium">Monthly Visitors (30d)</div>
                            <div className="text-2xl font-bold text-white mt-1">
                                {safeVisitorStats.summary.monthly.visitors.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                                <Eye className="w-3 h-3" /> {safeVisitorStats.summary.monthly.page_views.toLocaleString()} views
                            </div>
                        </div>

                        <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4">
                            <div className="text-xs text-slate-400 font-medium">Tracked Visitor-Days</div>
                            <div className="text-2xl font-bold text-gold mt-1">
                                {safeVisitorStats.summary.all_time_visitors.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1">
                                All recorded public visits
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Timeframe Bar Chart */}
                        <div className="lg:col-span-2 rounded-xl bg-slate-950/60 border border-slate-800/80 p-5 flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-white">
                                    {TIMEFRAME_OPTIONS.find((opt) => opt.key === timeframe)?.label} Trend
                                </h3>
                                <span className="text-xs text-slate-400">
                                    {activePeriod.summary.visitors.toLocaleString()} visitors ({activePeriod.summary.page_views.toLocaleString()} views)
                                </span>
                            </div>

                            {activePeriod.series.length > 0 ? (
                                <div className="flex items-end gap-2 h-44 pt-4">
                                    {activePeriod.series.map((point) => {
                                        const heightPercent = point.visitors > 0
                                            ? Math.max(8, Math.round((point.visitors / maxSeriesVisitors) * 100))
                                            : 2;
                                        return (
                                            <div
                                                key={point.label}
                                                className="flex-1 min-w-0 flex flex-col items-center justify-end h-full group"
                                                title={`${point.label}: ${point.visitors} visitors, ${point.page_views} views`}
                                            >
                                                <div className="text-[10px] text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {point.visitors}
                                                </div>
                                                <div className="w-full flex items-end justify-center h-32">
                                                    <div
                                                        className={`w-full max-w-[28px] rounded-t-md transition-all ${
                                                            point.visitors > 0
                                                                ? 'bg-gradient-to-t from-gold/70 to-gold group-hover:to-amber-300'
                                                                : 'bg-slate-800/70'
                                                        }`}
                                                        style={{ height: `${heightPercent}%` }}
                                                    />
                                                </div>
                                                <div className="text-[10px] text-slate-500 mt-2 truncate w-full text-center">
                                                    {point.label}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500 py-12 text-center">No visitor data recorded yet.</p>
                            )}
                        </div>

                        {/* Visitors by Country */}
                        <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-white">Visitors by Country</h3>
                                <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                                    {TIMEFRAME_OPTIONS.find((opt) => opt.key === timeframe)?.periodHint}
                                </span>
                            </div>

                            {activePeriod.countries.length > 0 ? (
                                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                                    {activePeriod.countries.map((country) => (
                                        <div key={country.country_code} className="space-y-1.5">
                                            <div className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-gold font-mono text-[10px] font-bold">
                                                        {country.country_code}
                                                    </span>
                                                    <span className="text-slate-200 font-medium truncate">
                                                        {country.country_name}
                                                    </span>
                                                </div>
                                                <span className="text-slate-300 font-semibold flex-shrink-0 ml-2">
                                                    {country.visitors.toLocaleString()} ({country.share}%)
                                                </span>
                                            </div>
                                            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-gold"
                                                    style={{ width: `${Math.max(4, country.share)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500 py-12 text-center">
                                    No country breakdown for this period yet. Country codes are detected automatically from Cloudflare (`CF-IPCountry`) or Vercel (`X-Vercel-IP-Country`) in production.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Latest Tours */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                                <Map className="w-5 h-5 text-gold" /> Latest Tours
                            </h3>
                            <Link href="/admin/tours" className="text-xs font-semibold text-gold hover:underline flex items-center gap-1">
                                View all <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {latestTours.length > 0 ? (
                                latestTours.map((tour) => {
                                    const title = tour.translations?.[0]?.title || tour.slug;
                                    const image = tour.main_image?.path || tour.images?.[0]?.path;
                                    return (
                                        <div key={tour.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                                            <div className="flex items-center gap-3 min-w-0">
                                                {image ? (
                                                    <img src={image} alt={title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 text-xs">
                                                        No img
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <div className="text-sm font-semibold text-slate-200 truncate">{title}</div>
                                                    <div className="text-xs text-gold font-medium">${tour.cost}</div>
                                                </div>
                                            </div>
                                            <Link href={`/admin/tours/${tour.id}/edit`} className="text-xs text-slate-400 hover:text-white px-3 py-1.5 bg-slate-800 rounded-lg">
                                                Edit
                                            </Link>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-xs text-slate-500 text-center py-4">No tours available</p>
                            )}
                        </div>
                    </div>

                    {/* Latest Blog Posts */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gold" /> Latest Blog Posts
                            </h3>
                            <Link href="/admin/posts" className="text-xs font-semibold text-gold hover:underline flex items-center gap-1">
                                View all <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {latestPosts.length > 0 ? (
                                latestPosts.map((post) => {
                                    const title = post.translations?.[0]?.title || post.slug;
                                    const image = post.main_image?.path || post.images?.[0]?.path;
                                    return (
                                        <div key={post.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                                            <div className="flex items-center gap-3 min-w-0">
                                                {image ? (
                                                    <img src={image} alt={title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 text-xs">
                                                        No img
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <div className="text-sm font-semibold text-slate-200 truncate">{title}</div>
                                                    <div className="text-xs text-slate-400">Slug: {post.slug}</div>
                                                </div>
                                            </div>
                                            <Link href={`/admin/posts/${post.id}/edit`} className="text-xs text-slate-400 hover:text-white px-3 py-1.5 bg-slate-800 rounded-lg">
                                                Edit
                                            </Link>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-xs text-slate-500 text-center py-4">No posts available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
