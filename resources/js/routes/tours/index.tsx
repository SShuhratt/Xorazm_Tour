import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Tour } from '@/types';
import MainLayout from '@/layouts/main-layout';
import CardCarousel from '@/components/card-carousel';
import { Clock, Users } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

interface Props {
    tours: Tour[];
}

function Index({ tours }: Props) {
    const { t, locale } = useTranslations();
    const [activeCategory, setActiveCategory] = React.useState('all');

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

    const filteredTours = React.useMemo(() => {
        if (activeCategory === 'all') return tours;
        return tours.filter(tour => getTourCategory(tour) === activeCategory);
    }, [tours, activeCategory]);

    return (
        <div className="min-h-screen bg-cream">
            <Head title={t('tours.title')} />

            {/* Inner Page Hero Layout */}
            <section className="relative bg-navy pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold mb-3 block">
                        {locale === 'ru' ? 'Эксклюзивные Направления' : locale === 'uz' ? 'Eksklyuziv Yo\'nalishlar' : 'Exclusive Destinations'}
                    </span>
                    <h1 className="font-serif text-5xl sm:text-6xl text-white mb-4">
                        {t('tours.title')}
                    </h1>
                    <p className="text-gold/90 text-lg max-w-2xl mx-auto leading-relaxed italic">
                        {t('tours.subtitle')}
                    </p>
                </div>
            </section>

            <div className="islamic-border" />

            {/* Interactive Category Filter Controls */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex justify-center items-center gap-4 flex-wrap mb-14">
                        {[
                            { id: 'all', label: t('tours.filter_all') },
                            { id: 'cultural', label: t('tours.filter_cultural') },
                            { id: 'adventure', label: t('tours.filter_adventure') },
                            { id: 'premium', label: t('tours.filter_premium') }
                        ].map((cat) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`min-w-[150px] py-3 px-6 rounded-full border text-sm font-semibold transition-all duration-300 ${
                                        isActive
                                            ? 'bg-turquoise border-turquoise text-white shadow-md'
                                            : 'bg-transparent border-gold text-gold hover:bg-turquoise hover:text-white hover:border-turquoise'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Core Architectural Tour Cards */}
                    {filteredTours.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredTours.map((tour, index) => {
                                const tr = tour.translations.find(trans => trans.locale === locale)
                                    || tour.translations.find(trans => trans.locale === 'en')
                                    || tour.translations[0];
                                const category = getTourCategory(tour);
                                const maxGroup = tour.max_group_size || (category === 'premium' ? 6 : category === 'adventure' ? 8 : 12);
                                const carouselImages = tour.images 
                                    ? tour.images.slice(0, 3) 
                                    : (tour.main_image ? [tour.main_image] : []);

                                return (
                                    <motion.div
                                        key={tour.id}
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gold/25 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
                                    >
                                        {/* Card Header Image */}
                                        <div className="relative h-48 overflow-hidden bg-navy/5 flex-shrink-0">
                                            <Link href={`/${locale}/tours/${tour.slug}`} className="block w-full h-full">
                                                <CardCarousel images={carouselImages} alt={tr.title} />
                                            </Link>
                                            <span className={`absolute top-4 left-4 z-10 px-3 py-1.5 text-xs font-bold tracking-widest uppercase rounded ${getCategoryBadgeColorClass(category)}`}>
                                                {category === 'adventure' 
                                                    ? (locale === 'ru' ? 'Приключение' : locale === 'uz' ? 'Sarguzasht' : 'Adventure')
                                                    : category === 'premium'
                                                    ? (locale === 'ru' ? 'Премиум' : locale === 'uz' ? 'Premium' : 'Premium')
                                                    : (locale === 'ru' ? 'Культура' : locale === 'uz' ? 'Madaniyat' : 'Cultural')
                                                }
                                            </span>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-6 flex flex-col flex-grow justify-between">
                                            <div>
                                                <Link href={`/${locale}/tours/${tour.slug}`}>
                                                    <h4 className="font-serif text-2xl text-navy mb-3 group-hover:text-gold transition-colors duration-300 font-bold leading-tight">
                                                        {tr.title}
                                                    </h4>
                                                </Link>
                                                
                                                <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">
                                                    {tr.description}
                                                </p>
                                            </div>

                                            <div>
                                                {/* Meta Parameter items */}
                                                <div className="flex items-center gap-4 text-sm text-gray-500 font-semibold mb-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-4.5 h-4.5 text-gold" />
                                                        <span>
                                                            {typeof tr.duration === 'string' && /[a-zA-Zа-яА-Я]/.test(tr.duration)
                                                                ? tr.duration
                                                                : `${tr.duration} ${locale === 'ru' ? 'Дней' : locale === 'uz' ? 'Kun' : 'Days'}`}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Users className="w-4.5 h-4.5 text-gold" />
                                                        <span>
                                                            {locale === 'ru'
                                                                ? `Макс ${maxGroup} чел`
                                                                : locale === 'uz'
                                                                ? `Maks ${maxGroup} kishi`
                                                                : `Max ${maxGroup} people`}
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

                                                <Link
                                                    href={`/${locale}/tours/${tour.slug}`}
                                                    className="w-full inline-flex items-center justify-center py-3 bg-turquoise text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-turquoise-light hover:shadow-lg transition-all duration-300"
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
                        <div className="text-center py-20 bg-white rounded-xl border border-gold/15 shadow-sm">
                            <p className="text-gray-500 font-medium">
                                {locale === 'ru' 
                                    ? 'Туры не найдены по вашему запросу' 
                                    : locale === 'uz' 
                                    ? 'Sizning so\'rovingiz bo\'yicha turlar topilmadi' 
                                    : 'No tours found matching your search.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

Index.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Index;
