import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { City as CityType } from '@/types';
import MainLayout from '@/layouts/main-layout';
import { useTranslations } from '@/hooks/use-translations';

interface Props {
    city: CityType;
}

interface Destination {
    id: number;
    title: string;
    description: string;
    image: string;
    time?: string;
}

const destinationsData: Record<string, Record<'en' | 'ru' | 'uz', Destination[]>> = {
    khiva: {
        en: [
            {
                id: 1,
                title: "Kalta Minor Minaret",
                description: "Commissioned in 1851 by Muhammad Amin Khan, this massive minaret was intended to reach 70-80 meters, allowing one to see all the way to Bukhara. Construction halted at 29 meters after the Khan's death.",
                image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
                time: "1851"
            },
            {
                id: 2,
                title: "Islam Khodja Complex",
                description: "Built in 1908-1910, the complex features a minaret standing at 56.6 meters and a madrasah. It represents the peak of Khiva's late Islamic architectural traditions, offering a majestic view of the entire city.",
                image: "https://images.unsplash.com/photo-1616075191599-2e118991fa9a?w=800&q=80",
                time: "1910"
            },
            {
                id: 3,
                title: "Tosh Hovli Palace",
                description: "Constructed by Allah Kuli Khan in the 1830s, this labyrinthine palace contains over 150 rooms, featuring three main courtyards for reception, court, and harem, adorned with exquisite blue majolica.",
                image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
                time: "1830"
            }
        ],
        ru: [
            {
                id: 1,
                title: "Минарет Кальта-Минор",
                description: "Строительство этого массивного минарета началось в 1851 году по приказу Мухаммад Амин-хана. Планировалось достичь высоты 70-80 метров, но после его гибели стройка остановилась на высоте 29 метров.",
                image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
                time: "1851"
            },
            {
                id: 2,
                title: "Комплекс Ислам-Ходжа",
                description: "Построенный в 1908-1910 годах, этот комплекс включает в себя минарет высотой 56,6 метров и медресе, олицетворяя пик позднего исламского зодчества и открывая панорамный вид на весь город.",
                image: "https://images.unsplash.com/photo-1616075191599-2e118991fa9a?w=800&q=80",
                time: "1910"
            },
            {
                id: 3,
                title: "Дворец Таш-Хаули",
                description: "Построенный Аллакули-ханом в 1830-х годах, этот дворец-лабиринт содержит более 150 комнат с тремя главными дворами (для приемов, суда и гарема), украшенными изысканной голубой майоликой.",
                image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
                time: "1830"
            }
        ],
        uz: [
            {
                id: 1,
                title: "Kalta Minor minorasi",
                description: "1851-yilda Muhammad Aminxon tomonidan qurilishi boshlangan ushbu minoraning balandligi 70-80 metr bo'lishi rejalashtirilgan edi. Xon vafotidan so'ng qurilish 29 metrda to'xtatilgan.",
                image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
                time: "1851"
            },
            {
                id: 2,
                title: "Islom Xo'ja majmuasi",
                description: "1908-1910 yillarda bunyod etilgan ushbu majmua 56.6 metrli minora va madrasani o'z ichiga oladi. U Xiva me'morchilik an'analarining cho'qqisi bo'lib, butun shaharga go'zal manzara ochadi.",
                image: "https://images.unsplash.com/photo-1616075191599-2e118991fa9a?w=800&q=80",
                time: "1910"
            },
            {
                id: 3,
                title: "Tosh Hovli saroyi",
                description: "1830-yillarda Olloqulixon tomonidan qurilgan ushbu saroy 150 dan ortiq xonadan iborat bo'lib, unda qabulxona, sud va haram uchun mo'ljallangan hovlilar zangori koshinlar bilan bezatilgan.",
                image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
                time: "1830"
            }
        ]
    },
    samarkand: {
        en: [
            {
                id: 1,
                title: "Registan Square",
                description: "The majestic public square is the crown jewel of Central Asian architecture, featuring the Ulugh Beg, Sher-Dor, and Tilya-Kori madrasahs built between the 15th and 17th centuries.",
                image: "https://images.unsplash.com/photo-1580301872234-0a4e5f42b5c3?w=800&q=80",
                time: "XV-XVII C."
            },
            {
                id: 2,
                title: "Gur-e-Amir Mausoleum",
                description: "Known for its azure fluted dome, Gur-e-Amir serves as the final resting place of Timur (Tamerlane), his sons, and grandsons, including the astronomer Ulugh Beg.",
                image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=800&q=80",
                time: "1404"
            },
            {
                id: 3,
                title: "Shah-i-Zinda Ensemble",
                description: "A sacred necropolis dating from the 11th to 15th centuries, featuring stunning blue-and-turquoise mosaic tiles. It marks the legendary burial site of Kusam ibn Abbas.",
                image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
                time: "XI-XV C."
            }
        ],
        ru: [
            {
                id: 1,
                title: "Площадь Регистан",
                description: "Эта величественная площадь — жемчужина среднеазиатской архитектуры, объединяющая медресе Улугбека, Шердор и Тилля-Кари, построенные в XV-XVII веках.",
                image: "https://images.unsplash.com/photo-1580301872234-0a4e5f42b5c3?w=800&q=80",
                time: "XV-XVII вв."
            },
            {
                id: 2,
                title: "Мавзолей Гур-Эмир",
                description: "Известный своим ребристым бирюзовым куполом, Гур-Эмир является усыпальницей великого завоевателя Амира Тимура (Тамерлана), его сыновей и внуков.",
                image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=800&q=80",
                time: "1404"
            },
            {
                id: 3,
                title: "Ансамбль Шахи-Зинда",
                description: "Священный некрополь XI-XV веков с потрясающей сине-голубой мозаикой, где, по преданию, похоронен двоюродный брат пророка Мухаммеда — Кусам ибн Аббас.",
                image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
                time: "XI-XV вв."
            }
        ],
        uz: [
            {
                id: 1,
                title: "Registon maydoni",
                description: "Ushbu mahobatli maydon Markaziy Osiyo me'morchiligining durdonasi bo'lib, XV-XVII asrlarda qurilgan Ulug'bek, Sherdor va Tillakori madrasalarini o'z ichiga oladi.",
                image: "https://images.unsplash.com/photo-1580301872234-0a4e5f42b5c3?w=800&q=80",
                time: "XV-XVII A."
            },
            {
                id: 2,
                title: "Go'ri Amir maqbarasi",
                description: "Zangori qaborgali gumbazi bilan mashhur bo'lgan ushbu maqbarada buyuk sarkarda Amir Temur, uning o'g'illari va nabirasi Mirzo Ulug'bek dafn etilgan.",
                image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=800&q=80",
                time: "1404"
            },
            {
                id: 3,
                title: "Shohi Zinda majmuasi",
                description: "XI-XV asrlarga oid muqaddas ziyoratgoh va maqbaralar majmuasi bo'lib, zangori va feruza rang koshinlari kishini lol qoldiradi.",
                image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
                time: "XI-XV A."
            }
        ]
    },
    bukhara: {
        en: [
            {
                id: 1,
                title: "Po-i-Kalyan Complex",
                description: "This grand complex comprises the Kalyan Mosque, the Mir-i Arab Madrasah, and the soaring Kalyan Minaret (1127 AD), which Genghis Khan spared due to its sheer height and beauty.",
                image: "https://images.unsplash.com/photo-1588612140685-613d9ce459ad?w=800&q=80",
                time: "1127"
            },
            {
                id: 2,
                title: "Ark of Bukhara",
                description: "A monumental royal residence and fortress, the Ark was once home to the Emirs of Bukhara, housing palaces, temples, arsenals, and even a prison behind its high earthen walls.",
                image: "https://images.unsplash.com/photo-1562613528-4d6855a8970c?w=800&q=80",
                time: "V C."
            },
            {
                id: 3,
                title: "Chor Minor",
                description: "Built in 1807 by a wealthy Turkmen merchant, this unique structure features four turquoise-domed towers representing four major world religions or cardinal directions.",
                image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800&q=80",
                time: "1807"
            }
        ],
        ru: [
            {
                id: 1,
                title: "Комплекс Пои-Калян",
                description: "Этот грандиозный комплекс включает в себя мечеть Калян, медресе Мири Араб и парящий минарет Калян (1127 г.), который пощадил Чингисхан из-за его красоты.",
                image: "https://images.unsplash.com/photo-1588612140685-613d9ce459ad?w=800&q=80",
                time: "1127"
            },
            {
                id: 2,
                title: "Арк Бухары",
                description: "Монументальная резиденция бухарских эмиров, за высокими глинобитными стенами которой располагавались дворцы, храмы, монетный двор и государственные учреждения.",
                image: "https://images.unsplash.com/photo-1562613528-4d6855a8970c?w=800&q=80",
                time: "V в."
            },
            {
                id: 3,
                title: "Чор-Минор",
                description: "Построенное в 1807 году богатым туркменским купцом, это уникальное здание украшено четырьмя бирюзовыми башнями-минаретами.",
                image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800&q=80",
                time: "1807"
            }
        ],
        uz: [
            {
                id: 1,
                title: "Poyi Kalon majmuasi",
                description: "Ushbu majmua Kalon masjidi, Mir Arab madrasasi va 1127-yilda barpo etilgan afsonaviy Minorai Kalonni o'z ichiga oladi.",
                image: "https://images.unsplash.com/photo-1588612140685-613d9ce459ad?w=800&q=80",
                time: "1127"
            },
            {
                id: 2,
                title: "Buxoro Arki",
                description: "Buxoro amirlarining qarorgohi bo'lgan ushbu ko'hna qal'a devorlari ortida muzeylar, saroylar va tarixiy osori-atiqalar saqlanadi.",
                image: "https://images.unsplash.com/photo-1562613528-4d6855a8970c?w=800&q=80",
                time: "V A."
            },
            {
                id: 3,
                title: "Chor Minor darvozasi",
                description: "1807-yilda badavlat turkman savdogari tomonidan qurilgan ushbu inshootning to'rtta minorasi to'rtta dunyo dinining ramziy bezaklarini o'zida aks ettiradi.",
                image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800&q=80",
                time: "1807"
            }
        ]
    },
    tashkent: {
        en: [
            {
                id: 1,
                title: "Hazrati Imam Complex",
                description: "This grand architectural complex houses the famous Uthman Quran (Muyi Muborak Madrasah), dating back to the 7th century, written on deerskin and stained with the blood of Caliph Uthman.",
                image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
                time: "VII C."
            },
            {
                id: 2,
                title: "Chorsu Bazaar",
                description: "Operating for centuries on the Silk Road, this market is crowned by a giant blue dome. It is the perfect place to sample traditional Uzbek street food, spices, and crafts.",
                image: "https://images.unsplash.com/photo-1580301872234-0a4e5f42b5c3?w=800&q=80",
                time: "XVI C."
            }
        ],
        ru: [
            {
                id: 1,
                title: "Комплекс Хазрет Имам",
                description: "В этом грандиозном архитектурном комплексе хранится знаменитый Коран Усмана (медресе Муйи Муборак), датируемый VII веком, написанный на оленьей коже.",
                image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
                time: "VII в."
            },
            {
                id: 2,
                title: "Базар Чорсу",
                description: "Этот рынок, функционирующий на Шелковом пути на протяжении веков, увенчан гигантским синим куполом. Это идеальное место для дегустации специй и сладостей.",
                image: "https://images.unsplash.com/photo-1580301872234-0a4e5f42b5c3?w=800&q=80",
                time: "XVI в."
            }
        ],
        uz: [
            {
                id: 1,
                title: "Hazrati Imom majmuasi",
                description: "Ushbu muhtasham majmuada dunyodagi eng qadimgi Qur'oni Karim - Usmon Mus'hafi (Muyi Muborak madrasasi) saqlanadi.",
                image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
                time: "VII A."
            },
            {
                id: 2,
                title: "Chorsu bozori",
                description: "Asrlar davomida Ipak yo'lida faoliyat ko'rsatgan ushbu bozor o'zining ko'k gumbazi va sharqona muhiti, shirin mevalari hamda ziravorlari bilan mashhur.",
                image: "https://images.unsplash.com/photo-1580301872234-0a4e5f42b5c3?w=800&q=80",
                time: "XVI A."
            }
        ]
    }
};

