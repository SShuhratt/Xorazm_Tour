import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/main-layout';
import { useTranslations } from '@/hooks/use-translations';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';

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

export default function Contact() {
    const { t } = useTranslations();
    usePage();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/v1/contact/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitSuccess(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmitSuccess(false), 5000);
            } else {
                console.error('Error sending message');
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: MapPin,
            label: 'Address',
            value: t('contact.address'),
            href: 'https://maps.google.com/maps?q=Khiva,Uzbekistan',
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+998 94 315 75 79',
            href: 'tel:+998943157579',
        },
        {
            icon: Mail,
            label: 'Email',
            value: 'xorazmtour@gmail.com',
            href: 'mailto:xorazmtour@gmail.com',
        },
        {
            icon: Send,
            label: 'Telegram',
            value: '@xorazmtourandtravels',
            href: 'https://t.me/xorazmtourandtravels',
        },
    ];

    return (
        <MainLayout>
            <Head title={t('contact.title')} />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-navy pt-32 pb-20 sm:pt-40 sm:pb-32">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-ivory mb-6"
                    >
                        {t('contact.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg sm:text-xl text-gold leading-relaxed"
                    >
                        {t('contact.subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 sm:py-32 bg-gradient-to-b from-ivory to-[#f5ebd6]">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="contact-card">
                        {/* Contact Info (Column 1 & 2) */}
                        <div className="contact-info-panel">
                            {/* Abstract design elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-2xl -mr-20 -mt-20" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-2xl -ml-20 -mb-20" />

                            <div className="relative z-10 space-y-8">
                                <div>
                                    <h3 className="font-serif text-3xl font-bold text-gold mb-3">
                                        {t('contact.info_title')}
                                    </h3>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        Have a question about our Silk Road routes, private tours, or bookings? Reach out to our travel specialists.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {contactInfo.map((info, index) => {
                                        const Icon = info.icon;
                                        return (
                                            <a
                                                key={index}
                                                href={info.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300"
                                            >
                                                <div className="flex-shrink-0 h-11 w-11 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase tracking-widest text-gold font-bold mb-0.5">
                                                        {info.label}
                                                    </p>
                                                    <p className="text-sm text-white/95 group-hover:text-gold transition-colors">
                                                        {info.value}
                                                    </p>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="relative z-10 pt-8 border-t border-white/10 mt-8 lg:mt-0">
                                <p className="text-xs uppercase tracking-widest text-gold font-bold mb-4">
                                    {t('contact.follow')}
                                </p>
                                <div className="flex gap-3">
                                    <a
                                        href="https://www.facebook.com/xorazmtourandtravels"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 w-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300"
                                        aria-label="Facebook"
                                    >
                                        <FacebookIcon />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/xorazmtour_and_travels?igsh=eGE0NTZ0d2EwZnpr"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 w-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300"
                                        aria-label="Instagram"
                                    >
                                        <InstagramIcon />
                                    </a>
                                    <a
                                        href="https://t.me/xorazmtourandtravels"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 w-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300"
                                        aria-label="Telegram"
                                    >
                                        <TelegramIcon />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form (Column 3, 4 & 5) */}
                        <div className="contact-form-panel">
                            <h3 className="font-serif text-3xl font-bold text-navy mb-2">
                                Send us a Message
                            </h3>
                            <p className="text-gray-500 text-sm mb-8">
                                Fill out the form below and we will get back to you within 24 hours.
                            </p>

                            {submitSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3 items-start"
                                >
                                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-green-900">
                                            {t('contact.success')}
                                        </p>
                                        <p className="text-green-700 text-sm">
                                            We'll get back to you as soon as possible.
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="contact-form-grid">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-bold text-navy/70 mb-2">
                                            {t('contact.name')}
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="contact-input"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-bold text-navy/70 mb-2">
                                            {t('contact.email')}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="contact-input"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-navy/70 mb-2">
                                        {t('contact.subject')}
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="contact-input"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-navy/70 mb-2">
                                        {t('contact.message')}
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="contact-input resize-none"
                                        placeholder="Tell us about your travel plans..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold/90 transition-all duration-300 shadow-lg shadow-gold/20 flex items-center justify-center gap-2 text-sm uppercase tracking-widest disabled:opacity-50"
                                >
                                    <Send className="h-4 w-4" />
                                    {isSubmitting ? t('contact.sending') : t('contact.send')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
