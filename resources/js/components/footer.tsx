import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import { PageProps } from '@/types';
import { Mail, MapPin, Phone, Heart } from 'lucide-react';

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
            // Subscribe to newsletter via API
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
        { href: `/${locale}/about`, label: t('nav.about') },
        { href: `/${locale}/contact`, label: t('nav.contact') },
    ];

    return (
        <footer className="relative bg-navy text-ivory pt-24 pb-8">
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main footer grid */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
                    {/* Brand section */}
                    <div>
                        <Link href={`/${locale}`} className="inline-block mb-6">
                            <div className="flex items-center gap-2 font-serif text-2xl tracking-wide">
                                <span className="text-ivory">XORAZM</span>
                                <span className="text-gold">TOUR</span>
                            </div>
                        </Link>
                        <p className="text-ivory/70 text-sm leading-relaxed mb-6">
                            {t('footer.description')}
                        </p>
                        {/* Social links */}
                        <div className="flex gap-4 pt-4">
                            <a
                                href="https://facebook.com/xorazmtour"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all duration-300"
                                aria-label="Facebook"
                            >
                                f
                            </a>
                            <a
                                href="https://instagram.com/xorazmtour"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all duration-300"
                                aria-label="Instagram"
                            >
                                📷
                            </a>
                            <a
                                href="https://youtube.com/@xorazmtour"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all duration-300"
                                aria-label="YouTube"
                            >
                                ▶️
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
                                    href="tel:+998623750000"
                                    className="text-ivory/70 hover:text-gold transition-colors text-sm"
                                >
                                    {t('contact.phone')}
                                </a>
                            </div>
                            <div className="flex gap-3 items-center">
                                <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                                <a
                                    href="mailto:info@xorazmtour.uz"
                                    className="text-ivory/70 hover:text-gold transition-colors text-sm"
                                >
                                    {t('contact.email_address')}
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
                        &copy; 2024 Xorazm Tour. {t('footer.rights')}
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
