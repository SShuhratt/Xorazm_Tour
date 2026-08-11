import React, { useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Festival } from '@/types';
import MainLayout from '@/layouts/main-layout';
import { Sparkles, MapPin, Calendar, Award, ArrowLeft } from 'lucide-react';

interface Props {
    festival: Festival;
    locale: 'en' | 'ru' | 'uz';
}

const festivalVideos: Record<string, string> = {
    'qovun-sayli': '/XT_content/festivals/Qovun-sayli/qovun-sayli.mp4',
};

const festivalMetadata: Record<string, Record<'en' | 'ru' | 'uz', { date: string; type: string; highlight: string }>> = {
    'qovun-sayli': {
        en: { date: "August (Annual)", type: "Harvest & Tasting", highlight: "30+ Melon Varieties & Folk Performances" },
        ru: { date: "Август (Ежегодно)", type: "Праздник Урожая", highlight: "Дегустация 30+ сортов дынь и фольклор" },
        uz: { date: "Avgust (Har yili)", type: "Hosil bayrami", highlight: "30 dan ortiq qovun navlari va xalq o'yinlari" }
    },
    'lazgi-dance-festival': {
        en: { date: "April (Biennial)", type: "Dance & Music", highlight: "International Dance Teams & Masterclasses" },
        ru: { date: "Апрель (Раз в 2 года)", type: "Танцы и Музыка", highlight: "Международные труппы и мастер-классы" },
        uz: { date: "Aprel (Har 2 yilda)", type: "Raqs va musiqa", highlight: "Xalqaro guruhlar va mahorat darslari" }
    },
    'sharq-taronalari': {
        en: { date: "August (Biennial)", type: "World Music", highlight: "Eastern Classical Melodies & International Contest" },
        ru: { date: "Август (Раз в 2 года)", type: "Этническая музыка", highlight: "Восточные мотивы и международный конкурс" },
        uz: { date: "Avgust (Har 2 yilda)", type: "Jahon musiqasi", highlight: "Sharq taronalari va xalqaro tanlov" }
    },
    'samarkand-artisan-festival': {
        en: { date: "September (Annual)", type: "Handmade Crafts", highlight: "Ceramic, Silk & Gold Embroidery Bazaar" },
        ru: { date: "Сентябрь (Ежегодно)", type: "Ремесленный фестиваль", highlight: "Керамика, шелк и золотое шитье" },
        uz: { date: "Sentabr (Har yili)", type: "Amaliy san'at", highlight: "Kulolchilik, ipak va zardo'zlik bozorlari" }
    },
    'silk-and-spices-festival': {
        en: { date: "May (Annual)", type: "Cultural Bazaar", highlight: "Spices, Silks, Carpets & Grand Caravan Parade" },
        ru: { date: "Май (Ежегодно)", type: "Культурный базар", highlight: "Специи, ковры, шелк и шествие караванов" },
        uz: { date: "May (Har yili)", type: "Madaniy bozor", highlight: "Ziravorlar, ipak gilamlar va karvon paradi" }
    },
    'bukhara-folk-festival': {
        en: { date: "October (Annual)", type: "Folklore Heritage", highlight: "Puppet Theatre, Street Acrobatics & Costumes" },
        ru: { date: "Октябрь (Ежегодно)", type: "Фольклорный фестиваль", highlight: "Кукольные театры, канатоходцы и костюмы" },
        uz: { date: "Oktabr (Har yili)", type: "Folklor merosi", highlight: "Qo'g'irchoq teatri va milliy liboslar" }
    },
    'tashkent-international-film-festival': {
        en: { date: "September (Annual)", type: "Cinema Arts", highlight: "World Film Premieres & Red Carpet Stars" },
        ru: { date: "Сентябрь (Ежегодно)", type: "Киноискусство", highlight: "Мировые кинопремьеры и звездные гости" },
        uz: { date: "Sentabr (Har yili)", type: "Kino san'ati", highlight: "Jahon premyeralari va yulduzlar tashrifi" }
    },
    'tashkent-food-festival': {
        en: { date: "June (Annual)", type: "Gastronomy", highlight: "Mega Pilaf Cook-offs & Traditional street eats" },
        ru: { date: "Июнь (Ежегодно)", type: "Гастрономия", highlight: "Приготовление мега-плова и уличная еда" },
        uz: { date: "Iyun (Har yili)", type: "Gastronomiya", highlight: "Mega palov tayyorlash va milliy taomlar" }
    }
};

