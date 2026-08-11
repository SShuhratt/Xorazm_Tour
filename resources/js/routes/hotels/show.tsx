import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Hotel } from '@/types';
import MainLayout from '@/layouts/main-layout';
import { MapPin, Phone, Mail, Sparkles, ShieldCheck } from 'lucide-react';

interface Props {
    hotel: Hotel;
    locale: 'en' | 'ru' | 'uz';
}

interface HotelMeta {
    stars: number;
    priceFrom: number;
    phone: string;
    email: string;
    mapBbox: string;
    amenities: Record<'en' | 'ru' | 'uz', string[]>;
    rooms: Record<'en' | 'ru' | 'uz', Array<{ type: string; spec: string; price: string }>>;
}

const hotelsMetadata: Record<string, HotelMeta> = {
    'orient-star-khiva': {
        stars: 3,
        priceFrom: 65,
        phone: "+998 91 234 56 01",
        email: "orient-star@xorazmtour.uz",
        mapBbox: "60.360%2C41.376%2C60.366%2C41.382",
        amenities: {
            en: ["Historic Madrasa setting", "Traditional courtyard", "Free High-speed WiFi", "Air Conditioning", "On-site Restaurant"],
            ru: ["Историческое медресе", "Традиционный двор", "Бесплатный Wi-Fi", "Кондиционер", "Ресторан на территории"],
            uz: ["Tarixiy madrasa binosi", "Milliy hovli", "Bepul tezkor WiFi", "Konditsioner", "Restoran"]
        },
        rooms: {
            en: [
                { type: "Standard Single", spec: "Cozy single bed room in authentic cell", price: "$65" },
                { type: "Double / Twin Bed", spec: "Comfortable room for two with historical decor", price: "$85" },
                { type: "Khan's Suite", spec: "Premium spacious cell with traditional ornaments", price: "$140" }
            ],
            ru: [
                { type: "Стандартный одноместный", spec: "Уютный номер в аутентичной келье", price: "$65" },
                { type: "Двухместный номер", spec: "Комфортный номер для двоих с историческим декором", price: "$85" },
                { type: "Ханский Люкс", spec: "Просторная келья премиум-класса с орнаментами", price: "$140" }
            ],
            uz: [
                { type: "Standard Single", spec: "Haqiqiy hujrada shinam 1 kishilik xona", price: "$65" },
                { type: "Double / Twin Bed", spec: "Tarixiy bezakli 2 kishilik shinam xona", price: "$85" },
                { type: "Xon xonasi Suite", spec: "Milliy naqshlar bilan bezatilgan premium hujra", price: "$140" }
            ]
        }
    },
    'asia-khiva': {
        stars: 4,
        priceFrom: 55,
        phone: "+998 91 234 56 02",
        email: "asia-khiva@xorazmtour.uz",
        mapBbox: "60.358%2C41.375%2C60.364%2C41.381",
        amenities: {
            en: ["Outdoor Swimming Pool", "Finnish Sauna", "High-speed WiFi", "Lounge Bar", "24/7 Room Service"],
            ru: ["Открытый бассейн", "Финская сауна", "Высокоскоростной Wi-Fi", "Лаундж-бар", "Круглосуточный сервис"],
            uz: ["Ochiq suzish havzasi", "Fin saunasi", "Tezkor WiFi", "Lounge bar", "24/7 Xona xizmati"]
        },
        rooms: {
            en: [
                { type: "Standard Single", spec: "Modern clean single room", price: "$55" },
                { type: "Double / Twin Bed", spec: "Spacious twin bed room near the pool", price: "$75" },
                { type: "Family Room", spec: "Two interconnected bedrooms for family", price: "$110" }
            ],
            ru: [
                { type: "Стандартный одноместный", spec: "Современный чистый номер", price: "$55" },
                { type: "Двухместный номер", spec: "Просторный номер с двумя кроватями у бассейна", price: "$75" },
                { type: "Семейный номер", spec: "Две смежные спальни для семьи", price: "$110" }
            ],
            uz: [
                { type: "Standard Single", spec: "Zamonaviy va toza bir kishilik xona", price: "$55" },
                { type: "Double / Twin Bed", spec: "Hovuz yaqinidagi keng ikki kishilik xona", price: "$75" },
                { type: "Oilaviy xona", spec: "Oila uchun mo'ljallangan keng xona", price: "$110" }
            ]
        }
    },
    'zarafshan-khiva': {
        stars: 4,
        priceFrom: 70,
        phone: "+998 91 234 56 03",
        email: "zarafshan-khiva@xorazmtour.uz",
        mapBbox: "60.362%2C41.377%2C60.368%2C41.383",
        amenities: {
            en: ["Boutique Design", "Terraced Panoramic View", "Cozy Courtyard", "Buffet Breakfast", "Full Air-conditioning"],
            ru: ["Бутик-дизайн", "Терраса с панорамным видом", "Уютный внутренний дворик", "Завтрак шведский стол", "Кондиционер"],
            uz: ["Butik dizayn", "Panoramali ayvon", "Ichki hovli", "Shved stoli nonushta", "Konditsioner"]
        },
        rooms: {
            en: [
                { type: "Standard Single", spec: "Charming single stay with carved wood", price: "$70" },
                { type: "Double / Twin Bed", spec: "Traditional styling with modern luxury", price: "$95" },
                { type: "Deluxe Suite", spec: "Top floor panoramic view suite", price: "$150" }
            ],
            ru: [
                { type: "Стандартный одноместный", spec: "Очаровательный номер с резным деревом", price: "$70" },
                { type: "Двухместный номер", spec: "Традиционный стиль с современным комфортом", price: "$95" },
                { type: "Делюкс Люкс", spec: "Люкс на верхнем этаже с панорамным видом", price: "$150" }
            ],
            uz: [
                { type: "Standard Single", spec: "O'ymakor yog'ochli shinam 1 kishilik xona", price: "$70" },
                { type: "Double / Twin Bed", spec: "Zamonaviy qulayliklarga ega milliy xona", price: "$95" },
                { type: "Deluxe Suite", spec: "Panoramali manzara va hashamatli lyuks xona", price: "$150" }
            ]
        }
    },
    'registan-plaza': {
        stars: 4,
        priceFrom: 120,
        phone: "+998 91 234 56 11",
        email: "registan-plaza@xorazmtour.uz",
        mapBbox: "66.955%2C39.652%2C66.962%2C39.658",
        amenities: {
            en: ["Grand Lobby lounge", "Conference Meeting Rooms", "Fitness Gym Center", "High-speed WiFi", "Fine dining Restaurant"],
            ru: ["Гранд Лобби лаундж", "Конференц-залы", "Фитнес-центр", "Скоростной Wi-Fi", "Изысканный ресторан"],
            uz: ["Keng vestibyul va bar", "Konferens zallar", "Fitnes sport zali", "Tezkor WiFi", "Milliy va Yevropa restorani"]
        },
        rooms: {
            en: [
                { type: "Business Comfort Single", spec: "Spacious room with work desk", price: "$120" },
                { type: "Deluxe Double", spec: "Premium room with king bed", price: "$160" },
                { type: "Presidential Suite", spec: "Executive high-floor royal suite", price: "$300" }
            ],
            ru: [
                { type: "Бизнес Комфорт Одноместный", spec: "Просторный номер с рабочим столом", price: "$120" },
                { type: "Делюкс Двухместный", spec: "Премиум номер с большой кроватью", price: "$160" },
                { type: "Президентский Люкс", spec: "Представительский королевский люкс на верхнем этаже", price: "$300" }
            ],
            uz: [
                { type: "Business Comfort Single", spec: "Ish stoli bilan jihozlangan keng xona", price: "$120" },
                { type: "Deluxe Double", spec: "Katta qirollik karavotli premium xona", price: "$160" },
                { type: "Presidential Suite", spec: "Eng yuqori qavatdagi qirollik lyuks xonasi", price: "$300" }
            ]
        }
    },
    'emirhan-hotel': {
        stars: 4,
        priceFrom: 90,
        phone: "+998 91 234 56 12",
        email: "emirhan@xorazmtour.uz",
        mapBbox: "66.959%2C39.653%2C66.965%2C39.659",
        amenities: {
            en: ["Eastern Palace architecture", "Swimming Pool", "Gourmet restaurant", "Complimentary parking", "Free high-speed WiFi"],
            ru: ["Архитектура восточного дворца", "Бассейн", "Ресторан изысканной кухни", "Бесплатная парковка", "Скоростной Wi-Fi"],
            uz: ["Sharqona saroy uslubidagi dizayn", "Suzish havzasi", "Restoran", "Bepul avtoturargoh", "Tezkor WiFi"]
        },
        rooms: {
            en: [
                { type: "Comfort Single", spec: "Elegant room in pastel colors", price: "$90" },
                { type: "Superior Double", spec: "Carved gold-leaf details, spacious stay", price: "$130" },
                { type: "Royal Suite", spec: "Palace-style luxury suite", price: "$220" }
            ],
            ru: [
                { type: "Комфорт Одноместный", spec: "Элегантный номер в пастельных тонах", price: "$90" },
                { type: "Супериор Двухместный", spec: "Резные детали из сусального золота, простор", price: "$130" },
                { type: "Королевский Люкс", spec: "Роскошный люкс в дворцовом стиле", price: "$220" }
            ],
            uz: [
                { type: "Comfort Single", spec: "Yumshoq ranglardagi shinam xona", price: "$90" },
                { type: "Superior Double", spec: "Oltin suvi yugurtirilgan naqshli keng xona", price: "$130" },
                { type: "Royal Suite", spec: "Qirol saroyi uslubidagi hashamatli lyuks", price: "$220" }
            ]
        }
    },
    'silk-road-empire': {
        stars: 5,
        priceFrom: 110,
        phone: "+998 91 234 56 13",
        email: "silkroad-empire@xorazmtour.uz",
        mapBbox: "66.954%2C39.650%2C66.960%2C39.656",
        amenities: {
            en: ["Luxury wellness spa", "Historical theme", "Complimentary WiFi", "Bar lounge", "Premium Airport Transfer"],
            ru: ["Роскошный велнес-спа", "Историческая тематика", "Бесплатный Wi-Fi", "Бар-лаундж", "Трансфер премиум-класса"],
            uz: ["Hashamatli sog'lomlashtirish spa", "Ipak yo'li mavzusidagi dizayn", "Bepul WiFi", "Bar lounge", "Premium transfer xizmati"]
        },
        rooms: {
            en: [
                { type: "Imperial Single", spec: "Silk road themed luxury single room", price: "$110" },
                { type: "Imperial Double", spec: "Authentic caravan style premium comfort", price: "$150" },
                { type: "Emperor Suite", spec: "Grand suite with historical antiquities", price: "$280" }
            ],
            ru: [
                { type: "Императорский Одноместный", spec: "Роскошный номер в стиле Шелкового пути", price: "$110" },
                { type: "Императорский Двухместный", spec: "Аутентичный стиль караван-сарая", price: "$150" },
                { type: "Императорский Люкс", spec: "Великолепный люкс с историческим антиквариатом", price: "$280" }
            ],
            uz: [
                { type: "Imperial Single", spec: "Ipak yo'li uslubidagi hashamatli 1 kishilik xona", price: "$110" },
                { type: "Imperial Double", spec: "Karvonsaroy uslubidagi premium qulaylik", price: "$150" },
                { type: "Emperor Suite", spec: "Qadimiy eksponatlar bilan jihozlangan keng lyuks", price: "$280" }
            ]
        }
    },
    'lyabi-house': {
        stars: 3,
        priceFrom: 50,
        phone: "+998 91 234 56 21",
        email: "lyabi-house@xorazmtour.uz",
        mapBbox: "64.424%2C39.771%2C64.431%2C39.777",
        amenities: {
            en: ["Traditional architecture", "Courtyard tea drinking", "Free WiFi", "Modern air conditioning"],
            ru: ["Традиционная архитектура", "Чай во внутреннем дворике", "Бесплатный Wi-Fi", "Кондиционер"],
            uz: ["Milliy me'morchilik", "Shinam hovlida choyxo'rlik", "Bepul WiFi", "Konditsioner"]
        },
        rooms: {
            en: [
                { type: "Budget Single", spec: "Cozy room looking at the courtyard", price: "$50" },
                { type: "Standard Double", spec: "Comfortable beds with local fabrics", price: "$70" },
                { type: "Bukhara Family Room", spec: "Spacious national style family stay", price: "$100" }
            ],
            ru: [
                { type: "Бюджетный Одноместный", spec: "Уютный номер с видом на дворик", price: "$50" },
                { type: "Стандартный Двухместный", spec: "Удобные кровати с местным текстилем", price: "$70" },
                { type: "Семейный номер Бухара", spec: "Просторный номер для семьи в национальном стиле", price: "$100" }
            ],
            uz: [
                { type: "Budget Single", spec: "Hovliga qaragan shinam bir kishilik xona", price: "$50" },
                { type: "Standard Double", spec: "Milliy matolar bilan bezatilgan shinam xona", price: "$70" },
                { type: "Buxoro oilaviy xonasi", spec: "Milliy uslubdagi keng oilaviy xona", price: "$100" }
            ]
        }
    },
    'komil-hotel': {
        stars: 4,
        priceFrom: 60,
        phone: "+998 91 234 56 22",
        email: "komil-hotel@xorazmtour.uz",
        mapBbox: "64.426%2C39.772%2C64.432%2C39.778",
        amenities: {
            en: ["19th-century house setting", "Ganch carving decorations", "On-site Restaurant", "Free WiFi"],
            ru: ["Дом 19 века", "Настенная резьба по ганчу", "Ресторан", "Бесплатный Wi-Fi"],
            uz: ["19-asrga oid xonadon muhiti", "Ganchkorlik bezaklari", "Restoran", "Bepul WiFi"]
        },
        rooms: {
            en: [
                { type: "Standard Single", spec: "Beautiful wood carved single stay", price: "$60" },
                { type: "Traditional Twin", spec: "Authentic decoration room with two beds", price: "$80" },
                { type: "Zal-Luxury Suite", spec: "Spectacular room with original 19th-century paintings", price: "$130" }
            ],
            ru: [
                { type: "Стандартный Одноместный", spec: "Красивый номер с резьбой по дереву", price: "$60" },
                { type: "Традиционный Двухместный", spec: "Аутентичный номер с двумя кроватями", price: "$80" },
                { type: "Зал-Люкс", spec: "Впечатляющий люкс с оригинальной росписью 19 века", price: "$130" }
            ],
            uz: [
                { type: "Standard Single", spec: "O'ymakor yog'och bezakli shinam 1 kishilik xona", price: "$60" },
                { type: "Traditional Twin", spec: "Milliy naqshlar bilan bezatilgan 2 kishilik xona", price: "$80" },
                { type: "Zal-Luxury Suite", spec: "19-asrga oid devoriy rasmlarga ega hashamatli lyuks", price: "$130" }
            ]
        }
    },
    'amulett-hotel': {
        stars: 4,
        priceFrom: 75,
        phone: "+998 91 234 56 23",
        email: "amulett@xorazmtour.uz",
        mapBbox: "64.423%2C39.770%2C64.429%2C39.776",
        amenities: {
            en: ["Madrasa build structure", "Historical Library", "Courtyard Breakfast", "WiFi connection", "Souvenir craft shop"],
            ru: ["Здание медресе", "Историческая библиотека", "Завтрак во дворике", "Wi-Fi подключение", "Сувенирный магазин"],
            uz: ["Qadimiy madrasa binosi", "Kutubxona", "Hovlida milliy nonushta", "WiFi aloqasi", "Suvenirlar do'koni"]
        },
        rooms: {
            en: [
                { type: "Standard Single", spec: "Cell room with cozy brick archways", price: "$75" },
                { type: "Double / Twin Bed", spec: "Warm historical atmosphere room", price: "$95" },
                { type: "Vazir Suite", spec: "Spacious historic suite cell", price: "$150" }
            ],
            ru: [
                { type: "Стандартный Одноместный", spec: "Келья с уютными кирпичными арками", price: "$75" },
                { type: "Двухместный номер", spec: "Теплая комната с исторической атмосферой", price: "$95" },
                { type: "Вазир Люкс", spec: "Просторная историческая келья-люкс", price: "$150" }
            ],
            uz: [
                { type: "Standard Single", spec: "G'ishtin gumbazli shinam hujra xona", price: "$75" },
                { type: "Double / Twin Bed", spec: "Tarixiy iliq muhitga ega shinam xona", price: "$95" },
                { type: "Vazir Suite", spec: "Keng va tarixiy premium hujra", price: "$150" }
            ]
        }
    },
    'hyatt-regency': {
        stars: 5,
        priceFrom: 180,
        phone: "+998 71 234 56 31",
        email: "tashkent-regency@hyatt-xorazmtour.uz",
        mapBbox: "69.276%2C41.308%2C69.282%2C41.314",
        amenities: {
            en: ["Indoor Swimming Pool", "Luxury spa wellness", "Modern Fitness Center", "Meeting Conference rooms", "High-speed WiFi"],
            ru: ["Крытый бассейн", "Роскошный спа-центр", "Современный фитнес-центр", "Конференц-залы", "Скоростной Wi-Fi"],
            uz: ["Yopiq hovuz", "Hashamatli Spa majmuasi", "Zamonaviy fitnes markazi", "Majlislar zali", "Tezkor WiFi"]
        },
        rooms: {
            en: [
                { type: "King Room", spec: "Modern 1 King Bed room with city views", price: "$180" },
                { type: "Club Access Double", spec: "Club lounge entry, premium room", price: "$230" },
                { type: "Executive Suite", spec: "Extra large panoramic suite with living area", price: "$400" }
            ],
            ru: [
                { type: "Королевский номер", spec: "Современный номер с кроватью King и видом на город", price: "$180" },
                { type: "Клубный двухместный", spec: "Доступ в клубный лаундж, премиум-номер", price: "$230" },
                { type: "Представительский Люкс", spec: "Очень большой панорамный люкс с гостиной", price: "$400" }
            ],
            uz: [
                { type: "King Room", spec: "Shahar manzarasiga ega shinam 1 qirollik karavotli xona", price: "$180" },
                { type: "Club Access Double", spec: "Klub zaliga kirish huquqiga ega premium xona", price: "$230" },
                { type: "Executive Suite", spec: "Keng mehmonxonali panoramali hashamatli lyuks", price: "$400" }
            ]
        }
    },
    'lotte-hotel': {
        stars: 4,
        priceFrom: 130,
        phone: "+998 71 234 56 32",
        email: "lotte-tashkent@lotte-xorazmtour.uz",
        mapBbox: "69.237%2C41.296%2C69.243%2C41.302",
        amenities: {
            en: ["Historic facade architecture", "Outdoor garden pool", "Spa salon", "Fitness room", "Executive business Lounge"],
            ru: ["Исторический фасад", "Открытый бассейн в саду", "Спа-салон", "Фитнес-зал", "Представительский бизнес-лаундж"],
            uz: ["Tarixiy fasad", "Bog' ichidagi ochiq hovuz", "Spa saloni", "Fitnes zal", "Biznes zal"]
        },
        rooms: {
            en: [
                { type: "Superior Single", spec: "Charming rooms with classical decor", price: "$130" },
                { type: "Deluxe Twin", spec: "Spacious double bed room looking at the opera house", price: "$170" },
                { type: "Premier Suite", spec: "Luxury high-end suite with classic details", price: "$320" }
            ],
            ru: [
                { type: "Супериор Одноместный", spec: "Очаровательные номера в классическом декоре", price: "$130" },
                { type: "Делюкс Двухместный", spec: "Просторный номер с видом на оперный театр", price: "$170" },
                { type: "Премьер Люкс", spec: "Роскошный люкс высокого класса с классическими деталями", price: "$320" }
            ],
            uz: [
                { type: "Superior Single", spec: "Klassik bezakli shinam bir kishilik xona", price: "$130" },
                { type: "Deluxe Twin", spec: "Opera teatriga qaragan keng ikki kishilik xona", price: "$170" },
                { type: "Premier Suite", spec: "Klassik uslubdagi hashamatli eng yuqori toifali lyuks", price: "$320" }
            ]
        }
    },
    'city-palace': {
        stars: 4,
        priceFrom: 115,
        phone: "+998 71 234 56 33",
        email: "city-palace@xorazmtour.uz",
        mapBbox: "69.282%2C41.312%2C69.288%2C41.318",
        amenities: {
            en: ["Indoor & Outdoor Pools", "Tennis sport court", "Gourmet Restaurant", "Complimentary WiFi", "Business Center"],
            ru: ["Крытый и открытый бассейны", "Теннисный корт", "Ресторан изысканной кухни", "Бесплатный Wi-Fi", "Бизнес-центр"],
            uz: ["Yopiq va ochiq hovuzlar", "Tennis korti", "Restoran", "Bepul WiFi", "Biznes markazi"]
        },
        rooms: {
            en: [
                { type: "Standard Single", spec: "Cozy comfortable single room", price: "$115" },
                { type: "Comfort Double / Twin", spec: "Spacious room with modern details", price: "$150" },
                { type: "Presidential Suite", spec: "Luxury high floor suite with royal services", price: "$290" }
            ],
            ru: [
                { type: "Стандартный Одноместный", spec: "Уютный комфортабельный номер", price: "$115" },
                { type: "Комфорт Двухместный", spec: "Просторный номер с современными деталями", price: "$150" },
                { type: "Президентский Люкс", spec: "Роскошный люкс на высоком этаже с королевским обслуживанием", price: "$290" }
            ],
            uz: [
                { type: "Standard Single", spec: "Klassik va qulay bir kishilik xona", price: "$115" },
                { type: "Comfort Double / Twin", spec: "Zamonaviy jihozlangan keng ikki kishilik xona", price: "$150" },
                { type: "Presidential Suite", spec: "Hashamatli va qirollik xizmatiga ega keng lyuks", price: "$290" }
            ]
        }
    }
};

