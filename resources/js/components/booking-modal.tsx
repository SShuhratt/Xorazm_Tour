import React, { FormEvent, useMemo, useState } from 'react';
import { Calendar, CheckCircle2, Mail, Phone, Users, X } from 'lucide-react';

interface PricingTier {
    group_size: string;
    price_per_person: number | string;
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    locale: 'en' | 'ru' | 'uz';
    inquiryType?: 'tour' | 'gastro' | 'custom';
    tourId?: number;
    dishId?: number;
    subjectTitle: string;
    baseCost?: number | string | null;
    pricingTiers?: PricingTier[];
}

const copy = {
    en: {
        tourTitle: 'Book Your Tour',
        gastroTitle: 'Request Custom Gastro Tour',
        subtitle: 'Submit your travel preferences and receive an official confirmation & itinerary quote.',
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone / WhatsApp / Telegram',
        date: 'Preferred Start Date',
        adults: 'Adults',
        children: 'Children (50% est.)',
        requests: 'Special Requests / Dietary / Hotel Notes',
        estimatedTotal: 'Estimated Total',
        submit: 'Confirm Booking Request',
        submitting: 'Submitting...',
        successTitle: 'Booking Request Confirmed!',
        referenceLabel: 'Booking Reference',
        successNote: 'A confirmation email has been sent to your address. Our Khiva specialists will reach out within 24 hours.',
        close: 'Close',
    },
    ru: {
        tourTitle: 'Бронирование тура',
        gastroTitle: 'Запрос гастрономического тура',
        subtitle: 'Оставьте ваши пожелания, и мы подготовим персональную программу и расчёт стоимости.',
        name: 'Полное имя',
        email: 'Электронная почта',
        phone: 'Телефон / WhatsApp / Telegram',
        date: 'Желаемая дата начала',
        adults: 'Взрослые',
        children: 'Дети (оценка 50%)',
        requests: 'Пожелания (отель, питание, перелёты)',
        estimatedTotal: 'Ориентировочная стоимость',
        submit: 'Отправить заявку',
        submitting: 'Отправка...',
        successTitle: 'Заявка успешно принята!',
        referenceLabel: 'Номер бронирования',
        successNote: 'Подтверждение отправлено на вашу почту. Наши менеджеры свяжутся с вами в течение 24 часов.',
        close: 'Закрыть',
    },
    uz: {
        tourTitle: 'Sayohatni band qilish',
        gastroTitle: 'Maxsus gastro-tur so‘rovi',
        subtitle: 'Sayohat rejalaringizni qoldiring, mutaxassislarimiz sizga aniq dastur va narxni yuboradi.',
        name: 'To‘liq ism',
        email: 'Elektron pochta',
        phone: 'Telefon / WhatsApp / Telegram',
        date: 'Rejalashtirilgan sana',
        adults: 'Kattalar',
        children: 'Bolalar (50% hisob)',
        requests: 'Qo‘shimcha istaklar (mehmonxona, ovqatlanish)',
        estimatedTotal: 'Taxminiy jami narx',
        submit: 'Arizani yuborish',
        submitting: 'Yuborilmoqda...',
        successTitle: 'Arizangiz qabul qilindi!',
        referenceLabel: 'Buyurtma raqami',
        successNote: 'Tasdiqlash xati pochtangizga yuborildi. Mutaxassislarimiz 24 soat ichida bog‘lanishadi.',
        close: 'Yopish',
    },
};

