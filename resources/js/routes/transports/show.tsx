import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Transport } from '@/types';
import MainLayout from '@/layouts/main-layout';

interface Props {
    transport: Transport;
    locale: 'en' | 'ru' | 'uz';
}

function Show({ transport, locale }: Props) {
    const translation = transport.translations.find(t => t.locale === locale) || transport.translations[0];

    return (
        <div className="bg-white min-h-screen pb-20">
            <Head title={`${translation.name} - Fleet Details`} />

            {/* Simple Clean Hero */}
            <div className="bg-slate-900 h-[50vh] flex items-center justify-center p-8 overflow-hidden">
                <motion.img
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    src={transport.main_image?.path}
                    className="max-h-full object-contain drop-shadow-2xl"
                    alt={translation.name}
                />
            </div>

            <div className="max-w-6xl mx-auto -mt-12 relative z-10 px-4">
                <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 border border-slate-100">
                    <div className="flex flex-col md:flex-row gap-12">

                        {/* Info Section */}
                        <div className="md:w-2/3">
                            <h1 className="text-4xl font-bold text-slate-900 mb-6">{translation.name}</h1>
                            <div className="prose prose-slate prose-lg max-w-none mb-12">
                                <p className="leading-relaxed text-slate-600">
                                    {translation.description}
                                </p>
                            </div>

                            {/* Technical Specs Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
                                <div className="text-center">
                                    <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">Capacity</span>
                                    <span className="text-xl font-bold text-slate-800">{transport.capacity}</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">Height</span>
                                    <span className="text-xl font-bold text-slate-800">{transport.height || 'N/A'}</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">Width</span>
                                    <span className="text-xl font-bold text-slate-800">{transport.width || 'N/A'}</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">Length</span>
                                    <span className="text-xl font-bold text-slate-800">{transport.length || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Gallery Sidebar */}
                        <div className="md:w-1/3">
                            <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-tighter text-sm">Gallery</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {transport.images?.map((img) => (
                                    <motion.div
                                        key={img.id}
                                        whileHover={{ scale: 1.05 }}
                                        className="h-24 rounded-lg overflow-hidden"
                                    >
                                        <img src={img.path} className="w-full h-full object-cover" alt="Interior" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

Show.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Show;
