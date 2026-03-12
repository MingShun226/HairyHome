"use client";

import { motion } from "framer-motion";
import styles from "./PetCollection.module.css";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Star, MapPin } from "lucide-react";

const FEATURED_SHOPS = [
    {
        slug: "pawsitive-vibes",
        nameKey: "collection_cat_spa",
        color: "#E1F5FE",
        img: "/cat_spa_treatment_1769602943984.png",
        location: "Cheras, KL",
        rating: 4.8,
        reviews: 156,
        services: ["Grooming", "Spa"]
    },
    {
        slug: "happy-tails-hostel",
        nameKey: "collection_dog_hotel",
        color: "#FFF9C4",
        img: "/dog_boarding_hotel_1769602977566.png",
        location: "Petaling Jaya, Selangor",
        rating: 4.6,
        reviews: 89,
        services: ["Hostel", "Daycare"]
    },
    {
        slug: "elite-grooming-studio",
        nameKey: "collection_grooming",
        color: "#FFCCBC",
        img: "/hero_dog_grooming_1769602911628.png",
        location: "Bangsar, KL",
        rating: 4.9,
        reviews: 203,
        services: ["Grooming", "Training"]
    }
];

export default function PetCollection() {
    const { t } = useLanguage();

    return (
        <section className={styles.wrapper} id="services">
            <div className="container">
                <div className={styles.grid}>
                    {FEATURED_SHOPS.map((shop, index) => (
                        <motion.div
                            key={shop.slug}
                            className="card-retro"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className={styles.imgWrapper} style={{ backgroundColor: shop.color }}>
                                <Image
                                    src={shop.img}
                                    alt={t(shop.nameKey)}
                                    fill
                                    className={styles.petImg}
                                />
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.petName}>{t(shop.nameKey)}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '6px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    <MapPin size={14} /> {shop.location}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '4px 0 10px', fontSize: '0.85rem' }}>
                                    <Star size={14} fill="#FFD700" color="#FFD700" />
                                    <strong>{shop.rating}</strong>
                                    <span style={{ color: 'var(--text-muted)' }}>({shop.reviews})</span>
                                </div>
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                                    {shop.services.map(s => (
                                        <span key={s} style={{
                                            padding: '3px 10px',
                                            background: 'var(--accent)',
                                            borderRadius: '50px',
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            color: 'var(--secondary)'
                                        }}>{s}</span>
                                    ))}
                                </div>
                                <Link href={`/services/${shop.slug}`} className={styles.more}>{t('view_details')} &rarr;</Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
