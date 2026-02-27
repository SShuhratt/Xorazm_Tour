import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageProps } from '@/types';

export default function LanguageSwitcher() {
    // Fixed "any" by using PageProps interface
    const { locale } = usePage<PageProps>().props;
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'ru', label: 'Русский', flag: '🇷🇺' },
        { code: 'uz', label: 'O‘zbekcha', flag: '🇺🇿' },
    ] as const;

    const currentLang = languages.find(l => l.code === locale) || languages[0];

    return (
        <div className="relative z-[100]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
            >
                <span>{currentLang.flag}</span>
                <span className="uppercase text-xs font-bold tracking-widest">{currentLang.code}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                    >
                        {languages.map((lang) => (
                            <Link
                                key={lang.code}
                                href={`/language/${lang.code}`}
                                method="get"
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                                    locale === lang.code ? 'text-[#3498db] font-bold' : 'text-gray-600'
                                }`}
                            >
                                <span>{lang.flag}</span>
                                <span>{lang.label}</span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
