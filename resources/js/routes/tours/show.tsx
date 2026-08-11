import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tour, TourSchedule } from '@/types';
import MainLayout from '@/layouts/main-layout';
import { useTranslations } from '@/hooks/use-translations';

interface Props {
    tour: Tour;
}

function Show({ tour }: Props) {
    const { t, locale } = useTranslations();
    const tourT = tour.translations.find(trans => trans.locale === locale) || tour.translations[0];
    const [selectedEventId, setSelectedEventId] = React.useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    React.useEffect(() => {
        if (tour.schedules && tour.schedules.length > 0) {
            setSelectedEventId(tour.schedules[0].id);
        }
    }, [tour.schedules]);

    const getTimeIcon = (time: string | null) => {
        if (!time) return "📍";
        const hour = parseInt(time.split(':')[0]);
        if (hour < 12) return "🌅";
        if (hour < 17) return "☀️";
        return "🌙";
    };

    const groupedSchedules = tour.schedules?.reduce((acc: Record<number, TourSchedule[]>, item) => {
        if (!acc[item.day]) acc[item.day] = [];
        acc[item.day].push(item);
        return acc;
    }, {});

    const activeEvent = React.useMemo(() => {
        if (!selectedEventId || !tour.schedules) return null;
        return tour.schedules.find(e => e.id === selectedEventId) || tour.schedules[0];
    }, [selectedEventId, tour.schedules]);

    const activeImage = React.useMemo(() => {
        if (!activeEvent || !tour.schedules) return tour.main_image;
        const index = tour.schedules.findIndex(e => e.id === activeEvent.id);
        return tour.images?.[index % (tour.images?.length || 1)] || tour.main_image;
    }, [activeEvent, tour.images, tour.main_image, tour.schedules]);

    return (
        <div className="bg-cream min-h-screen">
            <Head title={tourT.title} />

            {/* Header / Hero */}
            <section className="page-hero relative min-h-[45vh] flex items-end overflow-hidden bg-navy">
                <div className="page-hero-bg absolute inset-0 z-0">
                    <img 
                        src={tour.main_image?.path} 
                        className="w-full h-full object-cover opacity-40" 
                        alt={tourT.title} 
                    />
                    <div className="page-hero-gradient absolute inset-0 bg-gradient-to-t from-navy to-navy/40 z-1" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-light mb-3 block">
                        {locale === 'ru' ? 'Программа Тура' : locale === 'uz' ? 'Sayohat Dasturi' : 'Tour Itinerary'}
                    </span>
                    <h1 className="font-serif text-white mb-4 text-4xl md:text-5xl drop-shadow-md">
                        {tourT.title}
                    </h1>
                </div>
            </section>

            <div className="islamic-border" />

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                
                {/* Summary Dashboard Card */}
                <div className="summary-dashboard animate__animated animate__fadeIn">
                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {locale === 'ru' ? 'Маршрут' : locale === 'uz' ? 'Yo\'nalish' : 'Route Path'}
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            {tour.cities?.map((city, cIndex) => {
                                const cityT = city.translations.find(ct => ct.locale === locale) || city.translations[0];
                                return (
                                    <React.Fragment key={city.id}>
                                        <Link href={`/${locale}/cities/${city.slug}`} className="text-navy font-serif font-bold text-sm hover:text-gold transition-colors">
                                            {cityT.name}
                                        </Link>
                                        {cIndex < (tour.cities?.length || 0) - 1 && <span className="text-gold-muted font-bold text-[10px]">→</span>}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {locale === 'ru' ? 'Длительность' : locale === 'uz' ? 'Davomiyligi' : 'Duration'}
                        </span>
                        <span className="text-navy font-bold text-base mt-1">
                            {locale === 'ru'
                                ? `${tourT.duration} Дней / ${tourT.duration - 1} Ночей`
                                : locale === 'uz'
                                ? `${tourT.duration} Kun / ${tourT.duration - 1} Tun`
                                : `${tourT.duration} Days / ${tourT.duration - 1} Nights`}
                        </span>
                    </div>
                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {locale === 'ru' ? 'Размер Группы' : locale === 'uz' ? 'Guruh Hajmi' : 'Group Size'}
                        </span>
                        <span className="text-navy font-bold text-base mt-1">
                            {tour.slug.includes('premium') 
                                ? (locale === 'ru' ? 'Максимум 6 чел' : locale === 'uz' ? 'Maksimal 6 kishi' : 'Max 6 people')
                                : tour.slug.includes('desert')
                                ? (locale === 'ru' ? 'Максимум 8 чел' : locale === 'uz' ? 'Maksimal 8 kishi' : 'Max 8 people')
                                : (locale === 'ru' ? 'Максимум 12 чел' : locale === 'uz' ? 'Maksimal 12 kishi' : 'Max 12 people')
                            }
                        </span>
                    </div>
                    <div className="summary-dashboard-item border-none">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5 block">
                                {locale === 'ru' ? 'Стоимость' : locale === 'uz' ? 'Narxi' : 'Price'}
                            </span>
                            <span className="font-serif text-2xl font-bold text-turquoise">
                                ${tour.cost}
                                <span className="font-sans text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">
                                    / {locale === 'ru' ? 'чел' : locale === 'uz' ? 'kishi' : 'person'}
                                </span>
                            </span>
                        </div>
                        <button 
                            onClick={() => alert(locale === 'ru' ? 'Заявка на бронирование принята! 🧭' : locale === 'uz' ? 'Sayohat arizangiz qabul qilindi! 🧭' : 'Booking request received! 🧭')}
                            className="summary-dashboard-btn mt-3"
                        >
                            {locale === 'ru' ? 'Забронировать' : locale === 'uz' ? 'Joy Band Qilish' : 'Book Now'}
                        </button>
                    </div>
                </div>

                <div className="prose prose-lg text-gray-600 max-w-none mb-20">
                    <p className="italic text-xl border-l-4 border-gold pl-6 py-4 bg-gold/5 shadow-md rounded-r-lg text-navy leading-relaxed font-serif">
                        {tourT.description}
                    </p>
                </div>

                {/* Timeline Itinerary */}
                <h3 className="font-serif text-4xl text-navy mb-12 border-b-2 border-gold/20 pb-4 inline-block">{t('tours.detailed_itinerary')}</h3>
                
                <div className="itinerary-layout-wrapper">
                    {/* Left Column: Scrollable list of day parts */}
                    <div className="itinerary-scroll-container">
                        <div className="timeline-container">
                            {groupedSchedules && Object.entries(groupedSchedules).map(([day, events]) => (
                                <div key={day} className="timeline-section">
                                    <div className="timeline-day-circle">
                                        {day}
                                    </div>

                                    <h4 className="timeline-day-header">{t('tours.day_exploration', { day })}</h4>

                                    <div className="space-y-3 w-full">
                                        {events.map((event) => {
                                            const et = event.translations.find(st => st.locale === locale) || event.translations[0];
                                            const isSelected = event.id === (selectedEventId ?? events[0]?.id);
                                            return (
                                                <div
                                                    key={event.id}
                                                    onClick={() => setSelectedEventId(event.id)}
                                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 relative z-10 ${
                                                        isSelected
                                                            ? 'bg-navy border-gold text-white shadow-md'
                                                            : 'bg-white border-gold/15 text-navy hover:border-gold/50 hover:bg-gold/5'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3 w-full">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                                                            isSelected ? 'bg-gold/25 text-gold' : 'bg-navy/5 text-navy'
                                                        }`}>
                                                            {getTimeIcon(event.time)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            {event.time && (
                                                                <span className={`font-mono text-[10px] font-bold block ${
                                                                    isSelected ? 'text-gold' : 'text-gold-muted'
                                                                }`}>
                                                                    {event.time.substring(0, 5)}
                                                                </span>
                                                            )}
                                                            <h5 className={`font-serif text-base font-bold leading-tight ${
                                                                isSelected ? 'text-white' : 'text-navy'
                                                            }`}>
                                                                {et.title}
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
                                                                <p className="text-ivory/80 text-xs leading-relaxed border-t border-gold/10 pt-2 mt-1">
                                                                    {et.description}
                                                                </p>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: One constant sticky image frame */}
                    <div className="itinerary-image-container">
                        <div className="itinerary-sticky-image-frame group cursor-pointer relative" onClick={() => activeImage && setIsModalOpen(true)}>
                            <AnimatePresence mode="wait">
                                {activeImage ? (
                                    <>
                                        <motion.img
                                            key={activeEvent?.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            src={activeImage.path}
                                            alt={activeEvent ? (activeEvent.translations.find(st => st.locale === locale) || activeEvent.translations[0]).title : ''}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-navy/80 text-gold px-3 py-1.5 rounded-full text-xs font-bold border border-gold/30 flex items-center gap-1 shadow-lg">
                                                🔍 Click to View Full Size
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-navy/10 text-gold text-sm font-semibold">
                                        Xorazm Tour
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Lightbox Pop-up Modal for Original Size Image */}
                {isModalOpen && activeImage && (
                    <div
                        className="fixed inset-0 z-50 bg-navy/90 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <div
                            className="relative max-w-5xl max-h-[90vh] bg-navy border border-gold/40 rounded-2xl p-4 shadow-2xl overflow-hidden flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 text-ivory hover:text-gold bg-navy/80 rounded-full border border-gold/20 transition-colors z-10"
                            >
                                ✕
                            </button>
                            <img
                                src={activeImage.path}
                                alt="Full Size Preview"
                                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                            />
                        </div>
                    </div>
                )}

                {/* Transport Section */}
                <section className="mt-32 pt-16 border-t border-gold/20">
                    <h3 className="font-serif text-3xl text-navy mb-8">{t('tours.transport_comfort')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {tour.transports?.map((transport) => {
                            const transT = transport.translations.find(tt => tt.locale === locale) || transport.translations[0];
                            return (
                                <div key={transport.id} className="flex items-center gap-6 bg-white p-6 rounded-2xl border border-gold/15 shadow-md hover:border-gold/40 hover:shadow-xl transition-all duration-300">
                                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-3xl border border-gold/20 text-gold">
                                        🚍
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">{t('tours.included_transport')}</p>
                                        <p className="text-lg font-serif text-navy font-bold">{transT.name}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

Show.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Show;
