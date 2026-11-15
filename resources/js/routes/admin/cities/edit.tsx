import React, { FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import ImageUploadManager from '@/components/admin/image-upload-manager';
import TranslationCopyBar from '@/components/admin/translation-copy-bar';
import { FormErrorsBanner } from '@/components/admin/form-errors-banner';
import { autoTranslateObject } from '@/utils/auto-translate';
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react';
import { City, CityHighlight } from '@/types';

interface CityEditProps {
    city?: City | null;
}

export default function CityEdit({ city }: CityEditProps) {
    const isEditing = !!city;
    const [activeTab, setActiveTab] = useState<'en' | 'ru' | 'uz'>('en');
    const [isTranslating, setIsTranslating] = useState(false);

    const getTrans = (loc: string) => {
        return (
            city?.translations?.find((t) => t.locale === loc) || {
                name: '',
                description: '',
                era: '',
                heritage_status: '',
                recommended_time: '',
                highlights: [],
            }
        );
    };

    const { data, setData, post, processing, errors } = useForm({
        slug: city?.slug || '',
        status: city ? Boolean(city.status) : true,
        latitude: city?.latitude || '',
        longitude: city?.longitude || '',
        translations: {
            en: {
                name: getTrans('en').name || '',
                description: getTrans('en').description || '',
                era: getTrans('en').era || '',
                heritage_status: getTrans('en').heritage_status || '',
                recommended_time: getTrans('en').recommended_time || '',
                highlights: Array.isArray(getTrans('en').highlights) ? (getTrans('en').highlights as CityHighlight[]) : [],
            },
            ru: {
                name: getTrans('ru').name || '',
                description: getTrans('ru').description || '',
                era: getTrans('ru').era || '',
                heritage_status: getTrans('ru').heritage_status || '',
                recommended_time: getTrans('ru').recommended_time || '',
                highlights: Array.isArray(getTrans('ru').highlights) ? (getTrans('ru').highlights as CityHighlight[]) : [],
            },
            uz: {
                name: getTrans('uz').name || '',
                description: getTrans('uz').description || '',
                era: getTrans('uz').era || '',
                heritage_status: getTrans('uz').heritage_status || '',
                recommended_time: getTrans('uz').recommended_time || '',
                highlights: Array.isArray(getTrans('uz').highlights) ? (getTrans('uz').highlights as CityHighlight[]) : [],
            },
        },
        image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            post(`/admin/cities/${city.id}`, {
                preserveScroll: true,
                headers: { 'X-HTTP-Method-Override': 'PUT' },
            });
        } else {
            post('/admin/cities');
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
                name: sourceData.name || '',
                description: sourceData.description || '',
                era: sourceData.era || '',
                heritage_status: sourceData.heritage_status || '',
                recommended_time: sourceData.recommended_time || '',
                highlights: (sourceData.highlights || []).map((h) => ({ ...h })),
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
        <AdminLayout title={isEditing ? `Edit City: ${city.slug}` : 'Create New City'}>
            <Head title={isEditing ? 'Edit City' : 'Create City'} />

            <div className="max-w-4xl mx-auto space-y-6">
                <Link
                    href="/admin/cities"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Cities
                </Link>

                <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
                    <FormErrorsBanner errors={errors} />
                    {/* General Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-slate-800">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Slug URL</label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="e.g. khiva"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                            {errors.slug && <p className="text-red-400 text-[10px] mt-1">{errors.slug}</p>}
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

                    {/* Multilingual Tabs with Copy/Translate Toolbar */}
                    <div className="space-y-4">
                        <TranslationCopyBar
                            title="City Details"
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            onCopyFrom={handleCopyFrom}
                            onTranslateFrom={handleTranslateFrom}
                            isTranslating={isTranslating}
                        />

                        {/* Active Tab Form Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    City Name ({activeTab.toUpperCase()}) *
                                </label>
                                <input
                                    type="text"
                                    required={activeTab === 'en'}
                                    value={data.translations[activeTab].name}
                                    onChange={(e) => handleTransChange(activeTab, 'name', e.target.value)}
                                    placeholder={`City name in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Description ({activeTab.toUpperCase()})
                                </label>
                                <textarea
                                    rows={5}
                                    value={data.translations[activeTab].description}
                                    onChange={(e) => handleTransChange(activeTab, 'description', e.target.value)}
                                    placeholder={`Detailed city description in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                        Historical Era ({activeTab.toUpperCase()})
                                    </label>
                                    <input
                                        type="text"
                                        value={data.translations[activeTab].era}
                                        onChange={(e) => handleTransChange(activeTab, 'era', e.target.value)}
                                        placeholder="e.g. 6th Century BC – Present"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                        Heritage Status ({activeTab.toUpperCase()})
                                    </label>
                                    <input
                                        type="text"
                                        value={data.translations[activeTab].heritage_status}
                                        onChange={(e) => handleTransChange(activeTab, 'heritage_status', e.target.value)}
                                        placeholder="e.g. UNESCO World Heritage Site"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                        Recommended Time ({activeTab.toUpperCase()})
                                    </label>
                                    <input
                                        type="text"
                                        value={data.translations[activeTab].recommended_time}
                                        onChange={(e) => handleTransChange(activeTab, 'recommended_time', e.target.value)}
                                        placeholder="e.g. 2 – 3 Days"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Key Highlights ({activeTab.toUpperCase()})
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleTransChange(activeTab, 'highlights', [
                                                ...(data.translations[activeTab].highlights || []),
                                                { title: '', description: '', image: '' },
                                            ])
                                        }
                                        className="inline-flex items-center gap-1 rounded-lg border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs font-bold text-gold hover:bg-gold hover:text-slate-950"
                                    >
                                        <Plus className="h-3 w-3" /> Add Highlight
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {(data.translations[activeTab].highlights || []).map((hl: CityHighlight, idx: number) => (
                                        <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start bg-slate-950 p-3 rounded-xl border border-slate-800">
                                            <input
                                                type="text"
                                                value={hl.title}
                                                onChange={(e) => {
                                                    const next = [...(data.translations[activeTab].highlights || [])];
                                                    next[idx] = { ...next[idx], title: e.target.value };
                                                    handleTransChange(activeTab, 'highlights', next);
                                                }}
                                                placeholder="Landmark / Highlight title"
                                                className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                                            />
                                            <input
                                                type="text"
                                                value={hl.description}
                                                onChange={(e) => {
                                                    const next = [...(data.translations[activeTab].highlights || [])];
                                                    next[idx] = { ...next[idx], description: e.target.value };
                                                    handleTransChange(activeTab, 'highlights', next);
                                                }}
                                                placeholder="Short highlight summary"
                                                className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const next = (data.translations[activeTab].highlights || []).filter((_, i) => i !== idx);
                                                    handleTransChange(activeTab, 'highlights', next);
                                                }}
                                                className="md:col-span-1 p-2 text-red-400 hover:bg-red-950/40 rounded-lg justify-self-end"
                                                title="Remove highlight"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status & Single Upload Field for Quick Create */}
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
                            {isEditing ? 'Update City' : 'Create City'}
                        </button>
                    </div>
                </form>

                {isEditing && (
                    <ImageUploadManager
                        imageableType="App\Models\City"
                        imageableId={city.id}
                        images={city.images}
                        mainImage={city.main_image}
                    />
                )}
            </div>
        </AdminLayout>
    );
}
