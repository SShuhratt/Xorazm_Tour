import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Image as ImageIcon, Eye, Upload, Trash2, X, ZoomIn } from 'lucide-react';

interface MediaItem {
    id: number;
    path: string;
    is_main?: boolean;
}

interface SingleMediaFrameProps {
    imageableType: string;
    imageableId: number;
    mediaItem?: MediaItem | null;
    label?: string;
}

export default function SingleMediaFrame({
    imageableType,
    imageableId,
    mediaItem,
    label = 'Activity Image',
}: SingleMediaFrameProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    const isVideo = (path: string) => {
        return (
            path.endsWith('.mp4') ||
            path.endsWith('.webm') ||
            path.endsWith('.ogg') ||
            path.endsWith('.mov') ||
            path.includes('video')
        );
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];
        setIsUploading(true);

        const formData = new FormData();
        formData.append('image', file);
        formData.append('imageable_type', imageableType);
        formData.append('imageable_id', String(imageableId));
        formData.append('is_main', '1');

        router.post('/admin/images/upload', formData, {
            onFinish: () => {
                setIsUploading(false);
            },
        });
    };

    const handleDelete = () => {
        if (mediaItem && confirm('Delete this activity media file?')) {
            router.delete(`/admin/images/${mediaItem.id}`);
        }
    };

    return (
        <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-gold" />
                    {label}
                </span>
                {mediaItem && (
                    <span className="text-[10px] text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                        1 File Attached
                    </span>
                )}
            </div>

            {mediaItem ? (
                /* Small Adjusted Frame with Hover Overlay & Pop-up Trigger */
                <div className="relative group w-36 h-24 rounded-xl overflow-hidden bg-slate-950 border border-gold/40 shadow-lg transition-all hover:border-gold">
                    {isVideo(mediaItem.path) ? (
                        <video src={mediaItem.path} className="w-full h-full object-cover" controls={false} muted />
                    ) : (
                        <img
                            src={mediaItem.path}
                            alt={label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onClick={() => setIsPreviewModalOpen(true)}
                        />
                    )}

                    {/* Quick Control Bar Overlay */}
                    <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-1">
                        <button
                            type="button"
                            onClick={() => setIsPreviewModalOpen(true)}
                            className="p-1.5 bg-slate-800 text-gold hover:bg-gold hover:text-slate-950 rounded-lg transition-colors"
                            title="View Full Original Size (Pop-up)"
                        >
                            <ZoomIn className="w-4 h-4" />
                        </button>
                        <label
                            className="p-1.5 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white rounded-lg transition-colors cursor-pointer"
                            title="Replace File"
                        >
                            <Upload className="w-4 h-4" />
                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleFileSelect}
                                className="hidden"
                                disabled={isUploading}
                            />
                        </label>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="p-1.5 bg-red-950/80 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                            title="Delete Media"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ) : (
                /* Compact Add Image Upload Frame */
                <label className="flex flex-col items-center justify-center w-36 h-24 border-2 border-dashed border-slate-800 hover:border-gold/60 bg-slate-950/50 hover:bg-slate-900 rounded-xl cursor-pointer transition-all group">
                    <Upload className="w-5 h-5 text-slate-500 group-hover:text-gold transition-colors mb-1" />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">
                        {isUploading ? 'Uploading...' : '+ Upload Image'}
                    </span>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={isUploading}
                    />
                </label>
            )}

            {/* Lightbox Pop-up Modal (Full Original Resolution) */}
            {isPreviewModalOpen && mediaItem && (
                <div
                    className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setIsPreviewModalOpen(false)}
                >
                    <div
                        className="relative max-w-5xl max-h-[90vh] bg-slate-900 border border-gold/30 rounded-2xl p-2 shadow-2xl overflow-hidden flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header Controls */}
                        <div className="w-full flex items-center justify-between px-4 py-2 border-b border-slate-800">
                            <span className="text-xs font-serif font-bold text-gold flex items-center gap-2">
                                <Eye className="w-4 h-4" /> {label} (Original Resolution)
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsPreviewModalOpen(false)}
                                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Full Size Content */}
                        <div className="p-4 flex items-center justify-center max-h-[80vh] overflow-auto">
                            {isVideo(mediaItem.path) ? (
                                <video src={mediaItem.path} className="max-w-full max-h-[75vh] rounded-xl shadow-xl" controls autoPlay />
                            ) : (
                                <img
                                    src={mediaItem.path}
                                    alt={label}
                                    className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-xl"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