const labels = {
    date: { en: "Event Season", ru: "Сезон проведения", uz: "O'tkazilish vaqti" },
    type: { en: "Festival Type", ru: "Тип фестиваля", uz: "Festival turi" },
    highlight: { en: "Main Highlight", ru: "Главное событие", uz: "Asosiy voqea" },
    coordinates: { en: "Coordinates", ru: "Координаты", uz: "Koordinatalar" },
    backBtn: { en: "Back to Festivals", ru: "Назад к фестивалям", uz: "Festivallarga qaytish" },
    gallery: { en: "Festival Gallery", ru: "Галерея фестиваля", uz: "Festival rasmlari" },
    videoShowcase: { en: "Festival Video Showcase", ru: "Видеогалерея фестиваля", uz: "Festival video lavhasi" },
};

function Show({ festival, locale }: Props) {
    // TypeScript safe translation finding
    const translation = festival.translations.find(t => t.locale === locale)
        || festival.translations[0];

    const meta = useMemo(() => {
        return festivalMetadata[festival.slug]?.[locale];
    }, [festival.slug, locale]);

    const videoUrl = useMemo(() => {
        return festivalVideos[festival.slug];
    }, [festival.slug]);

    return (
        <div className="bg-cream min-h-screen pb-20">
            <Head title={translation.title} />

            {/* Page Hero banner */}
            <section className="page-hero relative min-h-[50vh] flex items-end overflow-hidden bg-navy">
                <div className="page-hero-bg absolute inset-0 z-0">
                    <img 
                        src={festival.main_image?.path || "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1600&q=80"} 
                        className="w-full h-full object-cover opacity-35" 
                        alt={translation.title} 
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
                    <span className="text-gold-light text-xs font-bold uppercase tracking-widest mb-3 block flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                        {locale === 'ru' ? 'Культурное наследие' : locale === 'uz' ? 'Madaniy meros' : 'Cultural Heritage'}
                    </span>
                    <h1 className="font-serif text-white mb-4 text-4xl md:text-5xl lg:text-6xl drop-shadow-md leading-tight">
                        {translation.title}
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
                            {meta?.date || "N/A"}
                        </span>
                    </div>
                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {labels.type[locale]}
                        </span>
                        <span className="text-navy font-bold text-base mt-1 flex items-center gap-1">
                            <Award className="w-4 h-4 text-gold flex-shrink-0" />
                            {meta?.type || "N/A"}
                        </span>
                    </div>
                    <div className="summary-dashboard-item border-none">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {labels.highlight[locale]}
                        </span>
                        <span className="font-serif text-sm font-semibold text-navy leading-snug">
                            {meta?.highlight || "N/A"}
                        </span>
                    </div>
                </div>

                {/* Main Prose Text Section */}
                <div className="max-w-4xl mx-auto mt-16 prose prose-lg text-gray-700 bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-gold/15 relative">
                    <div className="absolute top-4 right-4 text-gold/10 font-serif text-8xl pointer-events-none select-none">
                        🕌
                    </div>
                    <p className="first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-gold italic text-navy font-serif leading-relaxed text-lg sm:text-xl">
                        {translation.description}
                    </p>
                </div>

                {/* Video Showcase Section */}
                {videoUrl && (
                    <section className="mt-20 mb-20 max-w-4xl mx-auto">
                        <h3 className="font-serif text-3xl text-navy mb-8 text-center border-b border-gold/20 pb-4 inline-block mx-auto w-fit">
                            {labels.videoShowcase[locale]}
                        </h3>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gold bg-navy aspect-video group">
                            <video 
                                src={videoUrl} 
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
                                        alt={translation.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <span className="text-white text-xs tracking-wider font-semibold font-sans">
                                            {translation.title}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Map Section */}
            {festival.latitude && festival.longitude && (
                <section className="relative h-96 bg-gray-200 overflow-hidden border-t-4 border-b-4 border-gold mt-24">
                    <iframe
                        title={`${translation.title} Location Map`}
                        src={`https://maps.google.com/maps?q=${festival.latitude},${festival.longitude}&z=13&output=embed`}
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
