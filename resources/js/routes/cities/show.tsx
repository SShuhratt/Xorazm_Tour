import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { City as CityType } from '@/types';
import MainLayout from '@/layouts/main-layout';
import { useTranslations } from '@/hooks/use-translations';

interface Props {
    city: CityType;
}

const labels = {
    era: {
        en: "Historical Foundation",
        ru: "Эпоха основания",
        uz: "Tarixiy poydevor"
    },
    status: {
        en: "Heritage Status",
        ru: "Статус наследия",
        uz: "Muhofaza maqomi"
    },
    time: {
        en: "Recommended Time",
        ru: "Рекомендуемое время",
        uz: "Tavsiya etilgan vaqt"
    },
    explore: {
        en: "Explore Tours",
        ru: "Исследовать туры",
        uz: "Turlarni ko'rish"
    },
    destinationsTitle: {
        en: "Key Historical Sights",
        ru: "Ключевые достопримечательности",
        uz: "Asosiy tarixiy obidalar"
    }
};

function Show({ city }: Props) {
    const { t, locale } = useTranslations();
    const translation = city.translations.find(trans => trans.locale === locale)
        || city.translations.find(trans => trans.locale === 'en')
        || city.translations[0];

    const cityDestinations = useMemo(() => {
        const items = Array.isArray(translation?.highlights) ? translation.highlights : [];
        return items.map((item, idx) => ({
            ...item,
            id: item.id ?? idx + 1,
        }));
    }, [translation]);

    const [selectedDestId, setSelectedDestId] = useState<number | null>(null);
    const activeSelectedId = selectedDestId ?? cityDestinations[0]?.id ?? null;

    const activeDest = useMemo(() => {
        if (!activeSelectedId || cityDestinations.length === 0) return null;
        return cityDestinations.find(d => d.id === activeSelectedId) || cityDestinations[0];
    }, [activeSelectedId, cityDestinations]);

    return (
        <div className="bg-cream min-h-screen">
            <Head title={translation?.name || city.slug} />

            {/* Header / Hero */}
            <section className="page-hero relative min-h-[45vh] flex items-end overflow-hidden bg-navy">
                <div className="page-hero-bg absolute inset-0 z-0">
                    <img 
                        src={city.main_image?.path || city.images?.[0]?.path || "/XT_content/khiva/Photos/hero_background.jpg"} 
                        className="w-full h-full object-cover opacity-40" 
                        alt={translation?.name || city.slug} 
                    />
                    <div className="page-hero-gradient absolute inset-0 bg-gradient-to-t from-navy to-navy/40 z-1" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full relative z-10">
                    <span className="text-gold-light text-xs font-bold uppercase tracking-widest mb-3 block">
                        {t('cities.historical_center')}
                    </span>
                    <h1 className="font-serif text-white mb-4 text-4xl md:text-5xl drop-shadow-md">
                        {translation?.name || city.slug}
                    </h1>
                </div>
            </section>

            <div className="islamic-border" />

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                
                {/* Summary Dashboard Card */}
                <div className="summary-dashboard animate__animated animate__fadeIn">
                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {t('cities.location')}
                        </span>
                        <code className="text-navy font-mono font-bold text-sm mt-1 bg-navy/5 px-2 py-1 rounded w-fit">
                            {city.latitude && city.longitude ? `${city.latitude}, ${city.longitude}` : 'Uzbekistan'}
                        </code>
                    </div>
                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {labels.era[locale]}
                        </span>
                        <span className="text-navy font-bold text-base mt-1">
                            {translation?.era || "Silk Road Era"}
                        </span>
                    </div>
                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {labels.status[locale]}
                        </span>
                        <span className="text-navy font-bold text-base mt-1">
                            {translation?.heritage_status || "Heritage City"}
                        </span>
                    </div>
                    <div className="summary-dashboard-item border-none">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5 block">
                                {labels.time[locale]}
                            </span>
                            <span className="font-serif text-lg font-bold text-navy">
                                {translation?.recommended_time || "1-3 Days"}
                            </span>
                        </div>
                        {city.tours && city.tours.length > 0 && (
                            <a 
                                href="#adventures-section"
                                className="summary-dashboard-btn mt-3 block text-center"
                            >
                                {labels.explore[locale]}
                            </a>
                        )}
                    </div>
                </div>

                {/* Main Description */}
                {translation?.description && (
                    <div className="prose prose-lg text-gray-600 max-w-none mb-20">
                        <p className="italic text-xl border-l-4 border-gold pl-6 py-4 bg-gold/5 shadow-md rounded-r-lg text-navy leading-relaxed font-serif">
                            {translation.description}
                        </p>
                    </div>
                )}

                {/* Destinations Section */}
                {cityDestinations.length > 0 && (
                    <div className="mb-32">
                        <h3 className="font-serif text-4xl text-navy mb-12 border-b-2 border-gold/20 pb-4 inline-block">
                            {labels.destinationsTitle[locale]}
                        </h3>
                        
                        <div className="itinerary-layout-wrapper">
                            {/* Left Column: Scrollable list of day parts (destinations) */}
                            <div className="itinerary-scroll-container">
                                <div className="timeline-container">
                                    {cityDestinations.map((dest, index) => {
                                        const isSelected = dest.id === (selectedDestId ?? cityDestinations[0]?.id);
                                        return (
                                            <div key={dest.id} className="timeline-section relative">
                                                <div className="timeline-day-circle bg-gold text-navy font-bold text-sm">
                                                    {index + 1}
                                                </div>

                                                <div className="w-full">
                                                    <div
                                                        onClick={() => setSelectedDestId(dest.id)}
                                                        className={`w-full text-left p-4 sm:p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 relative z-10 ${
                                                            isSelected
                                                                ? 'bg-navy border-gold text-white shadow-md'
                                                                : 'bg-white border-gold/15 text-navy hover:border-gold/50 hover:bg-gold/5'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3 w-full">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                                                                isSelected ? 'bg-gold/25 text-gold' : 'bg-navy/5 text-navy'
                                                            }`}>
                                                                🕌
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                {dest.time && (
                                                                    <span className={`font-mono text-[10px] font-bold block ${
                                                                        isSelected ? 'text-gold' : 'text-gold-muted'
                                                                    }`}>
                                                                        {dest.time}
                                                                    </span>
                                                                )}
                                                                <h5 className={`font-serif text-base sm:text-lg font-bold leading-tight ${
                                                                    isSelected ? 'text-white' : 'text-navy'
                                                                }`}>
                                                                    {dest.title}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Expanding description wrapper */}
                                                        <AnimatePresence initial={false}>
                                                            {isSelected && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    transition={{ duration: 0.25 }}
                                                                    className="pl-11 pr-2 pb-1 overflow-hidden"
                                                                >
                                                                    <p className="text-ivory/80 text-xs sm:text-sm leading-relaxed border-t border-gold/10 pt-2 mt-1">
                                                                        {dest.description}
                                                                    </p>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right Column: One constant sticky image frame */}
                            <div className="itinerary-image-container">
                                <div className="itinerary-sticky-image-frame">
                                    <AnimatePresence mode="wait">
                                        {activeDest?.image ? (
                                            <motion.img
                                                key={activeDest.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                src={activeDest.image}
                                                alt={activeDest.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-navy/10 text-gold text-sm font-semibold">
                                                Xorazm Tour
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tours in this City Section */}
                {city.tours && city.tours.length > 0 && (
                    <section id="adventures-section" className="mt-32 pt-16 border-t border-gold/20 scroll-mt-24">
                        <h3 className="font-serif text-3xl text-navy mb-8">
                            {t('cities.adventures_in', { name: translation.name })}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {city.tours.map((tour) => {
                                const tourT = tour.translations?.find(t => t.locale === locale)
                                    || tour.translations?.[0];

                                return (
                                    <Link
                                        key={tour.id}
                                        href={`/${locale}/tours/${tour.slug}`}
                                        className="group block bg-white rounded-2xl border border-gold/15 shadow-md hover:border-gold/40 hover:shadow-xl transition-all duration-300 overflow-hidden animate__animated animate__fadeInUp"
                                    >
                                        <div className="h-48 overflow-hidden relative">
                                            {tour.main_image?.path ? (
                                                <img 
                                                    src={tour.main_image.path} 
                                                    alt={tourT?.title} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-navy/10 flex items-center justify-center text-gold font-serif">
                                                    Xorazm Tour
                                                </div>
                                            )}
                                            <div className="absolute top-4 right-4 bg-navy/85 backdrop-blur-sm text-gold px-3 py-1 rounded-full text-xs font-bold font-sans">
                                                ${tour.cost}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="font-serif text-xl text-navy font-bold mb-2 group-hover:text-gold transition-colors duration-300">
                                                {tourT?.title || tour.slug}
                                            </h4>
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                                {tourT?.description}
                                            </p>
                                            <div className="flex justify-between items-center pt-4 border-t border-gold/10">
                                                <span className="text-xs uppercase tracking-wider font-bold text-gold">
                                                    {locale === 'ru' ? 'Подробнее' : locale === 'uz' ? "Batafsil" : "View Tour"}
                                                </span>
                                                <span className="text-gold group-hover:translate-x-1 transition-transform">→</span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}

            </div>

            {/* Map Section */}
            {city.latitude && city.longitude && (
                <section className="relative h-96 bg-gray-200 overflow-hidden border-t-4 border-b-4 border-gold mt-24">
                    <iframe
                        title={`${translation.name} Location Map`}
                        src={`https://maps.google.com/maps?q=${city.latitude},${city.longitude}&z=13&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </section>
            )}
        </div>
    );
}

Show.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Show;

