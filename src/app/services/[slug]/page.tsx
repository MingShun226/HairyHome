"use client";

import { useParams } from "next/navigation";
import styles from "./ServiceDetail.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, MapPin, Clock, Phone, X, CheckCircle2, ChevronRight, ChevronLeft, CreditCard, Wallet } from "lucide-react";

interface ShopDetail {
    slug: string;
    name: string;
    area: string;
    fullAddress: string;
    phone: string;
    services: { name: string; price: string; duration: string }[];
    rating: number;
    reviewCount: number;
    image: string;
    gallery: string[];
    description: string;
    longDescription: string;
    hours: string;
    reviews: { author: string; rating: number; text: string; date: string }[];
}

const ALL_SHOPS: Record<string, ShopDetail> = {
    "pawfect-grooming-kl": {
        slug: "pawfect-grooming-kl",
        name: "Pawfect Grooming Studio",
        area: "KL",
        fullAddress: "12, Jalan Tun Razak, Kuala Lumpur",
        phone: "+60 11-2345 6789",
        services: [
            { name: "Basic Grooming", price: "RM 45", duration: "45 min" },
            { name: "Full Grooming Package", price: "RM 95", duration: "90 min" },
            { name: "Spa Bath & Blowdry", price: "RM 70", duration: "60 min" },
            { name: "De-shedding Treatment", price: "RM 120", duration: "75 min" },
            { name: "Nail Trim & Ear Clean", price: "RM 30", duration: "20 min" },
            { name: "Premium Show Cut", price: "RM 180", duration: "120 min" }
        ],
        rating: 4.9,
        reviewCount: 324,
        image: "/hero_dog_grooming_1769602911628.png",
        gallery: ["/hero_dog_grooming_1769602911628.png", "/services_hero_grooming_1769607223313.png", "/grooming_tools_flatlay_1769603003880.png"],
        description: "Premium grooming services with certified professionals.",
        longDescription: "Pawfect Grooming Studio has been KL's top-rated pet grooming destination since 2018. Our team of certified groomers specializes in breed-specific cuts, therapeutic spa treatments, and gentle handling techniques. We use only premium, hypoallergenic products to ensure your pet's comfort and safety. Every session includes a complimentary health check and personalized grooming plan.",
        hours: "9:00 AM - 7:00 PM (Mon-Sat)",
        reviews: [
            { author: "Sarah L.", rating: 5, text: "Best grooming experience ever! My poodle looked amazing and the staff was so gentle.", date: "2 weeks ago" },
            { author: "Ahmad R.", rating: 5, text: "Very professional. They took their time with my senior dog. Highly recommend!", date: "1 month ago" },
            { author: "Mei Ling C.", rating: 4, text: "Great results but had to wait a bit. The quality makes up for it though.", date: "2 months ago" }
        ]
    },
    "whiskers-daycare-selangor": {
        slug: "whiskers-daycare-selangor",
        name: "Whiskers Pet Daycare",
        area: "Selangor",
        fullAddress: "45, Jalan SS2/64, Petaling Jaya, Selangor",
        phone: "+60 12-3456 7890",
        services: [
            { name: "Half Day Care", price: "RM 35", duration: "5 hours" },
            { name: "Full Day Care", price: "RM 60", duration: "10 hours" },
            { name: "Puppy Socialisation", price: "RM 45", duration: "3 hours" },
            { name: "Obedience Training", price: "RM 90", duration: "60 min" }
        ],
        rating: 4.7,
        reviewCount: 198,
        image: "/cat_spa_treatment_1769602943984.png",
        gallery: ["/cat_spa_treatment_1769602943984.png", "/dog_boarding_hotel_1769602977566.png"],
        description: "Cage-free daycare with play zones and enrichment activities.",
        longDescription: "Whiskers Pet Daycare provides a stimulating, cage-free environment where your pets can socialize and play under professional supervision. Our facility features indoor and outdoor play zones, splash pools, and sensory enrichment stations. We group pets by size and temperament to ensure safe, happy interactions throughout the day.",
        hours: "7:00 AM - 8:00 PM (Daily)",
        reviews: [
            { author: "James T.", rating: 5, text: "My corgi absolutely loves this place. The staff sends photos throughout the day!", date: "1 week ago" },
            { author: "Priya S.", rating: 4, text: "Great facility with caring staff. My cat was hesitant at first but warmed up quickly.", date: "3 weeks ago" }
        ]
    },
    "cozy-paws-hostel-penang": {
        slug: "cozy-paws-hostel-penang",
        name: "Cozy Paws Hostel",
        area: "Penang",
        fullAddress: "88, Jalan Burma, George Town, Penang",
        phone: "+60 13-4567 8901",
        services: [
            { name: "Standard Room", price: "RM 50/night", duration: "24 hours" },
            { name: "Deluxe Suite", price: "RM 90/night", duration: "24 hours" },
            { name: "VIP Suite (AC + Webcam)", price: "RM 150/night", duration: "24 hours" },
            { name: "Extended Stay (7+ days)", price: "RM 40/night", duration: "24 hours" }
        ],
        rating: 4.8,
        reviewCount: 256,
        image: "/service_boarding_room_1769607486073.png",
        gallery: ["/service_boarding_room_1769607486073.png", "/dog_boarding_hotel_1769602977566.png"],
        description: "Air-conditioned boarding suites with 24/7 CCTV monitoring.",
        longDescription: "Cozy Paws Hostel offers premium boarding services in the heart of Penang. Each suite is air-conditioned with comfortable bedding and 24/7 CCTV access so you can check on your pet anytime. Our trained staff provides daily walks, playtime, and personalized meal plans. We send daily photo and video updates to give you peace of mind while you are away.",
        hours: "Check-in: 9AM-7PM / Check-out: by 12PM",
        reviews: [
            { author: "David K.", rating: 5, text: "Left my dog for a week and got daily video updates. He seemed happier than at home!", date: "2 weeks ago" },
            { author: "Lin H.", rating: 5, text: "Cleanest pet boarding I've seen in Penang. The VIP suite webcam is a great touch.", date: "1 month ago" }
        ]
    },
    "dr-fur-clinic-johor": {
        slug: "dr-fur-clinic-johor",
        name: "Dr. Fur Pet Clinic",
        area: "Johor",
        fullAddress: "22, Jalan Molek 1/5, Taman Molek, Johor Bahru",
        phone: "+60 14-5678 9012",
        services: [
            { name: "General Consultation", price: "RM 60", duration: "30 min" },
            { name: "Vaccination Package", price: "RM 120", duration: "20 min" },
            { name: "Dental Cleaning", price: "RM 250", duration: "60 min" },
            { name: "Emergency Care", price: "RM 300", duration: "Varies" },
            { name: "Spay/Neuter Surgery", price: "From RM 280", duration: "Half day" }
        ],
        rating: 4.9,
        reviewCount: 412,
        image: "/dog_boarding_hotel_1769602977566.png",
        gallery: ["/dog_boarding_hotel_1769602977566.png", "/cat_spa_treatment_1769602943984.png"],
        description: "Full-service veterinary clinic with emergency care.",
        longDescription: "Dr. Fur Pet Clinic is Johor Bahru's most trusted veterinary practice. Led by Dr. Tan Wei Ming with over 15 years of experience, our clinic provides comprehensive medical care including vaccinations, dental treatments, surgery, and 24-hour emergency services. We use state-of-the-art diagnostic equipment and maintain the highest standards of hygiene and care.",
        hours: "8:30 AM - 9:00 PM (Daily) | Emergency: 24/7",
        reviews: [
            { author: "Nurul A.", rating: 5, text: "Dr. Tan saved my cat's life during an emergency. Forever grateful to this clinic.", date: "1 week ago" },
            { author: "Kevin W.", rating: 5, text: "Very thorough and professional. They explain everything clearly.", date: "3 weeks ago" },
            { author: "Siti R.", rating: 4, text: "Great clinic but can get quite busy. Booking ahead is recommended.", date: "1 month ago" }
        ]
    },
    "groom-and-bloom-kl": {
        slug: "groom-and-bloom-kl",
        name: "Groom & Bloom",
        area: "KL",
        fullAddress: "6, Jalan Imbi, Bukit Bintang, Kuala Lumpur",
        phone: "+60 11-6789 0123",
        services: [
            { name: "Organic Bath", price: "RM 55", duration: "45 min" },
            { name: "Full Groom + Spa", price: "RM 130", duration: "100 min" },
            { name: "Cat Grooming", price: "RM 70", duration: "60 min" },
            { name: "Puppy First Groom", price: "RM 40", duration: "30 min" }
        ],
        rating: 4.6,
        reviewCount: 145,
        image: "/services_hero_grooming_1769607223313.png",
        gallery: ["/services_hero_grooming_1769607223313.png", "/hero_dog_grooming_1769602911628.png"],
        description: "Boutique grooming salon with organic products.",
        longDescription: "Groom & Bloom is a boutique grooming salon in the heart of Bukit Bintang. We pride ourselves on using 100% organic, plant-based grooming products that are gentle on your pet's skin and coat. Our cozy, stress-free environment is designed to make every grooming session a pleasant experience. We also offer daycare services for those who need a few hours of pet-free time.",
        hours: "10:00 AM - 7:00 PM (Tue-Sun)",
        reviews: [
            { author: "Rachel T.", rating: 5, text: "Love the organic products! My dog's coat has never looked better.", date: "2 weeks ago" },
            { author: "Zhi Wei L.", rating: 4, text: "Cozy place with friendly staff. A bit pricey but worth it.", date: "1 month ago" }
        ]
    },
    "happy-tails-training-selangor": {
        slug: "happy-tails-training-selangor",
        name: "Happy Tails Academy",
        area: "Selangor",
        fullAddress: "100, Jalan PJU 5/1, Kota Damansara, Selangor",
        phone: "+60 12-7890 1234",
        services: [
            { name: "Puppy Basics (6 sessions)", price: "RM 350", duration: "6 weeks" },
            { name: "Obedience Training", price: "RM 80/session", duration: "60 min" },
            { name: "Behavior Modification", price: "RM 150/session", duration: "90 min" },
            { name: "Agility Training", price: "RM 100/session", duration: "75 min" }
        ],
        rating: 4.8,
        reviewCount: 189,
        image: "/grooming_tools_flatlay_1769603003880.png",
        gallery: ["/grooming_tools_flatlay_1769603003880.png", "/hero_dog_grooming_1769602911628.png"],
        description: "Professional pet training with certified trainers.",
        longDescription: "Happy Tails Academy is Selangor's premier pet training facility. Our certified trainers use positive reinforcement techniques to help your dog become well-behaved and confident. From puppy socialization to advanced obedience and behavior modification, we offer programs for every stage of your dog's life. Our spacious outdoor training grounds include agility equipment and socialization areas.",
        hours: "8:00 AM - 6:00 PM (Mon-Sat)",
        reviews: [
            { author: "Daniel O.", rating: 5, text: "My rescue dog completely transformed after 6 sessions. The trainers are amazing!", date: "1 week ago" },
            { author: "Farah M.", rating: 5, text: "Worth every ringgit. My puppy went from chaos to calm.", date: "2 weeks ago" }
        ]
    },
    "furry-haven-hostel-perak": {
        slug: "furry-haven-hostel-perak",
        name: "Furry Haven Retreat",
        area: "Perak",
        fullAddress: "15, Jalan Gopeng, Ipoh, Perak",
        phone: "+60 15-8901 2345",
        services: [
            { name: "Standard Boarding", price: "RM 40/night", duration: "24 hours" },
            { name: "Premium Boarding + Grooming", price: "RM 80/night", duration: "24 hours" },
            { name: "Cat Boarding Suite", price: "RM 45/night", duration: "24 hours" },
            { name: "Basic Grooming Add-on", price: "RM 35", duration: "40 min" }
        ],
        rating: 4.5,
        reviewCount: 97,
        image: "/cat_spa_treatment_1769602943984.png",
        gallery: ["/cat_spa_treatment_1769602943984.png", "/service_boarding_room_1769607486073.png"],
        description: "Countryside pet retreat with spacious play yards.",
        longDescription: "Furry Haven Retreat is a peaceful countryside boarding facility located in Ipoh. Surrounded by nature, our retreat offers spacious indoor and outdoor areas where your pets can relax and play. We provide personalized meal plans, daily grooming options, and plenty of one-on-one attention. Perfect for pet parents who want their furry friends to enjoy a mini vacation too.",
        hours: "8:00 AM - 7:00 PM (Daily)",
        reviews: [
            { author: "Jason L.", rating: 5, text: "Beautiful location with so much space for the dogs to run around!", date: "3 weeks ago" },
            { author: "Amy C.", rating: 4, text: "Peaceful place. My cat seemed very relaxed when I picked her up.", date: "1 month ago" }
        ]
    },
    "petville-clinic-penang": {
        slug: "petville-clinic-penang",
        name: "PetVille Medical Centre",
        area: "Penang",
        fullAddress: "55, Jalan Masjid Negeri, George Town, Penang",
        phone: "+60 16-9012 3456",
        services: [
            { name: "Health Check-up", price: "RM 55", duration: "30 min" },
            { name: "Vaccination", price: "RM 100", duration: "15 min" },
            { name: "Dental Scaling", price: "RM 220", duration: "45 min" },
            { name: "Post-Op Grooming", price: "RM 60", duration: "40 min" }
        ],
        rating: 4.7,
        reviewCount: 276,
        image: "/hero_dog_grooming_1769602911628.png",
        gallery: ["/hero_dog_grooming_1769602911628.png", "/cat_spa_treatment_1769602943984.png"],
        description: "Modern veterinary centre with in-house lab.",
        longDescription: "PetVille Medical Centre is a modern, fully-equipped veterinary facility in the heart of George Town. Our team of experienced veterinarians provides comprehensive healthcare services including diagnostics, surgery, dental care, and preventive medicine. We also offer post-operative grooming services to help your pet recover in comfort and style.",
        hours: "9:00 AM - 8:00 PM (Mon-Sat) | Sun: 10AM-4PM",
        reviews: [
            { author: "Tan B.", rating: 5, text: "Modern equipment and very knowledgeable vets. My go-to clinic in Penang.", date: "1 week ago" },
            { author: "Grace W.", rating: 4, text: "Clean and professional. The post-op grooming service is a nice bonus.", date: "1 month ago" }
        ]
    },
    "pawradise-daycare-melaka": {
        slug: "pawradise-daycare-melaka",
        name: "Pawradise Daycare & Play",
        area: "Melaka",
        fullAddress: "8, Jalan Melaka Raya, Melaka",
        phone: "+60 17-0123 4567",
        services: [
            { name: "Day Pass", price: "RM 30", duration: "8 hours" },
            { name: "Weekly Pass (5 days)", price: "RM 120", duration: "5 days" },
            { name: "Overnight Stay", price: "RM 55/night", duration: "24 hours" },
            { name: "Pool & Play Session", price: "RM 40", duration: "2 hours" }
        ],
        rating: 4.6,
        reviewCount: 134,
        image: "/service_boarding_room_1769607486073.png",
        gallery: ["/service_boarding_room_1769607486073.png", "/dog_boarding_hotel_1769602977566.png"],
        description: "Fun-filled daycare with splash pools and agility courses.",
        longDescription: "Pawradise Daycare & Play is Melaka's most fun pet facility! We feature splash pools, agility courses, sensory gardens, and plenty of toys to keep your pets entertained all day. Our trained handlers ensure safe play in groups matched by size and energy level. We also offer overnight boarding for those who want their pets to enjoy a full Pawradise experience.",
        hours: "7:30 AM - 8:30 PM (Daily)",
        reviews: [
            { author: "Hafiz N.", rating: 5, text: "My golden retriever goes crazy every time we pull up. He loves the pool!", date: "2 weeks ago" },
            { author: "Jessica Y.", rating: 4, text: "Great value with the weekly pass. Staff is very caring.", date: "1 month ago" }
        ]
    },
    "elite-groom-johor": {
        slug: "elite-groom-johor",
        name: "Elite Groom House",
        area: "Johor",
        fullAddress: "33, Jalan Austin Heights, Johor Bahru",
        phone: "+60 18-1234 5678",
        services: [
            { name: "Show Quality Cut", price: "RM 200", duration: "150 min" },
            { name: "Full Grooming", price: "RM 100", duration: "90 min" },
            { name: "Teeth Brushing Add-on", price: "RM 20", duration: "10 min" },
            { name: "Basic Obedience Class", price: "RM 75/session", duration: "45 min" }
        ],
        rating: 4.8,
        reviewCount: 221,
        image: "/services_hero_grooming_1769607223313.png",
        gallery: ["/services_hero_grooming_1769607223313.png", "/grooming_tools_flatlay_1769603003880.png"],
        description: "Award-winning grooming with show-quality styling.",
        longDescription: "Elite Groom House is an award-winning grooming salon that has been serving Johor Bahru since 2016. Our head groomer has won multiple national competitions and trains our entire team to deliver show-quality results for every client. Whether you need a simple trim or a competition-ready style, we deliver perfection. We also offer basic obedience training to complement your pet's grooming routine.",
        hours: "9:30 AM - 7:30 PM (Tue-Sun)",
        reviews: [
            { author: "Michelle T.", rating: 5, text: "The best groomer in JB, hands down. My shih tzu always looks like a show dog!", date: "1 week ago" },
            { author: "Ryan K.", rating: 5, text: "Incredible attention to detail. Worth the drive from Singapore.", date: "3 weeks ago" }
        ]
    }
};

