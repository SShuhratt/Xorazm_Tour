import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Festival } from '@/types';
import MainLayout from '@/layouts/main-layout';
import { Sparkles, Calendar, Award, ArrowLeft } from 'lucide-react';

interface Props {
    festival: Festival;
    locale: 'en' | 'ru' | 'uz';
}

const labels = {
    date: { en: 'Event Season', ru: 'Сезон проведения', uz: "O'tkazilish vaqti" },
    type: { en: 'Festival Type', ru: 'Тип фестиваля', uz: 'Festival turi' },
    highlight: { en: 'Main Highlight', ru: 'Главное событие', uz: 'Asosiy voqea' },
    backBtn: { en: 'Back to Festivals', ru: 'Назад к фестивалям', uz: 'Festivallarga qaytish' },
    gallery: { en: 'Festival Gallery', ru: 'Галерея фестиваля', uz: 'Festival rasmlari' },
    videoShowcase: { en: 'Festival Video Showcase', ru: 'Видеогалерея фестиваля', uz: 'Festival video lavhasi' },
};

function Show({ festival, locale }: Props) {
    const translation = festival.translations.find((t) => t.locale === locale)
        || festival.translations.find((t) => t.locale === 'en')
        || festival.translations[0];

    const lat = festival.latitude ? Number(festival.latitude) : null;
    const lon = festival.longitude ? Number(festival.longitude) : null;
    const hasCoords = lat !== null && lon !== null && Number.isFinite(lat) && Number.isFinite(lon);
    const osmMapUrl = hasCoords
        ? `https://www.openstreetmap.org/export/embed.html?bbox=${(lon - 0.006).toFixed(4)}%2C${(lat - 0.006).toFixed(4)}%2C${(lon + 0.006).toFixed(4)}%2C${(lat + 0.006).toFixed(4)}&layer=mapnik&marker=${lat.toFixed(4)}%2C${lon.toFixed(4)}`
        : null;

    return (
        <div className="bg-cream min-h-screen pb-20">
            <Head title={translation?.title || festival.slug} />

            {/* Page Hero banner */}
            <section className="page-hero relative min-h-[50vh] flex items-end overflow-hidden bg-navy">
                <div className="page-hero-bg absolute inset-0 z-0">
                    <img
                        src={festival.main_image?.path || festival.images?.[0]?.path || '/XT_content/khiva/Photos/khiva_main.jpg'}
                        className="w-full h-full object-cover opacity-35"
                        alt={translation?.title || festival.slug}
                    />
                    <div className="page-hero-gradient absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent z-1" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full relative z-10">
                    <Link
                        href={`/${locale}/festivals`}
                        className="inline-flex items-center gap-1 text-gold hover:text-white text-xs font-bold uppercase tracking-wider mb-6 transition-colors duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {labels.backBtn[locale]}
                    </Link>
                    <span className="text-gold-light text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                        {locale === 'ru' ? 'Культурное наследие' : locale === 'uz' ? 'Madaniy meros' : 'Cultural Heritage'}
                    </span>
                    <h1 className="font-serif text-white mb-4 text-4xl md:text-5xl lg:text-6xl drop-shadow-md leading-tight">
                        {translation?.title || festival.slug}
                    </h1>
                </div>
            </section>

            <div className="islamic-border" />

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

                {/* Summary Dashboard Card */}
                <div className="summary-dashboard animate__animated animate__fadeIn">
                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {labels.date[locale]}
                        </span>
                        <span className="text-navy font-bold text-base mt-1 flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                            {translation?.event_season || 'Seasonal'}
                        </span>
                    </div>
                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {labels.type[locale]}
                        </span>
                        <span className="text-navy font-bold text-base mt-1 flex items-center gap-1">
                            <Award className="w-4 h-4 text-gold flex-shrink-0" />
                            {translation?.festival_type || 'Cultural Festival'}
                        </span>
                    </div>
                    <div className="summary-dashboard-item border-none">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {labels.highlight[locale]}
                        </span>
                        <span className="font-serif text-sm font-semibold text-navy leading-snug">
                            {translation?.highlight || translation?.title || ''}
                        </span>
                    </div>
                </div>

                {/* Main Prose Text Section */}
                {translation?.description && (
                    <div className="max-w-4xl mx-auto mt-16 prose prose-lg text-gray-700 bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-gold/15 relative">
                        <div className="absolute top-4 right-4 text-gold/10 font-serif text-8xl pointer-events-none select-none">
                            🕌
                        </div>
                        <p className="first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-gold italic text-navy font-serif leading-relaxed text-lg sm:text-xl">
                            {translation.description}
                        </p>
                    </div>
                )}

                {/* Video Showcase Section */}
                {festival.video_url && (
                    <section className="mt-20 mb-20 max-w-4xl mx-auto">
                        <h3 className="font-serif text-3xl text-navy mb-8 text-center border-b border-gold/20 pb-4 inline-block mx-auto w-fit">
                            {labels.videoShowcase[locale]}
                        </h3>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gold bg-navy aspect-video group">
                            <video
                                src={festival.video_url}
                                controls
                                className="w-full h-full object-cover"
                                poster={festival.main_image?.path}
                            />
                        </div>
                    </section>
                )}

                {/* Secondary Gallery (if available) */}
                {festival.images && festival.images.length > 0 && (
                    <section className="mt-20">
                        <h3 className="font-serif text-3xl text-navy mb-12 text-center">
                            {labels.gallery[locale]}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {festival.images.map((img) => (
                                <motion.div
                                    key={img.id}
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-64 rounded-xl overflow-hidden border border-gold/15 shadow-md relative group"
                                >
                                    <img
                                        src={img.path}
                                        loading="lazy"
                                        alt={translation?.title || festival.slug}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <span className="text-white text-xs tracking-wider font-semibold font-sans">
                                            {translation?.title || festival.slug}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Map Section */}
            {osmMapUrl && (
                <section className="relative h-96 bg-gray-200 overflow-hidden border-t-4 border-b-4 border-gold mt-24">
                    <iframe
                        title={`${translation?.title || festival.slug} Location Map`}
                        src={osmMapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                    />
                </section>
            )}
        </div>
    );
}

Show.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Show;
