import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Tour, City, Post, Festival, Hotel } from '@/types';
import MainLayout from '@/layouts/main-layout';
import HeroCarousel from '@/components/hero-carousel';
import { Clock, ArrowRight } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';
import IntroPreloader from '@/components/intro-preloader';

interface Props {
    featuredTours: Tour[];
    cities: City[];
    latestPosts: Post[];
    festivals: Festival[];
    hotels: Hotel[];
    locale: 'en' | 'ru' | 'uz';
}

function Home({ featuredTours, cities, latestPosts, festivals, hotels, locale }: Props) {
    const { t } = useTranslations();

    const getTourCategory = (tour: Tour): 'cultural' | 'adventure' | 'premium' => {
        if (tour.category === 'adventure' || tour.category === 'premium' || tour.category === 'cultural') {
            return tour.category;
        }
        return 'cultural';
    };

    const getCategoryBadgeColorClass = (category: string) => {
        if (category === 'adventure') return 'bg-terracotta text-white';
        return 'bg-gold text-white';
    };

    return (
        <div
            className="bg-ivory"
            style={{
                backgroundImage: 'url(/XT_content/khiva/Photos/hero_background.jpg)',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <div className="bg-ivory/95 backdrop-blur-sm">
                <IntroPreloader />
                <Head title="Discover Ancient Uzbekistan" />

                {/* Hero section */}
                <HeroCarousel
                    cities={cities}
                    festivals={festivals}
                    hotels={hotels}
                    featuredTours={featuredTours}
                    locale={locale}
                />

                {/* CITIES SECTION - CARD STYLE */}
                <section className="py-20 sm:py-32 bg-ivory">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy font-bold mb-4">
                                {t('home.destinations')}
                            </h2>
                            <p className="text-gray-600 text-lg">{t('home.destinations_sub')}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                        >
                            {cities.map((city, idx) => {
                                const cityT = city.translations.find(trans => trans.locale === locale) || city.translations[0];
                                return (
                                    <motion.div
                                        key={city.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link href={`/${locale}/cities/${city.slug}`}>
                                            <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gold/25 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 h-full">
                                                <div className="relative h-48 overflow-hidden bg-navy/5 flex-shrink-0">
                                                    <img
                                                        src={city.main_image?.path}
                                                        alt={cityT.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-xs font-bold tracking-widest uppercase rounded bg-gold text-white">
                                                        {locale === 'ru' ? 'Достопримечательность' : locale === 'uz' ? 'Tarixiy obida' : 'Landmark'}
                                                    </span>
                                                </div>
                                                <div className="p-6 flex flex-col flex-grow justify-between">
                                                    <div>
                                                        <h3 className="font-serif text-2xl text-navy mb-3 group-hover:text-gold transition-colors duration-300 font-bold leading-tight line-clamp-1">
                                                            {cityT.name}
                                                        </h3>
                                                        <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">
                                                            {cityT.description || t('carousel.city_desc')}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <div className="w-full inline-flex items-center justify-center py-3 bg-turquoise text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-turquoise-light hover:shadow-lg transition-all duration-300">
                                                            {t('home.explore_city')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* FEATURED TOURS SECTION - CARD STYLE */}
                <section className="py-20 sm:py-32 bg-navy">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="mb-16 text-center"
                        >
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold font-bold mb-4">
                                {t('home.curated')}
                            </h2>
                            <p className="text-ivory/70 text-lg">{t('tours.subtitle')}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {featuredTours.map((tour, idx) => {
                                const tourT = tour.translations.find(trans => trans.locale === locale) || tour.translations[0];
                                return (
                                    <motion.div
                                        key={tour.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link href={`/${locale}/tours/${tour.slug}`}>
                                            <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gold/25 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 h-full">
                                                <div className="relative h-48 overflow-hidden bg-navy/5 flex-shrink-0">
                                                    <img
                                                        src={tour.main_image?.path}
                                                        alt={tourT.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <span className={`absolute top-4 left-4 z-10 px-3 py-1.5 text-xs font-bold tracking-widest uppercase rounded ${getCategoryBadgeColorClass(getTourCategory(tour))}`}>
                                                        {getTourCategory(tour) === 'adventure' 
                                                            ? (locale === 'ru' ? 'Приключение' : locale === 'uz' ? 'Sarguzasht' : 'Adventure')
                                                            : getTourCategory(tour) === 'premium'
                                                            ? (locale === 'ru' ? 'Премиум' : locale === 'uz' ? 'Premium' : 'Premium')
                                                            : (locale === 'ru' ? 'Культура' : locale === 'uz' ? 'Madaniyat' : 'Cultural')
                                                        }
                                                    </span>
                                                </div>
                                                <div className="p-6 flex flex-col flex-grow justify-between">
                                                    <div>
                                                        <h3 className="font-serif text-2xl text-navy mb-3 group-hover:text-gold transition-colors duration-300 font-bold leading-tight">
                                                            {tourT.title}
                                                        </h3>
                                                        <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">
                                                            {tourT.description || t('carousel.tour_desc', { duration: tourT.duration })}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-4 text-sm text-gray-500 font-semibold mb-4">
                                                            <div className="flex items-center gap-1.5">
                                                                <Clock className="w-4.5 h-4.5 text-gold" />
                                                                <span>
                                                                    {typeof tourT.duration === 'string' && /[a-zA-Zа-яА-Я]/.test(tourT.duration)
                                                                        ? tourT.duration
                                                                        : `${tourT.duration} ${t('home.days')}`}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-turquoise text-base font-semibold mb-4">
                                                            {locale === 'ru' ? 'От' : locale === 'uz' ? 'Dan' : 'From'}{' '}
                                                            <span className="font-serif text-2xl font-bold">
                                                                ${tour.cost}
                                                            </span>{' '}
                                                            <span className="text-gray-500 text-sm font-normal">
                                                                / {locale === 'ru' ? 'чел' : locale === 'uz' ? 'kishi' : 'person'}
                                                            </span>
                                                        </div>
                                                        <div className="w-full inline-flex items-center justify-center py-3 bg-turquoise text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-turquoise-light hover:shadow-lg transition-all duration-300">
                                                            {locale === 'ru' ? 'Детали' : locale === 'uz' ? 'Batafsil' : 'Details'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* FESTIVALS & STORIES SECTION */}
                <section className="py-20 sm:py-32 bg-ivory">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Festivals */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-serif text-3xl sm:text-4xl text-navy font-bold mb-8">
                                {t('home.upcoming_festivals')}
                            </h2>
                            <div className="space-y-4">
                                {festivals.map((fest, idx) => {
                                    const festT = fest.translations.find(trans => trans.locale === locale) || fest.translations[0];
                                    return (
                                        <motion.div
                                            key={fest.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <Link href={`/${locale}/festivals/${fest.slug}`}>
                                                <div className="group p-4 bg-white rounded-lg border border-gold/20 hover:border-gold hover:shadow-lg transition-all duration-300 flex gap-4">
                                                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-navy/10">
                                                        <img
                                                            src={fest.main_image?.path}
                                                            alt={festT.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <div className="flex-1 flex flex-col justify-center">
                                                        <h4 className="font-serif text-xl text-navy group-hover:text-gold transition-colors duration-300 font-bold">
                                                            {festT.title}
                                                        </h4>
                                                        <p className="text-gray-700 text-base line-clamp-1 font-medium">{festT.description}</p>
                                                    </div>
                                                    <ArrowRight className="h-5 w-5 text-gold flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Latest Stories */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-serif text-3xl sm:text-4xl text-navy font-bold mb-8">
                                {t('home.latest_stories')}
                            </h2>
                            <div className="space-y-6">
                                {latestPosts.map((post, idx) => {
                                    const postT = post.translations.find(trans => trans.locale === locale) || post.translations[0];
                                    return (
                                        <motion.article
                                            key={post.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <Link href={`/${locale}/posts/${post.slug}`}>
                                                <div className="group">
                                                    <div className="story-card-image-wrapper">
                                                        <img
                                                            src={post.main_image?.path}
                                                            alt={postT.title}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                                    </div>
                                                    <h4 className="font-serif text-2xl text-navy group-hover:text-gold transition-colors duration-300 font-bold line-clamp-2">
                                                        {postT.title}
                                                    </h4>
                                                    <p className="text-gray-700 text-base mt-3 line-clamp-2 font-medium">
                                                        {postT.description || 'Read more about Xorazm'}
                                                    </p>
                                                </div>
                                            </Link>
                                        </motion.article>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
}

Home.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Home;
