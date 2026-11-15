import React, { FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import ImageUploadManager from '@/components/admin/image-upload-manager';
import TranslationCopyBar from '@/components/admin/translation-copy-bar';
import { FormErrorsBanner } from '@/components/admin/form-errors-banner';
import { autoTranslateObject } from '@/utils/auto-translate';
import { ArrowLeft, Save } from 'lucide-react';
import { Transport } from '@/types';

interface TransportEditProps {
    transport?: Transport | null;
}

export default function TransportEdit({ transport }: TransportEditProps) {
    const isEditing = !!transport;
    const [activeTab, setActiveTab] = useState<'en' | 'ru' | 'uz'>('en');
    const [isTranslating, setIsTranslating] = useState(false);

    const getTrans = (loc: string) => {
        return transport?.translations?.find((t) => t.locale === loc) || { name: '', description: '' };
    };

    const { data, setData, post, processing, errors } = useForm({
        slug: transport?.slug || '',
        capacity: transport?.capacity || '4',
        status: transport ? Boolean(transport.status) : true,
        height: transport?.height || '',
        width: transport?.width || '',
        length: transport?.length || '',
        translations: {
            en: { name: getTrans('en').name || '', description: getTrans('en').description || '' },
            ru: { name: getTrans('ru').name || '', description: getTrans('ru').description || '' },
            uz: { name: getTrans('uz').name || '', description: getTrans('uz').description || '' },
        },
        image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            post(`/admin/transports/${transport.id}`, {
                preserveScroll: true,
                headers: { 'X-HTTP-Method-Override': 'PUT' },
            });
        } else {
            post('/admin/transports');
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
                name: sourceData.name || '',
                description: sourceData.description || '',
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
        <AdminLayout title={isEditing ? `Edit Transport: ${transport.slug}` : 'Create New Transport'}>
            <Head title={isEditing ? 'Edit Transport' : 'Create Transport'} />

            <div className="max-w-4xl mx-auto space-y-6">
                <Link
                    href="/admin/transports"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Transports
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
                                placeholder="e.g. mercedes-sprinter-bus"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Seat Capacity</label>
                            <input
                                type="number"
                                required
                                value={data.capacity}
                                onChange={(e) => setData('capacity', e.target.value)}
                                placeholder="18"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Height (m)</label>
                            <input
                                type="text"
                                value={data.height}
                                onChange={(e) => setData('height', e.target.value)}
                                placeholder="2.8"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-800">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Width (m)</label>
                            <input
                                type="text"
                                value={data.width}
                                onChange={(e) => setData('width', e.target.value)}
                                placeholder="2.1"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Length (m)</label>
                            <input
                                type="text"
                                value={data.length}
                                onChange={(e) => setData('length', e.target.value)}
                                placeholder="6.9"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <TranslationCopyBar
                            title="Transport Details"
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            onCopyFrom={handleCopyFrom}
                            onTranslateFrom={handleTranslateFrom}
                            isTranslating={isTranslating}
                        />

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Vehicle Name ({activeTab.toUpperCase()}) *
                                </label>
                                <input
                                    type="text"
                                    required={activeTab === 'en'}
                                    value={data.translations[activeTab].name}
                                    onChange={(e) => handleTransChange(activeTab, 'name', e.target.value)}
                                    placeholder={`Vehicle name in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Features & Comfort ({activeTab.toUpperCase()})
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.translations[activeTab].description}
                                    onChange={(e) => handleTransChange(activeTab, 'description', e.target.value)}
                                    placeholder={`A/C, WiFi, leather seats details in ${activeTab.toUpperCase()}`}
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
                            {isEditing ? 'Update Transport' : 'Create Transport'}
                        </button>
                    </div>
                </form>

                {isEditing && (
                    <ImageUploadManager
                        imageableType="App\Models\Transport"
                        imageableId={transport.id}
                        images={transport.images}
                        mainImage={transport.main_image}
                    />
                )}
            </div>
        </AdminLayout>
    );
}
