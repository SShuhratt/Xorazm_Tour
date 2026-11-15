import React from 'react';
import { Head } from '@inertiajs/react';
import { Hotel } from '@/types';
import MainLayout from '@/layouts/main-layout';
import { MapPin, Phone, Mail, Sparkles, ShieldCheck } from 'lucide-react';

interface Props {
    hotel: Hotel;
    locale: 'en' | 'ru' | 'uz';
}

const showLabels = {
    roomType: { en: 'Room Type', ru: 'Тип номера', uz: 'Xona turi' },
    spec: { en: 'Specification', ru: 'Описание', uz: 'Tavsif' },
    price: { en: 'Price per Night', ru: 'Цена за ночь', uz: 'Bir kecha uchun' },
    roomRates: { en: 'Room Categories & Rates', ru: 'Категории номеров и тарифы', uz: 'Xona toifalari va narxlar' },
    geoLoc: { en: 'Geographical Location', ru: 'Географическое положение', uz: 'Geografik Joylashuv' },
    directContact: { en: 'Direct Reservations', ru: 'Прямое бронирование', uz: "To'g'ridan-to'g'ri aloqa" },
    phone: { en: 'Phone', ru: 'Телефон', uz: 'Telefon' },
    email: { en: 'Email Address', ru: 'Электронная почта', uz: 'Elektron pochta' },
    amenities: { en: 'Standard Amenities', ru: 'Стандартные удобства', uz: 'Standart qulayliklar' },
    booking: { en: 'Secure Room Booking', ru: 'Забронировать номер', uz: 'Xonani band qilish' },
    address: { en: 'Address', ru: 'Адрес', uz: 'Manzil' },
};

