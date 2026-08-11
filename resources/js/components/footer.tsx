import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import { PageProps } from '@/types';
import { Mail, MapPin, Phone, Send, Heart } from 'lucide-react';

const FacebookIcon = () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const TelegramIcon = () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.28c-.15.66-.54.82-1.09.51l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.21-3.04 5.54-5.01c.24-.21-.05-.33-.37-.12l-6.85 4.31-2.95-.92c-.64-.2-.65-.64.13-.95l11.53-4.44c.53-.2 1 .12.83.89z" />
    </svg>
);

export default function Footer() {
    const { locale } = usePage<PageProps>().props;
    const { t } = useTranslations();
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubscribing(true);
        try {
            const response = await fetch('/api/v1/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setEmail('');
                alert(t('footer.newsletter_success') || 'Thank you for subscribing!');
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
        } finally {
            setIsSubscribing(false);
        }
    };

    const quickLinks = [
        { href: `/${locale}/tours`, label: t('nav.tours') },
        { href: `/${locale}/cities`, label: t('nav.cities') },
        { href: `/${locale}/festivals`, label: t('nav.festivals') },
        { href: `/${locale}/hotels`, label: t('nav.hotels') },
        { href: `/${locale}/dishes`, label: t('nav.dishes') },
        { href: `/${locale}/about`, label: t('nav.about') },
        { href: `/${locale}/contact`, label: t('nav.contact') },
    ];

    return (
        <footer className="relative bg-navy text-ivory pt-24 pb-8 border-t border-gold/20">
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main footer grid */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
                    {/* Brand section */}
                    <div>
                        <Link href={`/${locale}`} className="inline-block mb-6">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/images/logo_transparent.png"
                                    alt="XORAZM TOUR AND TRAVELS Logo"
                                    className="h-14 w-auto object-contain"
                                />
                                <div className="flex flex-col font-serif font-bold tracking-wider leading-tight">
                                    <span className="text-ivory text-base">XORAZM TOUR</span>
                                    <span className="text-gold text-xs">AND TRAVELS</span>
                                </div>
                            </div>
                        </Link>
                        <p className="text-ivory/70 text-sm leading-relaxed mb-6">
                            {t('footer.description')}
                        </p>
                        {/* Social links */}
                        <div className="flex gap-3 pt-2">
                            <a
                                href="https://www.facebook.com/xorazmtourandtravels"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all duration-300"
                                aria-label="Facebook"
                            >
                                <FacebookIcon />
                            </a>
                            <a
                                href="https://www.instagram.com/xorazmtour_and_travels?igsh=eGE0NTZ0d2EwZnpr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <InstagramIcon />
                            </a>
                            <a
                                href="https://t.me/xorazmtourandtravels"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all duration-300"
                                aria-label="Telegram"
                            >
                                <TelegramIcon />
                            </a>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="text-lg font-serif font-bold text-gold mb-6">
                            {t('footer.quick_links')}
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-ivory/70 hover:text-gold transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div>
                        <h3 className="text-lg font-serif font-bold text-gold mb-6">
                            {t('footer.contact_us')}
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-3 items-start">
                                <MapPin className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                                <span className="text-ivory/70 text-sm">
                                    {t('contact.address')}
                                </span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                                <a
                                    href="tel:+998943157579"
                                    className="text-ivory/70 hover:text-gold transition-colors text-sm"
                                >
                                    +998 94 315 75 79
                                </a>
                            </div>
                            <div className="flex gap-3 items-center">
                                <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                                <a
                                    href="mailto:xorazmtour@gmail.com"
                                    className="text-ivory/70 hover:text-gold transition-colors text-sm"
                                >
                                    xorazmtour@gmail.com
                                </a>
                            </div>
                            <div className="flex gap-3 items-center">
                                <Send className="h-5 w-5 text-gold flex-shrink-0" />
                                <a
                                    href="https://t.me/xorazmtourandtravels"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-ivory/70 hover:text-gold transition-colors text-sm"
                                >
                                    @xorazmtourandtravels
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-serif font-bold text-gold mb-6">
                            {t('footer.newsletter')}
                        </h3>
                        <p className="text-ivory/70 text-sm mb-4">
                            {t('footer.newsletter_text')}
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('footer.email_placeholder')}
                                className="w-full px-4 py-3 bg-navy-light border border-gold/30 rounded-lg text-ivory placeholder-ivory/50 focus:outline-none focus:border-gold transition-colors text-sm"
                                required
                            />
                            <button
                                type="submit"
                                disabled={isSubscribing}
                                className="w-full px-4 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 disabled:opacity-50 transition-all duration-300 text-sm"
                            >
                                {isSubscribing ? t('footer.subscribing') : t('footer.subscribe')}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0 my-12" />

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <p className="text-ivory/50 text-xs text-center md:text-left mb-4 md:mb-0">
                        &copy; 2024 XORAZM TOUR AND TRAVELS. {t('footer.rights')}
                    </p>
                    <div className="flex gap-6 text-ivory/50 text-xs">
                        <a href={`/${locale}/privacy`} className="hover:text-gold transition-colors">
                            Privacy Policy
                        </a>
                        <a href={`/${locale}/terms`} className="hover:text-gold transition-colors">
                            Terms of Service
                        </a>
                    </div>
                    <div className="flex items-center gap-1 text-ivory/50 text-xs mt-4 md:mt-0">
                        Made with <Heart className="h-3 w-3 text-gold" /> in Xorazm
                    </div>
                </div>
            </div>
        </footer>
    );
}
