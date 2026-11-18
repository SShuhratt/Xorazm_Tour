import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Transport } from '@/types';
import MainLayout from '@/layouts/main-layout';
import { useTranslations } from '@/hooks/use-translations';

interface Props {
    transports: Transport[];
    locale: 'en' | 'ru' | 'uz';
}

function Index({ transports, locale }: Props) {
    const { t } = useTranslations();

    return (
        <div className="min-h-screen bg-ivory">
            <Head title="Our Fleet" />

            {/* Hero Section */}
            <section className="relative bg-navy pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory font-bold mb-6"
                    >
                        {t('transports.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-gold max-w-2xl mx-auto"
                    >
                        {t('transports.subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Transport Cards Grid */}
            <section className="py-20 sm:py-32 bg-ivory">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {transports.map((item, index) => {
                            const translation = item.translations.find(t => t.locale === locale) || item.translations[0];
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Link href={`/${locale}/transports/${item.slug}`}>
                                        <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gold/25 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 h-full">
                                            {/* Image Section */}
                                            <div className="relative h-48 overflow-hidden bg-navy/5 flex-shrink-0">
                                                <img
                                                    src={item.main_image?.path}
                                                    alt={translation.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-xs font-bold tracking-widest uppercase rounded bg-gold text-white">
                                                    {item.capacity} {t('transports.seats')}
                                                </span>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6 flex flex-col flex-grow justify-between">
                                                <div>
                                                    <h2 className="font-serif text-2xl text-navy mb-3 group-hover:text-gold transition-colors duration-300 font-bold leading-tight line-clamp-1">
                                                        {translation.name}
                                                    </h2>

                                                    <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-2">
                                                        {translation.description}
                                                    </p>

                                                    {/* Specs Preview */}
                                                    <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gold/10 text-center">
                                                        {item.capacity && (
                                                            <div>
                                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">
                                                                    Seats
                                                                </p>
                                                                <p className="font-semibold text-navy text-base">
                                                                    {item.capacity}
                                                                </p>
                                                            </div>
                                                        )}
                                                        {item.height && (
                                                            <div>
                                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">
                                                                    Height
                                                                </p>
                                                                <p className="font-semibold text-navy text-base">
                                                                    {item.height}m
                                                                </p>
                                                            </div>
                                                        )}
                                                        {item.length && (
                                                            <div>
                                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">
                                                                    Length
                                                                </p>
                                                                <p className="font-semibold text-navy text-base">
                                                                    {item.length}m
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="w-full inline-flex items-center justify-center py-3 bg-turquoise text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-turquoise-light hover:shadow-lg transition-all duration-300">
                                                        {t('transports.view_specs')}
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
        </div>
    );
}

Index.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Index;
