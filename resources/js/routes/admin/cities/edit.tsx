import React, { FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import ImageUploadManager from '@/components/admin/image-upload-manager';
import { ArrowLeft, Save, Globe } from 'lucide-react';

interface CityEditProps {
    city?: any;
}

export default function CityEdit({ city }: CityEditProps) {
    const isEditing = !!city;
    const [activeTab, setActiveTab] = useState<'en' | 'ru' | 'uz'>('en');

    const getTrans = (loc: string) => {
        return city?.translations?.find((t: any) => t.locale === loc) || { name: '', description: '' };
    };

    const { data, setData, post, put, processing, errors } = useForm({
        slug: city?.slug || '',
        status: city ? Boolean(city.status) : true,
        latitude: city?.latitude || '',
        longitude: city?.longitude || '',
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
            put(`/admin/cities/${city.id}`);
        } else {
            post('/admin/cities');
        }
    };

    const handleTransChange = (lang: 'en' | 'ru' | 'uz', field: 'name' | 'description', value: string) => {
        setData('translations', {
            ...data.translations,
            [lang]: {
                ...data.translations[lang],
                [field]: value,
            },
        });
    };

    return (
        <AdminLayout title={isEditing ? `Edit City: ${city.slug}` : 'Create New City'}>
            <Head title={isEditing ? 'Edit City' : 'Create City'} />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Back Button */}
                <Link
                    href="/admin/cities"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Cities
                </Link>

                <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
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

                    {/* Multilingual Tabs */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-wider">
                                <Globe className="w-4 h-4" /> Multilingual Information
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
                            {isEditing ? 'Update City' : 'Create City'}
                        </button>
                    </div>
                </form>

                {/* Media Manager Component (When Editing) */}
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
