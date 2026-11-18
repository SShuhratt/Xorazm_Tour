import React, { PropsWithChildren } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
    Compass,
    LayoutDashboard,
    MapPin,
    Map,
    Building2,
    Calendar,
    Bus,
    Utensils,
    CalendarCheck,
    LogOut,
    ExternalLink,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
} from 'lucide-react';

interface AdminLayoutProps extends PropsWithChildren {
    title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { auth, flash } = usePage<PageProps & { flash?: { success?: string; error?: string } }>().props;
    const currentPath = window.location.pathname;

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
        { name: 'Cities', href: '/admin/cities', icon: MapPin },
        { name: 'Tours', href: '/admin/tours', icon: Map },
        { name: 'Hotels', href: '/admin/hotels', icon: Building2 },
        { name: 'Festivals', href: '/admin/festivals', icon: Calendar },
        { name: 'Transports', href: '/admin/transports', icon: Bus },
        { name: 'National Dishes', href: '/admin/dishes', icon: Utensils },
    ];

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 flex flex-col justify-between">
                <div>
                    {/* Brand header */}
                    <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
                            <Compass className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-serif font-bold text-lg text-white leading-tight">Xorazm Tour</h1>
                            <p className="text-xs text-gold font-semibold uppercase tracking-wider">Admin Portal</p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-4 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPath.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'bg-gold text-slate-950 font-bold shadow-md shadow-gold/10'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                    }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-gold'}`} />
                                    <span>{item.name}</span>
                                    {isActive && <ChevronRight className="w-4 h-4 ml-auto text-slate-950" />}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-slate-800 space-y-3">
                    <a
                        href="/en"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        <span>View Website</span>
                        <ExternalLink className="w-3.5 h-3.5 text-gold" />
                    </a>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                        <div className="text-xs">
                            <div className="font-bold text-slate-200">{auth?.user?.name || 'Admin'}</div>
                            <div className="text-slate-500 text-[10px] truncate max-w-[120px]">{auth?.user?.email}</div>
                        </div>
                        <button
                            onClick={handleLogout}
                            title="Sign Out"
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-slate-950">
                {/* Header Banner */}
                <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
                    <h2 className="text-lg font-serif font-bold text-slate-100">{title || 'Admin Dashboard'}</h2>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
                            Active Session
                        </span>
                    </div>
                </header>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="m-6 mb-0 p-4 bg-emerald-950/80 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span>{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div className="m-6 mb-0 p-4 bg-red-950/80 border border-red-500/30 rounded-xl text-red-300 text-sm flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <span>{flash.error}</span>
                    </div>
                )}

                {/* Page Content */}
                <div className="p-6 md:p-8 flex-1">{children}</div>
            </main>
        </div>
    );
}
