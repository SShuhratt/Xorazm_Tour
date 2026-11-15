import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Hotel } from '@/types';
import MainLayout from '@/layouts/main-layout';
import { useTranslations } from '@/hooks/use-translations';
import CardCarousel from '@/components/card-carousel';
import { MapPin, ArrowRight } from 'lucide-react';

interface Props {
    hotels: (Hotel & { city?: { id: number; slug: string; translations: { locale: string; name: string }[] } | null })[];
    locale: 'en' | 'ru' | 'uz';
}

const heroLabels = {
    en: "Accommodation Complexes",
    ru: "Комплексы размещения",
    uz: "Joylashtirish Komplekslari"
};

const heroTitles = {
    en: "Premium Hotels & Stays",
    ru: "Премиальное Жилье",
    uz: "Premium Turar Joylar"
};

const heroSubtitles = {
    en: "A curated catalog of prestigious hotels in Khorezm with transparent pricing and standard room categories matching centuries of hospitality.",
    ru: "Каталог престижных отелей Хорезма с прозрачными ценами по категориям номеров и многовековыми традициями гостеприимства.",
    uz: "Xorazm vohasining asriy an'analariga mos, vetted va xonalar toifasi bo'yicha shaffof narxlarga ega nufuzli mehmonxonalar katalogi."
};