export default function BookingModal({
    isOpen,
    onClose,
    locale,
    inquiryType = 'tour',
    tourId,
    dishId,
    subjectTitle,
    baseCost,
    pricingTiers = [],
}: BookingModalProps) {
    const t = copy[locale] || copy.en;

    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [specialRequests, setSpecialRequests] = useState('');
    const [website, setWebsite] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [confirmation, setConfirmation] = useState<{ reference: string; estimated_total?: string | number | null } | null>(null);

    const estimatedTotal = useMemo(() => {
        if (inquiryType !== 'tour') return null;
        const totalGuests = adults + children;
        let unitPrice: number | null = null;

        if (Array.isArray(pricingTiers) && pricingTiers.length > 0) {
            for (const tier of pricingTiers) {
                const label = String(tier.group_size || '');
                const price = Number(tier.price_per_person);
                if (!Number.isFinite(price) || price <= 0) continue;

                const rangeMatch = label.match(/(\d+)\s*[-–]\s*(\d+)/);
                const plusMatch = label.match(/(\d+)\s*\+/);
                const exactMatch = label.match(/(\d+)/);

                if (rangeMatch && totalGuests >= Number(rangeMatch[1]) && totalGuests <= Number(rangeMatch[2])) {
                    unitPrice = price;
                    break;
                }
                if (plusMatch && totalGuests >= Number(plusMatch[1])) {
                    unitPrice = price;
                    break;
                }
                if (!rangeMatch && !plusMatch && exactMatch && totalGuests === Number(exactMatch[1])) {
                    unitPrice = price;
                    break;
                }
            }
            if (unitPrice === null) {
                const validPrices = pricingTiers.map((p) => Number(p.price_per_person)).filter((p) => Number.isFinite(p) && p > 0);
                if (validPrices.length > 0) {
                    unitPrice = Math.min(...validPrices);
                }
            }
        }

        if (unitPrice === null && baseCost !== null && baseCost !== undefined) {
            const numericCost = Number(baseCost);
            if (Number.isFinite(numericCost) && numericCost > 0) {
                unitPrice = numericCost;
            }
        }

        if (unitPrice === null) return null;
        return Math.round((adults * unitPrice + children * unitPrice * 0.5) * 100) / 100;
    }, [inquiryType, adults, children, pricingTiers, baseCost]);

    if (!isOpen) return null;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg(null);

        try {
            const response = await fetch('/api/v1/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    inquiry_type: inquiryType,
                    tour_id: tourId ?? null,
                    dish_id: dishId ?? null,
                    customer_name: customerName,
                    customer_email: customerEmail,
                    customer_phone: customerPhone,
                    preferred_date: preferredDate || null,
                    guests_adults: adults,
                    guests_children: children,
                    special_requests: specialRequests || null,
                    locale,
                    website,
                }),
            });

            const payload = await response.json().catch(() => ({}));
            if (response.ok) {
                setConfirmation({
                    reference: payload.reference,
                    estimated_total: payload.estimated_total ?? estimatedTotal,
                });
            } else {
                const firstFieldErr = payload.errors ? Object.values(payload.errors).flat()[0] : null;
                setErrorMsg(String(firstFieldErr || payload.message || payload.error || 'Could not submit booking request.'));
            }
        } catch {
            setErrorMsg('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setConfirmation(null);
        setErrorMsg(null);
        onClose();
    };

    const todayStr = new Date().toISOString().split('T')[0];

    return (
        <div
            className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label={inquiryType === 'gastro' ? t.gastroTitle : t.tourTitle}
        >
            <div
                className="relative w-full max-w-xl bg-ivory rounded-2xl border border-gold/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-navy px-6 py-5 flex items-start justify-between border-b border-gold/30">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gold mb-1">
                            {subjectTitle}
                        </p>
                        <h3 className="font-serif text-2xl font-bold text-ivory">
                            {inquiryType === 'gastro' ? t.gastroTitle : t.tourTitle}
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label={t.close}
                        className="p-2 rounded-full text-ivory/70 hover:text-gold hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    {confirmation ? (
                        <div className="text-center py-6 space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                <CheckCircle2 className="w-9 h-9" />
                            </div>
                            <h4 className="font-serif text-2xl font-bold text-navy">{t.successTitle}</h4>
                            <div className="inline-block px-5 py-3 rounded-xl bg-navy text-gold font-mono font-bold text-lg tracking-wider">
                                {t.referenceLabel}: {confirmation.reference}
                            </div>
                            {confirmation.estimated_total !== null && confirmation.estimated_total !== undefined && (
                                <p className="text-sm font-semibold text-turquoise">
                                    {t.estimatedTotal}: ${Number(confirmation.estimated_total).toLocaleString()}
                                </p>
                            )}
                            <p className="text-sm text-navy/75 max-w-md mx-auto leading-relaxed">
                                {t.successNote}
                            </p>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="mt-4 px-8 py-3 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold/90 transition-colors"
                            >
                                {t.close}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <p className="text-sm text-navy/70">{t.subtitle}</p>

                            <input
                                type="text"
                                name="website"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                className="hidden"
                            />

                            {errorMsg && (
                                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
                                    {errorMsg}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                                        {t.name} *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-sm text-navy focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                                        <span className="inline-flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-gold" /> {t.email} *</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={customerEmail}
                                        onChange={(e) => setCustomerEmail(e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-sm text-navy focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                                        <span className="inline-flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-gold" /> {t.phone} *</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                        placeholder="+998 ..."
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-sm text-navy focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                                        <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold" /> {t.date}</span>
                                    </label>
                                    <input
                                        type="date"
                                        min={todayStr}
                                        value={preferredDate}
                                        onChange={(e) => setPreferredDate(e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-sm text-navy focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                                        <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5 text-gold" /> {t.adults} *</span>
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={50}
                                        required
                                        value={adults}
                                        onChange={(e) => setAdults(Math.max(1, Number(e.target.value) || 1))}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-sm text-navy focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                                        {t.children}
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        max={50}
                                        value={children}
                                        onChange={(e) => setChildren(Math.max(0, Number(e.target.value) || 0))}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-sm text-navy focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                                    {t.requests}
                                </label>
                                <textarea
                                    rows={3}
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-sm text-navy focus:outline-none focus:border-gold"
                                />
                            </div>

                            {estimatedTotal !== null && (
                                <div className="flex items-center justify-between p-4 rounded-xl bg-gold/10 border border-gold/30">
                                    <span className="text-xs font-bold uppercase tracking-wider text-navy">{t.estimatedTotal}</span>
                                    <span className="font-serif text-2xl font-bold text-turquoise">
                                        ${estimatedTotal.toLocaleString()}
                                    </span>
                                </div>
                            )}

                            <p className="text-[11px] text-navy/60 leading-relaxed">
                                {locale === 'ru' ? (
                                    <>
                                        Отправляя заявку, вы соглашаетесь с нашими{' '}
                                        <a href={`/${locale}/terms`} target="_blank" rel="noreferrer" className="underline text-turquoise hover:text-navy">
                                            Условиями бронирования
                                        </a>{' '}
                                        и{' '}
                                        <a href={`/${locale}/privacy`} target="_blank" rel="noreferrer" className="underline text-turquoise hover:text-navy">
                                            Политикой конфиденциальности
                                        </a>.
                                    </>
                                ) : locale === 'uz' ? (
                                    <>
                                        So‘rov yuborish orqali siz bizning{' '}
                                        <a href={`/${locale}/terms`} target="_blank" rel="noreferrer" className="underline text-turquoise hover:text-navy">
                                            Bron qilish shartlari
                                        </a>{' '}
                                        va{' '}
                                        <a href={`/${locale}/privacy`} target="_blank" rel="noreferrer" className="underline text-turquoise hover:text-navy">
                                            Maxfiylik siyosati
                                        </a>{' '}
                                        bilan rozilik bildirasiz.
                                    </>
                                ) : (
                                    <>
                                        By submitting this request, you agree to our{' '}
                                        <a href={`/${locale}/terms`} target="_blank" rel="noreferrer" className="underline text-turquoise hover:text-navy">
                                            Terms of Service
                                        </a>{' '}
                                        and{' '}
                                        <a href={`/${locale}/privacy`} target="_blank" rel="noreferrer" className="underline text-turquoise hover:text-navy">
                                            Privacy Policy
                                        </a>.
                                    </>
                                )}
                            </p>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 px-6 rounded-xl bg-gold text-navy font-bold text-sm uppercase tracking-wider hover:bg-gold/90 transition-colors shadow-lg shadow-gold/20 disabled:opacity-50"
                            >
                                {isSubmitting ? t.submitting : t.submit}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
