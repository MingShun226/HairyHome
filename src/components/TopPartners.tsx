"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Shield, MapPin } from "lucide-react";
import styles from "./TopPartners.module.css";

const TOP_PARTNERS = [
    {
        slug: "dr-fur-clinic-johor",
        name: "Dr. Fur Pet Clinic",
        area: "Johor",
        rating: 4.9,
        reviewCount: 412,
        priceRange: "RM 60 - RM 300",
        badge: { level: 3, label: "Gold Verified", color: "#F59E0B", bg: "#FFFBEB" },
        image: "/dog_boarding_hotel_1769602977566.png",
        services: ["Clinic"],
        description: "Full-service veterinary clinic with emergency care, vaccinations, and dental treatments.",
    },
    {
        slug: "pawfect-grooming-kl",
        name: "Pawfect Grooming Studio",
        area: "Kuala Lumpur",
        rating: 4.9,
        reviewCount: 324,
        priceRange: "RM 45 - RM 180",
        badge: { level: 3, label: "Gold Verified", color: "#F59E0B", bg: "#FFFBEB" },
        image: "/hero_dog_grooming_1769602911628.png",
        services: ["Grooming"],
        description: "Premium grooming services with certified professionals. Specializing in breed-specific cuts and spa treatments.",
    },
    {
        slug: "cozy-paws-hostel-penang",
        name: "Cozy Paws Hostel",
        area: "Penang",
        rating: 4.8,
        reviewCount: 256,
        priceRange: "RM 50 - RM 150/night",
        badge: { level: 2, label: "Silver Verified", color: "#6B7280", bg: "#F3F4F6" },
        image: "/service_boarding_room_1769607486073.png",
        services: ["Hostel"],
        description: "Air-conditioned boarding suites with 24/7 CCTV monitoring. Daily photo updates for peace of mind.",
    },
];

export default function TopPartners() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className="section-header">
                    <span className="badge-round">
                        <Shield size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        Top Verified Partners
                    </span>
                    <h2 className="title-lg" style={{ marginTop: '16px' }}>
                        Trusted by Thousands of Pet Owners
                    </h2>
                    <p>Our highest-rated partners, verified through real customer reviews.</p>
                </div>

                <div className={styles.grid}>
                    {TOP_PARTNERS.map((partner, i) => (
                        <motion.div
                            key={partner.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 }}
                        >
                            <Link href={`/services/${partner.slug}`} className={styles.cardLink}>
                                <div className={styles.card}>
                                    <div className={styles.imageWrap}>
                                        <Image
                                            src={partner.image}
                                            alt={partner.name}
                                            fill
                                            className={styles.image}
                                        />
                                        <span
                                            className={styles.badgeTag}
                                            style={{
                                                background: partner.badge.bg,
                                                color: partner.badge.color,
                                                border: `1px solid ${partner.badge.color}30`,
                                            }}
                                        >
                                            <Shield size={12} /> Lvl {partner.badge.level}
                                        </span>
                                    </div>
                                    <div className={styles.body}>
                                        <div className={styles.tags}>
                                            {partner.services.map(s => (
                                                <span key={s} className={styles.serviceTag}>{s}</span>
                                            ))}
                                        </div>
                                        <h3 className={styles.name}>{partner.name}</h3>
                                        <p className={styles.description}>{partner.description}</p>
                                        <div className={styles.meta}>
                                            <span className={styles.location}>
                                                <MapPin size={14} /> {partner.area}
                                            </span>
                                            <span className={styles.rating}>
                                                <Star size={14} fill="#FFD700" color="#FFD700" />
                                                {partner.rating}
                                                <span className={styles.reviewCount}>({partner.reviewCount})</span>
                                            </span>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <span className={styles.priceRange}>{partner.priceRange}</span>
                                            <span className={styles.verifiedLabel} style={{ color: partner.badge.color }}>
                                                <Shield size={12} /> {partner.badge.label}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Link href="/services" className="button-retro">
                        View All Partners &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}
