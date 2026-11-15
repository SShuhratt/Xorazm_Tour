import React, { FormEvent, useState, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import ImageUploadManager from '@/components/admin/image-upload-manager';
import SingleMediaFrame from '@/components/admin/single-media-frame';
import TranslationCopyBar from '@/components/admin/translation-copy-bar';
import { FormErrorsBanner } from '@/components/admin/form-errors-banner';
import { autoTranslateText } from '@/utils/auto-translate';
import { 
    ArrowLeft, 
    Save, 
    Plus, 
    Trash2, 
    Calendar, 
    MapPin, 
    Building2, 
    Bus, 
    Upload, 
    DollarSign, 
    Users, 
    CheckCircle2, 
    XCircle,
    Plane,
    Sparkles,
    Copy,
    Loader2
} from 'lucide-react';
import { Tour, City, Hotel, Transport, TourPricingTier, TourSchedule, Image } from '@/types';

interface ScheduleFormItem {
    id?: number;
    day: number;
    time: string;
    activeTab: 'en' | 'ru' | 'uz';
    image: File | null;
    temp_preview: string | null;
    images?: Image[];
    main_image?: Image | null;
    translations: {
        en: { title: string; description: string };
        ru: { title: string; description: string };
        uz: { title: string; description: string };
    };
}

interface TourEditProps {
    tour?: Tour | null;
    cities?: City[];
    hotels?: Hotel[];
    transports?: Transport[];
}

export default function TourEdit({ tour, cities = [], hotels = [], transports = [] }: TourEditProps) {
    const isEditing = !!tour;
    const [activeTab, setActiveTab] = useState<'en' | 'ru' | 'uz'>('en');
    const [isTranslating, setIsTranslating] = useState(false);
    const [translatingScheduleIdx, setTranslatingScheduleIdx] = useState<number | null>(null);
    const [isTranslatingAllSchedules, setIsTranslatingAllSchedules] = useState(false);

    const examplePricingTiers: Record<'en' | 'ru' | 'uz', TourPricingTier[]> = {
        en: [
            { group_size: '4 – 6 people', price_per_person: '600' },
            { group_size: '8 – 10 people', price_per_person: '550' },
            { group_size: '12 – 14 people', price_per_person: '500' },
        ],
        ru: [
            { group_size: '4 – 6 человек', price_per_person: '600' },
            { group_size: '8 – 10 человек', price_per_person: '550' },
            { group_size: '12 – 14 человек', price_per_person: '500' },
        ],
        uz: [
            { group_size: '4 – 6 kishi', price_per_person: '600' },
            { group_size: '8 – 10 kishi', price_per_person: '550' },
            { group_size: '12 – 14 kishi', price_per_person: '500' },
        ],
    };

    const translateGroupSize = (text: string, targetLang: 'en' | 'ru' | 'uz'): string => {
        if (!text) return '';
        const unitMap: Record<'en' | 'ru' | 'uz', string> = {
            en: 'people',
            ru: 'человек',
            uz: 'kishi',
        };
        const targetUnit = unitMap[targetLang];
        // Clean out previous units (people, person, человек, чел, kishi, odam)
        const cleaned = text.replace(/(people|person|persons|человек|чел\.?|kishi|odam)/gi, '').trim();
        return cleaned ? `${cleaned} ${targetUnit}` : targetUnit;
    };

    const getTrans = (loc: 'en' | 'ru' | 'uz') => {
        return (
            tour?.translations?.find((t) => t.locale === loc) || {
                title: '',
                route: '',
                custom_transport: '',
                duration: '',
                description: '',
                included: [],
                not_included: [],
                pricing_tiers: [],
            }
        );
    };

    const getInitialTiers = (loc: 'en' | 'ru' | 'uz') => {
        const trans = getTrans(loc);
        if (Array.isArray(trans.pricing_tiers) && trans.pricing_tiers.length > 0) {
            return trans.pricing_tiers;
        }
        if (Array.isArray(tour?.pricing_tiers) && tour.pricing_tiers.length > 0) {
            return tour.pricing_tiers.map((tier) => ({
                group_size: translateGroupSize(tier.group_size, loc),
                price_per_person: tier.price_per_person,
            }));
        }
        return examplePricingTiers[loc];
    };

    const initialSchedules: ScheduleFormItem[] = tour?.schedules?.map((s: TourSchedule) => ({
        id: s.id,
        day: s.day,
        time: s.time || '09:00',
        activeTab: 'en' as const,
        image: null,
        temp_preview: null,
        images: s.images || [],
        main_image: s.main_image || null,
        translations: {
            en: { title: s.translations?.find((t) => t.locale === 'en')?.title || '', description: s.translations?.find((t) => t.locale === 'en')?.description || '' },
            ru: { title: s.translations?.find((t) => t.locale === 'ru')?.title || '', description: s.translations?.find((t) => t.locale === 'ru')?.description || '' },
            uz: { title: s.translations?.find((t) => t.locale === 'uz')?.title || '', description: s.translations?.find((t) => t.locale === 'uz')?.description || '' },
        },
    })) || [];

    const { data, setData, post, processing, errors } = useForm({
        slug: tour?.slug || '',
        category: tour?.category || 'cultural',
        max_group_size: tour?.max_group_size !== undefined && tour?.max_group_size !== null ? String(tour.max_group_size) : '',
        cost: tour?.cost !== undefined && tour?.cost !== null ? String(tour.cost) : '',
        single_supplement: tour?.single_supplement !== undefined && tour?.single_supplement !== null ? String(tour.single_supplement) : '',
        status: tour ? (tour.status === 'active' || Boolean(tour.status)) : true,
        translations: {
            en: {
                title: getTrans('en').title || '',
                route: getTrans('en').route || '',
                custom_transport: getTrans('en').custom_transport || '',
                duration: getTrans('en').duration ? String(getTrans('en').duration) : '',
                description: getTrans('en').description || '',
                pricing_tiers: getInitialTiers('en'),
                included: Array.isArray(getTrans('en').included) && getTrans('en').included!.length > 0 ? getTrans('en').included! : [
                    'Double hotel accommodation (4 nights + early check-in) with breakfast',
                    'All meet-and-greet services and transfers during excursions in a comfortable, air-conditioned minibus',
                    'Guide services (4 days)',
                    'Entrance fees to museums and attractions',
                    'Melon tasting',
                    'Meals: 2 lunches (including a masterclass) and 2 dinners, as specified in the tour program',
                    'Folklore concert'
                ],
                not_included: Array.isArray(getTrans('en').not_included) && getTrans('en').not_included!.length > 0 ? getTrans('en').not_included! : [
                    'Airfare',
                    'Meals (2 lunches and 2 dinners): guides recommend restaurants and book tables for the group, but payment is made on-site based on actual consumption',
                    'Camel riding and boat trips on Lake Akchakul: paid separately on-site (approx. $10 per person)',
                    'Additional services at the Arda Khiva complex'
                ],
            },
            ru: {
                title: getTrans('ru').title || '',
                route: getTrans('ru').route || '',
                custom_transport: getTrans('ru').custom_transport || '',
                duration: getTrans('ru').duration ? String(getTrans('ru').duration) : '',
                description: getTrans('ru').description || '',
                pricing_tiers: getInitialTiers('ru'),
                included: Array.isArray(getTrans('ru').included) && getTrans('ru').included!.length > 0 ? getTrans('ru').included! : [
                    'Двухместное проживание в отеле (4 ночи + ранний заезд) с завтраком',
                    'Все встречи/проводы и трансферы на экскурсиях в комфортабельном микроавтобусе с кондиционером',
                    'Услуги гида (4 дня)',
                    'Входные билеты в музеи и достопримечательности',
                    'Дегустация дыни',
                    'Питание: 2 обеда (включая мастер-класс) и 2 ужина по программе',
                    'Фольклорный концерт'
                ],
                not_included: Array.isArray(getTrans('ru').not_included) && getTrans('ru').not_included!.length > 0 ? getTrans('ru').not_included! : [
                    'Авиабилеты',
                    'Питание (2 обеда и 2 ужина): гиды рекомендуют рестораны и бронируют столы, оплата на месте по чеку',
                    'Катание на верблюдах и прогулка на лодке по озеру Акчакуль (~$10 с чел)',
                    'Дополнительные услуги в комплексе Арда Хива'
                ],
            },
            uz: {
                title: getTrans('uz').title || '',
                route: getTrans('uz').route || '',
                custom_transport: getTrans('uz').custom_transport || '',
                duration: getTrans('uz').duration ? String(getTrans('uz').duration) : '',
                description: getTrans('uz').description || '',
                pricing_tiers: getInitialTiers('uz'),
                included: Array.isArray(getTrans('uz').included) && getTrans('uz').included!.length > 0 ? getTrans('uz').included! : [
                    'Mehmonxonada 2 kishilik joylashish (4 kecha + erta kirish) va nonushta',
                    'Qulay, konditsionerli mikroavtobusda kutib olish/kuzatish va barcha ekskursiya transferlari',
                    'Gid xizmatlari (4 kun)',
                    'Muzeylar va tarixiy obidalarga kirish chiptalari',
                    'Qovun tatib ko\'rish (degustatsiya)',
                    'Ovqatlanish: dastur bo\'yicha 2 tushlik (master-klass bilan) va 2 kechki ovqat',
                    'Folklor konsert dasturi'
                ],
                not_included: Array.isArray(getTrans('uz').not_included) && getTrans('uz').not_included!.length > 0 ? getTrans('uz').not_included! : [
                    'Aviachiptalar',
                    'Dasturda ko\'rsatilmagan ovqatlanish (2 tushlik va 2 kechki ovqat joyida to\'lanadi)',
                    'Aqchako\'l ko\'lida tuya minish va qayiqda sayr qilish (~kishiga $10)',
                    'Arda Xiva majmuasidagi qo\'shimcha pullik xizmatlar'
                ],
            },
        },
        city_ids: tour?.cities?.map((c) => c.id) || [],
        hotel_ids: tour?.hotels?.map((h) => h.id) || [],
        transport_ids: tour?.transports?.map((tr) => tr.id) || [],
        schedules: initialSchedules,
        image: null as File | null,
    });

    // Synchronize all multilingual sections (form tabs + all schedule activity tabs)
    const handleMainTabChange = (lang: 'en' | 'ru' | 'uz') => {
        setActiveTab(lang);
        if (data.schedules && data.schedules.length > 0) {
            const updated = data.schedules.map((s: ScheduleFormItem) => ({
                ...s,
                activeTab: lang,
            }));
            setData('schedules', updated);
        }
    };

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

    const handleTransChange = (lang: 'en' | 'ru' | 'uz', field: string, value: unknown) => {
        setData('translations', {
            ...data.translations,
            [lang]: {
                ...data.translations[lang],
                [field]: value,
            },
        });
    };

    // Overall copy of entire content from source language to active tab
    const handleCopyAllTourContent = (fromLang: 'en' | 'ru' | 'uz') => {
        const sourceData = data.translations[fromLang];
        const mappedTiers = (sourceData.pricing_tiers || []).map((tier) => ({
            group_size: translateGroupSize(tier.group_size, activeTab),
            price_per_person: tier.price_per_person,
        }));

        // Also copy schedule activity translations for activeTab
        const updatedSchedules = data.schedules.map((sched: ScheduleFormItem) => {
            const src = sched.translations[fromLang];
            return {
                ...sched,
                activeTab: activeTab,
                translations: {
                    ...sched.translations,
                    [activeTab]: {
                        title: src?.title || '',
                        description: src?.description || '',
                    },
                },
            };
        });

        setData({
            ...data,
            translations: {
                ...data.translations,
                [activeTab]: {
                    title: sourceData.title || '',
                    route: sourceData.route || '',
                    custom_transport: sourceData.custom_transport || '',
                    duration: sourceData.duration || '',
                    description: sourceData.description || '',
                    pricing_tiers: mappedTiers,
                    included: [...(sourceData.included || [])],
                    not_included: [...(sourceData.not_included || [])],
                },
            },
            schedules: updatedSchedules,
        });
    };

    // Overall auto-translate from source language to active tab
    const handleTranslateAllTourContent = async (fromLang: 'en' | 'ru' | 'uz') => {
        setIsTranslating(true);
        try {
            const sourceData = data.translations[fromLang];
            const [
                translatedTitle,
                translatedRoute,
                translatedCustomTransport,
                translatedDescription,
                translatedIncluded,
                translatedNotIncluded,
                translatedSchedules,
            ] = await Promise.all([
                autoTranslateText(sourceData.title || '', activeTab, fromLang),
                autoTranslateText(sourceData.route || '', activeTab, fromLang),
                autoTranslateText(sourceData.custom_transport || '', activeTab, fromLang),
                autoTranslateText(sourceData.description || '', activeTab, fromLang),
                Promise.all((sourceData.included || []).map((item) => autoTranslateText(item, activeTab, fromLang))),
                Promise.all((sourceData.not_included || []).map((item) => autoTranslateText(item, activeTab, fromLang))),
                Promise.all(
                    data.schedules.map(async (sched: ScheduleFormItem) => {
                        const src = sched.translations[fromLang];
                        const [tTitle, tDesc] = await Promise.all([
                            autoTranslateText(src?.title || '', activeTab, fromLang),
                            autoTranslateText(src?.description || '', activeTab, fromLang),
                        ]);
                        return {
                            ...sched,
                            activeTab: activeTab,
                            translations: {
                                ...sched.translations,
                                [activeTab]: {
                                    title: tTitle,
                                    description: tDesc,
                                },
                            },
                        };
                    })
                ),
            ]);

            const mappedTiers = (sourceData.pricing_tiers || []).map((tier) => ({
                group_size: translateGroupSize(tier.group_size, activeTab),
                price_per_person: tier.price_per_person,
            }));

            setData({
                ...data,
                translations: {
                    ...data.translations,
                    [activeTab]: {
                        title: translatedTitle,
                        route: translatedRoute,
                        custom_transport: translatedCustomTransport,
                        duration: sourceData.duration || '',
                        description: translatedDescription,
                        pricing_tiers: mappedTiers,
                        included: translatedIncluded,
                        not_included: translatedNotIncluded,
                    },
                },
                schedules: translatedSchedules,
            });
        } finally {
            setIsTranslating(false);
        }
    };

    // Universal Multilingual Pricing Tiers Helpers
    const addPricingTier = (lang: 'en' | 'ru' | 'uz') => {
        const currentList = data.translations[lang].pricing_tiers || [];
        handleTransChange(lang, 'pricing_tiers', [
            ...currentList,
            { group_size: '', price_per_person: '' },
        ]);
    };

    const updatePricingTier = (lang: 'en' | 'ru' | 'uz', index: number, field: 'group_size' | 'price_per_person', value: string) => {
        const currentList = [...(data.translations[lang].pricing_tiers || [])];
        currentList[index] = { ...currentList[index], [field]: value };
        handleTransChange(lang, 'pricing_tiers', currentList);
    };

    const removePricingTier = (lang: 'en' | 'ru' | 'uz', index: number) => {
        const currentList = [...(data.translations[lang].pricing_tiers || [])];
        currentList.splice(index, 1);
        handleTransChange(lang, 'pricing_tiers', currentList);
    };

    const setExamplePricingTiers = (lang: 'en' | 'ru' | 'uz') => {
        handleTransChange(lang, 'pricing_tiers', examplePricingTiers[lang]);
        if (!data.single_supplement) {
            setData('single_supplement', '100');
        }
    };

    // Universal copy between ANY two languages (EN <-> RU <-> UZ)
    const copyPricingTiers = (fromLang: 'en' | 'ru' | 'uz', toLang: 'en' | 'ru' | 'uz') => {
        const sourceTiers = data.translations[fromLang].pricing_tiers || [];
        const mapped = sourceTiers.map((tier) => ({
            group_size: translateGroupSize(tier.group_size, toLang),
            price_per_person: tier.price_per_person,
        }));
        handleTransChange(toLang, 'pricing_tiers', mapped);
    };

    // Universal Copy for "The Price Includes" between ANY two languages
    const copyIncluded = (fromLang: 'en' | 'ru' | 'uz', toLang: 'en' | 'ru' | 'uz') => {
        const sourceList = data.translations[fromLang].included || [];
        handleTransChange(toLang, 'included', [...sourceList]);
    };

    // Universal Copy for "Not Included" between ANY two languages
    const copyNotIncluded = (fromLang: 'en' | 'ru' | 'uz', toLang: 'en' | 'ru' | 'uz') => {
        const sourceList = data.translations[fromLang].not_included || [];
        handleTransChange(toLang, 'not_included', [...sourceList]);
    };

    // "Price Includes" Helpers
    const addIncludedItem = (lang: 'en' | 'ru' | 'uz') => {
        const currentList = data.translations[lang].included || [];
        handleTransChange(lang, 'included', [...currentList, '']);
    };

    const updateIncludedItem = (lang: 'en' | 'ru' | 'uz', index: number, value: string) => {
        const currentList = [...(data.translations[lang].included || [])];
        currentList[index] = value;
        handleTransChange(lang, 'included', currentList);
    };

    const removeIncludedItem = (lang: 'en' | 'ru' | 'uz', index: number) => {
        const currentList = [...(data.translations[lang].included || [])];
        currentList.splice(index, 1);
        handleTransChange(lang, 'included', currentList);
    };

    // "Not Included" Helpers
    const addNotIncludedItem = (lang: 'en' | 'ru' | 'uz') => {
        const currentList = data.translations[lang].not_included || [];
        handleTransChange(lang, 'not_included', [...currentList, '']);
    };

    const updateNotIncludedItem = (lang: 'en' | 'ru' | 'uz', index: number, value: string) => {
        const currentList = [...(data.translations[lang].not_included || [])];
        currentList[index] = value;
        handleTransChange(lang, 'not_included', currentList);
    };

    const removeNotIncludedItem = (lang: 'en' | 'ru' | 'uz', index: number) => {
        const currentList = [...(data.translations[lang].not_included || [])];
        currentList.splice(index, 1);
        handleTransChange(lang, 'not_included', currentList);
    };

    // Batch Schedule Translation / Copy
    const copyAllSchedulesFrom = (fromLang: 'en' | 'ru' | 'uz') => {
        const updated = data.schedules.map((sched: ScheduleFormItem) => {
            const src = sched.translations[fromLang];
            return {
                ...sched,
                activeTab: activeTab,
                translations: {
                    ...sched.translations,
                    [activeTab]: {
                        title: src?.title || '',
                        description: src?.description || '',
                    },
                },
            };
        });
        setData('schedules', updated);
    };

    const translateAllSchedulesFrom = async (fromLang: 'en' | 'ru' | 'uz') => {
        setIsTranslatingAllSchedules(true);
        try {
            const updated = await Promise.all(
                data.schedules.map(async (sched: ScheduleFormItem) => {
                    const src = sched.translations[fromLang];
                    const [tTitle, tDesc] = await Promise.all([
                        autoTranslateText(src?.title || '', activeTab, fromLang),
                        autoTranslateText(src?.description || '', activeTab, fromLang),
                    ]);
                    return {
                        ...sched,
                        activeTab: activeTab,
                        translations: {
                            ...sched.translations,
                            [activeTab]: {
                                title: tTitle,
                                description: tDesc,
                            },
                        },
                    };
                })
            );
            setData('schedules', updated);
        } finally {
            setIsTranslatingAllSchedules(false);
        }
    };

    const lastScheduleRef = useRef<HTMLDivElement | null>(null);

    const addScheduleDay = () => {
        const existingDays = data.schedules.map((s: ScheduleFormItem) => Number(s.day) || 1);
        const maxDay = existingDays.length > 0 ? Math.max(...existingDays) + 1 : 1;
        const newSchedule: ScheduleFormItem = {
            day: maxDay,
            time: '09:00',
            activeTab: activeTab,
            image: null,
            temp_preview: null,
            translations: {
                en: { title: `Activity for Day ${maxDay}`, description: '' },
                ru: { title: `Активность на День ${maxDay}`, description: '' },
                uz: { title: `${maxDay}-kun faoliyati`, description: '' },
            },
        };
        setData('schedules', [...data.schedules, newSchedule]);

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

                <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-8 shadow-xl">
                    <FormErrorsBanner errors={errors} />

                    {/* Basic Info & Supplements */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                            <DollarSign className="w-4 h-4" /> Tour Identifiers & Supplements
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Slug URL</label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="e.g. khiva-ancient-tour"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                                {errors.slug && <p className="text-red-400 text-[10px] mt-1">{errors.slug}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Category</label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value as 'cultural' | 'adventure' | 'premium')}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                >
                                    <option value="cultural">Cultural</option>
                                    <option value="adventure">Adventure</option>
                                    <option value="premium">Premium</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Max Group Size</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={500}
                                    value={data.max_group_size}
                                    onChange={(e) => setData('max_group_size', e.target.value)}
                                    placeholder="e.g. 14"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Single Supplement ($)
                                </label>
                                <input
                                    type="number"
                                    value={data.single_supplement}
                                    onChange={(e) => setData('single_supplement', e.target.value)}
                                    placeholder="100"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                                <span className="text-[10px] text-slate-500 mt-1 block">Optional single supplement fee (e.g. $100 per person)</span>
                            </div>
                        </div>
                    </div>

                    {/* Multilingual Content & Tiered Pricing Section */}
                    <div className="space-y-6 pt-2 border-t border-slate-800">
                        {/* Universal Translation Copy Toolbar with Global Tab Sync */}
                        <TranslationCopyBar
                            title="Tour Content & Program"
                            activeTab={activeTab}
                            onTabChange={handleMainTabChange}
                            onCopyFrom={handleCopyAllTourContent}
                            onTranslateFrom={handleTranslateAllTourContent}
                            isTranslating={isTranslating}
                        />

                        {/* MULTILINGUAL TIERED PRICING SECTION (PER ACTIVE TAB) */}
                        <div className="space-y-4 bg-slate-950/80 p-4 rounded-xl border border-gold/20 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                    <h4 className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-2">
                                        <Users className="w-4 h-4" /> Tour Cost by Group Size ({activeTab.toUpperCase()})
                                    </h4>
                                    <p className="text-[11px] text-slate-400 mt-0.5">
                                        Specify pricing tiers for <span className="font-bold text-gold">{activeTab.toUpperCase()}</span> (e.g. {activeTab === 'ru' ? '4–6 человек: $600' : activeTab === 'uz' ? '4–6 kishi: $600' : '4–6 people: $600'})
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {/* Universal Copy Buttons from other 2 languages */}
                                    {(['en', 'ru', 'uz'] as const)
                                        .filter((lang) => lang !== activeTab)
                                        .map((otherLang) => (
                                            <button
                                                key={otherLang}
                                                type="button"
                                                onClick={() => copyPricingTiers(otherLang, activeTab)}
                                                className="px-2.5 py-1 bg-slate-800 text-slate-300 text-[11px] font-semibold rounded-lg hover:text-gold hover:bg-slate-700 transition-colors flex items-center gap-1 shadow-sm"
                                                title={`Copy & auto-translate tiers from ${otherLang.toUpperCase()} tab`}
                                            >
                                                <Copy className="w-3 h-3 text-gold" /> Copy from {otherLang.toUpperCase()}
                                            </button>
                                        ))}

                                    <button
                                        type="button"
                                        onClick={() => setExamplePricingTiers(activeTab)}
                                        className="px-2.5 py-1 bg-slate-800 text-slate-300 text-[11px] font-semibold rounded-lg hover:text-gold transition-colors flex items-center gap-1"
                                    >
                                        <Sparkles className="w-3 h-3 text-gold" /> Use Example Tiers
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => addPricingTier(activeTab)}
                                        className="px-3 py-1.5 bg-gold/15 border border-gold/30 text-gold text-xs font-bold rounded-lg hover:bg-gold hover:text-slate-950 transition-all flex items-center gap-1"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add Tier
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                                {(data.translations[activeTab].pricing_tiers || []).length === 0 ? (
                                    <div className="text-center py-4 text-xs text-slate-500">
                                        No group pricing tiers added for {activeTab.toUpperCase()}. Click &quot;Add Tier&quot;, &quot;Use Example Tiers&quot;, or Copy from another language.
                                    </div>
                                ) : (
                                    (data.translations[activeTab].pricing_tiers || []).map((tier: TourPricingTier, idx: number) => (
                                        <div key={idx} className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                                            <div className="flex-1">
                                                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                                                    Group Size ({activeTab.toUpperCase()})
                                                </label>
                                                <input
                                                    type="text"
                                                    value={tier.group_size}
                                                    onChange={(e) => updatePricingTier(activeTab, idx, 'group_size', e.target.value)}
                                                    placeholder={activeTab === 'ru' ? 'напр. 4 – 6 человек' : activeTab === 'uz' ? 'masalan 4 – 6 kishi' : 'e.g. 4 – 6 people'}
                                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-gold"
                                                />
                                            </div>
                                            <div className="w-40">
                                                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                                                    Price per person ($)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={tier.price_per_person}
                                                    onChange={(e) => updatePricingTier(activeTab, idx, 'price_per_person', e.target.value)}
                                                    placeholder="600"
                                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-gold"
                                                />
                                            </div>
                                            <div className="pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => removePricingTier(activeTab, idx)}
                                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors"
                                                    title="Remove tier"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="space-y-5">
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
                                        placeholder="e.g. 4 Days / 3 Nights"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            {/* Custom Transportation Description */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                                        <Plane className="w-3.5 h-3.5 text-gold" /> Transportation Details ({activeTab.toUpperCase()})
                                    </label>
                                    <div className="flex gap-1 flex-wrap">
                                        {[
                                            'Plane, air-conditioned minibus',
                                            'Air-conditioned minibus',
                                            'High-speed train (Afrosiyob) & Minibus',
                                        ].map((preset) => (
                                            <button
                                                key={preset}
                                                type="button"
                                                onClick={() => handleTransChange(activeTab, 'custom_transport', preset)}
                                                className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded hover:text-gold transition-colors"
                                            >
                                                {preset}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={data.translations[activeTab].custom_transport}
                                    onChange={(e) => handleTransChange(activeTab, 'custom_transport', e.target.value)}
                                    placeholder="e.g. Plane, air-conditioned minibus (or custom transportation options)"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Full Description</label>
                                <textarea
                                    rows={4}
                                    value={data.translations[activeTab].description}
                                    onChange={(e) => handleTransChange(activeTab, 'description', e.target.value)}
                                    placeholder="Detailed tour introduction, cultural highlights, and overview..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            {/* The Price Includes (Custom items) */}
                            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-950/60 space-y-3">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4" /> The Price Includes ({activeTab.toUpperCase()})
                                    </label>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        {(['en', 'ru', 'uz'] as const)
                                            .filter((lang) => lang !== activeTab)
                                            .map((otherLang) => (
                                                <button
                                                    key={otherLang}
                                                    type="button"
                                                    onClick={() => copyIncluded(otherLang, activeTab)}
                                                    className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-[10px] font-bold rounded-lg hover:bg-emerald-900 transition-colors flex items-center gap-1"
                                                    title={`Copy inclusions from ${otherLang.toUpperCase()}`}
                                                >
                                                    <Copy className="w-3 h-3 text-emerald-400" /> Copy {otherLang.toUpperCase()}
                                                </button>
                                            ))}
                                        <button
                                            type="button"
                                            onClick={() => addIncludedItem(activeTab)}
                                            className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-[11px] font-bold rounded-lg hover:bg-emerald-900 transition-colors flex items-center gap-1"
                                        >
                                            <Plus className="w-3.5 h-3.5" /> Add Included Item
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {(data.translations[activeTab].included || []).map((item: string, iIdx: number) => (
                                        <div key={iIdx} className="flex items-center gap-2">
                                            <span className="text-emerald-400 font-bold text-xs">✓</span>
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => updateIncludedItem(activeTab, iIdx, e.target.value)}
                                                placeholder="e.g. Double hotel accommodation with breakfast..."
                                                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeIncludedItem(activeTab, iIdx)}
                                                className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                    {(data.translations[activeTab].included || []).length === 0 && (
                                        <p className="text-[11px] text-slate-500 italic">No inclusions added yet. Click &quot;Add Included Item&quot; or Copy from another language.</p>
                                    )}
                                </div>
                            </div>

                            {/* Not Included in Price (Custom items) */}
                            <div className="p-4 bg-slate-950 rounded-xl border border-rose-950/60 space-y-3">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <label className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <XCircle className="w-4 h-4" /> Not Included in Price ({activeTab.toUpperCase()})
                                    </label>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        {(['en', 'ru', 'uz'] as const)
                                            .filter((lang) => lang !== activeTab)
                                            .map((otherLang) => (
                                                <button
                                                    key={otherLang}
                                                    type="button"
                                                    onClick={() => copyNotIncluded(otherLang, activeTab)}
                                                    className="px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-800/40 text-[10px] font-bold rounded-lg hover:bg-rose-900 transition-colors flex items-center gap-1"
                                                    title={`Copy exclusions from ${otherLang.toUpperCase()}`}
                                                >
                                                    <Copy className="w-3 h-3 text-rose-400" /> Copy {otherLang.toUpperCase()}
                                                </button>
                                            ))}
                                        <button
                                            type="button"
                                            onClick={() => addNotIncludedItem(activeTab)}
                                            className="px-2.5 py-1 bg-rose-950 text-rose-300 border border-rose-800/40 text-[11px] font-bold rounded-lg hover:bg-rose-900 transition-colors flex items-center gap-1"
                                        >
                                            <Plus className="w-3.5 h-3.5" /> Add Excluded Item
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {(data.translations[activeTab].not_included || []).map((item: string, eIdx: number) => (
                                        <div key={eIdx} className="flex items-center gap-2">
                                            <span className="text-rose-400 font-bold text-xs">✕</span>
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => updateNotIncludedItem(activeTab, eIdx, e.target.value)}
                                                placeholder="e.g. Airfare, optional camel riding..."
                                                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeNotIncludedItem(activeTab, eIdx)}
                                                className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                    {(data.translations[activeTab].not_included || []).length === 0 && (
                                        <p className="text-[11px] text-slate-500 italic">No exclusions added yet. Click &quot;Add Excluded Item&quot; or Copy from another language.</p>
                                    )}
                                </div>
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
                                <Bus className="w-3.5 h-3.5 text-gold" /> Fleet Fleet Links
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
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                            <div>
                                <h4 className="text-xs font-semibold text-gold uppercase tracking-wider flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Tour Itinerary Activities ({data.schedules.length} Items)
                                </h4>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                    Activities currently viewing in <span className="font-bold text-gold">{activeTab.toUpperCase()}</span>
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-2 flex-wrap">
                                {/* Batch copy and translate for all schedule activities */}
                                {(['en', 'ru', 'uz'] as const)
                                    .filter((l) => l !== activeTab)
                                    .map((fromL) => (
                                        <div key={fromL} className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
                                            <button
                                                type="button"
                                                onClick={() => copyAllSchedulesFrom(fromL)}
                                                className="px-2 py-1 text-[10px] font-semibold text-slate-300 hover:text-gold transition-colors flex items-center gap-1"
                                                title={`Copy all schedule activities from ${fromL.toUpperCase()} into ${activeTab.toUpperCase()}`}
                                            >
                                                <Copy className="w-2.5 h-2.5 text-gold/80" /> Copy All {fromL.toUpperCase()}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => translateAllSchedulesFrom(fromL)}
                                                disabled={isTranslatingAllSchedules}
                                                className="px-2 py-1 text-[10px] font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 border-l border-slate-800 disabled:opacity-50"
                                                title={`Translate all schedule activities from ${fromL.toUpperCase()} into ${activeTab.toUpperCase()}`}
                                            >
                                                {isTranslatingAllSchedules ? (
                                                    <Loader2 className="w-2.5 h-2.5 animate-spin text-amber-400" />
                                                ) : (
                                                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                                                )}
                                                Translate All {fromL.toUpperCase()}
                                            </button>
                                        </div>
                                    ))}

                                <button
                                    type="button"
                                    onClick={addScheduleDay}
                                    className="px-3 py-1.5 bg-gold text-slate-950 text-xs font-bold rounded-lg hover:bg-gold-light transition-all flex items-center gap-1 shadow-sm"
                                >
                                    <Plus className="w-3.5 h-3.5" /> Add Schedule Activity
                                </button>
                            </div>
                        </div>

                        {data.schedules.map((sched: ScheduleFormItem, idx: number) => {
                            const localTab = (sched.activeTab || activeTab) as 'en' | 'ru' | 'uz';

                            const copyScheduleFrom = (fromLang: 'en' | 'ru' | 'uz') => {
                                const sourceTrans = sched.translations[fromLang];
                                const updated = [...data.schedules];
                                updated[idx].translations[localTab] = {
                                    title: sourceTrans?.title || '',
                                    description: sourceTrans?.description || '',
                                };
                                setData('schedules', updated);
                            };

                            const translateScheduleFrom = async (fromLang: 'en' | 'ru' | 'uz') => {
                                setTranslatingScheduleIdx(idx);
                                try {
                                    const sourceTrans = sched.translations[fromLang];
                                    const [tTitle, tDesc] = await Promise.all([
                                        autoTranslateText(sourceTrans?.title || '', localTab, fromLang),
                                        autoTranslateText(sourceTrans?.description || '', localTab, fromLang),
                                    ]);
                                    const updated = [...data.schedules];
                                    updated[idx].translations[localTab] = {
                                        title: tTitle,
                                        description: tDesc,
                                    };
                                    setData('schedules', updated);
                                } finally {
                                    setTranslatingScheduleIdx(null);
                                }
                            };

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

                                        {/* Local Language Switcher Per Schedule Card with mini-copy & auto-translate buttons */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {(['en', 'ru', 'uz'] as const)
                                                .filter((l) => l !== localTab)
                                                .map((fromL) => (
                                                    <div key={fromL} className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => copyScheduleFrom(fromL)}
                                                            className="px-2 py-0.5 text-[9px] font-semibold text-slate-300 hover:text-gold transition-colors flex items-center gap-0.5"
                                                            title={`Copy from ${fromL.toUpperCase()} tab into ${localTab.toUpperCase()}`}
                                                        >
                                                            <Copy className="w-2.5 h-2.5 text-gold/70" /> Copy {fromL.toUpperCase()}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => translateScheduleFrom(fromL)}
                                                            disabled={translatingScheduleIdx === idx}
                                                            className="px-1.5 py-0.5 text-[9px] font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-0.5 border-l border-slate-800 disabled:opacity-50"
                                                            title={`Auto-translate from ${fromL.toUpperCase()} into ${localTab.toUpperCase()}`}
                                                        >
                                                            {translatingScheduleIdx === idx ? (
                                                                <Loader2 className="w-2.5 h-2.5 animate-spin text-amber-400" />
                                                            ) : (
                                                                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                                                            )}
                                                            Translate {fromL.toUpperCase()}
                                                        </button>
                                                    </div>
                                                ))}

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
                                                            localTab === lang ? 'bg-gold text-slate-950 font-black' : 'text-slate-400 hover:text-white'
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

                                    {/* Activity Title (Full width) */}
                                    <div>
                                        <label className="block text-[10px] text-slate-400 font-semibold mb-1">
                                            Activity Title ({localTab.toUpperCase()}) *
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

                                    {/* Side-by-Side: Image Upload Frame on Left + Multi-paragraph Description Textarea on Right */}
                                    <div className="flex flex-col sm:flex-row gap-4 items-start pt-1">
                                        {/* Left: Activity Image */}
                                        <div className="w-full sm:w-44 shrink-0">
                                            <label className="block text-[10px] text-slate-400 font-semibold mb-1">
                                                Day {sched.day} Activity Image
                                            </label>
                                            {sched.id ? (
                                                <SingleMediaFrame
                                                    imageableType="App\Models\TourSchedule"
                                                    imageableId={sched.id}
                                                    mediaItem={sched.main_image || sched.images?.[0] || null}
                                                    label={`Day ${sched.day}`}
                                                />
                                            ) : (
                                                <div>
                                                    {sched.temp_preview ? (
                                                        <div className="relative group w-full h-28 rounded-xl overflow-hidden bg-slate-950 border border-gold shadow-lg">
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
                                                        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-800 hover:border-gold/60 bg-slate-950/50 hover:bg-slate-900 rounded-xl cursor-pointer transition-all group">
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

                                        {/* Right: Generous Multi-paragraph Description Box */}
                                        <div className="flex-1 w-full">
                                            <label className="block text-[10px] text-slate-400 font-semibold mb-1">
                                                Activity Description ({localTab.toUpperCase()})
                                            </label>
                                            <textarea
                                                rows={5}
                                                value={sched.translations[localTab]?.description || ''}
                                                onChange={(e) => {
                                                    const updated = [...data.schedules];
                                                    if (!updated[idx].translations[localTab]) {
                                                        updated[idx].translations[localTab] = { title: '', description: '' };
                                                    }
                                                    updated[idx].translations[localTab].description = e.target.value;
                                                    setData('schedules', updated);
                                                }}
                                                placeholder={`Detailed day schedule, excursions, timing details, and notes in ${localTab.toUpperCase()} (supports multiple paragraphs)...`}
                                                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-gold leading-relaxed min-h-[112px] resize-y"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Prominent Bottom Add Schedule Activity Button */}
                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={addScheduleDay}
                                className="w-full py-3.5 border-2 border-dashed border-gold/30 hover:border-gold bg-slate-950/60 hover:bg-gold/10 text-gold font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm group cursor-pointer"
                            >
                                <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                + Add Schedule Activity (Day {data.schedules.length > 0 ? Math.max(...data.schedules.map((s: ScheduleFormItem) => Number(s.day) || 1)) : 1})
                            </button>
                        </div>
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
