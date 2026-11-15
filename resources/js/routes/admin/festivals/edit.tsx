import React, { FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import ImageUploadManager from '@/components/admin/image-upload-manager';
import TranslationCopyBar from '@/components/admin/translation-copy-bar';
import { FormErrorsBanner } from '@/components/admin/form-errors-banner';
import { autoTranslateObject } from '@/utils/auto-translate';
import { ArrowLeft, Save } from 'lucide-react';
import { City, Festival } from '@/types';

interface FestivalEditProps {
    festival?: Festival | null;
    cities?: City[];
}

export default function FestivalEdit({ festival, cities = [] }: FestivalEditProps) {
    const isEditing = !!festival;
    const [activeTab, setActiveTab] = useState<'en' | 'ru' | 'uz'>('en');
    const [isTranslating, setIsTranslating] = useState(false);

    const getTrans = (loc: string) => {
        return (
            festival?.translations?.find((t) => t.locale === loc) || {
                title: '',
                description: '',
                event_season: '',
                festival_type: '',
                highlight: '',
            }
        );
    };

    const { data, setData, post, processing, errors } = useForm({
        slug: festival?.slug || '',
        status: festival ? Boolean(festival.status) : true,
        latitude: festival?.latitude || '',
        longitude: festival?.longitude || '',
        video_url: festival?.video_url || '',
        city_id: festival?.city_id ?? (cities[0]?.id || ''),
        translations: {
            en: {
                title: getTrans('en').title || '',
                description: getTrans('en').description || '',
                event_season: getTrans('en').event_season || '',
                festival_type: getTrans('en').festival_type || '',
                highlight: getTrans('en').highlight || '',
            },
            ru: {
                title: getTrans('ru').title || '',
                description: getTrans('ru').description || '',
                event_season: getTrans('ru').event_season || '',
                festival_type: getTrans('ru').festival_type || '',
                highlight: getTrans('ru').highlight || '',
            },
            uz: {
                title: getTrans('uz').title || '',
                description: getTrans('uz').description || '',
                event_season: getTrans('uz').event_season || '',
                festival_type: getTrans('uz').festival_type || '',
                highlight: getTrans('uz').highlight || '',
            },
        },
        image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            post(`/admin/festivals/${festival.id}`, {
                preserveScroll: true,
                headers: { 'X-HTTP-Method-Override': 'PUT' },
            });
        } else {
            post('/admin/festivals');
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

    const handleCopyFrom = (fromLang: 'en' | 'ru' | 'uz') => {
        const sourceData = data.translations[fromLang];
        setData('translations', {
            ...data.translations,
            [activeTab]: {
                title: sourceData.title || '',
                description: sourceData.description || '',
                event_season: sourceData.event_season || '',
                festival_type: sourceData.festival_type || '',
                highlight: sourceData.highlight || '',
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
        <AdminLayout title={isEditing ? `Edit Festival: ${festival.slug}` : 'Create New Festival'}>
            <Head title={isEditing ? 'Edit Festival' : 'Create Festival'} />

            <div className="max-w-4xl mx-auto space-y-6">
                <Link
                    href="/admin/festivals"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Festivals
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
                                placeholder="e.g. lazgi-dance-festival"
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
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Video URL (Optional)</label>
                            <input
                                type="text"
                                value={data.video_url}
                                onChange={(e) => setData('video_url', e.target.value)}
                                placeholder="/XT_content/festivals/..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
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
                    </div>

                    <div className="space-y-4">
                        <TranslationCopyBar
                            title="Festival Details"
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            onCopyFrom={handleCopyFrom}
                            onTranslateFrom={handleTranslateFrom}
                            isTranslating={isTranslating}
                        />

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Festival Title ({activeTab.toUpperCase()}) *
                                </label>
                                <input
                                    type="text"
                                    required={activeTab === 'en'}
                                    value={data.translations[activeTab].title}
                                    onChange={(e) => handleTransChange(activeTab, 'title', e.target.value)}
                                    placeholder={`Festival name in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                        Event Season ({activeTab.toUpperCase()})
                                    </label>
                                    <input
                                        type="text"
                                        value={data.translations[activeTab].event_season}
                                        onChange={(e) => handleTransChange(activeTab, 'event_season', e.target.value)}
                                        placeholder="e.g. August / Biennial"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                        Festival Type ({activeTab.toUpperCase()})
                                    </label>
                                    <input
                                        type="text"
                                        value={data.translations[activeTab].festival_type}
                                        onChange={(e) => handleTransChange(activeTab, 'festival_type', e.target.value)}
                                        placeholder="e.g. UNESCO Heritage Dance"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                        Key Highlight ({activeTab.toUpperCase()})
                                    </label>
                                    <input
                                        type="text"
                                        value={data.translations[activeTab].highlight}
                                        onChange={(e) => handleTransChange(activeTab, 'highlight', e.target.value)}
                                        placeholder="e.g. Ichan Kala Open Stage"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Description ({activeTab.toUpperCase()})
                                </label>
                                <textarea
                                    rows={5}
                                    value={data.translations[activeTab].description}
                                    onChange={(e) => handleTransChange(activeTab, 'description', e.target.value)}
                                    placeholder={`Event details and schedule in ${activeTab.toUpperCase()}`}
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
                            {isEditing ? 'Update Festival' : 'Create Festival'}
                        </button>
                    </div>
                </form>

                {isEditing && (
                    <ImageUploadManager
                        imageableType="App\Models\Festival"
                        imageableId={festival.id}
                        images={festival.images}
                        mainImage={festival.main_image}
                    />
                )}
            </div>
        </AdminLayout>
    );
}
