import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { FileText, Plus, Edit, Trash2, Search, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { Post } from '@/types';

interface PostsIndexProps {
    posts: Post[];
}

export default function PostsIndex({ posts = [] }: PostsIndexProps) {
    const [search, setSearch] = useState('');

    const filtered = posts.filter((post) => {
        const enTitle = post.translations?.find((t) => t.locale === 'en')?.title || post.slug || '';
        return enTitle.toLowerCase().includes(search.toLowerCase()) || post.slug.toLowerCase().includes(search.toLowerCase());
    });

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this blog post? All linked images will be permanently removed.')) {
            router.delete(`/admin/posts/${id}`);
        }
    };

    return (
        <AdminLayout title="Blog Posts & News">
            <Head title="Posts - Admin Dashboard" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search posts..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-gold"
                        />
                    </div>
                    <Link
                        href="/admin/posts/create"
                        className="w-full sm:w-auto px-4 py-2 bg-gold text-slate-950 font-bold text-xs rounded-xl hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold/10"
                    >
                        <Plus className="w-4 h-4" /> Add Blog Post
                    </Link>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-300">
                            <thead className="bg-slate-950 border-b border-slate-800 uppercase tracking-wider text-gold font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Cover</th>
                                    <th className="px-6 py-4">Post Title (EN)</th>
                                    <th className="px-6 py-4">Source Link</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {filtered.length > 0 ? (
                                    filtered.map((post) => {
                                        const enTrans = post.translations?.find((t) => t.locale === 'en');
                                        const image = post.main_image?.path || post.images?.[0]?.path;
                                        return (
                                            <tr key={post.id} className="hover:bg-slate-800/40 transition-colors">
                                                <td className="px-6 py-4">
                                                    {image ? (
                                                        <img src={image} alt="Post" className="w-12 h-12 object-cover rounded-xl border border-slate-700" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500">
                                                            <FileText className="w-5 h-5 text-slate-600" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-bold text-white text-sm">
                                                    <div>{enTrans?.title || 'Untitled Post'}</div>
                                                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{post.slug}</div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-400">
                                                    {post.source_link ? (
                                                        <a href={post.source_link} target="_blank" rel="noreferrer" className="text-gold hover:underline flex items-center gap-1">
                                                            <span>Source</span> <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    ) : (
                                                        'N/A'
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {post.status ? (
                                                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/50">
                                                            <CheckCircle className="w-3.5 h-3.5" /> Published
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                                                            <XCircle className="w-3.5 h-3.5" /> Draft
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <Link
                                                        href={`/admin/posts/${post.id}/edit`}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 rounded-lg transition-colors font-semibold"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" /> Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-950/60 text-red-400 hover:bg-red-900/80 rounded-lg transition-colors font-semibold border border-red-800/50"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" /> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                            No blog posts found. Click "Add Blog Post" to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
