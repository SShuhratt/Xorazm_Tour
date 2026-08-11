import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Post } from '@/types';
import MainLayout from '@/layouts/main-layout';

interface Props {
    post: Post;
    locale: 'en' | 'ru' | 'uz';
}

function Show({ post, locale }: Props) {
    const t = post.translations.find(trans => trans.locale === locale) || post.translations[0];

    return (
        <div className="bg-[#fffcf9] min-h-screen pb-20">
            <Head title={t.title} />

            {/* Post Header */}
            <header className="max-w-4xl mx-auto pt-20 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8"
                >
                    <h1 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">
                        {t.title}
                    </h1>
                </motion.div>
            </header>

            {/* Main Image */}
            <div className="max-w-6xl mx-auto px-4 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-[60vh] rounded-xl overflow-hidden shadow-2xl"
                >
                    <img src={post.main_image?.path} className="w-full h-full object-cover" alt={t.title} />
                </motion.div>
            </div>

            {/* Article Content */}
            <article className="max-w-3xl mx-auto px-6">
                <div className="prose prose-lg prose-slate max-w-none">
                    <p className="whitespace-pre-line text-gray-700 leading-loose first-letter:text-5xl first-letter:font-serif first-letter:mr-2">
                        {t.description}
                    </p>
                </div>

                {/* Gallery within the post */}
                {post.images && post.images.length > 0 && (
                    <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {post.images.map((img) => (
                            <img key={img.id} src={img.path} className="rounded-lg shadow-md" alt="Post gallery" />
                        ))}
                    </div>
                )}

                {/* Source Link */}
                {post.source_link && (
                    <div className="mt-20 pt-8 border-t border-gray-200 italic text-sm text-gray-400">
                        Originally published at: <a href={post.source_link} target="_blank" className="text-[#3498db] hover:underline">{post.source_link}</a>
                    </div>
                )}
            </article>
        </div>
    );
}

Show.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Show;