function Show({ hotel, locale }: Props) {
    const translation = hotel.translations.find((t) => t.locale === locale)
        || hotel.translations.find((t) => t.locale === 'en')
        || hotel.translations[0];

    const stars = Math.max(1, Math.min(5, Number(hotel.stars) || 4));
    const phone = hotel.phone_number || '+998 91 234 56 00';
    const email = hotel.email || 'xorazmtour@gmail.com';
    const amenities = Array.isArray(translation?.amenities) && translation.amenities.length > 0
        ? translation.amenities
        : ['Traditional hospitality', 'Free WiFi', 'Air Conditioning'];
    const rooms = Array.isArray(translation?.rooms) ? translation.rooms : [];

    const mainImg = hotel.main_image?.path || hotel.images?.[0]?.path || '/XT_content/khiva/Photos/hero_background.jpg';
    const subImages = hotel.images && hotel.images.length >= 2
        ? hotel.images.slice(0, 2).map((img) => img.path)
        : [
            hotel.images?.[0]?.path || '/XT_content/khiva/Photos/khiva1.jpg',
            '/XT_content/khiva/Photos/khiva2.jpg',
        ];

    const lat = hotel.latitude ? Number(hotel.latitude) : null;
    const lon = hotel.longitude ? Number(hotel.longitude) : null;
    const hasCoords = lat !== null && lon !== null && Number.isFinite(lat) && Number.isFinite(lon);
    const mapUrl = hasCoords
        ? `https://www.openstreetmap.org/export/embed.html?bbox=${(lon - 0.003).toFixed(4)}%2C${(lat - 0.003).toFixed(4)}%2C${(lon + 0.003).toFixed(4)}%2C${(lat + 0.003).toFixed(4)}&layer=mapnik&marker=${lat.toFixed(4)}%2C${lon.toFixed(4)}`
        : null;

    return (
        <MainLayout>
            <div className="bg-cream min-h-screen pb-20">
                <Head title={translation?.title || hotel.slug} />

                {/* Top Multi-image Gallery Grid */}
                <section className="show-gallery-grid">
                    <img
                        src={mainImg}
                        className="main-gallery-img"
                        alt={translation?.title || hotel.slug}
                    />
                    <div className="sub-gallery-stack">
                        {subImages.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                loading="lazy"
                                className="sub-gallery-img"
                                alt={`${translation?.title || hotel.slug} ${i + 1}`}
                            />
                        ))}
                    </div>
                </section>

                <div className="islamic-border" />

                {/* Two Column details body */}
                <div className="max-w-7xl mx-auto show-body">

                    {/* Left Column: Info & Details */}
                    <div>
                        <div className="flex items-center gap-1.5 mb-2">
                            <MapPin className="w-4 h-4 text-gold" />
                            <span className="text-gray-500 font-sans text-xs tracking-wider uppercase font-semibold">
                                {translation?.address || 'Uzbekistan'}
                            </span>
                        </div>

                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mb-6 font-bold leading-tight">
                            {translation?.title || hotel.slug}
                        </h1>

                        <div className="flex gap-1 text-gold text-lg mb-8">
                            {[...Array(stars)].map((_, i) => (
                                <span key={i}>★</span>
                            ))}
                        </div>

                        {translation?.description && (
                            <p className="info-text font-sans whitespace-pre-line border-l-2 border-gold/30 pl-6 mb-12">
                                {translation.description}
                            </p>
                        )}

                        {/* Room Categories Table */}
                        {rooms.length > 0 && (
                            <>
                                <h3 className="info-title font-serif">
                                    {showLabels.roomRates[locale]}
                                </h3>
                                <table className="room-table font-sans">
                                    <thead>
                                        <tr>
                                            <th>{showLabels.roomType[locale]}</th>
                                            <th>{showLabels.spec[locale]}</th>
                                            <th>{showLabels.price[locale]}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rooms.map((room, index) => (
                                            <tr key={index}>
                                                <td className="room-name">{room.type}</td>
                                                <td className="text-gray-600 text-sm">{room.spec}</td>
                                                <td className="room-price">{room.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}

                        {/* Geographic Location & OSM Map */}
                        <h3 className="info-title font-serif">
                            {showLabels.geoLoc[locale]}
                        </h3>
                        <p className="text-sm text-gray-700 font-sans mb-4">
                            <strong>{showLabels.address[locale]}:</strong> {translation?.address || 'Uzbekistan'}
                        </p>
                        {mapUrl && (
                            <div className="show-map-box">
                                <iframe
                                    src={mapUrl}
                                    title="Hotel location map"
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>

                    {/* Right Column: Sticky Contacts Sidebar */}
                    <div className="h-fit">
                        <div className="detail-sidebar-box sticky top-24 font-sans">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gold/10">
                                <Sparkles className="w-5 h-5 text-gold" />
                                <h4 className="font-serif text-lg text-navy font-bold">
                                    {showLabels.directContact[locale]}
                                </h4>
                            </div>

                            {/* Contact Details */}
                            <div className="sidebar-meta-item">
                                <label>{showLabels.phone[locale]}</label>
                                <span className="flex items-center gap-1.5 mt-1 font-bold text-navy">
                                    <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                                    {phone}
                                </span>
                            </div>

                            <div className="sidebar-meta-item">
                                <label>{showLabels.email[locale]}</label>
                                <span className="flex items-center gap-1.5 mt-1 font-semibold text-turquoise">
                                    <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                                    {email}
                                </span>
                            </div>

                            {/* Standard Amenities List */}
                            <div className="sidebar-meta-item">
                                <label>{showLabels.amenities[locale]}</label>
                                <ul className="mt-2 space-y-2">
                                    {amenities.map((amenity, idx) => (
                                        <li key={idx} className="text-xs text-gray-700 flex items-center gap-2 font-medium">
                                            <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Booking Action Buttons */}
                            <div className="pt-4 border-t border-gold/10 flex flex-col gap-3">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-center text-gray-400 block mb-1">
                                    {showLabels.booking[locale]}
                                </span>

                                {hotel.instagram_link && (
                                    <a
                                        href={hotel.instagram_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center py-2.5 bg-navy text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-gold hover:text-navy transition-all duration-300 shadow-sm border border-gold/20"
                                    >
                                        Instagram
                                    </a>
                                )}
                                {hotel.telegram_link && (
                                    <a
                                        href={hotel.telegram_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center py-2.5 border border-navy text-navy text-xs font-bold uppercase tracking-widest rounded hover:bg-navy hover:text-white transition-all duration-300"
                                    >
                                        Telegram
                                    </a>
                                )}

                                <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-medium">
                                    <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                                    <span>Xorazm Tour</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}

Show.layout = (page: React.ReactNode) => page;
export default Show;
