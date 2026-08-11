import React, { FormEvent, useState } from 'react';
import { router } from '@inertiajs/react';
import { Image as ImageIcon, Video, Star, Trash2, Upload } from 'lucide-react';

interface ImageItem {
    id: number;
    path: string;
    is_main: boolean;
    order: number;
}

interface ImageUploadManagerProps {
    imageableType: string;
    imageableId: number;
    images?: ImageItem[];
    mainImage?: ImageItem | null;
}

export default function ImageUploadManager({
    imageableType,
    imageableId,
    images = [],
    mainImage,
}: ImageUploadManagerProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isMainChecked, setIsMainChecked] = useState(false);

    const isVideoFile = (path: string) => {
        return (
            path.endsWith('.mp4') ||
            path.endsWith('.webm') ||
            path.endsWith('.ogg') ||
            path.endsWith('.mov') ||
            path.includes('video')
        );
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = (e: FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('imageable_type', imageableType);
        formData.append('imageable_id', String(imageableId));
        if (isMainChecked) {
            formData.append('is_main', '1');
        }

        router.post('/admin/images/upload', formData, {
            onFinish: () => {
                setIsUploading(false);
                setSelectedFile(null);
                setPreviewUrl(null);
                setIsMainChecked(false);
            },
        });
    };

    const handleSetMain = (imageId: number) => {
        router.post(`/admin/images/${imageId}/set-main`);
    };

    const handleDelete = (imageId: number) => {
        if (confirm('Are you sure you want to delete this media file?')) {
            router.delete(`/admin/images/${imageId}`);
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                    <h3 className="text-base font-serif font-bold text-slate-100 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-gold" />
                        Media Gallery (Images & Videos)
                    </h3>
                    <p className="text-xs text-slate-400">Upload, replace, set cover image, or delete media items</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-gold rounded-full border border-slate-700">
                    {images.length} Media Items
                </span>
            </div>

            {/* Gallery Grid */}
            {images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((img) => {
                        const isMain = img.is_main || mainImage?.id === img.id;
                        const isVid = isVideoFile(img.path);
                        return (
                            <div
                                key={img.id}
                                className={`group relative aspect-square rounded-xl overflow-hidden bg-slate-950 border transition-all ${
                                    isMain ? 'border-gold ring-2 ring-gold/30' : 'border-slate-800 hover:border-slate-700'
                                }`}
                            >
                                {isVid ? (
                                    <video src={img.path} className="w-full h-full object-cover" controls={false} muted />
                                ) : (
                                    <img
                                        src={img.path}
                                        alt="Media"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                )}

                                {isVid && (
                                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-900/90 text-slate-200 text-[10px] rounded border border-slate-700 flex items-center gap-1">
                                        <Video className="w-3 h-3 text-cyan-400" /> Video
                                    </div>
                                )}

                                {/* Main Cover Badge */}
                                {isMain && (
                                    <div className="absolute top-2 left-2 px-2 py-1 bg-gold text-slate-950 text-[10px] font-bold uppercase rounded-md shadow-md flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-slate-950" />
                                        Cover
                                    </div>
                                )}

                                {/* Hover Overlay Controls */}
                                <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                                    {!isMain && (
                                        <button
                                            type="button"
                                            onClick={() => handleSetMain(img.id)}
                                            className="p-2 bg-gold/90 text-slate-950 rounded-lg text-xs font-bold hover:bg-gold transition-colors flex items-center gap-1"
                                            title="Set as Main Cover"
                                        >
                                            <Star className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(img.id)}
                                        className="p-2 bg-red-600/90 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-colors flex items-center gap-1"
                                        title="Delete Media"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="py-8 text-center border-2 border-dashed border-slate-800 rounded-xl">
                    <ImageIcon className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">No media files uploaded yet</p>
                </div>
            )}

            {/* Media Upload Form */}
            <form onSubmit={handleUpload} className="pt-4 border-t border-slate-800 space-y-4">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Upload New Image or Video</h4>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-gold hover:file:bg-slate-700 cursor-pointer"
                    />

                    <label className="flex items-center gap-2 text-xs text-slate-300 whitespace-nowrap">
                        <input
                            type="checkbox"
                            checked={isMainChecked}
                            onChange={(e) => setIsMainChecked(e.target.checked)}
                            className="rounded border-slate-700 bg-slate-950 text-gold focus:ring-gold"
                        />
                        Set as Cover
                    </label>

                    <button
                        type="submit"
                        disabled={!selectedFile || isUploading}
                        className="w-full sm:w-auto px-4 py-2 bg-gold text-slate-950 text-xs font-bold rounded-xl hover:bg-gold-light disabled:opacity-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        <Upload className="w-4 h-4" />
                        {isUploading ? 'Uploading...' : 'Upload Media'}
                    </button>
                </div>

                {previewUrl && (
                    <div className="mt-3 flex items-center gap-3">
                        <span className="text-xs text-slate-400">Preview:</span>
                        {selectedFile?.type.startsWith('video/') ? (
                            <video src={previewUrl} className="w-20 h-20 object-cover rounded-lg border border-gold/40" controls />
                        ) : (
                            <img src={previewUrl} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-gold/40" />
                        )}
                    </div>
                )}
            </form>
        </div>
    );
}
