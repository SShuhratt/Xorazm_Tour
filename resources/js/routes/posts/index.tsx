import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Post } from '@/types';
import MainLayout from '@/layouts/main-layout';

interface Props {
    posts: Post[];
    locale: 'en' | 'ru' | 'uz';
}

function Index({ posts, locale }: Props) {
    return (
        <div className="min-h-screen bg-white py-20 px-4">
            <Head title="Travel Stories & News" />

            <div className="max-w-6xl mx-auto mb-16 border-b border-gray-100 pb-8">
                <h1 className="font-serif text-5xl text-gray-900 mb-4">Khiva Chronicles</h1>
                <p className="text-gray-500 font-light">Latest updates, history deep-dives, and travel tips from Xorazm.</p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                {posts.map((post, index) => {
                    const t = post.translations.find(trans => trans.locale === locale) || post.translations[0];
                    return (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <Link href={`/${locale}/posts/${post.slug}`}>
                                <div className="aspect-[16/9] overflow-hidden bg-gray-100 mb-6">
                                    <img
                                        src={post.main_image?.path}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        alt={t.title}
                                    />
                                </div>
                                <h2 className="font-serif text-3xl text-gray-900 mb-4 group-hover:text-[#3498db] transition-colors leading-tight">
                                    {t.title}
                                </h2>
                                <p className="text-gray-600 line-clamp-3 leading-relaxed mb-6">
                                    {t.description}
                                </p>
                                <div className="flex items-center text-sm font-bold uppercase tracking-widest text-[#3498db]">
                                    Read Story <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                                </div>
                            </Link>
                        </motion.article>
                    );
                })}
            </div>
        </div>
    );
}

Index.layout = (page: React.ReactNode) => <MainLayout children={page} />;

// 3. EXPORT ONLY ONCE
export default Index;