const cityMetaData: Record<string, Record<'en' | 'ru' | 'uz', { era: string; status: string; time: string }>> = {
    khiva: {
        en: { era: "X-XIX Centuries", status: "UNESCO World Heritage", time: "2-3 Days Visit" },
        ru: { era: "X-XIX Века", status: "Наследие ЮНЕСКО", time: "2-3 Дня" },
        uz: { era: "X-XIX Asrlar", status: "YUNESKO Merosi", time: "2-3 Kunlik Ziyorat" }
    },
    samarkand: {
        en: { era: "XV-XVII Centuries", status: "UNESCO World Heritage", time: "2-3 Days Visit" },
        ru: { era: "XV-XVII Века", status: "Наследие ЮНЕСКО", time: "2-3 Дня" },
        uz: { era: "XV-XVII Asrlar", status: "YUNESKO Merosi", time: "2-3 Kunlik Ziyorat" }
    },
    bukhara: {
        en: { era: "V-XX Centuries", status: "UNESCO World Heritage", time: "2-3 Days Visit" },
        ru: { era: "V-XX Века", status: "Наследие ЮНЕСКО", time: "2-3 Дня" },
        uz: { era: "V-XX Asrlar", status: "YUNESKO Merosi", time: "2-3 Kunlik Ziyorat" }
    },
    tashkent: {
        en: { era: "Modern & Ancient", status: "Capital City", time: "1-2 Days Visit" },
        ru: { era: "Современный и Древний", status: "Столица", time: "1-2 Дня" },
        uz: { era: "Zamonaviy va Ko'hna", status: "Poytaxt", time: "1-2 Kunlik Ziyorat" }
    }
};