function HotelsIndex({ hotels, locale }: Props) {
    const { t } = useTranslations();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedCity, setSelectedCity] = React.useState('All');

    // Extract dynamic city tags from hotel addresses for localized filtering
    const citiesList = React.useMemo(() => {
        const set = new Set<string>();
        hotels.forEach(h => {
            if (h.city?.slug) {
                set.add(h.city.slug.charAt(0).toUpperCase() + h.city.slug.slice(1));
                return;
            }
            const trans = h.translations.find(transItem => transItem.locale === locale) || h.translations[0];
            const address = trans?.address || '';
            if (address.toLowerCase().includes('khiva') || address.toLowerCase().includes('хива') || address.toLowerCase().includes('qiva')) {
                set.add('Khiva');
            } else if (address.toLowerCase().includes('bukhara') || address.toLowerCase().includes('бухара') || address.toLowerCase().includes('buxoro')) {
                set.add('Bukhara');
            } else if (address.toLowerCase().includes('samarkand') || address.toLowerCase().includes('самарканд') || address.toLowerCase().includes('samarqand')) {
                set.add('Samarkand');
            } else if (address.toLowerCase().includes('tashkent') || address.toLowerCase().includes('ташкент') || address.toLowerCase().includes('toshkent')) {
                set.add('Tashkent');
            }
        });
        return ['All', ...Array.from(set)];
    }, [hotels, locale]);

    // Live search & city filter matching
    const filteredHotels = React.useMemo(() => {
        return hotels.filter(hotel => {
            const trans = hotel.translations.find(transItem => transItem.locale === locale)
                || hotel.translations.find(transItem => transItem.locale === 'en')
                || hotel.translations[0];
            const titleMatch = (trans?.title || '').toLowerCase().includes(searchQuery.toLowerCase());
            const descMatch = (trans?.description || '').toLowerCase().includes(searchQuery.toLowerCase());
            const addrMatch = (trans?.address || '').toLowerCase().includes(searchQuery.toLowerCase());
            
            let cityMatch = true;
            if (selectedCity !== 'All') {
                if (hotel.city?.slug) {
                    cityMatch = hotel.city.slug.toLowerCase() === selectedCity.toLowerCase();
                } else {
                    const addrLower = (trans?.address || '').toLowerCase();
                    if (selectedCity === 'Khiva') {
                        cityMatch = addrLower.includes('khiva') || addrLower.includes('хива') || addrLower.includes('qiva');
                    } else if (selectedCity === 'Bukhara') {
                        cityMatch = addrLower.includes('bukhara') || addrLower.includes('бухара') || addrLower.includes('buxoro');
                    } else if (selectedCity === 'Samarkand') {
                        cityMatch = addrLower.includes('samarkand') || addrLower.includes('самарканд') || addrLower.includes('samarqand');
                    } else if (selectedCity === 'Tashkent') {
                        cityMatch = addrLower.includes('tashkent') || addrLower.includes('ташкент') || addrLower.includes('toshkent');
                    }
                }
            }
            
            return (titleMatch || descMatch || addrMatch) && cityMatch;
        });
    }, [hotels, searchQuery, selectedCity, locale]);

    return (
        <MainLayout>
            <Head title={heroTitles[locale]} />

            {/* Inner Page Hero */}
            <section className="page-hero">
                <div className="page-hero-bg">
                    <img 
                        src="/XT_content/khiva/Photos/hero_background.jpg" 
                        alt="Xorazm Stays" 
                    />
                    <div className="page-hero-gradient"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-hero-content">
                    <span className="section-label font-bold tracking-[0.2em] text-xs block mb-2">
                        {heroLabels[locale]}
                    </span>
                    <h1 className="font-serif text-white mb-4 text-4xl md:text-5xl lg:text-6xl drop-shadow-md">
                        {heroTitles[locale]}
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base max-w-2xl font-sans leading-relaxed">
                        {heroSubtitles[locale]}
                    </p>
                </div>
            </section>

            <div className="islamic-border"></div>

            {/* Hotels Main Content */}
            <section className="py-20 bg-cream">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10">
                    
                    {/* Left Column: Hotels Grid */}
                    <div className="flex-1 lg:w-3/4">
                        {filteredHotels.length > 0 ? (
                            <div className="grid-3">
                                {filteredHotels.map((hotel, index) => {
                                    const translation = hotel.translations.find(transItem => transItem.locale === locale)
                                        || hotel.translations.find(transItem => transItem.locale === 'en')
                                        || hotel.translations[0];
                                    const carouselImages = hotel.images 
                                        ? hotel.images.slice(0, 3) 
                                        : (hotel.main_image ? [hotel.main_image] : []);

                                    const stars = Math.max(1, Math.min(5, Number(hotel.stars) || 4));
                                    const startingPrice = Number(hotel.price_from) || 65;

                                    return (
                                        <motion.div
                                            key={hotel.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            viewport={{ once: true }}
                                            className="card"
                                        >
                                            {/* Image Carousel Block */}
                                            <div className="card-img relative">
                                                <CardCarousel images={carouselImages} alt={translation.title} />
                                                <div className="hotel-stars">
                                                    {[...Array(stars)].map((_, i) => (
                                                        <span key={i}>★</span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Hotel Details Block */}
                                            <div className="card-body">
                                                <h4 className="font-serif text-navy font-bold leading-tight line-clamp-1 mb-2">
                                                    {translation.title}
                                                </h4>
                                                <div className="hotel-location text-gray-500 text-xs flex items-center gap-1 mb-4">
                                                    <MapPin className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                                                    <span className="truncate block max-w-full">
                                                        {translation.address || 'Uzbekistan'}
                                                    </span>
                                                </div>

                                                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                                    {translation.description}
                                                </p>

                                                <div className="card-footer pt-4 border-t border-gold/10">
                                                    <div className="card-price font-serif text-xl text-turquoise">
                                                        ${startingPrice} <small className="text-gray-400 text-xs font-sans">/ {locale === 'ru' ? 'ночь' : locale === 'uz' ? 'tun' : 'night'}</small>
                                                    </div>
                                                    <Link 
                                                        href={`/${locale}/hotels/${hotel.slug}`}
                                                        className="btn btn-primary"
                                                        style={{ padding: '0.5rem 1.2rem', fontSize: '0.75rem' }}
                                                    >
                                                        {locale === 'ru' ? 'Детали' : locale === 'uz' ? 'Batafsil' : 'Details'}
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gold/15 shadow-sm">
                                <p className="text-gray-500 font-medium">
                                    {locale === 'ru' 
                                        ? 'Отели не найдены по вашему запросу' 
                                        : locale === 'uz' 
                                        ? 'Sizning so\'rovingiz bo\'yicha mehmonxonalar topilmadi' 
                                        : 'No hotels found matching your search.'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Luxury Interactive Sidebar */}
                    <div className="lg:w-1/4 space-y-8 flex-shrink-0">
                        
                        {/* Search & Filter Card */}
                        <div className="bg-white p-6 rounded-2xl border border-gold/15 shadow-md">
                            <h3 className="font-serif text-xl text-navy font-bold mb-4 pb-2 border-b border-gold/10">
                                {locale === 'ru' ? 'Поиск отелей' : locale === 'uz' ? 'Mehmonxona qidirish' : 'Search Stays'}
                            </h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder={locale === 'ru' ? 'Введите название...' : locale === 'uz' ? 'Nomini kiriting...' : 'Enter keywords...'}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gold/20 focus:border-gold focus:outline-none text-navy bg-ivory/30 placeholder-navy/40 text-sm"
                                />
                                
                                {/* City Filter Tags */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {citiesList.map((city) => {
                                        const isSelected = selectedCity === city;
                                        let displayCity = city;
                                        if (city === 'All') displayCity = t('home.view_all');
                                        else if (city === 'Khiva') displayCity = locale === 'ru' ? 'Хива' : locale === 'uz' ? 'Xiva' : 'Khiva';
                                        else if (city === 'Bukhara') displayCity = locale === 'ru' ? 'Бухара' : locale === 'uz' ? 'Buxoro' : 'Bukhara';
                                        else if (city === 'Samarkand') displayCity = locale === 'ru' ? 'Самарканд' : locale === 'uz' ? 'Samarqand' : 'Samarkand';
                                        else if (city === 'Tashkent') displayCity = locale === 'ru' ? 'Ташкент' : locale === 'uz' ? 'Toshkent' : 'Tashkent';

                                        return (
                                            <button
                                                key={city}
                                                onClick={() => setSelectedCity(city)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
                                                    isSelected
                                                        ? 'bg-navy border-gold text-white shadow-sm'
                                                        : 'bg-white border-gold/15 text-navy hover:border-gold/50'
                                                }`}
                                            >
                                                {displayCity}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Luxury Amenities Teaser */}
                        <div className="bg-white p-6 rounded-2xl border border-gold/15 shadow-md">
                            <h3 className="font-serif text-xl text-navy font-bold mb-4 pb-2 border-b border-gold/10">
                                {locale === 'ru' ? 'Удобства и Сервис' : locale === 'uz' ? 'Qulayliklar va Xizmat' : 'Boutique Standards'}
                            </h3>
                            <ul className="space-y-3.5">
                                {[
                                    { icon: '✨', label: locale === 'ru' ? 'Уникальный дизайн' : locale === 'uz' ? 'Noyob dizayn' : 'Traditional Uzbek design' },
                                    { icon: '🍽️', label: locale === 'ru' ? 'Аутентичная кухня' : locale === 'uz' ? 'Milliy taomlar' : 'Traditional courtyard breakfast' },
                                    { icon: '📶', label: locale === 'ru' ? 'Бесплатный Wi-Fi' : locale === 'uz' ? 'Bepul Wi-Fi' : 'Complimentary high-speed WiFi' },
                                    { icon: '📍', label: locale === 'ru' ? 'Отличная локация' : locale === 'uz' ? 'Ajoyib joylashuv' : 'Close to UNESCO Heritage sites' },
                                ].map((amenity, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-navy text-sm font-medium">
                                        <span className="w-6 h-6 bg-gold/15 rounded-full flex items-center justify-center text-xs flex-shrink-0 border border-gold/20">
                                            {amenity.icon}
                                        </span>
                                        <span>{amenity.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Premium Travel Assistant Teaser */}
                        <div className="bg-navy border border-gold/25 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gold/10 rounded-full group-hover:scale-125 transition-transform duration-500" />
                            <h4 className="font-serif text-lg text-gold font-bold mb-2">
                                {locale === 'ru' ? 'Нужна помощь?' : locale === 'uz' ? 'Yordam kerakmi?' : 'Need Assistance?'}
                            </h4>
                            <p className="text-gray-300 text-xs leading-relaxed mb-4">
                                {locale === 'ru'
                                    ? 'Свяжитесь с нашими экспертами, чтобы подобрать идеальный отель для вашей поездки.'
                                    : locale === 'uz'
                                    ? 'Sayohat davomida eng yaxshi mehmonxonani tanlash uchun mutaxassislarimiz bilan bog\'laning.'
                                    : 'Our destination experts are ready to arrange personalized boutique accommodations.'}
                            </p>
                            <Link
                                href={`/${locale}/contact`}
                                className="inline-flex items-center justify-center gap-2 py-2 px-4 bg-gold text-navy font-bold rounded-lg hover:bg-white hover:text-navy transition-all duration-300 text-xs"
                            >
                                {t('nav.contact')} <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

HotelsIndex.layout = (page: React.ReactNode) => page;
export default HotelsIndex;
