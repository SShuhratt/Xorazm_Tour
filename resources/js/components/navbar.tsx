import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Compass, MapPin, CalendarDays, Building2, Utensils } from 'lucide-react';
import LanguageSwitcher from './language-switcher';
import { PageProps } from '@/types';
import { useTranslations } from '@/hooks/use-translations';

export default function MainNavbar() {
    const { url, props } = usePage<PageProps>();
    const { locale } = props;
    const { t } = useTranslations();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const prevNavRef = useRef({ locale, url });

    useEffect(() => {
        if (!isMobileOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMobileOpen(false);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isMobileOpen]);

    // Close menu only when the route or locale actually changes
    useEffect(() => {
        if (prevNavRef.current.locale !== locale || prevNavRef.current.url !== url) {
            prevNavRef.current = { locale, url };
            const timer = setTimeout(() => {
                setIsMobileOpen(false);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [locale, url]);

    const navLinks = [
        { href: `/${locale}/tours`, label: t('nav.tours') },
        { href: `/${locale}/cities`, label: t('nav.cities') },
        { href: `/${locale}/festivals`, label: t('nav.festivals') },
        { href: `/${locale}/hotels`, label: t('nav.hotels') },
        { href: `/${locale}/transports`, label: t('nav.transports') },
        { href: `/${locale}/dishes`, label: t('nav.dishes') },
        { href: `/${locale}/about`, label: t('nav.about') },
        { href: `/${locale}/contact`, label: t('nav.contact') },
    ];

    const mobileBottomLinks = [
        { href: `/${locale}/tours`, label: t('nav.tours'), icon: Compass },
        { href: `/${locale}/cities`, label: t('nav.cities'), icon: MapPin },
        { href: `/${locale}/festivals`, label: t('nav.festivals'), icon: CalendarDays },
        { href: `/${locale}/hotels`, label: t('nav.hotels'), icon: Building2 },
        { href: `/${locale}/dishes`, label: t('nav.dishes'), icon: Utensils },
    ];

    const drawerLinks = [
        ...navLinks,
        { href: `/${locale}/privacy`, label: t('footer.privacy_policy') },
        { href: `/${locale}/terms`, label: t('footer.terms_of_service') },
    ];

    const cleanUrl = url.split('?')[0];
    const isRouteActive = (href: string) => cleanUrl === href || cleanUrl.startsWith(`${href}/`);

    return (
        <>
            <nav
                aria-label="Primary navigation"
                className="fixed top-0 left-0 right-0 z-50 bg-navy/98 backdrop-blur-md shadow-lg border-b border-gold/20 transition-all duration-300"
            >
                <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
                    <div className="flex h-16 lg:h-20 items-center justify-between gap-2">
                        <Link
                            href={`/${locale}`}
                            className="flex items-center gap-2 sm:gap-3 shrink-0"
                        >
                            <img
                                src="/images/logo_transparent.png"
                                alt="XORAZM TOUR AND TRAVELS Logo"
                                className="h-11 sm:h-12 lg:h-16 w-auto object-contain py-1 shrink-0"
                            />
                            <div className="flex flex-col font-serif font-bold tracking-wider leading-tight">
                                <span className="text-white text-sm sm:text-base lg:text-lg whitespace-nowrap">
                                    XORAZM TOUR
                                </span>
                                <span className="text-gold text-[10px] sm:text-xs lg:text-sm whitespace-nowrap">
                                    AND TRAVELS
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav (previous spacing/typography, bounded so siblings are never overlapped) */}
                        <div className="hidden lg:flex items-center gap-3 xl:gap-5 mx-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative text-[11px] xl:text-xs font-bold uppercase tracking-[0.08em] xl:tracking-[0.12em] text-white/90 transition-colors duration-300 hover:text-gold py-2 group whitespace-nowrap shrink-0"
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        {/* Right side: compact LanguageSwitcher + 3-line hamburger on mobile */}
                        <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 shrink-0">
                            <LanguageSwitcher />
                            <button
                                type="button"
                                onClick={() => setIsMobileOpen((prev) => !prev)}
                                className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden rounded-lg hover:bg-white/10 transition-colors shrink-0"
                                aria-label="Toggle menu"
                                aria-expanded={isMobileOpen}
                                aria-controls="mobile-navigation-drawer"
                            >
                                <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
                                <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileOpen ? 'opacity-0' : ''}`} />
                                <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile 3-line Menu Drawer (All active sections + Privacy Policy + Terms of Use) */}
                {isMobileOpen && (
                    <div
                        id="mobile-navigation-drawer"
                        className="lg:hidden border-t border-white/10 bg-navy/98 backdrop-blur-md px-4 pb-5 pt-3 max-h-[calc(100dvh-8.5rem)] overflow-y-auto divide-y divide-white/5"
                    >
                        {drawerLinks.map((link) => {
                            const active = isRouteActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`block py-3 text-sm font-semibold uppercase tracking-widest transition-colors ${
                                        active ? 'text-gold' : 'text-white/85 hover:text-gold'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </nav>

            {/* Mobile Bottom Navigation Bar (5 core sections) */}
            <nav
                aria-label="Mobile bottom navigation"
                className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-navy/98 backdrop-blur-md border-t border-gold/25 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] pb-[env(safe-area-inset-bottom)]"
            >
                <div className="grid grid-cols-5 h-16">
                    {mobileBottomLinks.map((item) => {
                        const Icon = item.icon;
                        const active = isRouteActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center justify-center gap-1 px-1 transition-colors ${
                                    active ? 'text-gold' : 'text-white/75 hover:text-gold'
                                }`}
                            >
                                <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-gold' : ''}`} />
                                <span className="text-[10px] leading-tight font-semibold tracking-tight text-center line-clamp-1 w-full">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
