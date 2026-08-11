import React, { FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import ImageUploadManager from '@/components/admin/image-upload-manager';
import { ArrowLeft, Save, Globe } from 'lucide-react';

interface HotelEditProps {
    hotel?: any;
    cities?: any[];
}

export default function HotelEdit({ hotel, cities = [] }: HotelEditProps) {
    const isEditing = !!hotel;
    const [activeTab, setActiveTab] = useState<'en' | 'ru' | 'uz'>('en');

    const getTrans = (loc: string) => {
        return hotel?.translations?.find((t: any) => t.locale === loc) || { title: '', address: '', description: '' };
    };

    const { data, setData, post, put, processing, errors } = useForm({
        slug: hotel?.slug || '',
        phone_number: hotel?.phone_number || '',
        status: hotel ? Boolean(hotel.status) : true,
        latitude: hotel?.latitude || '',
        longitude: hotel?.longitude || '',
        instagram_link: hotel?.instagram_link || '',
        telegram_link: hotel?.telegram_link || '',
        city_id: hotel?.translations?.[0]?.city_id || (cities[0]?.id || 1),
        translations: {
            en: { title: getTrans('en').title || '', address: getTrans('en').address || '', description: getTrans('en').description || '' },
            ru: { title: getTrans('ru').title || '', address: getTrans('ru').address || '', description: getTrans('ru').description || '' },
            uz: { title: getTrans('uz').title || '', address: getTrans('uz').address || '', description: getTrans('uz').description || '' },
        },
        image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/hotels/${hotel.id}`);
        } else {
            post('/admin/hotels');
        }
    };

    const handleTransChange = (lang: 'en' | 'ru' | 'uz', field: string, value: string) => {
        setData('translations', {
            ...data.translations,
            [lang]: {
                ...data.translations[lang],
                [field]: value,
            },
        });
    };

    return (
        <AdminLayout title={isEditing ? `Edit Hotel: ${hotel.slug}` : 'Create New Hotel'}>
            <Head title={isEditing ? 'Edit Hotel' : 'Create Hotel'} />

            <div className="max-w-4xl mx-auto space-y-6">
                <Link
                    href="/admin/hotels"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Hotels
                </Link>

                <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-slate-800">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Slug URL</label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="e.g. orient-star-khiva"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Phone Number</label>
                            <input
                                type="text"
                                value={data.phone_number}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                placeholder="+998 90 123 45 67"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Primary City</label>
                            <select
                                value={data.city_id}
                                onChange={(e) => setData('city_id', Number(e.target.value))}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            >
                                {cities.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.translations?.[0]?.name || c.slug}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-6 border-b border-slate-800">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Latitude</label>
                            <input
                                type="text"
                                value={data.latitude}
                                onChange={(e) => setData('latitude', e.target.value)}
                                placeholder="41.3775"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Longitude</label>
                            <input
                                type="text"
                                value={data.longitude}
                                onChange={(e) => setData('longitude', e.target.value)}
                                placeholder="60.3594"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Instagram Link</label>
                            <input
                                type="text"
                                value={data.instagram_link}
                                onChange={(e) => setData('instagram_link', e.target.value)}
                                placeholder="https://instagram.com/..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Telegram Link</label>
                            <input
                                type="text"
                                value={data.telegram_link}
                                onChange={(e) => setData('telegram_link', e.target.value)}
                                placeholder="https://t.me/..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-wider">
                                <Globe className="w-4 h-4" /> Hotel Multilingual Info
                            </div>
                            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                                {(['en', 'ru', 'uz'] as const).map((lang) => (
                                    <button
                                        key={lang}
                                        type="button"
                                        onClick={() => setActiveTab(lang)}
                                        className={`px-3 py-1 text-xs font-bold uppercase rounded-lg transition-all ${
                                            activeTab === lang ? 'bg-gold text-slate-950' : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Hotel Title ({activeTab.toUpperCase()}) *
                                </label>
                                <input
                                    type="text"
                                    required={activeTab === 'en'}
                                    value={data.translations[activeTab].title}
                                    onChange={(e) => handleTransChange(activeTab, 'title', e.target.value)}
                                    placeholder={`Hotel name in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Address ({activeTab.toUpperCase()})
                                </label>
                                <input
                                    type="text"
                                    value={data.translations[activeTab].address}
                                    onChange={(e) => handleTransChange(activeTab, 'address', e.target.value)}
                                    placeholder={`Street address in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Description & Amenities ({activeTab.toUpperCase()})
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.translations[activeTab].description}
                                    onChange={(e) => handleTransChange(activeTab, 'description', e.target.value)}
                                    placeholder={`Hotel overview and features in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                            <input
                                type="checkbox"
                                checked={data.status}
                                onChange={(e) => setData('status', e.target.checked)}
                                className="rounded border-slate-700 bg-slate-950 text-gold focus:ring-gold"
                            />
                            Active & Published
                        </label>

                        {!isEditing && (
                            <div className="w-full sm:w-auto">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                    className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-gold"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto px-6 py-2.5 bg-gold text-slate-950 text-xs font-bold rounded-xl hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold/10 disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {isEditing ? 'Update Hotel' : 'Create Hotel'}
                        </button>
                    </div>
                </form>

                {isEditing && (
                    <ImageUploadManager
                        imageableType="App\Models\Hotel"
                        imageableId={hotel.id}
                        images={hotel.images}
                        mainImage={hotel.main_image}
                    />
                )}
            </div>
        </AdminLayout>
    );
}
