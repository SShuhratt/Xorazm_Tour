export interface DishTranslation {
    name: string;
    origin: string;
    type: string;
    shortDesc: string;
    desc: string;
    ingredients: string[];
    history: string;
}

export interface Dish {
    slug: string;
    image: string;
    translations: {
        en: DishTranslation;
        uz: DishTranslation;
        ru: DishTranslation;
    };
}

export const dishesDatabase: Record<string, Dish> = {
    xorazm: {
        slug: 'xorazm',
        image: '/XT_content/national-dishes/photo_2025-12-31_23-16-34.jpg',
        translations: {
            uz: {
                name: "Shivit-Osh (Xiva Lag'moni)",
                origin: "Xiva, Xorazm viloyati",
                type: "Xamirli va ko'katli taom",
                shortDesc: "Shivit suvi qo'shib tayyorlangan yashil xamirdan tayyorlanadigan, o'ziga xos sous bilan tortiladigan qadimiy Xiva taomi.",
                desc: "Shivit-Osh — Xorazm vohasining, xususan Xivaning eng mashhur va o'ziga xos milliy taomlaridan biridir. Uning xamiri yangi uzilgan shivit (ukrop) suvi bilan qorilgani sababli yashil rangga kiradi. Bu taom nafaqat ajoyib ta'mi, balki salomatlik uchun foydaliligi bilan ham ajralib turadi. Shivit oshqozon faoliyatini yaxshilaydi va yoz kunlarida yengillik beradi. Ustiga go'shtli va sabzavotli maxsus sous (qayla) hamda qatiq quyib tortiladi.",
                ingredients: ["Shivit suvi (Yashil xamir uchun)", "Oliy navli bug'doy uni", "Mol yoki qo'y go'shti", "Piyoz, kartoshka, sabzi va bulg'or qalampiri", "Maxsus qatiq qaylasi"],
                history: "Ushbu taom asrlar davomida Xiva xonlari saroylarida va ulug' mehmonlar uchun tayyorlangan. Uning shifobaxsh xususiyatlari tufayli qadimiy tabiblar ham uni tavsiya etishgan."
            },
            en: {
                name: "Shivit-Osh (Khiva Dill Pasta)",
                origin: "Khiva, Khorezm Region",
                type: "Dill-infused Pasta & Meat Sauce",
                shortDesc: "An ancient green pasta dish made with fresh dill juice, served with a savory meat stew and dynamic yogurt sauce.",
                desc: "Shivit-Osh is one of the most famous and unique culinary masterpieces of the Khorezm oasis, specifically Khiva. Its dough is kneaded with fresh dill juice, giving it a vibrant green color and a fresh herbaceous aroma. Perfect for summer days, it is topped with a rich stew of beef, potatoes, peppers, and carrots, and served with a cool garlic yogurt sauce.",
                ingredients: ["Fresh dill juice (for green dough)", "Premium wheat flour", "Beef or mutton", "Onions, potatoes, carrots, and bell peppers", "Special garlic-yogurt sauce"],
                history: "This dish was traditionally served in the royal courts of Khiva Khans to honor high-ranking foreign guests and ambassadors travelling the Silk Road."
            },
            ru: {
                name: "Шивит-Ош (Хорезмский Лагман)",
                origin: "Хива, Хорезмская область",
                type: "Тестяное блюдо со свежим укропом",
                shortDesc: "Древнее блюдо Хивы, приготовленное из зеленого теста на основе укропного сока с мясным соусом.",
                desc: "Шивит-Ош — одна из самых известных гастрономических визитных карточек Хорезмского оазиса. Тесто замешивается на свежевыжатом соке укропа, благодаря чему лапша приобретает характерный изумрудный цвет. Подается с сочным тушеным мясом с овощами и охлаждающим кисломолочным соусом.",
                ingredients: ["Свежий сок укропа (для зеленого теста)", "Пшеничная мука высшего сорта", "Говядина или баранина", "Лук, картофель, морковь и болгарский перец", "Чесночно-кефирный соус"],
                history: "На протяжении веков это блюдо подавалось при дворах хивинских ханов знатным гостям. Древние целители ценили его за пользу для пищеварения."
            }
        }
    },
    qoraqalpogiston: {
        slug: 'qoraqalpogiston',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
        translations: {
            uz: {
                name: "Jujeri Gurtik (Qoraqalpoq Beshbarmog'i)",
                origin: "Qoraqalpog'iston Respublikasi",
                type: "Go'shtli va xamirli taom",
                shortDesc: "Yassi to'rtburchak xamirlar ustiga maxsus pishirilgan kurka go'shti va piyozli qayla qo'shib tortiladigan milliy qoraqalpoq taomi.",
                desc: "Jujeri Gurtik — qoraqalpoq xalqining eng sevimli milliy taomidir. Bu taom odatda kurka go'shti (jujeri) bilan tayyorlanadi. Go'sht uzoq vaqt qaynatilib, o'ziga xos maza beradi. So'ngra uning suvida yupqa yoyilgan xamirlar pishirib olinadi. Dasturxonga xamirlar ustiga kurka go'shti va piyozli sous (tuzdiq) bilan birga tortiladi.",
                ingredients: ["Kurka yoki go'sht suvi", "Jo'xori yoki bug'doy uni", "Piyoz va murch", "Pishirilgan go'sht bo'laklari"],
                history: "Qoraqalpog'istonning shimoliy hududlarida ovchilik va chorvachilik bilan bog'liq holda shakllangan. Kurka go'shti qish kunlarida to'yimli va isituvchi hisoblanadi."
            },
            en: {
                name: "Jujeri Gurtik (Karakalpak Beshbarmak)",
                origin: "Republic of Karakalpakstan",
                type: "Boiled Dough Plates & Turkey Meat",
                shortDesc: "Traditional Karakalpak dish featuring wide flat dough sheets topped with slow-boiled turkey and a rich onion broth.",
                desc: "Jujeri Gurtik is the cornerstone of Karakalpak national cuisine. It typically features turkey meat (jujeri), simmered for hours to create a dense, flavorful broth in which the dough squares are cooked. It is presented on large platters with tender meat pieces and a heavy onion-peppery reduction called tuzdiq.",
                ingredients: ["Turkey broth", "Wheat or sorghum flour", "Onions and black pepper", "Tender boiled turkey meat"],
                history: "Originating in the northern semi-nomadic regions of Karakalpakstan, this dish reflects local poultry raising and is highly regarded as a cold-weather comfort food."
            },
            ru: {
                name: "Жужери Гуртик (Каракалпакский Бешбармак)",
                origin: "Республика Каракалпакстан",
                type: "Мясо-тестяное блюдо",
                shortDesc: "Национальное каракалпакское блюдо из плоских пластин теста с отварной индейкой и луковым бульоном.",
                desc: "Жужери Гуртик — любимое традиционное блюдо каракалпаков. Готовится из мяса индейки, которое медленно варится до нежности. В наваристом бульоне отваривают квадраты теста и подают с соусом из томленого лука (туздык).",
                ingredients: ["Бульон из индейки", "Мука пшеничная или джугарная", "Репчатый лук и черный перец", "Кусочки отварной индейки"],
                history: "Возникло в северных районах Каракалпакстана. Блюдо традиционно символизировало домашний очаг и подавалось в холодное время года."
            }
        }
    },
    tashkent: {
        slug: 'tashkent',
        image: '/XT_content/national-dishes/photo_2025-12-31_23-16-31.jpg',
        translations: {
            uz: {
                name: "Toshkent To'y Palovi",
                origin: "Toshkent shahri",
                type: "Guruchli taom (Osh)",
                shortDesc: "O'zbekistonning ramzi bo'lgan, mayiz, no'xat, behi va kashnich urug'lari bilan boyitilgan klassik to'y palovi.",
                desc: "Toshkent to'y palovi o'zining oltin rang tusga egaligi, mayiz va no'xatning shirin va nordon uyg'unligi bilan mashhur. Ushbu osh uchun odatda eng sifatli guruch navlari, sariq sabzi va toza o'simlik yog'i ishlatiladi. Dasturxonga tortilganda ustiga ot go'shti (qazi) va bedana tuxumlari bezatiladi. Bu taom har qanday yirik tantana va marosimlarning bosh toji hisoblanadi.",
                ingredients: ["Lazer yoki Alanga guruchi", "Qo'y go'shti va dumba yog'i", "Sariq sabzi, piyoz", "Nuxat, mayiz, qazi", "Bedana tuxumi"],
                history: "Toshkentning yirik to'ylarida asrlar davomida maxsus oshpazlar (ustalar) tomonidan ulkan qozonlarda pishirib kelingan. U hamjihatlik va mehmondo'stlik belgisi hisoblanadi."
            },
            en: {
                name: "Tashkent Festive Plov",
                origin: "Tashkent City",
                type: "Traditional Rice Pilaf",
                shortDesc: "The legendary celebratory rice dish featuring sweet raisins, chickpeas, quince, tender meat, and quail eggs.",
                desc: "Toshkent Festive Plov is the crown jewel of Uzbek cuisine. Known for its golden-amber color, it balances the rich flavors of lamb and beef with sweet yellow carrots, soft chickpeas, and raisins. It is customarily topped with traditional horsemeat sausage (kazi) and delicate quail eggs to make it truly spectacular.",
                ingredients: ["Premium Laser or Alanga rice", "Lamb, beef, and tail fat", "Yellow carrots and sweet onions", "Chickpeas, raisins, and kazi", "Quail eggs"],
                history: "Traditionally cooked in gigantic cast-iron cauldrons (kazans) by master chefs (ustas) for massive wedding celebrations of up to a thousand guests."
            },
            ru: {
                name: "Ташкентский Свадебный Плов",
                origin: "Город Ташкент",
                type: "Блюдо из риса (Плов)",
                shortDesc: "Символ узбекской кухни с добавлением нута, изюма, айвы, казы и перепелиных яиц.",
                desc: "Ташкентский свадебный плов знаменит своим золотистым оттенком и кисло-сладким вкусом. Готовится из лучших сортов риса с добавлением желтой моркови, изюма и нута. При подаче украшается деликатесной колбасой из конины (казы) и перепелиными яйцами.",
                ingredients: ["Рис сортов Лазер или Аланга", "Баранина, говядина и курдючный жир", "Желтая морковь, лук", "Нут, изюм, казы", "Перепелиные яйца"],
                history: "Веками готовится профессиональными поварами (усто) на дровах в огромных казанах для праздничных торжеств."
            }
        }
    },
    samarkand: {
        slug: 'samarkand',
        image: '/XT_content/national-dishes/photo_2025-12-31_23-16-31 (2).jpg',
        translations: {
            uz: {
                name: "Samarqand Bosma Palovi",
                origin: "Samarqand viloyati",
                type: "Guruchli taom (Osh)",
                shortDesc: "Qatlam-qatlam qilib tayyorlanadigan, guruchi oppoq va don-don bo'lib turadigan mashhur Samarqand oshi.",
                desc: "Samarqand oshi o'zining o'ziga xos pishirish texnologiyasi bilan ajralib turadi. Boshqa viloyatlardan farqli o'laroq, bu yerda go'sht, piyoz, sabzi va guruch aralashtirilmaydi, balki qozonda qatlam shaklida 'bosib' pishiriladi. Dasturxonga tortishdan avval ham aralashtirilmaydi, avval guruch, so'ng sabzi va ustiga go'sht solinib taqdim etiladi. Guruchi kam yog'li va yengil bo'ladi.",
                ingredients: ["Devzira yoki Lazer guruchi", "Yumshoq mol yoki qo'y go'shti", "Sariq va qizil sabzi", "Zira va maxsus ziravorlar", "Dumba yog'i"],
                history: "Samarqand Buyuk Ipak yo'lining chorrahasi bo'lgani sababli, bu yerga kelgan elchilar va savdogarlar uchun bu taom tayyorlangan. Har bir qatlam maxsus ma'noga ega deb ishonilgan."
            },
            en: {
                name: "Samarkand Layered Plov",
                origin: "Samarkand Region",
                type: "Layered Rice Pilaf",
                shortDesc: "A distinct style of plov cooked in strict layers without stirring, leaving the rice white and fluffy.",
                desc: "Unlike other regional variations, Samarkand Plov is cooked in vertical layers: meat at the bottom, carrots in the middle, and rice on top. It is never stirred during cooking or even when serving. It is plated in reverse order: rice first, followed by sweet carrots, and crowned with juicy chunks of stewed meat.",
                ingredients: ["Devzira or Laser rice", "Tender beef or lamb", "Yellow and red carrots", "Cumin and ground spices", "Melted tail fat"],
                history: "As a primary hub on the Silk Road, Samarkand hosted royal ambassadors who were served this layered dish to symbolise the layers of society living in harmony."
            },
            ru: {
                name: "Самаркандский Плов",
                origin: "Самаркандская область",
                type: "Блюдо из риса (Плов)",
                shortDesc: "Знаменитый слоеный плов, ингредиенты которого не перемешиваются при варке, сохраняя рис белым.",
                desc: "Самаркандский плов отличается уникальной технологией приготовления. Все ингредиенты выкладываются слоями и томятся. При подаче блюдо также не перемешивают, а выкладывают слоями: снизу белый рассыпчатый рис, затем сочная морковь и сверху мясо.",
                ingredients: ["Рис сортов Девзира или Лазер", "Говядина или баранина", "Желтая и красная морковь", "Зира и специи", "Курдючный жир"],
                history: "Самарканд был сердцем Шелкового пути. Считалось, что каждый слой этого плова несет глубокий смысл единения культур."
            }
        }
    },
    bukhara: {
        slug: 'bukhara',
        image: '/XT_content/national-dishes/photo_2025-12-31_23-16-36.jpg',
        translations: {
            uz: {
                name: "Olot Somsasi",
                origin: "Olot, Buxoro viloyati",
                type: "Xamirli pishiriq",
                shortDesc: "Yupqa xamirdan tayyorlanadigan, ichi nihoyatda sersuv va go'shtli bo'lgan o'ziga xos Buxoro somsasi.",
                desc: "Olot somsasi o'zining noodatiy tayyorlanish uslubi va shakli bilan mashhur. Uning xamiri juda yupqa bo'lib, ichidagi go'sht va piyoz aralashmasi sersuv bo'lib pishadi. Tandirda yoki maxsus pechlarda pishirilganda, somsa ichidagi go'sht suvi tashqariga chiqib ketmaydi. Issiqligida iste'mol qilinadi va haqiqiy gastronomik zavq bag'ishlaydi.",
                ingredients: ["Yupqa somsa xamiri", "Mol go'shti (mayda to'g'ralgan)", "Ko'p miqdorda piyoz", "Murch va zira", "Dumba yog'i bo'laklari"],
                history: "Buxoroning qadimiy Olot tumanidan kelib chiqqan bo'lib, karvon yo'llari bo'yidagi choyxonalarda sayohatchilar uchun tez va to'yimli yegulik sifatida tayyorlangan."
            },
            en: {
                name: "Alat Somsa",
                origin: "Alat, Bukhara Region",
                type: "Savory Meat Pastry",
                shortDesc: "Thin, crispy dough pocket filled with minced beef and onions that steam into a rich, juicy broth inside.",
                desc: "Alat Somsa is legendary for its super-thin, unleavened wrapper and incredibly juicy filling. Cooked at extremely high temperatures in clay ovens (tandirs), the moisture from the beef and onions is sealed inside, creating a hot broth. Eating it hot is a sensory delight.",
                ingredients: ["Leaven-free thin pastry", "Minced lean beef", "Chopped onions", "Black pepper and cumin", "Melted tail fat cubes"],
                history: "Hailing from the desert Alat district in Bukhara, it was developed as a portable, high-calorie meal for traders crossing the Kyzylkum desert."
            },
            ru: {
                name: "Алатская Самса",
                origin: "Алат, Бухарская область",
                type: "Тестяная выпечка с мясом",
                shortDesc: "Особая бухарская самса из тонкого теста с сочной начинкой из мяса и лука с бульоном внутри.",
                desc: "Алатская самса славится своим хрустящим тонким тестом и сочной начинкой. При выпекании сок мяса и лука карамелизуется внутри самсы, образуя ароматный бульон. Подается исключительно горячей.",
                ingredients: ["Тонкое пресное тесто", "Говядина мелкорубленая", "Большое количество лука", "Черный перец и зира", "Кусочки курдючного жира"],
                history: "Родом из пустынного Алатского района Бухары. Самса служила сытным дорожным перекусом для караванов Великого шелкового пути."
            }
        }
    },
    fergana: {
        slug: 'fergana',
        image: '/XT_content/national-dishes/photo_2025-12-31_23-16-38.jpg',
        translations: {
            uz: {
                name: "Devzira Palovi (Qora Palov)",
                origin: "Farg'ona vodiysi",
                type: "Guruchli taom (Osh)",
                shortDesc: "Farg'onaning qizg'ish Devzira guruchidan, qo'y go'shti va zira bilan achchiq qilib tayyorlanadigan to'yimli oshi.",
                desc: "Devzira oshi — Farg'ona vodiysining faxri. Bu taom uchun faqat vodiyda o'sadigan to'q qizil yoki jigarrang chiziqli 'Devzira' guruchi ishlatiladi. Guruch suvni va yog'ni juda ko'p shimib oladi, natijada taom nihoyatda to'yimli va xushbo'y chiqadi. Olovda uzoq vaqt qaynatilib, quyuq qora-jigarrang tus olgani uchun ba'zan uni 'Qora palov' deb ham atashadi.",
                ingredients: ["Haqiqiy Devzira guruchi", "Qo'y go'shti va dumba yog'i", "Qizil va sariq sabzi", "Zira va sarimsoqpiyoz", "Bulg'or qalampiri va achchiq qalampir"],
                history: "Vodiy dehqonlari va kurashchilari (polvonlar) uchun kuch-quvvat manbai bo'lib xizmat qilgan. Bu oshni tayyorlash oshpazdan katta mahorat talab qiladi."
            },
            en: {
                name: "Devzira Plov (Fergana Dark Plov)",
                origin: "Fergana Valley",
                type: "Spicy Brown Rice Pilaf",
                shortDesc: "Made with the indigenous reddish-brown Devzira rice, slow-cooked lamb, and pungent whole garlic bulbs.",
                desc: "Devzira Plov is the pride of the Fergana Valley. It uses 'Devzira', a highly prized reddish rice that absorbs twice its weight in oils and broth, creating a deep earthy flavor. Cooking the rice turns it into a rich dark brown color, earning it the title 'Dark Plov'. It is typically spicier and heartier than other varieties.",
                ingredients: ["Genuine Devzira rice", "Fatty lamb chops and tail fat", "Red and yellow carrots", "Wild cumin, whole garlic bulbs", "Chili peppers"],
                history: "Known as the fuel for Fergana's legendary farmers and traditional wrestlers (Polvons), this dish requires master temperature control."
            },
            ru: {
                name: "Девзира Плов (Ферганский Темный Плов)",
                origin: "Ферганская долина",
                type: "Блюдо из риса (Плов)",
                shortDesc: "Сытный плов из красноватого ферганского риса Девзира с бараниной, зирой и чесноком.",
                desc: "Девзира плов — гордость Ферганской долины. Готовится из особого сорта красно-бурого риса 'Девзира'. Рис впитывает много влаги и жира, делая плов насыщенным. Из-за темного цвета его часто называют 'Кара плов'.",
                ingredients: ["Настоящий рис Девзира", "Баранина и курдючный жир", "Красная и желтая морковь", "Зира и головки чеснока", "Острый стручковый перец"],
                history: "Служил источником энергии для земледельцев и борцов (полванов) долины. Приготовление требует ювелирной точности."
            }
        }
    },
    andijan: {
        slug: 'andijan',
        image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80',
        translations: {
            uz: {
                name: "Andijon Dimlamasi",
                origin: "Andijon viloyati",
                type: "Qozon taomi",
                shortDesc: "Sabzavotlar va go'shtning o'z suvida, qozon qopqog'i mahkam yopilib dimlab pishiriladigan nihoyatda sersuv taomi.",
                desc: "Andijon dimlamasi — sabzavotlar va go'shtning eng tabiiy ta'mini saqlab qoluvchi ajoyib taomdir. Unga suv deyarli qo'shilmaydi; barcha masalliqlar (karam, kartoshka, sabzi, baqlajon, pomidor) qatlam-qatlam qilib solinadi va go'sht ustiga teriladi. Qozon qopqog'i ustidan og'ir yuk bosilib, past olovda 2 soat davomida o'z bug'ida dimlanadi.",
                ingredients: ["Mol yoki qo'y go'shti", "Karam barglari", "Kartoshka, sabzi, pomidor", "Bulg'or qalampiri", "Sarimsoq va ko'katlar"],
                history: "Andijonning serunum bog'lari va dehqonchilik madaniyati bilan bog'liq. Kuzgi hosil yig'im-terimidan so'ng yangi sabzavotlardan tayyorlanadigan eng shirin oilaviy taomdir."
            },
            en: {
                name: "Andijan Dimlama",
                origin: "Andijan Region",
                type: "Slow-braised Meat & Vegetables",
                shortDesc: "A slow-cooked, juicy dish where meat and layered garden vegetables steam entirely in their own juices.",
                desc: "Andijan Dimlama is a masterpiece of rustic cooking, preserving the organic sweetness of seasonal vegetables. Practically no water is added; cabbage, potatoes, carrots, eggplants, and tomatoes are layered tightly over cuts of lamb or beef and simmered under a sealed lid for two hours.",
                ingredients: ["Beef or mutton cuts", "Whole cabbage leaves", "Potatoes, carrots, tomatoes", "Sweet bell peppers", "Garlic and fresh herbs"],
                history: "Deeply connected to the fertile valleys of Andijan. Traditionally prepared during autumn to celebrate the rich harvest."
            },
            ru: {
                name: "Андижанская Димлама",
                origin: "Андижанская область",
                type: "Тушеное блюдо в казане",
                shortDesc: "Сочное блюдо из мяса и слоев овощей, томящееся в собственном соку под плотно закрытой крышкой.",
                desc: "Андижанская димлама — блюдо, сохраняющее естественный вкус сезонных овощей. Вода почти не добавляется. Мясо, капуста, картофель, морковь и томаты выкладываются слоями и томятся в собственном соку.",
                ingredients: ["Говядина или баранина", "Капустные листья", "Картофель, морковь, помидоры", "Болгарский перец", "Чеснок и зелень"],
                history: "Связана с плодородными садами Андижана. Блюдо традиционно готовили осенью в период сбора богатого урожая."
            }
        }
    },
    namangan: {
        slug: 'namangan',
        image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80',
        translations: {
            uz: {
                name: "Namangan Qozon Kabobi",
                origin: "Namangan viloyati",
                type: "Qovurma go'shtli taom",
                shortDesc: "Qozonda kartoshka bilan birga oltin rangda qovurilgan va dimlangan qo'y go'shtining ajoyib uyg'unligi.",
                desc: "Namangan qozon kabobi o'zining oddiyligi va ajoyib ta'mi bilan mashhur. Qo'y go'shti qovurg'alari ziravorlar bilan qozon devoriga yopishtirilib, qizib turgan yog'da qizartirib olinadi. So'ngra kartoshkalar oltin tusga kirguncha qovuriladi va past olovda birga dimlanadi. Go'sht og'izda eriydigan darajada yumshoq pishadi.",
                ingredients: ["Qo'y qovurg'alari yoki go'shti", "Butun kartoshkalar", "O'simlik yog'i", "Zira, kashnich urug'i va tuz", "Piyoz va ko'katlar (bezak uchun)"],
                history: "Namanganda qadimdan chorvadorlar tomonidan tog' etaklarida tayyorlab kelingan tezyurar va to'yimli taomdir."
            },
            en: {
                name: "Namangan Kazan Kabob",
                origin: "Namangan Region",
                type: "Fried & Simmered Lamb",
                shortDesc: "Succulent lamb chops and whole potatoes fried to a crisp golden crust, then steamed together in a kazan.",
                desc: "Namangan Kazan Kabob is celebrated for its crispy textures and rich meat flavor. Lamb ribs are rubbed with salt, cumin, and coriander, then seared at high temperatures in a heavy cast-iron wok (kazan). Potatoes are fried in the rendered fat until golden, and everything is simmered together until the meat is fall-off-the-bone tender.",
                ingredients: ["Lamb chops or beef chunks", "Whole small potatoes", "Vegetable oil", "Cumin, coriander seeds, salt", "Sliced onions and herbs for garnish"],
                history: "Originally cooked by shepherds in the mountains of Namangan, using a minimal set of ingredients to achieve maximal flavor."
            },
            ru: {
                name: "Наманганский Казан-Кабоб",
                origin: "Наманганская область",
                type: "Жареное мясо с картофелем",
                shortDesc: "Обжаренные до золотистой корочки ребра ягненка с цельным картофелем, томленые в казане.",
                desc: "Наманганский казан-кабоб ценится за хрустящую корочку и нежное мясо. Ребра баранины обжариваются в раскаленном масле, затем к ним добавляется картофель, и блюдо томится на медленном огне.",
                ingredients: ["Бараньи ребрышки или говядина", "Цельный мелкий картофель", "Растительное масло", "Зира, кориандр и соль", "Репчатый лук для украшения"],
                history: "Блюдо создано пастухами в предгорьях Намангана, где требовалось быстро и сытно накормить людей простыми продуктами."
            }
        }
    },
    kashkadarya: {
        slug: 'kashkadarya',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
        translations: {
            uz: {
                name: "Qashqadaryo Tandoor Kabobi",
                origin: "Qashqadaryo viloyati",
                type: "Tandir go'sht",
                shortDesc: "Archa shoxlari yordamida maxsus loy tandirda pishiriladigan, o'ziga xos xushbo'y va mayin go'shtli taom.",
                desc: "Qashqadaryo tandoor kabobi butun O'zbekistonda afsonaviy taom hisoblanadi. Uning siri archa (archa shoxlari) va tog' giyohlari bilan dudlanib, yer ostidagi loy tandirda pishirilishidadir. Go'sht hech qanday ortiqcha ziravorsiz, faqat tuz va zira bilan tayyorlanadi. Pishganda o'ziga xos tog' havosi va archa xushbo'yligini taratadi.",
                ingredients: ["Sarxil qo'y go'shti (asosan son qismi)", "Tog' archasi shoxlari", "Tosh tuzi", "Zira va tog' o'tlari"],
                history: "Qashqadaryoning tog'li va dasht tumanlarida yashovchi chorvador va cho'ponlarning an'anaviy go'sht pishirish san'atidan kelib chiqqan."
            },
            en: {
                name: "Kashkadarya Tandir Kabob",
                origin: "Kashkadarya Region",
                type: "Clay-oven Roasted Mutton",
                shortDesc: "Legendary spit-roasted mutton cooked inside a clay oven, infused with wild juniper branches for a smoky forest aroma.",
                desc: "Kashkadarya Tandir Kabob is iconic. Large joints of mutton are seasoned with sea salt and cumin, then suspended inside a glowing underground clay oven. The oven is sealed and smoked using wild mountain juniper (archa) needles, giving the tender, juicy meat an unmistakable woodsy fragrance.",
                ingredients: ["Fresh mutton (specifically hind legs)", "Mountain juniper branches", "Rock salt", "Wild cumin and mountain herbs"],
                history: "Developed by nomadic steppe dwellers of Kashkadarya, who used underground ovens and native juniper wood to cook and preserve meats."
            },
            ru: {
                name: "Кашкадарьинский Тандыр-Кабоб",
                origin: "Кашкадарьинская область",
                type: "Мясо, запеченное в тандыре",
                shortDesc: "Легендарная баранина, запеченная в глиняном тандыре с хвоей горного арчи для неповторимого аромата.",
                desc: "Кашкадарьинский тандыр-кабоб — визитная карточка региона. Крупные куски баранины маринуются с солью и зирой, затем подвешиваются в разогретый глиняный тандыр вместе со свежими ветками горной арчи (можжевельника).",
                ingredients: ["Свежая баранина (окорок)", "Ветки горной арчи", "Каменная соль", "Зира и дикие травы"],
                history: "Рецепт принадлежит кочевым чабанам Кашкадарьи, которые использовали подземные печи и хвойные ветки для придания мясу мягкости."
            }
        }
    },
    surkhandarya: {
        slug: 'surkhandarya',
        image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80',
        translations: {
            uz: {
                name: "Meva va Go'shtli Shakarob",
                origin: "Surxondaryo viloyati",
                type: "Yengil taom va salat",
                shortDesc: "Pishirilgan go'sht suvi, yangi uzilgan pomidor, piyoz va tog' giyohlari bilan tayyorlanadigan issiq va nordon Surxon taomi.",
                desc: "Surxondaryo shakarobi shunchaki salat emas, balki to'liq issiq taom hisoblanadi. U qaynoq go'shtli sho'rva quyilgan idishda pomidor va piyozni maydalash, ustiga go'sht bo'laklari va non to'g'rash orqali tayyorlanadi. Surxonning issiq iqlimida bu taom chanqoqni bosuvchi va juda tez hazm bo'luvchi taom sifatida mashhur.",
                ingredients: ["Go'sht va uning qaynatma suvi", "Tog' pomidorlari", "Sariq va qizil piyoz", "Tog' rayhoni va yalpiz", "Tandir non bo'laklari"],
                history: "Surxondaryoning issiq iqlimida dehqonlar va chorvadorlar tomonidan chanqoq bosuvchi va oson hazm bo'luvchi tushlik sifatida o'ylab topilgan."
            },
            en: {
                name: "Surkhandarya Shakarob",
                origin: "Surkhandarya Region",
                type: "Hot Meat Salad",
                shortDesc: "A hot, tangy dish made by mashing fresh tomatoes and onions directly into boiling meat broth, served with local bread.",
                desc: "Surkhandarya Shakarob defies the definition of a salad; it is a full, warm meal. Fresh sun-ripened tomatoes and onions are sliced directly into bowls containing boiling mutton broth. Pieces of flatbread and meat are torn in, creating a tangy, juicy, highly hydrating meal that is perfect for hot climates.",
                ingredients: ["Boiling meat broth and lamb pieces", "Sun-ripened tomatoes", "Yellow and red sweet onions", "Wild basil and mountain mint", "Traditional flatbread pieces"],
                history: "Invented by herdsmen in the desert-like heat of Surkhandarya to satisfy hunger and quench thirst simultaneously."
            },
            ru: {
                name: "Сурхандарьинский Шакароб",
                origin: "Сурхандарьинская область",
                type: "Горячий мясной салат",
                shortDesc: "Горячее пикантное блюдо из свежих томатов, лука и зелени, залитых кипящим бульоном с мясом.",
                desc: "Сурхандарьинский шакароб — это полноценное сытное блюдо. Спелые помидоры и лук режутся в глубокую тарелку, заливаются наваристым мясным бульоном с кусочками баранины и подаются с кусочками тандырной лепешки.",
                ingredients: ["Мясо и мясной бульон", "Спелые помидоры", "Репчатый лук", "Горный базилик и мята", "Кусочки лепешки"],
                history: "Придумано в жарких условиях Сурхандарьи как быстрый обед, утоляющий жажду и насыщающий силами."
            }
        }
    },
    jizzakh: {
        slug: 'jizzakh',
        image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=800&q=80',
        translations: {
            uz: {
                name: "Jizzax Somsasi",
                origin: "Jizzax viloyati",
                type: "Ulkan xamirli pishiriq",
                shortDesc: "O'zining ulkan o'lchami, sergo'shtligi va sersuvligi bilan tanilgan mashhur Jizzax somsasi.",
                desc: "Jizzax somsasi — somsalarning podshohi hisoblanadi. Uning o'lchami odatiy somsalardan 3-4 barobar katta bo'lib, bittasi to'liq tushlik o'rnini bosadi. Qatlama xamir ichiga mayda to'g'ralgan go'sht va dumba yog'i solinib, tandirda pishiriladi. Uni iste'mol qilishning ham o'z qoidasi bor: ustki qismi kesilib, ichidagi sersuv go'shti qoshiq bilan yeyiladi.",
                ingredients: ["Qatlamali somsa xamiri", "Qo'y yoki mol go'shti (to'g'ralgan)", "Dumba yog'i", "Ko'p miqdorda piyoz", "Zira va murch"],
                history: "Jizzax dovonidan o'tuvchi yo'lovchilar uchun uzoq yo'l oldidan to'yimli va uzoq vaqt issiq turadigan taom sifatida ixtiro qilingan."
            },
            en: {
                name: "Giant Jizzakh Somsa",
                origin: "Jizzakh Region",
                type: "Giant Meat Pastry",
                shortDesc: "A colossal puff pastry pie stuffed with hand-cut meat and onions, famous for its grand scale and rich gravy.",
                desc: "Jizzakh Somsa is the king of meat pastries. It is three to four times larger than standard samsas; a single pastry constitutes a full lunch. Made with layered puff pastry and packed with diced beef and mutton fat, it is baked in clay ovens. It is traditionally eaten by cutting the crispy top off and spooning out the rich meat filling.",
                ingredients: ["Layered puff pastry dough", "Hand-cut beef or lamb", "Tail fat cubes", "Large quantities of onions", "Cumin and black pepper"],
                history: "Created for travelers crossing the mountainous Jizzakh passes, offering a compact, calorie-rich meal that stayed hot for hours."
            },
            ru: {
                name: "Джизакская Самса",
                origin: "Джизакская область",
                type: "Гигантская мясная выпечка",
                shortDesc: "Огромная самса из слоеного теста с начинкой из рубленого мяса и лука, известная своими масштабами.",
                desc: "Джизакская самса — королева среди самсы. Она в 3-4 раза больше обычной. Слоеное тесто начиняется рубленым мясом с курдючным жиром и запекается. Едят её, надрезая хрустящую крышечку и доставая ложкой начинку.",
                ingredients: ["Слоеное тесто", "Рубленая говядина или баранина", "Курдючный жир", "Много лука", "Зира и черный перец"],
                history: "Была придумана для путников, пересекающих перевал, как сытное блюдо, способное долго сохранять тепло."
            }
        }
    },
    syrdarya: {
        slug: 'syrdarya',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
        translations: {
            uz: {
                name: "Sirdaryo Baliq Sho'rvasi",
                origin: "Sirdaryo viloyati",
                type: "Baliqli sho'rva",
                shortDesc: "Sirdaryoning yangi tutilgan baliqlaridan va sabzavotlardan tayyorlanadigan shifobaxsh sho'rva.",
                desc: "Sirdaryo baliq sho'rvasi (Uxa) daryo bo'yida yashovchi aholining sevimli taomidir. Bu sho'rva uchun asosan yangi tutilgan cho'rtan, sazan yoki laqqa baliqlari ishlatiladi. Baliq sabzavotlar va xushbo'y ziravorlar bilan birga past olovda qaynatiladi. Sho'rvaning suvi shaffof, shifobaxsh va mikroelementlarga boy bo'ladi.",
                ingredients: ["Daryo balig'i (Sazan, Laqqa)", "Kartoshka, sabzi, piyoz", "Dafna bargi va murch donachalari", "Yalpiz va petrushka"],
                history: "Sirdaryo daryosi bo'yidagi baliqchilarning qadimiy retsepti bo'lib, u asosan daryo qirg'og'ida ochiq olovda pishirilgan."
            },
            en: {
                name: "Syrdarya Fish Soup",
                origin: "Syrdarya Region",
                type: "River Fish Soup",
                shortDesc: "A light, healthy soup brewed from fresh river fish, aromatic root vegetables, and wild herbs.",
                desc: "Syrdarya Fish Soup is a local delicacy tied to the banks of Central Asia's longest river. Brewed using freshly caught carp, catfish, or pike, the soup features simple root vegetables and wild mint. The resulting broth is crystal clear, rich in nutrients, and regarded for its healing properties.",
                ingredients: ["Fresh river fish (Carp or Catfish)", "Potatoes, carrots, onions", "Bay leaves and black peppercorns", "Fresh mint and parsley"],
                history: "A traditional recipe passed down by local fishermen along the Syrdarya River, historically cooked in cauldrons over an open fire on the riverbanks."
            },
            ru: {
                name: "Сырдарьинская Уха",
                origin: "Сырдарьинская область",
                type: "Рыбный суп",
                shortDesc: "Целебный прозрачный суп, сваренный из свежевыловленной речной рыбы с овощами и зеленью.",
                desc: "Сырдарьинский рыбный суп — излюбленное блюдо жителей Присирдарья. Варится из свежего сазана или сома с добавлением кореньев и специй. Бульон получается прозрачным и очень полезным.",
                ingredients: ["Речная рыба (Сазан, Сом)", "Картофель, морковь, лук", "Лавровый лист и перец горошком", "Свежая мята и петрушка"],
                history: "Старинный рецепт рыбаков Сырдарьи. Суп традиционно готовился в казанах прямо на берегу реки."
            }
        }
    },
    navoi: {
        slug: 'navoi',
        image: 'https://images.unsplash.com/photo-1603360946369-fa99d57eead2?w=800&q=80',
        translations: {
            uz: {
                name: "Navoiy Sahro Surbasi",
                origin: "Qizilqum, Navoiy viloyati",
                type: "Dimlama go'shtli taom",
                shortDesc: "Sahro sharoitida o'simliklar va qo'y go'shtini qum ostida yoki qozonda uzoq vaqt dimlab pishiriladigan qadimiy cho'l taomi.",
                desc: "Sahro surbasi — Qizilqum sahrosining chorvadorlari orasida mashhur bo'lgan cho'l taomidir. Qo'y go'shti sahro o'tlari va yovvoyi piyoz bilan birga qozonda yoki maxsus teriga o'ralib, qum ostida uzoq vaqt davomida dimlab pishiriladi. Bu uslub go'shtning barcha foydali xususiyatlari va tabiat lazzatlarini o'zida saqlab qolishini ta'minlaydi.",
                ingredients: ["Qo'y go'shti (suyakli)", "Yovvoyi sahro piyozi", "Kashnich va zira", "Maxsus tog' o'tlari"],
                history: "Qizilqum sahrosi bo'ylab sayohat qilgan ko'chmanchi chorvadorlarning asriy an'analaridan biri bo'lib, sahroda minimal sharoitda eng yuqori quvvat beruvchi taom sifatida shakllangan."
            },
            en: {
                name: "Navoiy Desert Surba",
                origin: "Kyzylkum, Navoiy Region",
                type: "Slow-stewed Desert Meat",
                shortDesc: "An ancient nomadic recipe where lamb is slow-cooked with wild sage and desert onions in a tightly sealed kazan.",
                desc: "Navoiy Desert Surba is a nomadic delicacy from the heart of the Kyzylkum Desert. Bone-in mutton is seasoned with desert onions and wild herbs, then cooked slowly in a sealed container (historically buried under hot sand coals). This concentrates the natural juices of the meat, creating an intense, savory flavor.",
                ingredients: ["Bone-in mutton cuts", "Wild desert green onions", "Coriander and cumin seeds", "Desert sage and wild herbs"],
                history: "Evolved out of nomadic sheep-herding lifestyles in the dry steppes of Navoiy, where slow-cooking was used to extract maximum nutrients from meat."
            },
            ru: {
                name: "Навоийская Пустынная Сурба",
                origin: "Кызылкум, Навоийская область",
                type: "Томленое мясо по-кочевому",
                shortDesc: "Древнее блюдо кочевников из баранины, томленой в казане с диким луком и травами пустыни.",
                desc: "Навоийская сурба — традиционное блюдо пастухов пустыни Кызылкум. Баранина на кости томится с добавлением дикого пустынного лука и душистых трав в плотно закрытой посуде, сохраняя максимум сока.",
                ingredients: ["Баранина на кости", "Дикий пустынный лук", "Кориандр и зира", "Полынь и пустынные травы"],
                history: "Зародилось среди кочевых племен Кызылкума как способ приготовить максимально питательную пищу в суровых условиях пустыни."
            }
        }
    }
};
