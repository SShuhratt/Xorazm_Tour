import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/main-layout';
import BookingModal from '@/components/booking-modal';
import { useTranslations } from '@/hooks/use-translations';
import { Dish, PageProps } from '@/types';
import { ArrowLeft, MapPin, ChefHat, Bookmark, Utensils } from 'lucide-react';

interface Props {
    slug: string;
    dbDish?: Dish | null;
}

export default function DishesShow({ slug, dbDish }: Props) {
    const { locale } = usePage<PageProps>().props;
    const { t } = useTranslations();
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);

    if (!dbDish) {
        return (
            <MainLayout>
                <div className="py-24 text-center">
                    <h2 className="text-2xl font-serif font-bold text-navy mb-4">Dish not found</h2>
                    <Link href={`/${locale}/dishes`} className="text-gold hover:underline">
                        {t('common.back')}
                    </Link>
                </div>
            </MainLayout>
        );
    }

    const details = dbDish.translations?.find((tr) => tr.locale === locale)
        || dbDish.translations?.find((tr) => tr.locale === 'en')
        || dbDish.translations?.[0];

    const name = details?.name || slug;
    const origin = details?.origin || dbDish.origin_region || 'Uzbekistan';
    const type = details?.type || dbDish.category || 'Traditional Dish';
    const shortDesc = details?.short_description || '';
    const desc = details?.description || '';
    const history = details?.history || '';
    const ingredients = Array.isArray(details?.ingredients) ? details.ingredients : [];
    const mainImage = dbDish.main_image?.path || dbDish.images?.[0]?.path || '/XT_content/khiva/Photos/hero_background.jpg';

    return (
        <MainLayout>
            <Head>
                <title>{`${name} - ${t('dishes.title')}`}</title>
                <meta name="description" content={shortDesc || desc} />
            </Head>

            {/* Back & Breadcrumb navigation */}
            <div className="bg-ivory pt-6 pb-2">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Link
                        href={`/${locale}/dishes`}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-gold hover:text-navy uppercase tracking-wider transition-colors duration-300"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t('common.back')}
                    </Link>
                </div>
            </div>

            {/* Dish Hero Section */}
            <section className="relative h-[50vh] min-h-[350px] overflow-hidden bg-navy">
                <div className="absolute inset-0 z-0">
                    <img
                        src={mainImage}
                        alt={name}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 backdrop-blur-sm text-gold border border-gold/30 text-xs font-medium mb-4"
                        >
                            <MapPin className="h-3 w-3" />
                            {origin}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory mb-2"
                        >
                            {name}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-gold-light text-sm sm:text-base font-medium tracking-wide uppercase"
                        >
                            {type}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Dish Details Content */}
            <section className="py-16 bg-ivory">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Main Info Column */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Short Description Card */}
                            {shortDesc && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="p-8 rounded-xl bg-white border border-gold/10 shadow-sm"
                                >
                                    <p className="text-lg text-navy/85 italic leading-relaxed">
                                        &ldquo;{shortDesc}&rdquo;
                                    </p>
                                </motion.div>
                            )}

                            {/* History & Culinary Excellence */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy pb-3 border-b border-gold/20 flex items-center gap-3">
                                    <ChefHat className="h-6 w-6 text-gold" />
                                    {t('dishes.history_title')}
                                </h2>

                                <p className="text-navy/80 leading-relaxed text-base">
                                    {desc}
                                </p>

                                {history && (
                                    <div className="p-6 rounded-lg bg-gold/5 border-l-4 border-gold text-navy/80 text-sm leading-relaxed mt-6">
                                        <h4 className="font-bold text-gold uppercase tracking-wider mb-2 text-xs">
                                            {t('dishes.heritage')}
                                        </h4>
                                        {history}
                                    </div>
                                )}
                            </motion.div>

                            {/* Key Ingredients */}
                            {ingredients.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-6"
                                >
                                    <h3 className="font-serif text-2xl font-bold text-navy pb-3 border-b border-gold/20">
                                        {t('dishes.ingredients')}
                                    </h3>

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {ingredients.map((ingredient, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gold/10 shadow-sm text-navy/85 text-sm"
                                            >
                                                <span className="h-2 w-2 rounded-full bg-turquoise flex-shrink-0" />
                                                {ingredient}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="sticky top-28 p-8 rounded-xl bg-white border border-gold/20 shadow-md space-y-6 text-navy"
                            >
                                <h3 className="font-serif text-xl font-bold text-navy flex items-center gap-2 pb-4 border-b border-gold/10">
                                    <Bookmark className="h-5 w-5 text-gold" />
                                    {t('dishes.heritage')}
                                </h3>

                                <div className="space-y-4 text-sm">
                                    <div>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-navy/40 block mb-1">
                                            {t('dishes.origin')}
                                        </span>
                                        <span className="font-medium text-navy/80">{origin}</span>
                                    </div>

                                    <div>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-navy/40 block mb-1">
                                            {t('dishes.category')}
                                        </span>
                                        <span className="font-medium text-navy/80">{type}</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setIsInquiryOpen(true)}
                                    className="w-full py-3.5 px-4 rounded-lg bg-gold text-navy font-semibold hover:bg-gold/90 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
                                >
                                    <Utensils className="h-4 w-4" />
                                    {t('dishes.add_to_tour')}
                                </button>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            <BookingModal
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
                locale={locale}
                inquiryType="gastro"
                dishId={dbDish.id}
                subjectTitle={name}
            />
        </MainLayout>
    );
}
