"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../AdminDashboard.module.css";
import {
    Star,
    MapPin,
    Heart,
    ArrowRight,
} from "lucide-react";

const INITIAL_FAVORITES = [
    { id: 1, slug: "pawfect-grooming-kl", name: "Pawfect Grooming Studio", type: "Grooming & Spa", location: "Kuala Lumpur", rating: 4.9, img: "/hero_dog_grooming_1769602911628.png" },
    { id: 2, slug: "cozy-paws-hostel-penang", name: "Cozy Paws Hostel", type: "Boarding & Hostel", location: "George Town", rating: 4.8, img: "/dog_boarding_hotel_1769602977566.png" },
    { id: 3, slug: "elite-groom-johor", name: "Elite Groom House", type: "Grooming & Training", location: "Johor Bahru", rating: 4.8, img: "/cat_spa_treatment_1769602943984.png" },
    { id: 4, slug: "dr-fur-clinic-johor", name: "Dr. Fur Pet Clinic", type: "Veterinary", location: "Johor Bahru", rating: 4.9, img: "/hero_dog_grooming_1769602911628.png" },
    { id: 5, slug: "whiskers-daycare-selangor", name: "Whiskers Pet Daycare", type: "Daycare & Training", location: "Petaling Jaya", rating: 4.7, img: "/dog_boarding_hotel_1769602977566.png" },
    { id: 6, slug: "groom-and-bloom-kl", name: "Groom & Bloom", type: "Grooming & Daycare", location: "Bukit Bintang", rating: 4.6, img: "/cat_spa_treatment_1769602943984.png" },
];

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState(INITIAL_FAVORITES);

    const removeFavorite = (id: number) => {
        setFavorites(prev => prev.filter(f => f.id !== id));
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>My Favorites</h1>
            </div>

            {favorites.length === 0 ? (
                <div className={styles.tableContainer}>
                    <div style={{ padding: '60px 30px', textAlign: 'center' }}>
                        <Heart size={48} color="var(--text-muted)" style={{ marginBottom: '16px', opacity: 0.3 }} />
                        <h3 style={{ color: 'var(--text-muted)', fontWeight: 700, margin: '0 0 8px' }}>No Favorites Yet</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Start exploring and save your favorite pet shops!</p>
                    </div>
                </div>
            ) : (
                <div className={styles.cardGrid}>
                    {favorites.map(shop => (
                        <div key={shop.id} className={styles.tableContainer} style={{ marginBottom: 0, overflow: 'hidden' }}>
                            <div style={{
                                height: '160px',
                                background: `linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3)), url(${shop.img}) center/cover no-repeat`,
                                position: 'relative',
                            }}>
                                <button
                                    onClick={() => removeFavorite(shop.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        background: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '36px',
                                        height: '36px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                    }}
                                    title="Remove from favorites"
                                >
                                    <Heart size={18} fill="#C62828" color="#C62828" />
                                </button>
                            </div>
                            <div className={styles.formSection}>
                                <div>
                                    <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', fontWeight: 700 }}>{shop.name}</h3>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{shop.type}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                        <MapPin size={14} /> {shop.location}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.88rem' }}>
                                        <Star size={14} fill="#FFD700" color="#FFD700" /> {shop.rating}
                                    </span>
                                </div>
                                <Link
                                    href={`/services/${shop.slug}`}
                                    className={styles.whiteBtn}
                                    style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
                                >
                                    <ArrowRight size={14} /> View Shop
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
