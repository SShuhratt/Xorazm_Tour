import React, { FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import ImageUploadManager from '@/components/admin/image-upload-manager';
import TranslationCopyBar from '@/components/admin/translation-copy-bar';
import { FormErrorsBanner } from '@/components/admin/form-errors-banner';
import { autoTranslateObject } from '@/utils/auto-translate';
import { ArrowLeft, Save } from 'lucide-react';
import { Post } from '@/types';

interface PostEditProps {
    post?: Post | null;
}

export default function PostEdit({ post }: PostEditProps) {
    const isEditing = !!post;
    const [activeTab, setActiveTab] = useState<'en' | 'ru' | 'uz'>('en');
    const [isTranslating, setIsTranslating] = useState(false);

    const getTrans = (loc: string) => {
        return post?.translations?.find((t) => t.locale === loc) || { title: '', description: '' };
    };

    const { data, setData, post: sendPost, processing, errors } = useForm({
        slug: post?.slug || '',
        status: post ? Boolean(post.status) : true,
        source_link: post?.source_link || '',
        translations: {
            en: { title: getTrans('en').title || '', description: getTrans('en').description || '' },
            ru: { title: getTrans('ru').title || '', description: getTrans('ru').description || '' },
            uz: { title: getTrans('uz').title || '', description: getTrans('uz').description || '' },
        },
        image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            sendPost(`/admin/posts/${post.id}`, {
                preserveScroll: true,
                headers: { 'X-HTTP-Method-Override': 'PUT' },
            });
        } else {
            sendPost('/admin/posts');
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
        <AdminLayout title={isEditing ? `Edit Post: ${post.slug}` : 'Create New Post'}>
            <Head title={isEditing ? 'Edit Post' : 'Create Post'} />

            <div className="max-w-4xl mx-auto space-y-6">
                <Link
                    href="/admin/posts"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Posts
                </Link>

                <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
                    <FormErrorsBanner errors={errors} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-800">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Slug URL</label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="e.g. khiva-history-news"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Source Link (Optional)</label>
                            <input
                                type="text"
                                value={data.source_link}
                                onChange={(e) => setData('source_link', e.target.value)}
                                placeholder="https://..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <TranslationCopyBar
                            title="Post Content"
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            onCopyFrom={handleCopyFrom}
                            onTranslateFrom={handleTranslateFrom}
                            isTranslating={isTranslating}
                        />

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Post Title ({activeTab.toUpperCase()}) *
                                </label>
                                <input
                                    type="text"
                                    required={activeTab === 'en'}
                                    value={data.translations[activeTab].title}
                                    onChange={(e) => handleTransChange(activeTab, 'title', e.target.value)}
                                    placeholder={`Article title in ${activeTab.toUpperCase()}`}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                    Full Content ({activeTab.toUpperCase()})
                                </label>
                                <textarea
                                    rows={8}
                                    value={data.translations[activeTab].description}
                                    onChange={(e) => handleTransChange(activeTab, 'description', e.target.value)}
                                    placeholder={`Full article text in ${activeTab.toUpperCase()}`}
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
                            {isEditing ? 'Update Post' : 'Create Post'}
                        </button>
                    </div>
                </form>

                {isEditing && (
                    <ImageUploadManager
                        imageableType="App\Models\Post"
                        imageableId={post.id}
                        images={post.images}
                        mainImage={post.main_image}
                    />
                )}
            </div>
        </AdminLayout>
    );
}
