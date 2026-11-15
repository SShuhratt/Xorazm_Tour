import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tour, TourSchedule } from '@/types';
import MainLayout from '@/layouts/main-layout';
import BookingModal from '@/components/booking-modal';
import { useTranslations } from '@/hooks/use-translations';
import {
    Check,
    X,
    Users,
    Sparkles,
} from 'lucide-react';

interface Props {
    tour: Tour;
}

function Show({ tour }: Props) {
    const { t, locale } = useTranslations();
    const tourT = tour.translations.find(trans => trans.locale === locale)
        || tour.translations.find(trans => trans.locale === 'en')
        || tour.translations[0];
    const [selectedEventId, setSelectedEventId] = React.useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);

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
        if (!tour.schedules || tour.schedules.length === 0) return null;
        if (selectedEventId) {
            const found = tour.schedules.find(e => e.id === selectedEventId);
            if (found) return found;
        }
        return tour.schedules[0];
    }, [selectedEventId, tour.schedules]);

    const activeImage = React.useMemo(() => {
        if (!activeEvent) return tour.main_image;
        return activeEvent.main_image || activeEvent.images?.[0] || tour.main_image;
    }, [activeEvent, tour.main_image]);

    const pricingTiers = (Array.isArray(tourT?.pricing_tiers) && tourT.pricing_tiers.length > 0)
        ? tourT.pricing_tiers
        : (Array.isArray(tour.pricing_tiers) ? tour.pricing_tiers : []);
    const hasPricingTiers = pricingTiers.length > 0;
    const hasIncluded = Array.isArray(tourT?.included) && tourT.included.length > 0;
    const hasNotIncluded = Array.isArray(tourT?.not_included) && tourT.not_included.length > 0;

    return (
        <div className="bg-cream min-h-screen">
            <Head title={tourT?.title || tour.slug} />

            {/* Header / Hero */}
            <section className="page-hero relative min-h-[45vh] flex items-end overflow-hidden bg-navy">
                <div className="page-hero-bg absolute inset-0 z-0">
                    <img 
                        src={tour.main_image?.path} 
                        className="w-full h-full object-cover opacity-40" 
                        alt={tourT?.title || tour.slug} 
                    />
                    <div className="page-hero-gradient absolute inset-0 bg-gradient-to-t from-navy to-navy/40 z-1" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-light mb-3 block">
                        {locale === 'ru' ? 'Программа Тура' : locale === 'uz' ? 'Sayohat Dasturi' : 'Tour Itinerary'}
                    </span>
                    <h1 className="font-serif text-white mb-4 text-4xl md:text-5xl drop-shadow-md">
                        {tourT?.title || tour.slug}
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
                            {tour.cities && tour.cities.length > 0 ? (
                                tour.cities.map((city, cIndex) => {
                                    const cityT = city.translations.find(ct => ct.locale === locale)
                                        || city.translations.find(ct => ct.locale === 'en')
                                        || city.translations[0];
                                    return (
                                        <React.Fragment key={city.id}>
                                            <Link href={`/${locale}/cities/${city.slug}`} className="text-navy font-serif font-bold text-sm hover:text-gold transition-colors">
                                                {cityT?.name || city.slug}
                                            </Link>
                                            {cIndex < (tour.cities?.length || 0) - 1 && <span className="text-gold-muted font-bold text-[10px]">→</span>}
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <span className="text-navy font-serif font-bold text-sm">{tourT?.route || 'Silk Road'}</span>
                            )}
                        </div>
                    </div>

                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {locale === 'ru' ? 'Длительность' : locale === 'uz' ? 'Davomiyligi' : 'Duration'}
                        </span>
                        <span className="text-navy font-bold text-base mt-1">
                            {tourT?.duration ? (
                                typeof tourT.duration === 'string' && /[a-zA-Zа-яА-Я]/.test(tourT.duration)
                                    ? tourT.duration
                                    : (() => {
                                        const days = Math.max(1, Number(tourT.duration) || 1);
                                        const nights = Math.max(0, days - 1);
                                        if (nights === 0) {
                                            return locale === 'ru' ? `${days} День` : locale === 'uz' ? `${days} Kun` : `${days} Day`;
                                        }
                                        return locale === 'ru'
                                            ? `${days} Дней / ${nights} Ночей`
                                            : locale === 'uz'
                                            ? `${days} Kun / ${nights} Tun`
                                            : `${days} Days / ${nights} Nights`;
                                    })()
                            ) : 'Flexible'}
                        </span>
                    </div>

                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {t('tours.transportation')}
                        </span>
                        <span className="text-navy font-bold text-sm mt-1 line-clamp-2">
                            {tourT?.custom_transport || (
                                tour.transports && tour.transports.length > 0 
                                    ? tour.transports.map(tr => tr.translations.find(tt => tt.locale === locale)?.name || tr.slug).join(', ')
                                    : 'Comfortable Bus / Transfers'
                            )}
                        </span>
                    </div>

                    <div className="summary-dashboard-item border-none flex items-center justify-center">
                        <button 
                            type="button"
                            onClick={() => setIsBookingModalOpen(true)}
                            className="summary-dashboard-btn w-full py-3.5 text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                        >
                            {locale === 'ru' ? 'Забронировать' : locale === 'uz' ? 'Joy Band Qilish' : 'Book Now'}
                        </button>
                    </div>
                </div>

                {/* Tour Description */}
                {tourT?.description && (
                    <div className="prose prose-lg text-gray-600 max-w-none mb-14">
                        <p className="italic text-xl border-l-4 border-gold pl-6 py-4 bg-gold/5 shadow-md rounded-r-lg text-navy leading-relaxed font-serif">
                            {tourT.description}
                        </p>
                    </div>
                )}

                {/* TIERED GROUP PRICING & SINGLE SUPPLEMENT SECTION */}
                {(hasPricingTiers || tour.single_supplement) && (
                    <div className="mb-16 bg-white rounded-2xl border border-gold/30 shadow-xl overflow-hidden p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gold/15 mb-6">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-gold block mb-1">
                                    {t('tours.pricing_table')}
                                </span>
                                <h3 className="font-serif text-2xl sm:text-3xl text-navy font-bold">
                                    {locale === 'ru' ? 'Стоимость тура в зависимости от группы' : locale === 'uz' ? 'Guruh hajmiga qarab tur narxi' : 'Tour Cost by Group Size'}
                                </h3>
                            </div>
                            {tour.single_supplement && (
                                <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 rounded-xl text-xs font-bold text-navy">
                                    <Sparkles className="w-4 h-4 text-gold shrink-0" />
                                    <span>
                                        {locale === 'ru' 
                                            ? `*Доплата за 1-местное размещение: $${tour.single_supplement} с человека`
                                            : locale === 'uz'
                                            ? `*Bir kishilik xona uchun qo'shimcha to'lov: $${tour.single_supplement} kishiga`
                                            : `*Single supplement: $${tour.single_supplement} per person`}
                                    </span>
                                </div>
                            )}
                        </div>

                        {hasPricingTiers && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-navy/5 text-navy font-serif text-sm uppercase tracking-wider border-b border-gold/20">
                                            <th className="py-3 px-4 font-bold rounded-l-lg">{t('tours.group_size')}</th>
                                            <th className="py-3 px-4 font-bold rounded-r-lg text-right">{t('tours.price_per_person')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gold/10">
                                        {pricingTiers.map((tier, tIdx) => (
                                            <tr key={tIdx} className="hover:bg-gold/5 transition-colors">
                                                <td className="py-3.5 px-4 text-navy font-medium flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-gold" />
                                                    <span>{tier.group_size}</span>
                                                </td>
                                                <td className="py-3.5 px-4 text-right font-serif font-bold text-lg text-turquoise">
                                                    ${tier.price_per_person}
                                                    <span className="text-xs font-sans text-gray-500 font-normal ml-1">
                                                        / {locale === 'ru' ? 'чел' : locale === 'uz' ? 'kishi' : 'person'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* THE PRICE INCLUDES & NOT INCLUDED IN THE PRICE */}
                {(hasIncluded || hasNotIncluded) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {/* Included */}
                        {hasIncluded && (
                            <div className="bg-white rounded-2xl border border-emerald-900/20 shadow-lg p-6 sm:p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-emerald-100">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                                            <Check className="w-4 h-4 stroke-[3]" />
                                        </div>
                                        <h3 className="font-serif text-2xl font-bold text-navy">
                                            {t('tours.price_includes')}
                                        </h3>
                                    </div>
                                    <ul className="space-y-3.5">
                                        {tourT.included!.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                                                <span className="text-emerald-600 font-bold text-base mt-0.5 shrink-0">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Not Included */}
                        {hasNotIncluded && (
                            <div className="bg-white rounded-2xl border border-rose-900/20 shadow-lg p-6 sm:p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-rose-100">
                                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
                                            <X className="w-4 h-4 stroke-[3]" />
                                        </div>
                                        <h3 className="font-serif text-2xl font-bold text-navy">
                                            {t('tours.price_not_includes')}
                                        </h3>
                                    </div>
                                    <ul className="space-y-3.5">
                                        {tourT.not_included!.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                                                <span className="text-rose-500 font-bold text-base mt-0.5 shrink-0">✕</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                )}

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
                                            const isSelected = event.id === activeEvent?.id;
                                            const eventImg = event.main_image || event.images?.[0];
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
                                                        {eventImg ? (
                                                            <div className={`w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border shadow-sm ${
                                                                isSelected ? 'border-gold ring-1 ring-gold/50' : 'border-gold/30'
                                                            }`}>
                                                                <img
                                                                    src={eventImg.path}
                                                                    alt={et.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                                                                isSelected ? 'bg-gold/25 text-gold' : 'bg-navy/5 text-navy'
                                                            }`}>
                                                                {getTimeIcon(event.time)}
                                                            </div>
                                                        )}
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
                <section className="mt-28 pt-12 border-t border-gold/20">
                    <h3 className="font-serif text-3xl text-navy mb-8">{t('tours.transport_comfort')}</h3>
                    
                    {tourT?.custom_transport && (
                        <div className="mb-6 p-5 bg-gold/10 border border-gold/30 rounded-2xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-navy text-gold rounded-xl flex items-center justify-center text-xl shrink-0">
                                ✈️
                            </div>
                            <div>
                                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                                    {t('tours.custom_transport_info')}
                                </span>
                                <p className="font-serif font-bold text-navy text-lg">{tourT.custom_transport}</p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {tour.transports?.map((transport) => {
                            const transT = transport.translations.find(tt => tt.locale === locale)
                                || transport.translations.find(tt => tt.locale === 'en')
                                || transport.translations[0];
                            return (
                                <div key={transport.id} className="flex items-center gap-6 bg-white p-6 rounded-2xl border border-gold/15 shadow-md hover:border-gold/40 hover:shadow-xl transition-all duration-300">
                                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-3xl border border-gold/20 text-gold">
                                        🚍
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">{t('tours.included_transport')}</p>
                                        <p className="text-lg font-serif text-navy font-bold">{transT?.name || transport.slug}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                locale={locale as 'en' | 'ru' | 'uz'}
                inquiryType="tour"
                tourId={tour.id}
                subjectTitle={tourT?.title || tour.slug}
                baseCost={tour.cost}
                pricingTiers={pricingTiers}
            />
        </div>
    );
}

Show.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Show;
