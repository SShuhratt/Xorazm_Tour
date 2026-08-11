import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { City as CityType } from '@/types';
import MainLayout from '@/layouts/main-layout';
import { useTranslations } from '@/hooks/use-translations';
import CardCarousel from '@/components/card-carousel';
import { MapPin, ArrowRight } from 'lucide-react';

interface Props {
    cities: CityType[];
    locale: 'en' | 'ru' | 'uz';
}

function CitiesIndex({ cities, locale }: Props) {
    const { t } = useTranslations();

    return (
        <MainLayout>
            <Head title={t('cities.title')} />

            {/* Hero Section */}
            <section className="relative bg-navy pt-32 pb-20 overflow-hidden border-b border-gold/10">
                <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-6"
                    >
                        {t('cities.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-gold/80 max-w-2xl mx-auto italic font-serif"
                    >
                        {t('cities.subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Cities Grid */}
            <section className="py-20 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cities.map((city, index) => {
                            const translation = city.translations.find(t => t.locale === locale) || city.translations[0];
                            const carouselImages = city.images 
                                ? city.images.slice(0, 3) 
                                : (city.main_image ? [city.main_image] : []);

                            return (
                                <motion.div
                                    key={city.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gold/25 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 h-full">
                                        {/* Carousel Section */}
                                        <div className="relative h-48 overflow-hidden bg-navy/5 flex-shrink-0">
                                            <CardCarousel images={carouselImages} alt={translation.name} />
                                            <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-xs font-bold tracking-widest uppercase rounded bg-gold text-white">
                                                {locale === 'ru' ? 'Достопримечательность' : locale === 'uz' ? 'Tarixiy obida' : 'Landmark'}
                                            </span>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6 flex flex-col flex-grow justify-between">
                                            <div>
                                                <h2 className="font-serif text-2xl text-navy mb-3 group-hover:text-gold transition-colors duration-300 font-bold leading-tight line-clamp-1">
                                                    {translation.name}
                                                </h2>

                                                <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">
                                                    {translation.description || 'Experience the ancient magic and breathtaking architecture of this legendary Silk Road city.'}
                                                </p>
                                            </div>

                                            <div>
                                                <Link 
                                                    href={`/${locale}/cities/${city.slug}`}
                                                    className="w-full inline-flex items-center justify-center py-3 bg-turquoise text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-turquoise-light hover:shadow-lg transition-all duration-300"
                                                >
                                                    {t('cities.explore')}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default CitiesIndex;
