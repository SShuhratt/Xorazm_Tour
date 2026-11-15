import React, { FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import ImageUploadManager from '@/components/admin/image-upload-manager';
import TranslationCopyBar from '@/components/admin/translation-copy-bar';
import { FormErrorsBanner } from '@/components/admin/form-errors-banner';
import { autoTranslateObject } from '@/utils/auto-translate';
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react';
import { City, Hotel, HotelRoom } from '@/types';

interface HotelEditProps {
    hotel?: Hotel | null;
    cities?: City[];
}

export default function HotelEdit({ hotel, cities = [] }: HotelEditProps) {
    const isEditing = !!hotel;
    const [activeTab, setActiveTab] = useState<'en' | 'ru' | 'uz'>('en');
    const [isTranslating, setIsTranslating] = useState(false);

    const getTrans = (loc: string) => {
        return (
            hotel?.translations?.find((t) => t.locale === loc) || {
                title: '',
                address: '',
                description: '',
                amenities: [],
                rooms: [],
            }
        );
    };

    const { data, setData, post, processing, errors } = useForm({
        slug: hotel?.slug || '',
        phone_number: hotel?.phone_number || '',
        stars: hotel?.stars !== undefined && hotel?.stars !== null ? String(hotel.stars) : '',
        price_from: hotel?.price_from !== undefined && hotel?.price_from !== null ? String(hotel.price_from) : '',
        email: hotel?.email || '',
        status: hotel ? Boolean(hotel.status) : true,
        latitude: hotel?.latitude || '',
        longitude: hotel?.longitude || '',
        instagram_link: hotel?.instagram_link || '',
        telegram_link: hotel?.telegram_link || '',
        city_id: hotel?.city_id ?? (cities[0]?.id || ''),
        translations: {
            en: {
                title: getTrans('en').title || '',
                address: getTrans('en').address || '',
                description: getTrans('en').description || '',
                amenities: Array.isArray(getTrans('en').amenities) ? (getTrans('en').amenities as string[]) : [],
                rooms: Array.isArray(getTrans('en').rooms) ? (getTrans('en').rooms as HotelRoom[]) : [],
            },
            ru: {
                title: getTrans('ru').title || '',
                address: getTrans('ru').address || '',
                description: getTrans('ru').description || '',
                amenities: Array.isArray(getTrans('ru').amenities) ? (getTrans('ru').amenities as string[]) : [],
                rooms: Array.isArray(getTrans('ru').rooms) ? (getTrans('ru').rooms as HotelRoom[]) : [],
            },
            uz: {
                title: getTrans('uz').title || '',
                address: getTrans('uz').address || '',
                description: getTrans('uz').description || '',
                amenities: Array.isArray(getTrans('uz').amenities) ? (getTrans('uz').amenities as string[]) : [],
                rooms: Array.isArray(getTrans('uz').rooms) ? (getTrans('uz').rooms as HotelRoom[]) : [],
            },
        },
        image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            post(`/admin/hotels/${hotel.id}`, {
                preserveScroll: true,
                headers: { 'X-HTTP-Method-Override': 'PUT' },
            });
        } else {
            post('/admin/hotels');
        }
    };

    const handleTransChange = (lang: 'en' | 'ru' | 'uz', field: string, value: unknown) => {
        setData('translations', {
            ...data.translations,
            [lang]: {
                ...data.translations[lang],
                [field]: value,
            },
        });
    };

    const handleCopyFrom = (fromLang: 'en' | 'ru' | 'uz') => {
        const sourceData = data.translations[fromLang];
        setData('translations', {
            ...data.translations,
            [activeTab]: {
                title: sourceData.title || '',
                address: sourceData.address || '',
                description: sourceData.description || '',
                amenities: [...(sourceData.amenities || [])],
                rooms: (sourceData.rooms || []).map((r) => ({ ...r })),
            },
        });
    };

    const handleTranslateFrom = async (fromLang: 'en' | 'ru' | 'uz') => {
        setIsTranslating(true);
        try {
            const sourceData = data.translations[fromLang];
            const translated = await autoTranslateObject(sourceData, activeTab, fromLang);
            setData('translations', {
                ...data.translations,
                [activeTab]: translated,
            });
        } finally {
            setIsTranslating(false);
        }
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
                    <FormErrorsBanner errors={errors} />
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
                                onChange={(e) => setData('city_id', e.target.value ? Number(e.target.value) : '')}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            >
                                <option value="">-- Select City --</option>
                                {cities.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.translations?.[0]?.name || c.slug}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Star Rating (1–5)</label>
                            <input
                                type="number"
                                min={1}
                                max={5}
                                value={data.stars}
                                onChange={(e) => setData('stars', e.target.value)}
                                placeholder="4"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Starting Price ($/night)</label>
                            <input
                                type="number"
                                min={0}
                                value={data.price_from}
                                onChange={(e) => setData('price_from', e.target.value)}
                                placeholder="85"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Contact Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="info@hotel.uz"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
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
                        <TranslationCopyBar
                            title="Hotel Details"
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            onCopyFrom={handleCopyFrom}
                            onTranslateFrom={handleTranslateFrom}
                            isTranslating={isTranslating}
                        />

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
                                    placeholder={`Hotel title in ${activeTab.toUpperCase()}`}
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
                                    placeholder={`Address in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Description ({activeTab.toUpperCase()})
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.translations[activeTab].description}
                                    onChange={(e) => handleTransChange(activeTab, 'description', e.target.value)}
                                    placeholder={`Hotel description, amenities, and features in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Amenities ({activeTab.toUpperCase()})
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleTransChange(activeTab, 'amenities', [
                                                ...(data.translations[activeTab].amenities || []),
                                                '',
                                            ])
                                        }
                                        className="inline-flex items-center gap-1 rounded-lg border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs font-bold text-gold hover:bg-gold hover:text-slate-950"
                                    >
                                        <Plus className="h-3 w-3" /> Add Amenity
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {(data.translations[activeTab].amenities || []).map((item: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                    const next = [...(data.translations[activeTab].amenities || [])];
                                                    next[idx] = e.target.value;
                                                    handleTransChange(activeTab, 'amenities', next);
                                                }}
                                                placeholder="e.g. Free Wi-Fi, Courtyard Breakfast"
                                                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const next = (data.translations[activeTab].amenities || []).filter((_, i) => i !== idx);
                                                    handleTransChange(activeTab, 'amenities', next);
                                                }}
                                                className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg"
                                                title="Remove amenity"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Room Categories ({activeTab.toUpperCase()})
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleTransChange(activeTab, 'rooms', [
                                                ...(data.translations[activeTab].rooms || []),
                                                { type: '', spec: '', price: '' },
                                            ])
                                        }
                                        className="inline-flex items-center gap-1 rounded-lg border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs font-bold text-gold hover:bg-gold hover:text-slate-950"
                                    >
                                        <Plus className="h-3 w-3" /> Add Room
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {(data.translations[activeTab].rooms || []).map((room: HotelRoom, idx: number) => (
                                        <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                                            <input
                                                type="text"
                                                value={room.type}
                                                onChange={(e) => {
                                                    const next = [...(data.translations[activeTab].rooms || [])];
                                                    next[idx] = { ...next[idx], type: e.target.value };
                                                    handleTransChange(activeTab, 'rooms', next);
                                                }}
                                                placeholder="Room type (e.g. Standard Double)"
                                                className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                                            />
                                            <input
                                                type="text"
                                                value={room.spec}
                                                onChange={(e) => {
                                                    const next = [...(data.translations[activeTab].rooms || [])];
                                                    next[idx] = { ...next[idx], spec: e.target.value };
                                                    handleTransChange(activeTab, 'rooms', next);
                                                }}
                                                placeholder="Specs (e.g. 2 Guests · Breakfast)"
                                                className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                                            />
                                            <input
                                                type="text"
                                                value={room.price}
                                                onChange={(e) => {
                                                    const next = [...(data.translations[activeTab].rooms || [])];
                                                    next[idx] = { ...next[idx], price: e.target.value };
                                                    handleTransChange(activeTab, 'rooms', next);
                                                }}
                                                placeholder="$85"
                                                className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const next = (data.translations[activeTab].rooms || []).filter((_, i) => i !== idx);
                                                    handleTransChange(activeTab, 'rooms', next);
                                                }}
                                                className="md:col-span-1 p-2 text-red-400 hover:bg-red-950/40 rounded-lg justify-self-end"
                                                title="Remove room"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
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
                                    accept="image/*,video/*"
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