const TIME_SLOTS = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
];

export default function ShopDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const shop = ALL_SHOPS[slug];

    const router = useRouter();
    const [bookingOpen, setBookingOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState(1); // 1=service+date+time, 2=checkout, 3=success
    const [selectedService, setSelectedService] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedPayment, setSelectedPayment] = useState("");
    const [activeImage, setActiveImage] = useState(0);
    const [calendarMonth, setCalendarMonth] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });

    if (!shop) {
        return (
            <>
                <Navbar />
                <main className={styles.main}>
                    <div className={styles.notFound}>
                        <h1>Shop Not Found</h1>
                        <p>The shop you are looking for does not exist or has been removed.</p>
                        <Link href="/services" className="button-retro">
                            Browse All Services &rarr;
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const handleProceedToCheckout = () => {
        if (selectedService && selectedDate && selectedTime) {
            setBookingStep(2);
        }
    };

    const handleConfirmPayment = () => {
        if (selectedPayment) {
            setBookingStep(3);
        }
    };

    const resetBooking = () => {
        setBookingOpen(false);
        setBookingStep(1);
        setSelectedService("");
        setSelectedDate("");
        setSelectedTime("");
        setSelectedPayment("");
    };

    const handleGoToBookings = () => {
        resetBooking();
        router.push("/dashboard/user/bookings");
    };

    // Payment methods
    const paymentMethods = [
        { id: "visa", label: "Visa ending in 4242", detail: "Credit/Debit Card", icon: "card" },
        { id: "tng", label: "Touch 'n Go eWallet", detail: "eWallet", icon: "wallet" },
        { id: "fpx", label: "FPX Online Banking", detail: "Bank Transfer", icon: "card" },
        { id: "grabpay", label: "GrabPay", detail: "eWallet", icon: "wallet" },
    ];

    // Calendar helpers
    const calendarDays = () => {
        const year = calendarMonth.getFullYear();
        const month = calendarMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const cells: { day: number; dateStr: string; disabled: boolean }[] = [];
        for (let i = 0; i < firstDay; i++) {
            cells.push({ day: 0, dateStr: "", disabled: true });
        }
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(year, month, d);
            const dateStr = date.toISOString().split("T")[0];
            cells.push({ day: d, dateStr, disabled: date < today });
        }
        return cells;
    };

    const monthLabel = calendarMonth.toLocaleDateString("en-MY", { month: "long", year: "numeric" });

    const prevMonth = () => {
        const now = new Date();
        const prev = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
        if (prev >= new Date(now.getFullYear(), now.getMonth(), 1)) {
            setCalendarMonth(prev);
        }
    };

    const nextMonth = () => {
        setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
    };

    // Related shops: same area or similar services, excluding current
    const relatedShops = Object.values(ALL_SHOPS)
        .filter(s => s.slug !== shop.slug)
        .sort((a, b) => {
            const aMatch = a.area === shop.area ? 1 : 0;
            const bMatch = b.area === shop.area ? 1 : 0;
            return bMatch - aMatch;
        })
        .slice(0, 3);

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-MY", { weekday: "short", month: "short", day: "numeric" });
    };

    const getSelectedServicePrice = () => {
        const svc = shop.services.find(s => s.name === selectedService);
        return svc ? svc.price : "";
    };

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* Breadcrumb */}
                <div className={styles.breadcrumbWrap}>
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/services">Services</Link>
                        <span>/</span>
                        <span>{shop.name}</span>
                    </div>
                </div>

                {/* Hero Section */}
                <section className={styles.hero}>
                    <motion.div
                        className={styles.galleryCol}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={`card-retro ${styles.mainImageBox}`}>
                            <Image
                                src={shop.gallery[activeImage]}
                                alt={shop.name}
                                fill
                                className={styles.mainImg}
                            />
                        </div>
                        {shop.gallery.length > 1 && (
                            <div className={styles.thumbRow}>
                                {shop.gallery.map((img, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ""}`}
                                        onClick={() => setActiveImage(i)}
                                    >
                                        <Image src={img} alt={`${shop.name} ${i + 1}`} fill className={styles.thumbImg} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        className={styles.infoCol}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <span className="badge-round" style={{ background: '#FFCE1A' }}>VERIFIED PARTNER</span>
                        <h1 className={styles.shopTitle}>{shop.name}</h1>

                        <div className={styles.metaRow}>
                            <div className={styles.ratingBadge}>
                                <Star size={16} fill="#FFCE1A" stroke="#FFCE1A" />
                                <span className={styles.ratingNum}>{shop.rating}</span>
                                <span className={styles.reviewCount}>({shop.reviewCount} reviews)</span>
                            </div>
                        </div>

                        <div className={styles.detailsList}>
                            <div className={styles.detailItem}>
                                <MapPin size={18} />
                                <span>{shop.fullAddress}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <Clock size={18} />
                                <span>{shop.hours}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <Phone size={18} />
                                <span>{shop.phone}</span>
                            </div>
                        </div>

                        <p className={styles.longDesc}>{shop.longDescription}</p>

                        <button className="button-retro" onClick={() => setBookingOpen(true)}>
                            Book Now &rarr;
                        </button>
                    </motion.div>
                </section>

                {/* Services List */}
                <section className={styles.servicesSection}>
                    <div className={styles.sectionInner}>
                        <h2 className={styles.sectionTitle}>Services & Pricing</h2>
                        <div className={styles.servicesList}>
                            {shop.services.map((s, i) => (
                                <motion.div
                                    key={s.name}
                                    className={styles.serviceRow}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <div className={styles.serviceInfo}>
                                        <h4>{s.name}</h4>
                                        <span className={styles.serviceDuration}>{s.duration}</span>
                                    </div>
                                    <div className={styles.servicePrice}>{s.price}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Reviews */}
                <section className={styles.reviewsSection}>
                    <div className={styles.sectionInner}>
                        <h2 className={styles.sectionTitle}>Customer Reviews</h2>
                        <div className={styles.reviewsGrid}>
                            {shop.reviews.map((review, i) => (
                                <motion.div
                                    key={i}
                                    className={`card-retro ${styles.reviewCard}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className={styles.reviewHeader}>
                                        <div className={styles.reviewAuthor}>{review.author}</div>
                                        <div className={styles.reviewStars}>
                                            {Array.from({ length: review.rating }).map((_, j) => (
                                                <Star key={j} size={14} fill="#FFCE1A" stroke="#FFCE1A" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className={styles.reviewText}>{review.text}</p>
                                    <span className={styles.reviewDate}>{review.date}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Shops */}
                <section className={styles.relatedSection}>
                    <div className={styles.sectionInner}>
                        <h2 className={styles.sectionTitle}>Similar Partners</h2>
                        <div className={styles.relatedGrid}>
                            {relatedShops.map((rs, i) => (
                                <motion.div
                                    key={rs.slug}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link href={`/services/${rs.slug}`} className={styles.relatedCardLink}>
                                        <div className={`card-retro ${styles.relatedCard}`}>
                                            <div className={styles.relatedImgWrap}>
                                                <Image src={rs.image} alt={rs.name} fill className={styles.relatedImg} />
                                            </div>
                                            <div className={styles.relatedBody}>
                                                <h4>{rs.name}</h4>
                                                <div className={styles.relatedMeta}>
                                                    <MapPin size={12} />
                                                    <span>{rs.area === "KL" ? "Kuala Lumpur" : rs.area}</span>
                                                    <Star size={12} fill="#FFCE1A" stroke="#FFCE1A" />
                                                    <span>{rs.rating}</span>
                                                </div>
                                                <span className={styles.relatedArrow}>
                                                    View Details <ChevronRight size={14} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Booking Modal */}
            <AnimatePresence>
                {bookingOpen && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => resetBooking()}
                    >
                        <motion.div
                            className={styles.modal}
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 60, scale: 0.95 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button className={styles.modalClose} onClick={() => resetBooking()}>
                                <X size={22} />
                            </button>

                            {bookingStep === 3 ? (
                                <div className={styles.successState}>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    >
                                        <CheckCircle2 size={64} className={styles.successIcon} />
                                    </motion.div>
                                    <h2>Booking Confirmed!</h2>
                                    <p>Your appointment at <strong>{shop.name}</strong> has been booked.</p>
                                    <div className={styles.successDetails}>
                                        <div><strong>Service:</strong> {selectedService}</div>
                                        <div><strong>Date:</strong> {formatDate(selectedDate)}</div>
                                        <div><strong>Time:</strong> {selectedTime}</div>
                                        <div><strong>Payment:</strong> {paymentMethods.find(p => p.id === selectedPayment)?.label}</div>
                                        <div><strong>Amount:</strong> {getSelectedServicePrice()}</div>
                                    </div>
                                    <p className={styles.successNote}>A confirmation has been sent to your email.</p>
                                    <button className="button-retro" onClick={handleGoToBookings}>
                                        Go to My Bookings &rarr;
                                    </button>
                                </div>
                            ) : bookingStep === 2 ? (
                                <>
                                    <h2 className={styles.modalTitle}>Checkout</h2>

                                    {/* Order Summary */}
                                    <div className={styles.modalStep}>
                                        <label className={styles.modalLabel}>ORDER SUMMARY</label>
                                        <div style={{
                                            background: 'rgba(61, 90, 153, 0.06)',
                                            border: '1px solid rgba(61, 90, 153, 0.1)',
                                            borderRadius: '12px',
                                            padding: '18px',
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.92rem', fontWeight: 600 }}>
                                                <span>{selectedService}</span>
                                                <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{getSelectedServicePrice()}</span>
                                            </div>
                                            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                                {formatDate(selectedDate)} at {selectedTime}
                                            </div>
                                            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                                {shop.name}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Methods */}
                                    <div className={styles.modalStep}>
                                        <label className={styles.modalLabel}>SELECT PAYMENT METHOD</label>
                                        <div className={styles.modalOptions}>
                                            {paymentMethods.map(pm => (
                                                <button
                                                    key={pm.id}
                                                    className={`${styles.optionBtn} ${selectedPayment === pm.id ? styles.optionActive : ""}`}
                                                    onClick={() => setSelectedPayment(pm.id)}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <div style={{
                                                            width: '36px', height: '36px', borderRadius: '8px',
                                                            background: pm.icon === 'card' ? '#E3F2FD' : '#E8F5E9',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                                        }}>
                                                            {pm.icon === 'card'
                                                                ? <CreditCard size={18} style={{ color: '#1565C0' }} />
                                                                : <Wallet size={18} style={{ color: '#2E7D32' }} />
                                                            }
                                                        </div>
                                                        <div style={{ textAlign: 'left' }}>
                                                            <div style={{ fontSize: '0.88rem' }}>{pm.label}</div>
                                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{pm.detail}</div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            style={{
                                                flex: 1, padding: '12px', background: 'white', border: '1.5px solid rgba(61, 90, 153, 0.15)',
                                                borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                                                fontFamily: 'inherit', color: 'var(--foreground)', transition: 'all 0.2s',
                                            }}
                                            onClick={() => setBookingStep(1)}
                                        >
                                            &larr; Back
                                        </button>
                                        <button
                                            className={`button-retro ${styles.confirmBtn}`}
                                            onClick={handleConfirmPayment}
                                            disabled={!selectedPayment}
                                            style={{
                                                flex: 2, margin: 0,
                                                opacity: !selectedPayment ? 0.5 : 1,
                                                cursor: !selectedPayment ? "not-allowed" : "pointer",
                                            }}
                                        >
                                            Pay {getSelectedServicePrice()} &rarr;
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className={styles.modalTitle}>Book at {shop.name}</h2>

                                    {/* Step 1: Service */}
                                    <div className={styles.modalStep}>
                                        <label className={styles.modalLabel}>1. SELECT SERVICE</label>
                                        <div className={styles.modalOptions}>
                                            {shop.services.map(s => (
                                                <button
                                                    key={s.name}
                                                    className={`${styles.optionBtn} ${selectedService === s.name ? styles.optionActive : ""}`}
                                                    onClick={() => setSelectedService(s.name)}
                                                >
                                                    <span>{s.name}</span>
                                                    <span className={styles.optionPrice}>{s.price}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Step 2: Calendar Date Picker */}
                                    <div className={styles.modalStep}>
                                        <label className={styles.modalLabel}>2. SELECT DATE</label>
                                        <div style={{
                                            border: '1.5px solid rgba(61, 90, 153, 0.12)',
                                            borderRadius: '12px',
                                            padding: '16px',
                                            background: 'white',
                                        }}>
                                            {/* Calendar Header */}
                                            <div style={{
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                marginBottom: '14px',
                                            }}>
                                                <button
                                                    onClick={prevMonth}
                                                    style={{
                                                        background: 'none', border: '1px solid rgba(61, 90, 153, 0.12)',
                                                        borderRadius: '8px', width: '32px', height: '32px',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        cursor: 'pointer', color: 'var(--foreground)',
                                                    }}
                                                >
                                                    <ChevronLeft size={16} />
                                                </button>
                                                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--foreground)' }}>
                                                    {monthLabel}
                                                </span>
                                                <button
                                                    onClick={nextMonth}
                                                    style={{
                                                        background: 'none', border: '1px solid rgba(61, 90, 153, 0.12)',
                                                        borderRadius: '8px', width: '32px', height: '32px',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        cursor: 'pointer', color: 'var(--foreground)',
                                                    }}
                                                >
                                                    <ChevronRight size={16} />
                                                </button>
                                            </div>

                                            {/* Weekday Headers */}
                                            <div style={{
                                                display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
                                                gap: '4px', marginBottom: '6px',
                                            }}>
                                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                                    <div key={day} style={{
                                                        textAlign: 'center', fontSize: '0.7rem', fontWeight: 600,
                                                        color: 'var(--text-muted)', padding: '4px 0',
                                                    }}>
                                                        {day}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Calendar Grid */}
                                            <div style={{
                                                display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
                                                gap: '4px',
                                            }}>
                                                {calendarDays().map((cell, i) => (
                                                    <button
                                                        key={i}
                                                        disabled={cell.disabled || cell.day === 0}
                                                        onClick={() => cell.dateStr && setSelectedDate(cell.dateStr)}
                                                        style={{
                                                            padding: '8px 4px',
                                                            border: selectedDate === cell.dateStr ? '1.5px solid var(--foreground)' : '1px solid transparent',
                                                            borderRadius: '8px',
                                                            background: selectedDate === cell.dateStr ? 'var(--foreground)' : 'transparent',
                                                            color: selectedDate === cell.dateStr ? 'white' : cell.disabled || cell.day === 0 ? 'rgba(0,0,0,0.15)' : 'var(--foreground)',
                                                            fontSize: '0.82rem',
                                                            fontWeight: 600,
                                                            fontFamily: 'inherit',
                                                            cursor: cell.disabled || cell.day === 0 ? 'default' : 'pointer',
                                                            transition: 'all 0.15s',
                                                            visibility: cell.day === 0 ? 'hidden' as const : 'visible' as const,
                                                        }}
                                                    >
                                                        {cell.day || ''}
                                                    </button>
                                                ))}
                                            </div>

                                            {selectedDate && (
                                                <div style={{
                                                    marginTop: '12px', padding: '8px 12px',
                                                    background: 'rgba(61, 90, 153, 0.06)', borderRadius: '8px',
                                                    fontSize: '0.82rem', fontWeight: 600, color: 'var(--foreground)',
                                                    textAlign: 'center',
                                                }}>
                                                    Selected: {formatDate(selectedDate)}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Step 3: Time */}
                                    <div className={styles.modalStep}>
                                        <label className={styles.modalLabel}>3. SELECT TIME</label>
                                        <div className={styles.timeGrid}>
                                            {TIME_SLOTS.map(t => (
                                                <button
                                                    key={t}
                                                    className={`${styles.timeBtn} ${selectedTime === t ? styles.timeActive : ""}`}
                                                    onClick={() => setSelectedTime(t)}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Proceed to Checkout */}
                                    <button
                                        className={`button-retro ${styles.confirmBtn}`}
                                        onClick={handleProceedToCheckout}
                                        disabled={!selectedService || !selectedDate || !selectedTime}
                                        style={{
                                            opacity: (!selectedService || !selectedDate || !selectedTime) ? 0.5 : 1,
                                            cursor: (!selectedService || !selectedDate || !selectedTime) ? "not-allowed" : "pointer"
                                        }}
                                    >
                                        Proceed to Checkout &rarr;
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </>
    );
}
