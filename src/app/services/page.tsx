"use client";

import { motion } from "framer-motion";
import styles from "./Services.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import { MapPin, Star, Search, ChevronDown, BadgeCheck } from "lucide-react";

function getShopBadge(reviewCount: number) {
    if (reviewCount >= 300) return { level: 3, label: "Lvl 3", tickColor: "#8B5CF6" };
    if (reviewCount >= 200) return { level: 2, label: "Lvl 2", tickColor: "#F97316" };
    if (reviewCount >= 100) return { level: 1, label: "Lvl 1", tickColor: "#1D9BF0" };
    return null;
}

const SERVICE_TYPES = ["All", "Grooming", "Daycare", "Hostel", "Clinic", "Training", "Walking", "Transport"] as const;

const AREAS = ["All Areas", "KL", "Selangor", "Johor", "Penang", "Perak", "Negeri Sembilan", "Melaka"];

interface Shop {
    slug: string;
    name: string;
    area: string;
    services: string[];
    rating: number;
    reviewCount: number;
    priceRange: string;
    image: string;
    description: string;
}

const SHOPS: Shop[] = [
    {
        slug: "pawfect-grooming-kl",
        name: "Pawfect Grooming Studio",
        area: "KL",
        services: ["Grooming"],
        rating: 4.9,
        reviewCount: 324,
        priceRange: "RM 45 - RM 180",
        image: "/hero_dog_grooming_1769602911628.png",
        description: "Premium grooming services with certified professionals. Specializing in breed-specific cuts and spa treatments."
    },
    {
        slug: "whiskers-daycare-selangor",
        name: "Whiskers Pet Daycare",
        area: "Selangor",
        services: ["Daycare", "Training"],
        rating: 4.7,
        reviewCount: 198,
        priceRange: "RM 35 - RM 90",
        image: "/cat_spa_treatment_1769602943984.png",
        description: "Cage-free daycare with indoor and outdoor play zones. Supervised socialization and enrichment activities."
    },
    {
        slug: "cozy-paws-hostel-penang",
        name: "Cozy Paws Hostel",
        area: "Penang",
        services: ["Hostel"],
        rating: 4.8,
        reviewCount: 256,
        priceRange: "RM 50 - RM 150/night",
        image: "/service_boarding_room_1769607486073.png",
        description: "Air-conditioned boarding suites with 24/7 CCTV monitoring. Daily photo updates for peace of mind."
    },
    {
        slug: "dr-fur-clinic-johor",
        name: "Dr. Fur Pet Clinic",
        area: "Johor",
        services: ["Clinic"],
        rating: 4.9,
        reviewCount: 412,
        priceRange: "RM 60 - RM 300",
        image: "/dog_boarding_hotel_1769602977566.png",
        description: "Full-service veterinary clinic with emergency care, vaccinations, and dental treatments."
    },
    {
        slug: "groom-and-bloom-kl",
        name: "Groom & Bloom",
        area: "KL",
        services: ["Grooming", "Daycare"],
        rating: 4.6,
        reviewCount: 145,
        priceRange: "RM 40 - RM 160",
        image: "/services_hero_grooming_1769607223313.png",
        description: "Boutique grooming salon with organic shampoo options and relaxing spa packages for dogs and cats."
    },
    {
        slug: "happy-tails-training-selangor",
        name: "Happy Tails Academy",
        area: "Selangor",
        services: ["Training"],
        rating: 4.8,
        reviewCount: 189,
        priceRange: "RM 80 - RM 350",
        image: "/grooming_tools_flatlay_1769603003880.png",
        description: "Professional pet training with certified trainers. Puppy classes, obedience training, and behavior modification."
    },
    {
        slug: "furry-haven-hostel-perak",
        name: "Furry Haven Retreat",
        area: "Perak",
        services: ["Hostel", "Grooming"],
        rating: 4.5,
        reviewCount: 97,
        priceRange: "RM 40 - RM 120/night",
        image: "/cat_spa_treatment_1769602943984.png",
        description: "Countryside pet retreat with spacious play yards. Includes grooming add-ons and personalized meal plans."
    },
    {
        slug: "petville-clinic-penang",
        name: "PetVille Medical Centre",
        area: "Penang",
        services: ["Clinic", "Grooming"],
        rating: 4.7,
        reviewCount: 276,
        priceRange: "RM 55 - RM 280",
        image: "/hero_dog_grooming_1769602911628.png",
        description: "Modern veterinary centre with in-house lab, surgery suite, and post-op grooming services."
    },
    {
        slug: "pawradise-daycare-melaka",
        name: "Pawradise Daycare & Play",
        area: "Melaka",
        services: ["Daycare", "Hostel"],
        rating: 4.6,
        reviewCount: 134,
        priceRange: "RM 30 - RM 100",
        image: "/service_boarding_room_1769607486073.png",
        description: "Fun-filled daycare with splash pools, agility courses, and overnight boarding packages."
    },
    {
        slug: "elite-groom-johor",
        name: "Elite Groom House",
        area: "Johor",
        services: ["Grooming", "Training"],
        rating: 4.8,
        reviewCount: 221,
        priceRange: "RM 50 - RM 200",
        image: "/services_hero_grooming_1769607223313.png",
        description: "Award-winning grooming salon with show-quality styling and basic obedience training classes."
    },
    {
        slug: "walkiepaws-walking-kl",
        name: "WalkiePaws Dog Walking",
        area: "KL",
        services: ["Walking"],
        rating: 4.7,
        reviewCount: 163,
        priceRange: "RM 25 - RM 60",
        image: "/hero_dog_grooming_1769602911628.png",
        description: "Professional dog walking services with GPS tracking. Solo & group walks available in KL."
    },
    {
        slug: "petride-transport-selangor",
        name: "PetRide Transport",
        area: "Selangor",
        services: ["Transport"],
        rating: 4.5,
        reviewCount: 89,
        priceRange: "RM 20 - RM 80",
        image: "/dog_boarding_hotel_1769602977566.png",
        description: "Safe, air-conditioned pet transportation. Airport pickups, vet trips, and inter-city transfers."
    },
    {
        slug: "happy-paws-walking-selangor",
        name: "Happy Paws Walking Co.",
        area: "Selangor",
        services: ["Walking", "Daycare"],
        rating: 4.6,
        reviewCount: 112,
        priceRange: "RM 30 - RM 55",
        image: "/grooming_tools_flatlay_1769603003880.png",
        description: "Daily dog walking and adventure hikes. Professional handlers with pet first-aid certification."
    }
];

