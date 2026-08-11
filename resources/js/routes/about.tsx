import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/main-layout';
import { useTranslations } from '@/hooks/use-translations';
import { PageProps } from '@/types';
import { Users, Target, Shield, Award } from 'lucide-react';

export default function About() {
    const { locale } = usePage<PageProps>().props;
    const { t } = useTranslations();

    const stats = [
        { icon: Award, label: t('about.stats_tours'), value: '500+' },
        { icon: Users, label: t('about.stats_guests'), value: '8,500+' },
        { icon: Target, label: t('about.stats_years'), value: '15+' },
        { icon: Shield, label: t('about.stats_cities'), value: '12' },
    ];

    const whyChoose = [
        {
            title: t('about.why_local'),
            description: t('about.why_local_text'),
            icon: Users,
        },
        {
            title: t('about.why_curated'),
            description: t('about.why_curated_text'),
            icon: Target,
        },
        {
            title: t('about.why_heritage'),
            description: t('about.why_heritage_text'),
            icon: Shield,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <MainLayout>
            <Head title={t('about.title')} />

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
                        {t('about.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg sm:text-xl text-gold leading-relaxed"
                    >
                        {t('about.subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 sm:py-32 bg-ivory">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Logo Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative rounded-2xl overflow-hidden bg-navy p-8 flex items-center justify-center border border-gold/30 shadow-2xl h-80 sm:h-96"
                        >
                            <img
                                src="/images/logo_transparent.png"
                                alt="XORAZM TOUR AND TRAVELS Logo"
                                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-6">
                                {t('about.mission_title')}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                {t('about.mission_text')}
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                                    <p className="text-gray-700">Authentic local expertise and heritage knowledge</p>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                                    <p className="text-gray-700">Sustainable and responsible tourism practices</p>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                                    <p className="text-gray-700">Personalized itineraries for every traveler</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 sm:py-32 bg-navy">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
                    >
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="text-center"
                                >
                                    <div className="flex justify-center mb-4">
                                        <Icon className="h-12 w-12 text-gold" />
                                    </div>
                                    <div className="font-serif text-3xl sm:text-4xl font-bold text-gold mb-2">
                                        {stat.value}
                                    </div>
                                    <p className="text-ivory/70 text-sm sm:text-base">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 sm:py-32 bg-ivory">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-4">
                            {t('about.why_title')}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover what sets Xorazm Tour apart as your premier choice for exploring the Silk Road
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {whyChoose.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gold/10"
                                >
                                    <div className="flex justify-center mb-6">
                                        <Icon className="h-12 w-12 text-gold group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <h3 className="font-serif text-xl font-bold text-navy mb-4 text-center">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-center leading-relaxed">
                                        {item.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 sm:py-32 bg-navy">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory mb-6">
                            {t('about.cta_title')}
                        </h2>
                        <p className="text-lg text-ivory/70 mb-8">
                            {t('about.cta_subtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={`/${locale}/tours`}
                                className="inline-block px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-colors duration-300"
                            >
                                {t('about.explore_tours')}
                            </Link>
                            <Link
                                href={`/${locale}/contact`}
                                className="inline-block px-8 py-4 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold/10 transition-colors duration-300"
                            >
                                {t('about.get_in_touch')}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </MainLayout>
    );
}
