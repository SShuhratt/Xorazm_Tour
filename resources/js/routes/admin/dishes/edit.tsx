import React, { FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import ImageUploadManager from '@/components/admin/image-upload-manager';
import TranslationCopyBar from '@/components/admin/translation-copy-bar';
import { FormErrorsBanner } from '@/components/admin/form-errors-banner';
import { autoTranslateObject } from '@/utils/auto-translate';
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react';
import { Dish } from '@/types';

interface DishEditProps {
    dish?: Dish | null;
}

export default function DishEdit({ dish }: DishEditProps) {
    const isEditing = !!dish;
    const [activeTab, setActiveTab] = useState<'en' | 'ru' | 'uz'>('en');
    const [isTranslating, setIsTranslating] = useState(false);

    const getTrans = (loc: string) => {
        return (
            dish?.translations?.find((t) => t.locale === loc) || {
                name: '',
                short_description: '',
                description: '',
                origin: '',
                type: '',
                history: '',
                ingredients: [],
            }
        );
    };

    const { data, setData, post, processing, errors } = useForm({
        slug: dish?.slug || '',
        status: dish ? Boolean(dish.status) : true,
        origin_region: dish?.origin_region || '',
        category: dish?.category || '',
        translations: {
            en: {
                name: getTrans('en').name || '',
                short_description: getTrans('en').short_description || '',
                description: getTrans('en').description || '',
                origin: getTrans('en').origin || '',
                type: getTrans('en').type || '',
                history: getTrans('en').history || '',
                ingredients: Array.isArray(getTrans('en').ingredients) ? (getTrans('en').ingredients as string[]) : [],
            },
            ru: {
                name: getTrans('ru').name || '',
                short_description: getTrans('ru').short_description || '',
                description: getTrans('ru').description || '',
                origin: getTrans('ru').origin || '',
                type: getTrans('ru').type || '',
                history: getTrans('ru').history || '',
                ingredients: Array.isArray(getTrans('ru').ingredients) ? (getTrans('ru').ingredients as string[]) : [],
            },
            uz: {
                name: getTrans('uz').name || '',
                short_description: getTrans('uz').short_description || '',
                description: getTrans('uz').description || '',
                origin: getTrans('uz').origin || '',
                type: getTrans('uz').type || '',
                history: getTrans('uz').history || '',
                ingredients: Array.isArray(getTrans('uz').ingredients) ? (getTrans('uz').ingredients as string[]) : [],
            },
        },
        image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            post(`/admin/dishes/${dish.id}`, {
                preserveScroll: true,
                headers: { 'X-HTTP-Method-Override': 'PUT' },
            });
        } else {
            post('/admin/dishes');
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
                short_description: sourceData.short_description || '',
                description: sourceData.description || '',
                origin: sourceData.origin || '',
                type: sourceData.type || '',
                history: sourceData.history || '',
                ingredients: [...(sourceData.ingredients || [])],
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
        <AdminLayout title={isEditing ? `Edit Dish: ${dish.slug}` : 'Create New National Dish'}>
            <Head title={isEditing ? 'Edit Dish' : 'Create Dish'} />

            <div className="max-w-4xl mx-auto space-y-6">
                <Link
                    href="/admin/dishes"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dishes
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
                                placeholder="e.g. shivit-osh"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Origin Region</label>
                            <input
                                type="text"
                                value={data.origin_region}
                                onChange={(e) => setData('origin_region', e.target.value)}
                                placeholder="e.g. Xorazm"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Category</label>
                            <input
                                type="text"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                placeholder="e.g. Xamirli taom"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <TranslationCopyBar
                            title="Dish Details"
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            onCopyFrom={handleCopyFrom}
                            onTranslateFrom={handleTranslateFrom}
                            isTranslating={isTranslating}
                        />

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Dish Name ({activeTab.toUpperCase()}) *
                                </label>
                                <input
                                    type="text"
                                    required={activeTab === 'en'}
                                    value={data.translations[activeTab].name}
                                    onChange={(e) => handleTransChange(activeTab, 'name', e.target.value)}
                                    placeholder={`Dish name in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Short Summary ({activeTab.toUpperCase()})
                                </label>
                                <input
                                    type="text"
                                    value={data.translations[activeTab].short_description}
                                    onChange={(e) => handleTransChange(activeTab, 'short_description', e.target.value)}
                                    placeholder={`Short summary in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Full Description & Preparation ({activeTab.toUpperCase()})
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.translations[activeTab].description}
                                    onChange={(e) => handleTransChange(activeTab, 'description', e.target.value)}
                                    placeholder={`Preparation method and tasting notes in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                        Origin Label ({activeTab.toUpperCase()})
                                    </label>
                                    <input
                                        type="text"
                                        value={data.translations[activeTab].origin}
                                        onChange={(e) => handleTransChange(activeTab, 'origin', e.target.value)}
                                        placeholder="e.g. Ancient Khwarazm Oasis"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                        Dish Type ({activeTab.toUpperCase()})
                                    </label>
                                    <input
                                        type="text"
                                        value={data.translations[activeTab].type}
                                        onChange={(e) => handleTransChange(activeTab, 'type', e.target.value)}
                                        placeholder="e.g. Signature Khivan Rice Dish"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Historical Heritage ({activeTab.toUpperCase()})
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.translations[activeTab].history}
                                    onChange={(e) => handleTransChange(activeTab, 'history', e.target.value)}
                                    placeholder={`Cultural history in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Key Ingredients ({activeTab.toUpperCase()})
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleTransChange(activeTab, 'ingredients', [
                                                ...(data.translations[activeTab].ingredients || []),
                                                '',
                                            ])
                                        }
                                        className="inline-flex items-center gap-1 rounded-lg border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs font-bold text-gold hover:bg-gold hover:text-slate-950"
                                    >
                                        <Plus className="h-3 w-3" /> Add Ingredient
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {(data.translations[activeTab].ingredients || []).map((item: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                    const next = [...(data.translations[activeTab].ingredients || [])];
                                                    next[idx] = e.target.value;
                                                    handleTransChange(activeTab, 'ingredients', next);
                                                }}
                                                placeholder="e.g. Yellow carrots"
                                                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const next = (data.translations[activeTab].ingredients || []).filter((_, i) => i !== idx);
                                                    handleTransChange(activeTab, 'ingredients', next);
                                                }}
                                                className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg"
                                                title="Remove ingredient"
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
                            {isEditing ? 'Update Dish' : 'Create Dish'}
                        </button>
                    </div>
                </form>

                {isEditing && (
                    <ImageUploadManager
                        imageableType="App\Models\Dish"
                        imageableId={dish.id}
                        images={dish.images}
                        mainImage={dish.main_image}
                    />
                )}
            </div>
        </AdminLayout>
    );
}
