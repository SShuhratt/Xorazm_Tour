import React from 'react';
import { Globe, Copy, Sparkles, Loader2 } from 'lucide-react';

interface TranslationCopyBarProps {
    title?: string;
    activeTab: 'en' | 'ru' | 'uz';
    onTabChange: (tab: 'en' | 'ru' | 'uz') => void;
    onCopyFrom?: (fromLang: 'en' | 'ru' | 'uz') => void;
    onTranslateFrom?: (fromLang: 'en' | 'ru' | 'uz') => Promise<void> | void;
    isTranslating?: boolean;
    hideTabs?: boolean;
    className?: string;
}

export default function TranslationCopyBar({
    title = 'Multilingual Content',
    activeTab,
    onTabChange,
    onCopyFrom,
    onTranslateFrom,
    isTranslating = false,
    hideTabs = false,
    className = '',
}: TranslationCopyBarProps) {
    const otherLanguages = (['en', 'ru', 'uz'] as const).filter((lang) => lang !== activeTab);

    return (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 ${className}`}>
            {/* Title / Section Header */}
            <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
                <Globe className="w-4 h-4 text-gold shrink-0" />
                <span>{title} ({activeTab.toUpperCase()})</span>
            </div>

            {/* Actions: Copy / Translate & Language Tabs */}
            <div className="flex flex-wrap items-center gap-2">
                {/* One-Click Copy / Auto-Translate from Other Languages */}
                <div className="flex items-center gap-1.5 flex-wrap">
                    {otherLanguages.map((fromLang) => (
                        <div key={fromLang} className="flex items-center rounded-lg bg-slate-950 border border-slate-800 p-0.5 shadow-sm">
                            {onCopyFrom && (
                                <button
                                    type="button"
                                    onClick={() => onCopyFrom(fromLang)}
                                    disabled={isTranslating}
                                    className="px-2 py-1 text-[10px] font-semibold text-slate-300 hover:text-gold hover:bg-slate-900 rounded-md transition-colors flex items-center gap-1 disabled:opacity-50"
                                    title={`Copy content verbatim from ${fromLang.toUpperCase()} tab`}
                                >
                                    <Copy className="w-3 h-3 text-gold/80" /> Copy {fromLang.toUpperCase()}
                                </button>
                            )}

                            {onTranslateFrom && (
                                <button
                                    type="button"
                                    onClick={() => onTranslateFrom(fromLang)}
                                    disabled={isTranslating}
                                    className="px-2 py-1 text-[10px] font-bold text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 rounded-md transition-colors flex items-center gap-1 disabled:opacity-50 border-l border-slate-800/80"
                                    title={`Auto-translate from ${fromLang.toUpperCase()} into ${activeTab.toUpperCase()}`}
                                >
                                    {isTranslating ? (
                                        <Loader2 className="w-3 h-3 animate-spin text-amber-400" />
                                    ) : (
                                        <Sparkles className="w-3 h-3 text-amber-400" />
                                    )}
                                    Translate {fromLang.toUpperCase()}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Main Language Tabs */}
                {!hideTabs && (
                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-sm ml-auto sm:ml-0">
                        {(['en', 'ru', 'uz'] as const).map((lang) => (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => onTabChange(lang)}
                                className={`px-3 py-1 text-xs font-bold uppercase rounded-lg transition-all ${
                                    activeTab === lang
                                        ? 'bg-gold text-slate-950 shadow-sm font-black'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
