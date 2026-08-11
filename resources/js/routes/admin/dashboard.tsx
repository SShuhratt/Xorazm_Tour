import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import {
    MapPin,
    Map,
    Building2,
    Calendar,
    Bus,
    FileText,
    Utensils,
    Users,
    Plus,
    ArrowRight,
    Compass,
    TrendingUp,
} from 'lucide-react';

interface Stats {
    cities_count: number;
    tours_count: number;
    hotels_count: number;
    festivals_count: number;
    transports_count: number;
    posts_count: number;
    dishes_count?: number;
    subscribers_count: number;
}

interface AdminDashboardProps {
    stats: Stats;
    latestTours: any[];
    latestPosts: any[];
}

const defaultStats: Stats = {
    cities_count: 0,
    tours_count: 0,
    hotels_count: 0,
    festivals_count: 0,
    transports_count: 0,
    posts_count: 0,
    dishes_count: 0,
    subscribers_count: 0,
};

export default function AdminDashboard({
    stats = defaultStats,
    latestTours = [],
    latestPosts = [],
}: Partial<AdminDashboardProps>) {
    const safeStats = { ...defaultStats, ...stats };

    const statCards = [
        { label: 'Cities', count: safeStats.cities_count, href: '/admin/cities', icon: MapPin, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { label: 'Tours', count: safeStats.tours_count, href: '/admin/tours', icon: Map, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { label: 'Hotels', count: safeStats.hotels_count, href: '/admin/hotels', icon: Building2, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Festivals', count: safeStats.festivals_count, href: '/admin/festivals', icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'Transports', count: safeStats.transports_count, href: '/admin/transports', icon: Bus, color: 'text-rose-400', bg: 'bg-rose-500/10' },
        { label: 'Posts', count: safeStats.posts_count, href: '/admin/posts', icon: FileText, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
        { label: 'National Dishes', count: safeStats.dishes_count || 0, href: '/admin/dishes', icon: Utensils, color: 'text-orange-400', bg: 'bg-orange-500/10' },
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
