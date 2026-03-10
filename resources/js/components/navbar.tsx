import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import LanguageSwitcher from './language-switcher';
import { PageProps } from '@/types';
import { useTranslations } from '@/hooks/use-translations';

export default function MainNavbar() {
    const { locale } = usePage<PageProps>().props;
    const { t } = useTranslations();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            // Navbar is always visible with fixed styling
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close menu when language changes
    useEffect(() => {
        if (isMobileOpen) {
            const timer = setTimeout(() => {
                setIsMobileOpen(false);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [locale, isMobileOpen]);

    const navLinks = [
        { href: `/${locale}/tours`, label: t('nav.tours') },
        { href: `/${locale}/cities`, label: t('nav.cities') },
        { href: `/${locale}/festivals`, label: t('nav.festivals') },
        { href: `/${locale}/hotels`, label: t('nav.hotels') },
        { href: `/${locale}/about`, label: t('nav.about') },
        { href: `/${locale}/contact`, label: t('nav.contact') },
    ];

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 bg-navy/98 backdrop-blur-md shadow-lg border-b border-gold/20 transition-all duration-300"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href={`/${locale}`}
                        className="flex items-center gap-1 font-serif text-2xl tracking-wide"
                    >
                        <span className="text-white">XORAZM</span>
                        <span className="text-gold">TOUR</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden items-center gap-8 lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-gold"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
                            aria-label="Toggle menu"
                        >
                            <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
                            <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileOpen ? 'opacity-0' : ''}`} />
                            <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`overflow-hidden transition-all duration-500 lg:hidden ${isMobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="border-t border-white/10 bg-navy/95 backdrop-blur-md px-4 pb-6 pt-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="block py-3 text-sm font-semibold uppercase tracking-widest text-white/80 transition-colors hover:text-gold"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
