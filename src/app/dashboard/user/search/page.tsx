"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../AdminDashboard.module.css";
import {
    Search,
    MapPin,
    Star,
    ArrowRight,
} from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";

const ALL_SHOPS = [
    { id: 1, slug: "pawfect-grooming-kl", name: "Pawfect Grooming Studio", type: "Grooming & Spa", location: "Kuala Lumpur", area: "Kuala Lumpur", rating: 4.9, img: "/hero_dog_grooming_1769602911628.png", description: "Premium grooming services with certified professionals" },
    { id: 2, slug: "whiskers-daycare-selangor", name: "Whiskers Pet Daycare", type: "Daycare & Training", location: "Petaling Jaya", area: "Selangor", rating: 4.7, img: "/cat_spa_treatment_1769602943984.png", description: "Cage-free daycare with play zones and enrichment activities" },
    { id: 3, slug: "cozy-paws-hostel-penang", name: "Cozy Paws Hostel", type: "Boarding & Hostel", location: "George Town", area: "Penang", rating: 4.8, img: "/service_boarding_room_1769607486073.png", description: "Air-conditioned boarding suites with 24/7 CCTV monitoring" },
    { id: 4, slug: "dr-fur-clinic-johor", name: "Dr. Fur Pet Clinic", type: "Veterinary", location: "Johor Bahru", area: "Johor", rating: 4.9, img: "/dog_boarding_hotel_1769602977566.png", description: "Full-service veterinary clinic with emergency care" },
    { id: 5, slug: "groom-and-bloom-kl", name: "Groom & Bloom", type: "Grooming & Daycare", location: "Bukit Bintang", area: "Kuala Lumpur", rating: 4.6, img: "/services_hero_grooming_1769607223313.png", description: "Boutique grooming salon with organic products" },
    { id: 6, slug: "happy-tails-training-selangor", name: "Happy Tails Academy", type: "Training", location: "Kota Damansara", area: "Selangor", rating: 4.8, img: "/grooming_tools_flatlay_1769603003880.png", description: "Professional pet training with certified trainers" },
    { id: 7, slug: "furry-haven-hostel-perak", name: "Furry Haven Retreat", type: "Boarding & Grooming", location: "Ipoh", area: "Perak", rating: 4.5, img: "/cat_spa_treatment_1769602943984.png", description: "Countryside pet retreat with spacious play yards" },
    { id: 8, slug: "petville-clinic-penang", name: "PetVille Medical Centre", type: "Veterinary & Grooming", location: "George Town", area: "Penang", rating: 4.7, img: "/hero_dog_grooming_1769602911628.png", description: "Modern veterinary centre with in-house lab" },
    { id: 9, slug: "pawradise-daycare-melaka", name: "Pawradise Daycare & Play", type: "Daycare & Boarding", location: "Melaka", area: "Melaka", rating: 4.6, img: "/service_boarding_room_1769607486073.png", description: "Fun-filled daycare with splash pools and agility courses" },
    { id: 10, slug: "elite-groom-johor", name: "Elite Groom House", type: "Grooming & Training", location: "Johor Bahru", area: "Johor", rating: 4.8, img: "/services_hero_grooming_1769607223313.png", description: "Award-winning grooming with show-quality styling" },
];

const AREAS = ["All Areas", "Kuala Lumpur", "Selangor", "Johor", "Penang", "Perak", "Melaka"];
const TYPES = ["All Services", "Grooming", "Spa", "Boarding", "Daycare", "Veterinary", "Training"];

export default function SearchServicesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedArea, setSelectedArea] = useState("All Areas");
    const [selectedType, setSelectedType] = useState("All Services");

    const filtered = ALL_SHOPS.filter(shop => {
        const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shop.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesArea = selectedArea === "All Areas" || shop.area === selectedArea;
        const matchesType = selectedType === "All Services" || shop.type.toLowerCase().includes(selectedType.toLowerCase());
        return matchesSearch && matchesArea && matchesType;
    });

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Find Services</h1>
            </div>

            {/* Search Bar */}
            <div className={styles.tableContainer} style={{ marginBottom: '30px' }}>
                <div style={{ padding: '24px 30px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className={styles.searchWrap} style={{ flex: '2', minWidth: '200px', marginBottom: 0 }}>
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search shops or services..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <div style={{ flex: '1', minWidth: '150px' }}>
                        <CustomDropdown
                            options={AREAS}
                            value={selectedArea}
                            onChange={setSelectedArea}
                            placeholder="All Areas"
                        />
                    </div>
                    <div style={{ flex: '1', minWidth: '150px' }}>
                        <CustomDropdown
                            options={TYPES}
                            value={selectedType}
                            onChange={setSelectedType}
                            placeholder="All Services"
                        />
                    </div>
                </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '20px' }}>
                Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </p>

            {/* Results Grid */}
            {filtered.length === 0 ? (
                <div className={styles.tableContainer}>
                    <div style={{ padding: '60px 30px', textAlign: 'center' }}>
                        <Search size={48} color="var(--text-muted)" style={{ marginBottom: '16px', opacity: 0.3 }} />
                        <h3 style={{ color: 'var(--text-muted)', fontWeight: 600, margin: '0 0 8px' }}>No Results Found</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Try adjusting your search or filters.</p>
                    </div>
                </div>
            ) : (
                <div className={styles.cardGrid}>
                    {filtered.map(shop => (
                        <div key={shop.id} className={styles.tableContainer} style={{ marginBottom: 0, overflow: 'hidden' }}>
                            <div style={{
                                height: '150px',
                                background: `linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3)), url(${shop.img}) center/cover no-repeat`,
                            }} />
                            <div className={styles.formSection}>
                                <div>
                                    <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', fontWeight: 700 }}>{shop.name}</h3>
                                    <span className={`${styles.status} ${styles.statusActive}`} style={{ display: 'inline-block' }}>{shop.type}</span>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{shop.description}</p>
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
                                    <ArrowRight size={14} /> View & Book
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
