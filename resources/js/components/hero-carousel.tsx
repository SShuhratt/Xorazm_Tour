import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tour, City, Festival, Hotel } from '@/types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
    type: 'city' | 'festival' | 'hotel' | 'tour';
    id: number;
    slug: string;
    image: string;
    title: string;
    description: string;
    cta: string;
    href: string;
}

interface Props {
    cities: City[];
    festivals: Festival[];
    hotels: Hotel[];
    featuredTours: Tour[];
    locale: 'en' | 'ru' | 'uz';
}

export default function HeroCarousel({
    cities,
    festivals,
    hotels,
    featuredTours,
    locale,
}: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    // Build carousel items from all data
    const carouselItems: CarouselItem[] = [
        ...cities.map((city) => {
            const trans = city.translations.find((t) => t.locale === locale) || city.translations[0];
            return {
                type: 'city' as const,
                id: city.id,
                slug: city.slug,
                image: city.main_image?.path || '',
                title: trans.name,
                description: trans.description || 'Discover the beauty of this ancient destination',
                cta: 'Explore City',
                href: `/${locale}/cities/${city.slug}`,
            };
        }),
        ...festivals.slice(0, 3).map((festival) => {
            const trans = festival.translations.find((t) => t.locale === locale) || festival.translations[0];
            return {
                type: 'festival' as const,
                id: festival.id,
                slug: festival.slug,
                image: festival.main_image?.path || '',
                title: trans.title,
                description: trans.description || 'Experience the vibrant culture and traditions',
                cta: 'View Festival',
                href: `/${locale}/festivals/${festival.slug}`,
            };
        }),
        ...hotels.slice(0, 2).map((hotel) => {
            const trans = hotel.translations.find((t) => t.locale === locale) || hotel.translations[0];
            return {
                type: 'hotel' as const,
                id: hotel.id,
                slug: hotel.slug,
                image: hotel.main_image?.path || '',
                title: trans.title,
                description: trans.description || 'Luxury accommodations for your comfort',
                cta: 'View Hotel',
                href: `/${locale}/hotels/${hotel.slug}`,
            };
        }),
        ...featuredTours.slice(0, 2).map((tour) => {
            const trans = tour.translations.find((t) => t.locale === locale) || tour.translations[0];
            return {
                type: 'tour' as const,
                id: tour.id,
                slug: tour.slug,
                image: tour.main_image?.path || '',
                title: trans.title,
                description: trans.description || `Unforgettable journey for ${trans.duration} days`,
                cta: 'Book Tour',
                href: `/${locale}/tours/${tour.slug}`,
            };
        }),
    ];

    // Autoplay carousel
    useEffect(() => {
        if (!autoplay) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
        }, 6000); // Change slide every 6 seconds

        return () => clearInterval(timer);
    }, [autoplay, carouselItems.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index % carouselItems.length);
        setAutoplay(false);
        // Resume autoplay after 10 seconds of user interaction
        setTimeout(() => setAutoplay(true), 10000);
    };

    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1 + carouselItems.length);

    const currentItem = carouselItems[currentIndex];

    // Type badge colors
    const typeBadges = {
        city: { bg: 'bg-blue-500', text: 'text-white' },
        festival: { bg: 'bg-purple-500', text: 'text-white' },
        hotel: { bg: 'bg-amber-500', text: 'text-white' },
        tour: { bg: 'bg-green-500', text: 'text-white' },
    };

    const badge = typeBadges[currentItem.type];

    return (
        <section className="relative min-h-[600px] md:h-screen w-full flex items-center justify-center overflow-hidden pt-20">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={currentItem.image}
                        alt={currentItem.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-navy/40" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <motion.div
                    key={`badge-${currentIndex}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                >
                    <span
                        className={`inline-block ${badge.bg} ${badge.text} px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest`}
                    >
                        {currentItem.type}
                    </span>
                </motion.div>

                <motion.h1
                    key={`title-${currentIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory font-bold mb-6 leading-tight"
                >
                    {currentItem.title}
                </motion.h1>

                <motion.p
                    key={`desc-${currentIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-ivory/90 text-base sm:text-lg md:text-xl font-light tracking-widest mb-8 max-w-2xl mx-auto"
                >
                    {currentItem.description}
                </motion.p>

                <motion.div
                    key={`cta-${currentIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href={currentItem.href}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy font-bold rounded-lg hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        {currentItem.cta} <ArrowRight className="h-5 w-5" />
                    </Link>
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev + 1) % carouselItems.length)}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold/10 transition-all duration-300"
                    >
                        Next <ArrowRight className="h-5 w-5" />
                    </button>
                </motion.div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition-all duration-300 group"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6 text-white group-hover:text-gold transition-colors" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition-all duration-300 group"
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6 text-white group-hover:text-gold transition-colors" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {carouselItems.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`h-3 rounded-full transition-all duration-300 ${
                            idx === currentIndex ? 'bg-gold w-8' : 'bg-white/50 w-3 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
