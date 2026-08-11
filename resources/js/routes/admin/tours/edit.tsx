import React, { FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import ImageUploadManager from '@/components/admin/image-upload-manager';
import SingleMediaFrame from '@/components/admin/single-media-frame';
import { ArrowLeft, Save, Globe, Plus, Trash2, Calendar, MapPin, Building2, Bus, Upload } from 'lucide-react';

interface TourEditProps {
    tour?: any;
    cities?: any[];
    hotels?: any[];
    transports?: any[];
}

export default function TourEdit({ tour, cities = [], hotels = [], transports = [] }: TourEditProps) {
    const isEditing = !!tour;
    const [activeTab, setActiveTab] = useState<'en' | 'ru' | 'uz'>('en');

    const getTrans = (loc: string) => {
        return tour?.translations?.find((t: any) => t.locale === loc) || { title: '', route: '', duration: '', description: '' };
    };

    const initialSchedules = tour?.schedules?.map((s: any) => ({
        id: s.id,
        day: s.day,
        time: s.time || '09:00',
        activeTab: 'en',
        image: null as File | null,
        temp_preview: null as string | null,
        images: s.images || [],
        main_image: s.main_image || null,
        translations: {
            en: { title: s.translations?.find((t: any) => t.locale === 'en')?.title || '', description: s.translations?.find((t: any) => t.locale === 'en')?.description || '' },
            ru: { title: s.translations?.find((t: any) => t.locale === 'ru')?.title || '', description: s.translations?.find((t: any) => t.locale === 'ru')?.description || '' },
            uz: { title: s.translations?.find((t: any) => t.locale === 'uz')?.title || '', description: s.translations?.find((t: any) => t.locale === 'uz')?.description || '' },
        },
    })) || [];

    const { data, setData, post, put, processing, errors } = useForm({
        slug: tour?.slug || '',
        cost: tour?.cost || '0',
        status: tour ? (tour.status === 'active' || Boolean(tour.status)) : true,
        translations: {
            en: { title: getTrans('en').title || '', route: getTrans('en').route || '', duration: getTrans('en').duration || '', description: getTrans('en').description || '' },
            ru: { title: getTrans('ru').title || '', route: getTrans('ru').route || '', duration: getTrans('ru').duration || '', description: getTrans('ru').description || '' },
            uz: { title: getTrans('uz').title || '', route: getTrans('uz').route || '', duration: getTrans('uz').duration || '', description: getTrans('uz').description || '' },
        },
        city_ids: tour?.cities?.map((c: any) => c.id) || [],
        hotel_ids: tour?.hotels?.map((h: any) => h.id) || [],
        transport_ids: tour?.transports?.map((tr: any) => tr.id) || [],
        schedules: initialSchedules,
        image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            post(`/admin/tours/${tour.id}`, {
                preserveScroll: true,
                headers: { 'X-HTTP-Method-Override': 'PUT' },
            });
        } else {
            post('/admin/tours');
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

    const lastScheduleRef = React.useRef<HTMLDivElement | null>(null);

    const addScheduleDay = () => {
        const existingDays = data.schedules.map((s: any) => Number(s.day) || 1);
        const maxDay = existingDays.length > 0 ? Math.max(...existingDays) : 1;
        setData('schedules', [
            ...data.schedules,
            {
                day: maxDay,
                time: '09:00',
                activeTab: 'en',
                image: null,
                temp_preview: null,
                translations: {
                    en: { title: `Activity for Day ${maxDay}`, description: '' },
                    ru: { title: `Активность на День ${maxDay}`, description: '' },
                    uz: { title: `${maxDay}-kun faoliyati`, description: '' },
                },
            },
        ]);

        setTimeout(() => {
            if (lastScheduleRef.current) {
                lastScheduleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 120);
    };

    const removeScheduleDay = (index: number) => {
        const updated = [...data.schedules];
        updated.splice(index, 1);
        setData('schedules', updated);
    };

    return (
        <AdminLayout title={isEditing ? `Edit Tour: ${tour.slug}` : 'Create New Tour'}>
            <Head title={isEditing ? 'Edit Tour' : 'Create Tour'} />

            <div className="max-w-4xl mx-auto space-y-6">
                <Link
                    href="/admin/tours"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Tours
                </Link>

                <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
                    {/* General Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-800">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Slug URL</label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="e.g. khiva-ancient-tour"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tour Cost ($)</label>
                            <input
                                type="number"
                                required
                                value={data.cost}
                                onChange={(e) => setData('cost', e.target.value)}
                                placeholder="150"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                    </div>

                    {/* Multilingual Information */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-wider">
                                <Globe className="w-4 h-4" /> Tour Details ({activeTab.toUpperCase()})
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
                                    Tour Title ({activeTab.toUpperCase()}) *
                                </label>
                                <input
                                    type="text"
                                    required={activeTab === 'en'}
                                    value={data.translations[activeTab].title}
                                    onChange={(e) => handleTransChange(activeTab, 'title', e.target.value)}
                                    placeholder={`Tour title in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Route Summary</label>
                                    <input
                                        type="text"
                                        value={data.translations[activeTab].route}
                                        onChange={(e) => handleTransChange(activeTab, 'route', e.target.value)}
                                        placeholder="e.g. Tashkent - Urgench - Khiva"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Duration</label>
                                    <input
                                        type="text"
                                        value={data.translations[activeTab].duration}
                                        onChange={(e) => handleTransChange(activeTab, 'duration', e.target.value)}
                                        placeholder="e.g. 3 Days / 2 Nights"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Full Description</label>
                                <textarea
                                    rows={4}
                                    value={data.translations[activeTab].description}
                                    onChange={(e) => handleTransChange(activeTab, 'description', e.target.value)}
                                    placeholder="Detailed itinerary and features..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Linked Entities */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
                        {/* Cities */}
                        <div>
                            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-gold" /> Cities Included
                            </h4>
                            <div className="max-h-36 overflow-y-auto space-y-1.5 p-2 bg-slate-950 rounded-xl border border-slate-800">
                                {cities.map((c) => (
                                    <label key={c.id} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.city_ids.includes(c.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) setData('city_ids', [...data.city_ids, c.id]);
                                                else setData('city_ids', data.city_ids.filter((id: number) => id !== c.id));
                                            }}
                                            className="rounded border-slate-700 bg-slate-900 text-gold focus:ring-gold"
                                        />
                                        <span>{c.translations?.[0]?.name || c.slug}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Hotels */}
                        <div>
                            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Building2 className="w-3.5 h-3.5 text-gold" /> Hotels Included
                            </h4>
                            <div className="max-h-36 overflow-y-auto space-y-1.5 p-2 bg-slate-950 rounded-xl border border-slate-800">
                                {hotels.map((h) => (
                                    <label key={h.id} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.hotel_ids.includes(h.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) setData('hotel_ids', [...data.hotel_ids, h.id]);
                                                else setData('hotel_ids', data.hotel_ids.filter((id: number) => id !== h.id));
                                            }}
                                            className="rounded border-slate-700 bg-slate-900 text-gold focus:ring-gold"
                                        />
                                        <span>{h.translations?.[0]?.title || h.slug}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Transports */}
                        <div>
                            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Bus className="w-3.5 h-3.5 text-gold" /> Transports Included
                            </h4>
                            <div className="max-h-36 overflow-y-auto space-y-1.5 p-2 bg-slate-950 rounded-xl border border-slate-800">
                                {transports.map((tr) => (
                                    <label key={tr.id} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.transport_ids.includes(tr.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) setData('transport_ids', [...data.transport_ids, tr.id]);
                                                else setData('transport_ids', data.transport_ids.filter((id: number) => id !== tr.id));
                                            }}
                                            className="rounded border-slate-700 bg-slate-900 text-gold focus:ring-gold"
                                        />
                                        <span>{tr.translations?.[0]?.name || tr.slug}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tour Schedule Itinerary */}
                    <div className="pt-4 border-t border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-semibold text-gold uppercase tracking-wider flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Tour Itinerary Activities ({data.schedules.length} Items)
                            </h4>
                            <button
                                type="button"
                                onClick={addScheduleDay}
                                className="px-3 py-1.5 bg-slate-800 text-gold text-xs font-bold rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-1"
                            >
                                <Plus className="w-3.5 h-3.5" /> Add Schedule Activity
                            </button>
                        </div>

                        {data.schedules.map((sched: any, idx: number) => {
                            const localTab = sched.activeTab || activeTab;

                            return (
                                <div
                                    key={idx}
                                    ref={idx === data.schedules.length - 1 ? lastScheduleRef : null}
                                    className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4 shadow-md transition-all"
                                >
                                    {/* Header: Day Number Selector, Time Input, Local Language Tabs, Delete */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-900">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                                                <span className="text-[10px] font-bold text-gold uppercase">Day:</span>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    value={sched.day}
                                                    onChange={(e) => {
                                                        const updated = [...data.schedules];
                                                        updated[idx].day = Math.max(1, parseInt(e.target.value) || 1);
                                                        setData('schedules', updated);
                                                    }}
                                                    className="w-12 bg-slate-950 border border-slate-800 text-white font-bold text-xs rounded px-1.5 py-0.5 text-center focus:border-gold focus:outline-none"
                                                />
                                            </div>

                                            <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Time:</span>
                                                <input
                                                    type="time"
                                                    value={sched.time || '09:00'}
                                                    onChange={(e) => {
                                                        const updated = [...data.schedules];
                                                        updated[idx].time = e.target.value;
                                                        setData('schedules', updated);
                                                    }}
                                                    className="bg-slate-950 border border-slate-800 text-white font-mono text-xs rounded px-1.5 py-0.5 focus:border-gold focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Local Language Switcher Per Schedule Card */}
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                                                {(['en', 'ru', 'uz'] as const).map((lang) => (
                                                    <button
                                                        key={lang}
                                                        type="button"
                                                        onClick={() => {
                                                            const updated = [...data.schedules];
                                                            updated[idx].activeTab = lang;
                                                            setData('schedules', updated);
                                                        }}
                                                        className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded transition-all ${
                                                            localTab === lang ? 'bg-gold text-slate-950' : 'text-slate-400 hover:text-white'
                                                        }`}
                                                    >
                                                        {lang}
                                                    </button>
                                                ))}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeScheduleDay(idx)}
                                                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-lg transition-colors"
                                                title="Delete Schedule Activity"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Inputs: Title & Description for localTab */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[10px] text-slate-400 font-semibold mb-1">
                                                Activity Title ({localTab.toUpperCase()})
                                            </label>
                                            <input
                                                type="text"
                                                value={sched.translations[localTab]?.title || ''}
                                                onChange={(e) => {
                                                    const updated = [...data.schedules];
                                                    if (!updated[idx].translations[localTab]) {
                                                        updated[idx].translations[localTab] = { title: '', description: '' };
                                                    }
                                                    updated[idx].translations[localTab].title = e.target.value;
                                                    setData('schedules', updated);
                                                }}
                                                placeholder={`Title in ${localTab.toUpperCase()}`}
                                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-slate-400 font-semibold mb-1">
                                                Activity Description ({localTab.toUpperCase()})
                                            </label>
                                            <input
                                                type="text"
                                                value={sched.translations[localTab]?.description || ''}
                                                onChange={(e) => {
                                                    const updated = [...data.schedules];
                                                    if (!updated[idx].translations[localTab]) {
                                                        updated[idx].translations[localTab] = { title: '', description: '' };
                                                    }
                                                    updated[idx].translations[localTab].description = e.target.value;
                                                    setData('schedules', updated);
                                                }}
                                                placeholder={`Description in ${localTab.toUpperCase()}`}
                                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    {/* Single Activity Image Frame (Available for BOTH existing and newly added items) */}
                                    <div className="pt-2 border-t border-slate-900">
                                        {sched.id ? (
                                            <SingleMediaFrame
                                                imageableType="App\Models\TourSchedule"
                                                imageableId={sched.id}
                                                mediaItem={sched.main_image || sched.images?.[0] || null}
                                                label={`Day ${sched.day} Activity Image`}
                                            />
                                        ) : (
                                            /* Temp Image Uploader for new schedule item before saving */
                                            <div className="mt-2 space-y-2">
                                                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                                    Day {sched.day} Activity Image
                                                </span>
                                                {sched.temp_preview ? (
                                                    <div className="relative group w-36 h-24 rounded-xl overflow-hidden bg-slate-950 border border-gold shadow-lg">
                                                        <img src={sched.temp_preview} alt="Preview" className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const updated = [...data.schedules];
                                                                    updated[idx].image = null;
                                                                    updated[idx].temp_preview = null;
                                                                    setData('schedules', updated);
                                                                }}
                                                                className="p-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors flex items-center gap-1"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" /> Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <label className="flex flex-col items-center justify-center w-36 h-24 border-2 border-dashed border-slate-800 hover:border-gold/60 bg-slate-950/50 hover:bg-slate-900 rounded-xl cursor-pointer transition-all group">
                                                        <Upload className="w-5 h-5 text-slate-500 group-hover:text-gold transition-colors mb-1" />
                                                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">
                                                            + Upload Image
                                                        </span>
                                                        <input
                                                            type="file"
                                                            accept="image/*,video/*"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                if (e.target.files && e.target.files[0]) {
                                                                    const file = e.target.files[0];
                                                                    const updated = [...data.schedules];
                                                                    updated[idx].image = file;
                                                                    updated[idx].temp_preview = URL.createObjectURL(file);
                                                                    setData('schedules', updated);
                                                                }
                                                            }}
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Submit Bar */}
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
                            {isEditing ? 'Update Tour' : 'Create Tour'}
                        </button>
                    </div>
                </form>

                {isEditing && (
                    <ImageUploadManager
                        imageableType="App\Models\Tour"
                        imageableId={tour.id}
                        images={tour.images}
                        mainImage={tour.main_image}
                    />
                )}
            </div>
        </AdminLayout>
    );
}