const labels = {
    era: {
        en: "Historical Foundation",
        ru: "Эпоха основания",
        uz: "Tarixiy poydevor"
    },
    status: {
        en: "Heritage Status",
        ru: "Статус наследия",
        uz: "Muhofaza maqomi"
    },
    time: {
        en: "Recommended Time",
        ru: "Рекомендуемое время",
        uz: "Tavsiya etilgan vaqt"
    },
    explore: {
        en: "Explore Tours",
        ru: "Исследовать туры",
        uz: "Turlarni ko'rish"
    },
    destinationsTitle: {
        en: "Key Historical Sights",
        ru: "Ключевые достопримечательности",
        uz: "Asosiy tarixiy obidalar"
    }
};

function Show({ city }: Props) {
    const { t, locale } = useTranslations();
    const translation = city.translations.find(trans => trans.locale === locale) || city.translations[0];

    const cityDestinations = useMemo(() => {
        return destinationsData[city.slug]?.[locale] || [];
    }, [city.slug, locale]);

    const meta = useMemo(() => {
        return cityMetaData[city.slug]?.[locale];
    }, [city.slug, locale]);

    const [selectedDestId, setSelectedDestId] = useState<number | null>(null);

    useEffect(() => {
        if (cityDestinations.length > 0) {
            setSelectedDestId(cityDestinations[0].id);
        }
    }, [cityDestinations]);

    const activeDest = useMemo(() => {
        if (!selectedDestId || cityDestinations.length === 0) return null;
        return cityDestinations.find(d => d.id === selectedDestId) || cityDestinations[0];
    }, [selectedDestId, cityDestinations]);

    return (
        <div className="bg-cream min-h-screen">
            <Head title={translation.name} />

            {/* Header / Hero */}
            <section className="page-hero relative min-h-[45vh] flex items-end overflow-hidden bg-navy">
                <div className="page-hero-bg absolute inset-0 z-0">
                    <img 
                        src={city.main_image?.path || "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1600&q=80"} 
                        className="w-full h-full object-cover opacity-40" 
                        alt={translation.name} 
                    />
                    <div className="page-hero-gradient absolute inset-0 bg-gradient-to-t from-navy to-navy/40 z-1" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full relative z-10">
                    <span className="text-gold-light text-xs font-bold uppercase tracking-widest mb-3 block">
                        {t('cities.historical_center')}
                    </span>
                    <h1 className="font-serif text-white mb-4 text-4xl md:text-5xl drop-shadow-md">
                        {translation.name}
                    </h1>
                </div>
            </section>

            <div className="islamic-border" />

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                
                {/* Summary Dashboard Card */}
                <div className="summary-dashboard animate__animated animate__fadeIn">
                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {t('cities.location')}
                        </span>
                        <code className="text-navy font-mono font-bold text-sm mt-1 bg-navy/5 px-2 py-1 rounded w-fit">
                            {city.latitude}, {city.longitude}
                        </code>
                    </div>
                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {labels.era[locale]}
                        </span>
                        <span className="text-navy font-bold text-base mt-1">
                            {meta?.era || "N/A"}
                        </span>
                    </div>
                    <div className="summary-dashboard-item">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {labels.status[locale]}
                        </span>
                        <span className="text-navy font-bold text-base mt-1">
                            {meta?.status || "N/A"}
                        </span>
                    </div>
                    <div className="summary-dashboard-item border-none">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5 block">
                                {labels.time[locale]}
                            </span>
                            <span className="font-serif text-lg font-bold text-navy">
                                {meta?.time || "N/A"}
                            </span>
                        </div>
                        {city.tours && city.tours.length > 0 && (
                            <a 
                                href="#adventures-section"
                                className="summary-dashboard-btn mt-3 block text-center"
                            >
                                {labels.explore[locale]}
                            </a>
                        )}
                    </div>
                </div>

                {/* Main Description */}
                <div className="prose prose-lg text-gray-600 max-w-none mb-20">
                    <p className="italic text-xl border-l-4 border-gold pl-6 py-4 bg-gold/5 shadow-md rounded-r-lg text-navy leading-relaxed font-serif">
                        {translation.description}
                    </p>
                </div>

                {/* Destinations Section */}
                {cityDestinations.length > 0 && (
                    <div className="mb-32">
                        <h3 className="font-serif text-4xl text-navy mb-12 border-b-2 border-gold/20 pb-4 inline-block">
                            {labels.destinationsTitle[locale]}
                        </h3>
                        
                        <div className="itinerary-layout-wrapper">
                            {/* Left Column: Scrollable list of day parts (destinations) */}
                            <div className="itinerary-scroll-container">
                                <div className="timeline-container">
                                    {cityDestinations.map((dest, index) => {
                                        const isSelected = dest.id === (selectedDestId ?? cityDestinations[0]?.id);
                                        return (
                                            <div key={dest.id} className="timeline-section relative">
                                                <div className="timeline-day-circle bg-gold text-navy font-bold text-sm">
                                                    {index + 1}
                                                </div>

                                                <div className="w-full">
                                                    <div
                                                        onClick={() => setSelectedDestId(dest.id)}
                                                        className={`w-full text-left p-4 sm:p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 relative z-10 ${
                                                            isSelected
                                                                ? 'bg-navy border-gold text-white shadow-md'
                                                                : 'bg-white border-gold/15 text-navy hover:border-gold/50 hover:bg-gold/5'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3 w-full">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                                                                isSelected ? 'bg-gold/25 text-gold' : 'bg-navy/5 text-navy'
                                                            }`}>
                                                                🕌
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                {dest.time && (
                                                                    <span className={`font-mono text-[10px] font-bold block ${
                                                                        isSelected ? 'text-gold' : 'text-gold-muted'
                                                                    }`}>
                                                                        {dest.time}
                                                                    </span>
                                                                )}
                                                                <h5 className={`font-serif text-base sm:text-lg font-bold leading-tight ${
                                                                    isSelected ? 'text-white' : 'text-navy'
                                                                }`}>
                                                                    {dest.title}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Expanding description wrapper */}
                                                        <AnimatePresence initial={false}>
                                                            {isSelected && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    transition={{ duration: 0.25 }}
                                                                    className="pl-11 pr-2 pb-1 overflow-hidden"
                                                                >
                                                                    <p className="text-ivory/80 text-xs sm:text-sm leading-relaxed border-t border-gold/10 pt-2 mt-1">
                                                                        {dest.description}
                                                                    </p>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right Column: One constant sticky image frame */}
                            <div className="itinerary-image-container">
                                <div className="itinerary-sticky-image-frame">
                                    <AnimatePresence mode="wait">
                                        {activeDest?.image ? (
                                            <motion.img
                                                key={activeDest.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                src={activeDest.image}
                                                alt={activeDest.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-navy/10 text-gold text-sm font-semibold">
                                                Xorazm Tour
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tours in this City Section */}
                {city.tours && city.tours.length > 0 && (
                    <section id="adventures-section" className="mt-32 pt-16 border-t border-gold/20 scroll-mt-24">
                        <h3 className="font-serif text-3xl text-navy mb-8">
                            {t('cities.adventures_in', { name: translation.name })}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {city.tours.map((tour) => {
                                const tourT = tour.translations?.find(t => t.locale === locale)
                                    || tour.translations?.[0];

                                return (
                                    <Link
                                        key={tour.id}
                                        href={`/${locale}/tours/${tour.slug}`}
                                        className="group block bg-white rounded-2xl border border-gold/15 shadow-md hover:border-gold/40 hover:shadow-xl transition-all duration-300 overflow-hidden animate__animated animate__fadeInUp"
                                    >
                                        <div className="h-48 overflow-hidden relative">
                                            {tour.main_image?.path ? (
                                                <img 
                                                    src={tour.main_image.path} 
                                                    alt={tourT?.title} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-navy/10 flex items-center justify-center text-gold font-serif">
                                                    Xorazm Tour
                                                </div>
                                            )}
                                            <div className="absolute top-4 right-4 bg-navy/85 backdrop-blur-sm text-gold px-3 py-1 rounded-full text-xs font-bold font-sans">
                                                ${tour.cost}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="font-serif text-xl text-navy font-bold mb-2 group-hover:text-gold transition-colors duration-300">
                                                {tourT?.title || tour.slug}
                                            </h4>
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                                {tourT?.description}
                                            </p>
                                            <div className="flex justify-between items-center pt-4 border-t border-gold/10">
                                                <span className="text-xs uppercase tracking-wider font-bold text-gold">
                                                    {locale === 'ru' ? 'Подробнее' : locale === 'uz' ? "Batafsil" : "View Tour"}
                                                </span>
                                                <span className="text-gold group-hover:translate-x-1 transition-transform">→</span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}

            </div>

            {/* Map Section */}
            {city.latitude && city.longitude && (
                <section className="relative h-96 bg-gray-200 overflow-hidden border-t-4 border-b-4 border-gold mt-24">
                    <iframe
                        title={`${translation.name} Location Map`}
                        src={`https://maps.google.com/maps?q=${city.latitude},${city.longitude}&z=13&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </section>
            )}
        </div>
    );
}

Show.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Show;

