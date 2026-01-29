"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'BM' | 'ZH';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    EN: {
        // Navbar
        "home": "Home",
        "about": "About Us",
        "services": "Services",
        "puppies": "Puppies",
        "blog": "Blog",
        "booking": "Book",

        // Hero Section
        "hero_badge": "THE BEST PET SHOP IN CHERAS",
        "hero_title_1": "YOUR",
        "hero_title_2": "PUPP'S BEST",
        "hero_title_3": "FRIEND",
        "hero_sub": "Expert grooming and cage-free boarding that feels like home. Experience our premium care in Taman Maluri.",
        "hero_cta": "Our Services",
        "hero_trusted": "TRUSTED CARE",
        "hero_rated": "Top Rated in Cheras",
        "hero_tag_grooming": "GROOMING",
        "hero_tag_boarding": "BOARDING",
        "hero_tag_spa": "SPA",

        // Benefits/About Section
        "about_badge": "Welcome to Hairy Home Maluri",
        "about_title": "Where Every Wag, Purr, and Happy Tail Matters",
        "about_desc": "We're more than just a pet shop. Nestled right in the heart of Taman Maluri, Cheras, our team is here to help your furry companions look great, feel loved, and stay safe — whether they need a gentle grooming session or a cozy overnight stay while you're away.",
        "about_cta": "Schedule Now",
        "about_story": "Our Story",
        "about_story_title": "Pet Grooming Cheras That Feels Like a Spa Day",
        "about_story_desc": "At Hairy Home, we understand that grooming isn't just about looking clean — it's about health, comfort, and confidence. We prioritize your pet's comfort and happiness while providing top-quality grooming services tailored to their needs.",
        "about_grooming_includes": "Professional Grooming Includes:",
        "about_grooming_1": "Full-body baths & blow-drying",
        "about_grooming_2": "Fur trimming & breed styling",
        "about_grooming_3": "Nail clipping & ear cleaning",
        "about_grooming_4": "Flea & tick treatment",

        // Pet Collection Section
        "collection_title": "OUR PROFESSIONAL SERVICES",
        "collection_desc": "Expert care for your pets, from head to tail.",
        "collection_cat_spa": "CAT SPA EXPERIENCE",
        "collection_dog_hotel": "DOG HOTEL STAY",
        "collection_grooming": "PROFESSIONAL GROOMING",
        "view_details": "View Details",

        // How We Serve Section
        "serve_badge": "HOW WE SERVE",
        "serve_title": "A Safe and Loving Home for Your Pets",
        "serve_desc": "Located in Cheras, Hairy Home provides top-tier services using modern technology and a non-aggressive approach. We treat your pups and cats like our own family.",
        "serve_1": "Professional Pet Grooming",
        "serve_2": "Cage-Free Pet Boarding",
        "serve_3": "Specialized Spa Treatments",
        "serve_4": "High-Quality Pet Nutrition",

        // Footer
        "footer_tagline": "Always caring about your furry friends.",
        "footer_quick_links": "Quick Links",
        "footer_about": "About",
        "footer_training": "Training",
        "footer_grooming": "Grooming",
        "footer_subscribe": "Subscribe",
        "footer_email": "Email",
        "footer_rights": "ALL RIGHT RESERVED | HAIRY HOME 2026",

        // Services Page
        "services_badge": "Precision & Care",
        "services_hero_title": "LUXURY SERVICES FOR YOUR PET",
        "services_hero_desc": "Elevating the standard of pet care in Kuala Lumpur. Professional, empathetic, and dedicated to your pet's happiness.",
        "service_grooming": "Pet Grooming",
        "service_grooming_desc": "Precision and care meet in our professional grooming suite. We don't just groom; we curate a stress-free experience tailored to your pet's specific needs.",
        "service_boarding": "Cage-Free Boarding",
        "service_boarding_desc": "Freedom is the heart of our boarding. No cages, no stress—just comfortable luxury with 24/7 human presence and unlimited playtime.",
        "service_spa": "Nano Bubble Spa",
        "service_spa_desc": "The ultimate skin detox. Our nano-bubble technology penetrates deep into the pores, removing toxins and soothing sensitive skin conditions.",
        "reserve_now": "Reserve Now",

        // Service Features
        "feat_styling": "Standard Breed Styling",
        "feat_bathing": "Medicated Bathing",
        "feat_nail": "Nail Dremeling",
        "feat_ear": "Ear Hygiene",
        "feat_facial": "Facial Scrub",
        "feat_deshed": "De-Shedding",
        "feat_private": "Private Sleeping Zones",
        "feat_social": "Social Interaction",
        "feat_supervision": "24/7 Supervision",
        "feat_meal": "Gourmet Meal Plans",
        "feat_photo": "Daily Photo Updates",
        "feat_climate": "Sanitized Climate",
        "feat_pore": "Pore Deep Cleaning",
        "feat_oxygen": "Skin Oxygenation",
        "feat_odor": "Odor Elimination",
        "feat_stress": "Stress Reduction",
        "feat_antibac": "Antibacterial Action",
        "feat_revital": "Revitalizing Finish",

        // Puppies Page
        "puppies_badge": "Adorable Puppies for Sale",
        "puppies_hero_title": "FIND YOUR FOREVER FRIEND",
        "puppies_hero_desc": "Every puppy at Hairy Home Maluri is raised with love, care, and the best nutrition before they find their forever home.",
        "puppies_available": "Available",
        "puppies_old": "Old",
        "puppies_contact": "Contact Us",
        "puppies_inquire": "Inquire",
        "puppies_visit_title": "Visit Our Boutique",
        "puppies_visit_desc": "Come meet our adorable puppies in person at Taman Maluri, Cheras. Our team is ready to help you find the perfect match for your family.",
        "puppies_directions": "Get Directions",

        // Puppy Breeds
        "breed_maltipoo": "Maltipoo",
        "breed_poodle": "Toy Poodle",
        "breed_bichon": "Bichon Frise",
        "breed_pomeranian": "Pomeranian",
        "char_maltipoo": "Playful & hypoallergenic",
        "char_poodle": "Smart & loyal",
        "char_bichon": "Happy & lively",
        "char_pomeranian": "Bold & lively"
    },
    BM: {
        // Navbar
        "home": "Laman Utama",
        "about": "Tentang Kami",
        "services": "Perkhidmatan",
        "puppies": "Anak Anjing",
        "blog": "Blog",
        "booking": "Tempah",

        // Hero Section
        "hero_badge": "KEDAI HAIWAN TERBAIK DI CHERAS",
        "hero_title_1": "KAWAN",
        "hero_title_2": "TERBAIK",
        "hero_title_3": "HAIWAN ANDA",
        "hero_sub": "Grooming pakar dan penginapan tanpa sangkar yang terasa seperti di rumah. Alami penjagaan premium kami di Taman Maluri.",
        "hero_cta": "Perkhidmatan Kami",
        "hero_trusted": "DIPERCAYAI",
        "hero_rated": "Terbaik di Cheras",
        "hero_tag_grooming": "GROOMING",
        "hero_tag_boarding": "PENGINAPAN",
        "hero_tag_spa": "SPA",

        // Benefits/About Section
        "about_badge": "Selamat Datang ke Hairy Home Maluri",
        "about_title": "Di Mana Setiap Kibasan Ekor dan Dengkuran Penting",
        "about_desc": "Kami lebih daripada sekadar kedai haiwan. Terletak di tengah-tengah Taman Maluri, Cheras, pasukan kami sedia membantu haiwan kesayangan anda kelihatan hebat, berasa disayangi dan selamat — sama ada mereka memerlukan sesi grooming atau penginapan semalaman yang selesa.",
        "about_cta": "Tempah Sekarang",
        "about_story": "Kisah Kami",
        "about_story_title": "Grooming Haiwan Cheras Yang Terasa Seperti Hari Spa",
        "about_story_desc": "Di Hairy Home, kami faham bahawa grooming bukan sekadar kelihatan bersih — ia tentang kesihatan, keselesaan dan keyakinan. Kami mengutamakan keselesaan dan kebahagiaan haiwan anda sambil menyediakan perkhidmatan grooming berkualiti tinggi.",
        "about_grooming_includes": "Grooming Profesional Termasuk:",
        "about_grooming_1": "Mandi seluruh badan & pengeringan",
        "about_grooming_2": "Potongan bulu & gaya baka",
        "about_grooming_3": "Potongan kuku & pembersihan telinga",
        "about_grooming_4": "Rawatan kutu & sengkenit",

        // Pet Collection Section
        "collection_title": "PERKHIDMATAN PROFESIONAL KAMI",
        "collection_desc": "Penjagaan pakar untuk haiwan anda, dari kepala hingga ekor.",
        "collection_cat_spa": "PENGALAMAN SPA KUCING",
        "collection_dog_hotel": "HOTEL ANJING",
        "collection_grooming": "GROOMING PROFESIONAL",
        "view_details": "Lihat Butiran",

        // How We Serve Section
        "serve_badge": "CARA KAMI BERKHIDMAT",
        "serve_title": "Rumah Yang Selamat dan Penuh Kasih Untuk Haiwan Anda",
        "serve_desc": "Terletak di Cheras, Hairy Home menyediakan perkhidmatan terbaik menggunakan teknologi moden dan pendekatan tanpa agresif. Kami melayan haiwan anda seperti keluarga sendiri.",
        "serve_1": "Grooming Haiwan Profesional",
        "serve_2": "Penginapan Tanpa Sangkar",
        "serve_3": "Rawatan Spa Khusus",
        "serve_4": "Nutrisi Haiwan Berkualiti Tinggi",

        // Footer
        "footer_tagline": "Sentiasa menjaga haiwan kesayangan anda.",
        "footer_quick_links": "Pautan Pantas",
        "footer_about": "Tentang",
        "footer_training": "Latihan",
        "footer_grooming": "Grooming",
        "footer_subscribe": "Langgan",
        "footer_email": "Emel",
        "footer_rights": "HAK CIPTA TERPELIHARA | HAIRY HOME 2026",

        // Services Page
        "services_badge": "Ketepatan & Penjagaan",
        "services_hero_title": "PERKHIDMATAN MEWAH UNTUK HAIWAN ANDA",
        "services_hero_desc": "Meningkatkan standard penjagaan haiwan di Kuala Lumpur. Profesional, empati dan dedikasi untuk kebahagiaan haiwan anda.",
        "service_grooming": "Grooming Haiwan",
        "service_grooming_desc": "Ketepatan dan penjagaan bertemu di suite grooming profesional kami. Kami bukan sekadar grooming; kami mencipta pengalaman tanpa tekanan yang disesuaikan dengan keperluan khusus haiwan anda.",
        "service_boarding": "Penginapan Tanpa Sangkar",
        "service_boarding_desc": "Kebebasan adalah inti penginapan kami. Tiada sangkar, tiada tekanan—hanya kemewahan selesa dengan kehadiran manusia 24/7 dan masa bermain tanpa had.",
        "service_spa": "Spa Nano Bubble",
        "service_spa_desc": "Detoks kulit terbaik. Teknologi nano-bubble kami menembusi jauh ke dalam liang, mengeluarkan toksin dan menenangkan keadaan kulit sensitif.",
        "reserve_now": "Tempah Sekarang",

        // Service Features
        "feat_styling": "Gaya Baka Standard",
        "feat_bathing": "Mandi Perubatan",
        "feat_nail": "Pengikiran Kuku",
        "feat_ear": "Kebersihan Telinga",
        "feat_facial": "Scrub Muka",
        "feat_deshed": "De-Shedding",
        "feat_private": "Zon Tidur Peribadi",
        "feat_social": "Interaksi Sosial",
        "feat_supervision": "Pengawasan 24/7",
        "feat_meal": "Pelan Makanan Gourmet",
        "feat_photo": "Kemas Kini Foto Harian",
        "feat_climate": "Iklim Bersih",
        "feat_pore": "Pembersihan Liang Dalam",
        "feat_oxygen": "Oksigenasi Kulit",
        "feat_odor": "Penyingkiran Bau",
        "feat_stress": "Pengurangan Tekanan",
        "feat_antibac": "Tindakan Antibakteria",
        "feat_revital": "Penyelesaian Revitalisasi",

        // Puppies Page
        "puppies_badge": "Anak Anjing Comel Untuk Dijual",
        "puppies_hero_title": "CARI RAKAN SELAMANYA",
        "puppies_hero_desc": "Setiap anak anjing di Hairy Home Maluri dibesarkan dengan kasih sayang, penjagaan dan nutrisi terbaik sebelum mereka menemui rumah selamanya.",
        "puppies_available": "Tersedia",
        "puppies_old": "Umur",
        "puppies_contact": "Hubungi Kami",
        "puppies_inquire": "Tanya",
        "puppies_visit_title": "Lawati Butik Kami",
        "puppies_visit_desc": "Datang jumpa anak anjing comel kami di Taman Maluri, Cheras. Pasukan kami sedia membantu anda mencari padanan sempurna untuk keluarga anda.",
        "puppies_directions": "Dapatkan Arah",

        // Puppy Breeds
        "breed_maltipoo": "Maltipoo",
        "breed_poodle": "Toy Poodle",
        "breed_bichon": "Bichon Frise",
        "breed_pomeranian": "Pomeranian",
        "char_maltipoo": "Ceria & hipoalergenik",
        "char_poodle": "Bijak & setia",
        "char_bichon": "Gembira & cergas",
        "char_pomeranian": "Berani & cergas"
    },
    ZH: {
        // Navbar
        "home": "首页",
        "about": "关于我们",
        "services": "服务项目",
        "puppies": "幼犬销售",
        "blog": "博客",
        "booking": "预订",

        // Hero Section
        "hero_badge": "蕉赖最佳宠物店",
        "hero_title_1": "您宠物",
        "hero_title_2": "最好的",
        "hero_title_3": "朋友",
        "hero_sub": "专业的美容和无笼位寄养，给宠物家一般的体验。欢迎来到马鲁里花园体验我们的优质服务。",
        "hero_cta": "我们的服务",
        "hero_trusted": "值得信赖",
        "hero_rated": "蕉赖评分最高",
        "hero_tag_grooming": "美容",
        "hero_tag_boarding": "寄养",
        "hero_tag_spa": "水疗",

        // Benefits/About Section
        "about_badge": "欢迎来到 Hairy Home Maluri",
        "about_title": "每一次摇尾巴、每一声呼噜都很重要",
        "about_desc": "我们不仅仅是一家宠物店。位于蕉赖马鲁里花园的中心，我们的团队致力于让您的毛茸茸伙伴看起来很棒、感到被爱和安全——无论是温和的美容还是舒适的过夜住宿。",
        "about_cta": "立即预约",
        "about_story": "我们的故事",
        "about_story_title": "蕉赖宠物美容，如同水疗体验",
        "about_story_desc": "在 Hairy Home，我们明白美容不仅仅是看起来干净——而是关于健康、舒适和自信。我们优先考虑您宠物的舒适和快乐，同时提供量身定制的优质美容服务。",
        "about_grooming_includes": "专业美容包括：",
        "about_grooming_1": "全身沐浴和吹干",
        "about_grooming_2": "修剪毛发和品种造型",
        "about_grooming_3": "修剪指甲和清洁耳朵",
        "about_grooming_4": "跳蚤和蜱虫治疗",

        // Pet Collection Section
        "collection_title": "我们的专业服务",
        "collection_desc": "从头到尾的专业宠物护理。",
        "collection_cat_spa": "猫咪水疗体验",
        "collection_dog_hotel": "狗狗酒店住宿",
        "collection_grooming": "专业美容",
        "view_details": "查看详情",

        // How We Serve Section
        "serve_badge": "我们的服务方式",
        "serve_title": "为您的宠物提供安全温馨的家",
        "serve_desc": "位于蕉赖，Hairy Home 使用现代技术和非攻击性方法提供一流服务。我们像对待自己的家人一样对待您的宠物。",
        "serve_1": "专业宠物美容",
        "serve_2": "无笼位寄养",
        "serve_3": "专业水疗护理",
        "serve_4": "优质宠物营养",

        // Footer
        "footer_tagline": "始终关爱您的毛茸茸朋友。",
        "footer_quick_links": "快速链接",
        "footer_about": "关于",
        "footer_training": "训练",
        "footer_grooming": "美容",
        "footer_subscribe": "订阅",
        "footer_email": "电子邮件",
        "footer_rights": "版权所有 | HAIRY HOME 2026",

        // Services Page
        "services_badge": "精准与关怀",
        "services_hero_title": "为您的宠物提供奢华服务",
        "services_hero_desc": "提升吉隆坡宠物护理标准。专业、同理心，致力于您宠物的幸福。",
        "service_grooming": "宠物美容",
        "service_grooming_desc": "精准与关怀在我们的专业美容套房中相遇。我们不仅仅是美容；我们根据您宠物的特定需求打造无压力体验。",
        "service_boarding": "无笼位寄养",
        "service_boarding_desc": "自由是我们寄养的核心。没有笼子，没有压力——只有舒适的奢华、24/7人员陪伴和无限的游戏时间。",
        "service_spa": "纳米气泡水疗",
        "service_spa_desc": "终极皮肤排毒。我们的纳米气泡技术深入毛孔，去除毒素，舒缓敏感皮肤问题。",
        "reserve_now": "立即预订",

        // Service Features
        "feat_styling": "标准品种造型",
        "feat_bathing": "药浴",
        "feat_nail": "指甲修剪",
        "feat_ear": "耳部卫生",
        "feat_facial": "面部磨砂",
        "feat_deshed": "去毛",
        "feat_private": "私人睡眠区",
        "feat_social": "社交互动",
        "feat_supervision": "24/7监督",
        "feat_meal": "美食计划",
        "feat_photo": "每日照片更新",
        "feat_climate": "消毒环境",
        "feat_pore": "深层毛孔清洁",
        "feat_oxygen": "皮肤充氧",
        "feat_odor": "消除异味",
        "feat_stress": "减轻压力",
        "feat_antibac": "抗菌作用",
        "feat_revital": "焕活效果",

        // Puppies Page
        "puppies_badge": "可爱幼犬出售",
        "puppies_hero_title": "找到您永远的朋友",
        "puppies_hero_desc": "Hairy Home Maluri 的每一只幼犬都在爱、关怀和最佳营养中长大，然后才找到它们永远的家。",
        "puppies_available": "可售",
        "puppies_old": "月龄",
        "puppies_contact": "联系我们",
        "puppies_inquire": "咨询",
        "puppies_visit_title": "参观我们的精品店",
        "puppies_visit_desc": "来蕉赖马鲁里花园亲自见见我们可爱的幼犬。我们的团队随时准备帮助您为家人找到完美的匹配。",
        "puppies_directions": "获取路线",

        // Puppy Breeds
        "breed_maltipoo": "马尔济斯贵宾",
        "breed_poodle": "玩具贵宾",
        "breed_bichon": "比熊犬",
        "breed_pomeranian": "博美犬",
        "char_maltipoo": "活泼 & 低过敏性",
        "char_poodle": "聪明 & 忠诚",
        "char_bichon": "快乐 & 活泼",
        "char_pomeranian": "勇敢 & 活泼"
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('EN');

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations['EN']] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
