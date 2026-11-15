import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import { useTranslations } from '@/hooks/use-translations';
import { PageProps } from '@/types';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
    const { locale } = usePage<PageProps>().props;
    const { t } = useTranslations();

    const sections = [
        {
            title: t('legal.privacy_collect_title'),
            body: t('legal.privacy_collect_body'),
        },
        {
            title: t('legal.privacy_use_title'),
            body: t('legal.privacy_use_body'),
        },
        {
            title: t('legal.privacy_sharing_title'),
            body: t('legal.privacy_sharing_body'),
        },
        {
            title: t('legal.privacy_rights_title'),
            body: t('legal.privacy_rights_body'),
        },
    ];

    return (
        <MainLayout>
            <Head title={t('legal.privacy_title')} />

            <section className="bg-navy pt-32 pb-16 border-b border-gold/20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold mb-4">
                        <ShieldCheck className="w-4 h-4" />
                        <span>{t('legal.badge')}</span>
                    </div>
                    <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ivory mb-4">
                        {t('legal.privacy_title')}
                    </h1>
                    <p className="text-ivory/70 text-sm sm:text-base max-w-2xl mx-auto">
                        {t('legal.privacy_intro')}
                    </p>
                </div>
            </section>

            <section className="py-16 sm:py-24 bg-ivory">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
                    {sections.map((section, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-6 sm:p-8 border border-gold/20 shadow-sm"
                        >
                            <h2 className="font-serif text-2xl font-bold text-navy mb-3">
                                {section.title}
                            </h2>
                            <p className="text-navy/75 leading-relaxed text-sm sm:text-base">
                                {section.body}
                            </p>
                        </div>
                    ))}

                    <div className="bg-navy text-ivory rounded-2xl p-6 sm:p-8 border border-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="font-serif text-xl font-bold text-gold mb-1">
                                {t('legal.questions_title')}
                            </h3>
                            <p className="text-sm text-ivory/80">
                                {t('legal.questions_body')}
                            </p>
                        </div>
                        <Link
                            href={`/${locale}/contact`}
                            className="shrink-0 px-6 py-3 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold/90 transition-colors"
                        >
                            {t('nav.contact')}
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