function ServicesContent() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();

    const initialArea = searchParams.get("area") || "All Areas";
    const initialService = searchParams.get("service") || "All";

    const [selectedArea, setSelectedArea] = useState(
        AREAS.includes(initialArea) ? initialArea : "All Areas"
    );
    const [selectedService, setSelectedService] = useState<string>(
        SERVICE_TYPES.includes(initialService as typeof SERVICE_TYPES[number]) ? initialService : "All"
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [areaOpen, setAreaOpen] = useState(false);

    const filteredShops = useMemo(() => {
        return SHOPS.filter(shop => {
            const matchArea = selectedArea === "All Areas" || shop.area === selectedArea;
            const matchService = selectedService === "All" || shop.services.includes(selectedService);
            const matchSearch = !searchQuery || shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || shop.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchArea && matchService && matchSearch;
        });
    }, [selectedArea, selectedService, searchQuery]);

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const }
        })
    };

    return (
        <main className={styles.main}>
            <Navbar />

            {/* Hero Banner */}
            <section className={styles.hero}>
                <div className={styles.heroImgWrapper}>
                    <Image
                        src="/services_hero_grooming_1769607223313.png"
                        alt="Browse Services"
                        fill
                        className={styles.heroImg}
                        priority
                    />
                    <div className={styles.overlay} />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.heroContent}
                >
                    <span className="badge-round" style={{ background: '#FFCE1A' }}>
                        {t('services_badge') || 'BROWSE PARTNERS'}
                    </span>
                    <h1 className="title-lg" style={{ color: 'white' }}>
                        Find Trusted Pet Services Near You
                    </h1>
                    <p className={styles.heroSubtext}>
                        Search and compare verified pet service providers across Malaysia
                    </p>
                </motion.div>
            </section>

            {/* Breadcrumb */}
            <div className="container" style={{ paddingTop: '20px' }}>
                <div className="breadcrumb">
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <span>Browse Services</span>
                </div>
            </div>

            {/* Grooming & Daycare CTA */}
            <div className="container" style={{ paddingTop: '16px' }}>
                <Link
                    href="/services/grooming-daycare"
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '16px 24px', borderRadius: '14px',
                        background: 'linear-gradient(135deg, #E8EEF7 0%, #FDF0EC 100%)',
                        border: '1.5px solid rgba(61, 90, 153, 0.12)',
                        textDecoration: 'none', color: 'var(--foreground)',
                        transition: 'all 0.2s', fontWeight: 600, fontSize: '0.92rem',
                    }}
                >
                    <span>Looking for <strong style={{ color: 'var(--secondary)' }}>Pet Grooming & Daycare</strong> services? Check out our dedicated page &rarr;</span>
                    <ChevronDown size={18} style={{ transform: 'rotate(-90deg)', color: 'var(--secondary)', flexShrink: 0 }} />
                </Link>
            </div>

            {/* Filter Section */}
            <section className={styles.filterSection}>
                <div className={styles.filterBar}>
                    {/* Search Input */}
                    <div className={styles.searchInputWrap}>
                        <Search size={18} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search shops..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    {/* Area Dropdown */}
                    <div className={styles.areaDropdown}>
                        <button
                            className={styles.areaBtn}
                            onClick={() => setAreaOpen(!areaOpen)}
                        >
                            <MapPin size={16} />
                            <span>{selectedArea === "All Areas" ? "All Areas" : selectedArea}</span>
                            <ChevronDown size={16} className={areaOpen ? styles.chevronFlip : ""} />
                        </button>
                        {areaOpen && (
                            <div className={styles.areaMenu}>
                                {AREAS.map(area => (
                                    <button
                                        key={area}
                                        className={`${styles.areaItem} ${selectedArea === area ? styles.areaActive : ""}`}
                                        onClick={() => { setSelectedArea(area); setAreaOpen(false); }}
                                    >
                                        {area === "KL" ? "Kuala Lumpur" : area}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Service Type Tabs */}
                <div className={styles.serviceTabs}>
                    {SERVICE_TYPES.map(type => (
                        <button
                            key={type}
                            className={`${styles.serviceTab} ${selectedService === type ? styles.serviceTabActive : ""}`}
                            onClick={() => setSelectedService(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Results Count */}
                <div className={styles.resultsInfo}>
                    <p>{filteredShops.length} {filteredShops.length === 1 ? "partner" : "partners"} found</p>
                </div>
            </section>

            {/* Shop Cards Grid */}
            <section className={styles.gridSection}>
                {filteredShops.length === 0 ? (
                    <motion.div
                        className={styles.emptyState}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h3>No partners found</h3>
                        <p>Try adjusting your filters or search query</p>
                    </motion.div>
                ) : (
                    <div className={styles.shopGrid}>
                        {filteredShops.map((shop, i) => (
                            <motion.div
                                key={shop.slug}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                <Link href={`/services/${shop.slug}`} className={styles.shopCardLink}>
                                    <div className={`card-retro ${styles.shopCard}`}>
                                        <div className={styles.cardImageWrap}>
                                            <Image
                                                src={shop.image}
                                                alt={shop.name}
                                                fill
                                                className={styles.cardImage}
                                            />
                                            <div className={styles.cardRating}>
                                                <Star size={14} fill="#FFCE1A" stroke="#FFCE1A" />
                                                <span>{shop.rating}</span>
                                            </div>
                                        </div>
                                        <div className={styles.cardBody}>
                                            <h3 className={styles.cardTitle}>
                                                {shop.name}
                                                {getShopBadge(shop.reviewCount) && (
                                                    <>
                                                        <BadgeCheck
                                                            size={17}
                                                            fill={getShopBadge(shop.reviewCount)!.tickColor}
                                                            color="white"
                                                            style={{ marginLeft: '5px', flexShrink: 0 }}
                                                        />
                                                        <span className={styles.levelLabel} style={{ color: getShopBadge(shop.reviewCount)!.tickColor }}>
                                                            {getShopBadge(shop.reviewCount)!.label}
                                                        </span>
                                                    </>
                                                )}
                                            </h3>
                                            <div className={styles.cardLocation}>
                                                <MapPin size={14} />
                                                <span>{shop.area === "KL" ? "Kuala Lumpur" : shop.area}</span>
                                            </div>
                                            <p className={styles.cardDesc}>{shop.description}</p>
                                            <div className={styles.cardTags}>
                                                {shop.services.map(s => (
                                                    <span key={s} className={styles.tag}>{s}</span>
                                                ))}
                                            </div>
                                            <div className={styles.cardFooter}>
                                                <span className={styles.cardPrice}>{shop.priceRange}</span>
                                                <span className={styles.cardReviews}>{shop.reviewCount} reviews</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* CTA Banner */}
            <section className={styles.ctaBanner}>
                <div className="container">
                    <motion.div
                        className={styles.ctaCard}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Want to list your pet business?</h2>
                        <p>Join GroomShine as a verified partner and reach thousands of pet owners.</p>
                        <Link href="/contact" className="button-retro">
                            Become a Partner &rarr;
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default function ServicesPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--background)' }} />}>
            <ServicesContent />
        </Suspense>
    );
}
