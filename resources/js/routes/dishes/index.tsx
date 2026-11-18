import React, { useRef, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/layouts/main-layout';
import { useTranslations } from '@/hooks/use-translations';
import { Dish, PageProps } from '@/types';
import { MapPin, ArrowRight, Utensils, ChevronLeft, ChevronRight } from 'lucide-react';

interface DishesIndexProps {
    dbDishes?: Dish[];
}

export default function DishesIndex({ dbDishes }: DishesIndexProps) {
    const { locale } = usePage<PageProps>().props;
    const { t } = useTranslations();
    const [activeRegion, setActiveRegion] = useState<string>('all');
    const regionScrollRef = useRef<HTMLDivElement>(null);

    const scrollRegions = (direction: 'left' | 'right') => {
        if (!regionScrollRef.current) return;
        regionScrollRef.current.scrollBy({
            left: direction === 'left' ? -180 : 180,
            behavior: 'smooth',
        });
    };

    const regions = [
        { code: 'all', label: t('dishes.regions.all') },
        { code: 'xorazm', label: t('dishes.regions.xorazm') },
        { code: 'qoraqalpogiston', label: t('dishes.regions.qoraqalpogiston') },
        { code: 'tashkent', label: t('dishes.regions.tashkent') },
        { code: 'samarkand', label: t('dishes.regions.samarkand') },
        { code: 'bukhara', label: t('dishes.regions.bukhara') },
        { code: 'fergana', label: t('dishes.regions.fergana') },
        { code: 'andijan', label: t('dishes.regions.andijan') },
        { code: 'namangan', label: t('dishes.regions.namangan') },
        { code: 'kashkadarya', label: t('dishes.regions.kashkadarya') },
        { code: 'surkhandarya', label: t('dishes.regions.surkhandarya') },
        { code: 'jizzakh', label: t('dishes.regions.jizzakh') },
        { code: 'syrdarya', label: t('dishes.regions.syrdarya') },
        { code: 'navoi', label: t('dishes.regions.navoi') },
    ];

    const dishes = (dbDishes || []).map((item) => {
        const trans = item.translations?.find((tr) => tr.locale === locale)
            || item.translations?.find((tr) => tr.locale === 'en')
            || item.translations?.[0];
        const mainImg = item.main_image?.path || item.images?.[0]?.path || '/XT_content/khiva/Photos/hero_background.jpg';
        return {
            slug: item.slug,
            originRegion: (item.origin_region || '').toLowerCase(),
            image: mainImg,
            name: trans?.name || item.slug,
            origin: trans?.origin || item.origin_region || 'Uzbekistan',
            type: trans?.type || item.category || 'Traditional Dish',
            shortDesc: trans?.short_description || '',
        };
    });

    const filteredDishes = activeRegion === 'all'
        ? dishes
        : dishes.filter((dish) => dish.originRegion === activeRegion || dish.slug === activeRegion);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };

    return (
        <MainLayout>
            <Head>
                <title>{t('dishes.title')}</title>
                <meta name="description" content={t('dishes.subtitle')} />
            </Head>

            {/* Header Banner */}
            <section className="relative overflow-hidden bg-navy pt-28 pb-16 sm:pt-36 sm:pb-24">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-turquoise/5 rounded-full blur-3xl" />
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#b8860b_1px,transparent_1px)] [background-size:16px_16px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-semibold mb-6 tracking-wider uppercase"
                    >
                        <Utensils className="h-3.5 w-3.5" />
                        {t('dishes.heritage')}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-ivory mb-6 leading-tight"
                    >
                        {t('dishes.title')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base sm:text-lg lg:text-xl text-gold-muted max-w-3xl mx-auto leading-relaxed"
                    >
                        {t('dishes.subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Main Content & Filters */}
            <section className="py-12 bg-ivory">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Geographic Filter Bar (horizontal scroll with arrows on mobile, wrapped on desktop) */}
                    <div className="mb-12 border-b border-gold/10 pb-4">
                        <div className="flex items-center gap-1.5 md:block">
                            <button
                                type="button"
                                onClick={() => scrollRegions('left')}
                                aria-label="Scroll categories left"
                                className="md:hidden shrink-0 w-8 h-8 rounded-full bg-white border border-gold/25 text-navy hover:border-gold hover:bg-gold/10 flex items-center justify-center shadow-sm transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <div
                                ref={regionScrollRef}
                                className="flex-1 flex items-center flex-nowrap md:flex-wrap md:justify-center gap-2 overflow-x-auto md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1"
                            >
                                {regions.map((reg) => {
                                    const isActive = activeRegion === reg.code;
                                    return (
                                        <button
                                            key={reg.code}
                                            type="button"
                                            onClick={() => setActiveRegion(reg.code)}
                                            className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                                                isActive
                                                    ? 'bg-gold text-navy shadow-md md:scale-105 border border-gold'
                                                    : 'bg-white text-navy/70 border border-gold/10 hover:border-gold/30 hover:bg-gold/5'
                                            }`}
                                        >
                                            {reg.label}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                type="button"
                                onClick={() => scrollRegions('right')}
                                aria-label="Scroll categories right"
                                className="md:hidden shrink-0 w-8 h-8 rounded-full bg-white border border-gold/25 text-navy hover:border-gold hover:bg-gold/10 flex items-center justify-center shadow-sm transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Dishes Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredDishes.map((dish) => {
                                return (
                                    <motion.article
                                        key={dish.slug}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        layout
                                        className="group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gold/10 hover:shadow-md hover:border-gold/30 transition-all duration-300"
                                    >
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/3] overflow-hidden bg-navy-light">
                                            <img
                                                src={dish.image}
                                                alt={dish.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {/* Decorative soft overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            {/* Region Badge */}
                                            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/80 backdrop-blur-sm text-gold border border-gold/20 text-xs font-medium">
                                                <MapPin className="h-3 w-3" />
                                                {dish.origin.split(',')[0]}
                                            </div>
                                        </div>

                                        {/* Info Content */}
                                        <div className="flex flex-col flex-grow p-6">
                                            <div className="text-[10px] uppercase tracking-wider text-turquoise font-semibold mb-2">
                                                {dish.type}
                                            </div>

                                            <h3 className="font-serif text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                                                {dish.name}
                                            </h3>

                                            <p className="text-navy/70 text-sm leading-relaxed mb-6 flex-grow">
                                                {dish.shortDesc}
                                            </p>

                                            <div className="pt-4 border-t border-gold/10 mt-auto">
                                                <Link
                                                    href={`/${locale}/dishes/${dish.slug}`}
                                                    className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-navy uppercase tracking-wider transition-all duration-300"
                                                >
                                                    {t('dishes.view_details')}
                                                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </MainLayout>
    );
}
