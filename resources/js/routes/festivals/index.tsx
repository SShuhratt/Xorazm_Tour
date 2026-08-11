import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Festival } from '@/types';
import MainLayout from '@/layouts/main-layout';
import CardCarousel from '@/components/card-carousel';
import { Sparkles, MapPin, Calendar, Clock } from 'lucide-react';

interface Props {
    festivals: Festival[];
    locale: 'en' | 'ru' | 'uz';
}

function Index({ festivals, locale }: Props) {
    const pageTitle = locale === 'ru' ? 'Культурные фестивали' : locale === 'uz' ? 'Madaniy festivallar' : 'Cultural Festivals';
    const subtitle = locale === 'ru' 
        ? 'Погрузитесь в яркие краски, музыку и вековые традиции Хорезма' 
        : locale === 'uz' 
        ? 'Xorazmning yorqin ranglari, musiqasi va asriy an’analari olamiga sho‘ng‘ing' 
        : 'Immerse yourself in the vibrant colors, music, and ancient traditions of Khorezm';

    return (
        <div className="min-h-screen bg-cream">
                <Head title={pageTitle} />

                {/* Festival Style Header */}
                <section className="relative bg-navy py-28 text-center overflow-hidden border-b-4 border-gold">
                    <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#b8860b_1px,transparent_1px)] [background-size:24px_24px]" />
                    <div className="relative z-10 max-w-4xl mx-auto px-4">
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 mb-4 bg-gold/10 px-4 py-1.5 rounded-full border border-gold/30"
                        >
                            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                            <span className="text-gold text-[11px] font-bold uppercase tracking-[0.25em] font-sans">
                                {locale === 'ru' ? 'Народные торжества' : locale === 'uz' ? 'Xalq bayramlari' : 'Living Heritage'}
                            </span>
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-md"
                        >
                            {pageTitle}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gold/80 max-w-2xl mx-auto italic font-serif"
                        >
                            {subtitle}
                        </motion.p>
                        <div className="mt-8 flex justify-center items-center gap-2">
                            <span className="w-8 h-[1px] bg-gold/45" />
                            <div className="w-2.5 h-2.5 rotate-45 border border-gold bg-gold/25" />
                            <span className="w-8 h-[1px] bg-gold/45" />
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {festivals.map((festival, index) => {
                            const translation = festival.translations.find(t => t.locale === locale)
                                || festival.translations[0];
                            
                            const carouselImages = festival.images 
                                ? festival.images.slice(0, 3) 
                                : (festival.main_image ? [festival.main_image] : []);

                            // Dynamic category helper based on slug
                            const getCategory = () => {
                                if (festival.slug.includes('qovun')) {
                                    return locale === 'ru' ? 'Урожай и Бахча' : locale === 'uz' ? 'Hosil bayrami' : 'Harvest & Tasting';
                                }
                                if (festival.slug.includes('lazgi') || festival.slug.includes('music') || festival.slug.includes('taronalari')) {
                                    return locale === 'ru' ? 'Песни и Танцы' : locale === 'uz' ? 'Musiqa va raqs' : 'Music & Dance';
                                }
                                return locale === 'ru' ? 'Ремесла и Культура' : locale === 'uz' ? 'Madaniyat va hunarmandchilik' : 'Crafts & Culture';
                            };

                            return (
                                <motion.div
                                    key={festival.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gold/15 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 h-full relative"
                                >
                                    {/* Top decorative gold corner border */}
                                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold via-yellow-500 to-gold" />
                                    
                                    <div className="relative h-56 overflow-hidden bg-navy/5 flex-shrink-0 mt-1.5">
                                        <CardCarousel images={carouselImages} alt={translation.title} />
                                        <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-full bg-navy/90 text-gold border border-gold/30 backdrop-blur-sm shadow-md">
                                            {getCategory()}
                                        </span>
                                    </div>
                                    
                                    <div className="p-6 flex flex-col flex-grow justify-between">
                                        <div>
                                            <h2 className="font-serif text-2xl text-navy mb-3 group-hover:text-gold transition-colors duration-300 font-bold leading-tight line-clamp-1">
                                                {translation.title}
                                            </h2>
                                            
                                            <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {translation.description}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-gold/10 flex flex-col gap-4">
                                            
                                            <Link 
                                                href={`/${locale}/festivals/${festival.slug}`}
                                                className="w-full inline-flex items-center justify-center py-3 bg-navy text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-gold/30 hover:bg-gold hover:text-navy transition-all duration-300 shadow-sm"
                                            >
                                                {locale === 'ru' ? 'Исследовать фестиваль' : locale === 'uz' ? 'Festivalni kashf etish' : 'Explore Festival'}
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
    );
}

Index.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Index;
