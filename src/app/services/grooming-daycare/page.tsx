"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Scissors, Sun, Clock, Shield, Heart, Star, MapPin, ArrowRight, CheckCircle2, Sparkles, Baby } from "lucide-react";
import styles from "../Services.module.css";

const GROOMING_SERVICES = [
    { name: "Basic Bath & Blowdry", price: "RM 45", duration: "45 min", description: "Gentle shampoo, conditioning, blow dry, and brush out" },
    { name: "Full Grooming Package", price: "RM 95", duration: "90 min", description: "Bath, haircut, nail trim, ear cleaning, and styling" },
    { name: "De-shedding Treatment", price: "RM 120", duration: "75 min", description: "Deep deshedding with specialized tools and conditioner" },
    { name: "Premium Show Cut", price: "RM 180", duration: "120 min", description: "Breed-specific show-quality styling with premium products" },
    { name: "Spa & Aromatherapy", price: "RM 150", duration: "90 min", description: "Relaxing spa bath with essential oils and paw massage" },
    { name: "Puppy First Groom", price: "RM 55", duration: "45 min", description: "Gentle introduction to grooming for puppies under 6 months" },
];

const DAYCARE_SERVICES = [
    { name: "Half Day Care", price: "RM 35", duration: "5 hours", description: "Morning or afternoon session with supervised play" },
    { name: "Full Day Care", price: "RM 60", duration: "10 hours", description: "Full day of activities, play, rest, and enrichment" },
    { name: "Puppy Socialisation", price: "RM 45", duration: "3 hours", description: "Structured group play for puppies to develop social skills" },
    { name: "Adventure Day Out", price: "RM 80", duration: "6 hours", description: "Outdoor activities including walks, splash pool, and agility" },
    { name: "Weekly Pass (5 days)", price: "RM 250", duration: "5 days", description: "Full day care for the entire work week at a discounted rate" },
    { name: "Monthly Package", price: "RM 850", duration: "20 days", description: "Best value for regular daycare needs" },
];

const GROOMING_FEATURES = [
    { icon: Scissors, title: "Certified Groomers", desc: "All our groomers are professionally certified with breed-specific expertise" },
    { icon: Shield, title: "Hypoallergenic Products", desc: "We use only premium, vet-approved shampoos and conditioners" },
    { icon: Heart, title: "Gentle Handling", desc: "Stress-free grooming with patience and care for anxious pets" },
    { icon: Sparkles, title: "Clean & Sanitized", desc: "Equipment sterilized between each session for your pet's safety" },
];

const DAYCARE_FEATURES = [
    { icon: Sun, title: "Indoor & Outdoor Play", desc: "Spacious play areas with sensory enrichment and agility equipment" },
    { icon: Baby, title: "Size-Based Groups", desc: "Pets are grouped by size and temperament for safe interactions" },
    { icon: Clock, title: "Real-Time Updates", desc: "Get photos and videos of your pet throughout the day" },
    { icon: CheckCircle2, title: "Trained Supervisors", desc: "Professional pet handlers monitor all activities at all times" },
];

const FEATURED_SHOPS = [
    { name: "Pawfect Grooming Studio", slug: "pawfect-grooming-kl", type: "Grooming", location: "Kuala Lumpur", rating: 4.9, img: "/hero_dog_grooming_1769602911628.png" },
    { name: "Groom & Bloom", slug: "groom-and-bloom-kl", type: "Grooming & Daycare", location: "Bukit Bintang", rating: 4.6, img: "/services_hero_grooming_1769607223313.png" },
    { name: "Whiskers Pet Daycare", slug: "whiskers-daycare-selangor", type: "Daycare", location: "Petaling Jaya", rating: 4.7, img: "/cat_spa_treatment_1769602943984.png" },
    { name: "Elite Groom House", slug: "elite-groom-johor", type: "Grooming & Training", location: "Johor Bahru", rating: 4.8, img: "/services_hero_grooming_1769607223313.png" },
];

export default function GroomingDaycarePage() {
    return (
        <>
            <Navbar />
            <main style={{ background: 'var(--background)' }}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroImgWrapper}>
                        <Image
                            src="/hero_dog_grooming_1769602911628.png"
                            alt="Pet Grooming & Daycare"
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                        <div className={styles.heroOverlay} />
                    </div>
                    <div className={styles.heroContent}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
                                Pet Grooming & Daycare
                            </h1>
                            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
                                Professional grooming services and fun-filled daycare to keep your pets happy, healthy, and looking their best.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <div className="container" style={{ padding: '60px 20px 100px' }}>
                    {/* Grooming Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <span className="badge-round">Grooming Services</span>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '16px' }}>
                                Professional Pet Grooming
                            </h2>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0', fontSize: '1rem' }}>
                                From basic baths to show-quality styling, our certified groomers treat every pet with love and expertise.
                            </p>
                        </div>

                        {/* Grooming Features */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                            {GROOMING_FEATURES.map((f, i) => (
                                <div key={i} className="card-retro" style={{ padding: '24px', textAlign: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#E8EEF7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                                        <f.icon size={22} color="#3D5A99" />
                                    </div>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px', color: 'var(--foreground)' }}>{f.title}</h4>
                                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Grooming Price Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '80px' }}>
                            {GROOMING_SERVICES.map((s, i) => (
                                <motion.div
                                    key={s.name}
                                    className="card-retro"
                                    style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>{s.name}</h4>
                                        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--secondary)', whiteSpace: 'nowrap' }}>{s.price}</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{s.description}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                        <Clock size={14} color="var(--primary)" />
                                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>{s.duration}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Daycare Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <span className="badge-round">Daycare Services</span>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '16px' }}>
                                Fun & Safe Pet Daycare
                            </h2>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0', fontSize: '1rem' }}>
                                A cage-free, supervised environment where your pet can play, socialize, and stay active all day.
                            </p>
                        </div>

                        {/* Daycare Features */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                            {DAYCARE_FEATURES.map((f, i) => (
                                <div key={i} className="card-retro" style={{ padding: '24px', textAlign: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FDF0EC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                                        <f.icon size={22} color="#D4917F" />
                                    </div>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px', color: 'var(--foreground)' }}>{f.title}</h4>
                                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Daycare Price Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '80px' }}>
                            {DAYCARE_SERVICES.map((s, i) => (
                                <motion.div
                                    key={s.name}
                                    className="card-retro"
                                    style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>{s.name}</h4>
                                        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--secondary)', whiteSpace: 'nowrap' }}>{s.price}</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{s.description}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                        <Clock size={14} color="var(--primary)" />
                                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>{s.duration}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Featured Shops */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--foreground)' }}>
                                Featured Grooming & Daycare Partners
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                Book with our top-rated service providers
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                            {FEATURED_SHOPS.map(shop => (
                                <Link key={shop.slug} href={`/services/${shop.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="card-retro" style={{ overflow: 'hidden' }}>
                                        <div style={{ height: '150px', position: 'relative' }}>
                                            <Image src={shop.img} alt={shop.name} fill style={{ objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ padding: '20px' }}>
                                            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px', color: 'var(--foreground)' }}>{shop.name}</h4>
                                            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--secondary)', background: '#E8EEF7', padding: '3px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>
                                                {shop.type}
                                            </span>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                                                    <MapPin size={14} /> {shop.location}
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '0.85rem' }}>
                                                    <Star size={14} fill="#FFD700" color="#FFD700" /> {shop.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '40px' }}>
                            <Link href="/services" className="button-retro" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Browse All Services <ArrowRight size={18} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