const showLabels = {
    roomType: { en: "Room Type", ru: "Тип номера", uz: "Xona turi" },
    spec: { en: "Specification", ru: "Описание", uz: "Tavsif" },
    price: { en: "Price per Night", ru: "Цена за ночь", uz: "Bir kecha uchun" },
    roomRates: { en: "Room Categories & Rates", ru: "Категории номеров и тарифы", uz: "Xona toifalari va narxlar" },
    geoLoc: { en: "Geographical Location", ru: "Географическое положение", uz: "Geografik Joylashuv" },
    directContact: { en: "Direct Reservations", ru: "To'g'ridan-to'g'ri aloqa", uz: "To'g'ridan-to'g'ri aloqa" },
    phone: { en: "Phone", ru: "Телефон", uz: "Telefon" },
    email: { en: "Email Address", ru: "Электронная почта", uz: "Elektron pochta" },
    amenities: { en: "Standard Amenities", ru: "Стандартные удобства", uz: "Standart qulayliklar" },
    booking: { en: "Secure Room Booking", ru: "Забронировать номер", uz: "Xonani band qilish" },
    address: { en: "Address", ru: "Адрес", uz: "Manzil" }
};

function Show({ hotel, locale }: Props) {
    const translation = hotel.translations.find(t => t.locale === locale) || hotel.translations[0];
    
    // Find or fallback metadata
    const meta = hotelsMetadata[hotel.slug] || {
        stars: 4,
        priceFrom: 65,
        phone: hotel.phone_number || "+998 91 234 56 00",
        email: "info@xorazmtour.uz",
        mapBbox: "60.360%2C41.376%2C60.366%2C41.382",
        amenities: {
            en: ["Traditional hospitality", "Free WiFi", "Air Conditioning"],
            ru: ["Традиционное гостеприимство", "Бесплатный Wi-Fi", "Кондиционер"],
            uz: ["Milliy mehmondo'stlik", "Bepul WiFi", "Konditsioner"]
        },
        rooms: {
            en: [
                { type: "Standard Single", spec: "Comfortable single stay", price: "$65" },
                { type: "Double / Twin Bed", spec: "Excellent room for two", price: "$85" }
            ],
            ru: [
                { type: "Стандартный Одноместный", spec: "Комфортный номер", price: "$65" },
                { type: "Двухместный номер", spec: "Отличный номер для двоих", price: "$85" }
            ],
            uz: [
                { type: "Standard Single", spec: "Qulay bir kishilik xona", price: "$65" },
                { type: "Double / Twin Bed", spec: "Ikki kishilik ajoyib xona", price: "$85" }
            ]
        }
    };

    const mainImg = hotel.main_image?.path || "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&q=80";
    const subImages = hotel.images && hotel.images.length >= 2 
        ? hotel.images.slice(0, 2).map(img => img.path)
        : [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80"
          ];

    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${meta.mapBbox}&layer=mapnik`;

    return (
        <MainLayout>
            <div className="bg-cream min-h-screen pb-20">
                <Head title={translation.title} />

                {/* Top Multi-image Gallery Grid */}
                <section className="show-gallery-grid">
                    <img 
                        src={mainImg} 
                        className="main-gallery-img" 
                        alt="Main hotel view" 
                    />
                    <div className="sub-gallery-stack">
                        {subImages.map((src, i) => (
                            <img 
                                key={i} 
                                src={src} 
                                className="sub-gallery-img" 
                                alt={`Gallery detail ${i + 1}`} 
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
                                {translation.address || 'Uzbekistan'}
                            </span>
                        </div>

                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mb-6 font-bold leading-tight">
                            {translation.title}
                        </h1>

                        <div className="flex gap-1 text-gold text-lg mb-8">
                            {[...Array(meta.stars)].map((_, i) => (
                                <span key={i}>★</span>
                            ))}
                        </div>

                        <p className="info-text font-sans whitespace-pre-line border-l-2 border-gold/30 pl-6 mb-12">
                            {translation.description}
                        </p>

                        {/* Room Categories Table */}
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
                                {(meta.rooms[locale] || meta.rooms['en']).map((room, index) => (
                                    <tr key={index}>
                                        <td className="room-name">{room.type}</td>
                                        <td className="text-gray-600 text-sm">{room.spec}</td>
                                        <td className="room-price">{room.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Geographic Location & OSM Map (No coordinates text) */}
                        <h3 className="info-title font-serif">
                            {showLabels.geoLoc[locale]}
                        </h3>
                        <p className="text-sm text-gray-700 font-sans mb-4">
                            <strong>{showLabels.address[locale]}:</strong> {translation.address}
                        </p>
                        <div className="show-map-box">
                            <iframe 
                                src={mapUrl} 
                                title="Hotel location map"
                                loading="lazy"
                            />
                        </div>
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
                                    {meta.phone}
                                </span>
                            </div>

                            <div className="sidebar-meta-item">
                                <label>{showLabels.email[locale]}</label>
                                <span className="flex items-center gap-1.5 mt-1 font-semibold text-turquoise">
                                    <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                                    {meta.email}
                                </span>
                            </div>

                            {/* Standard Amenities List */}
                            <div className="sidebar-meta-item">
                                <label>{showLabels.amenities[locale]}</label>
                                <ul className="mt-2 space-y-2">
                                    {(meta.amenities[locale] || meta.amenities['en']).map((amenity, idx) => (
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
                                    <span>Vetted by Xorazm Tour</span>
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
