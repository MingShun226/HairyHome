"use client";

import React, { useState } from "react";
import styles from "../../AdminDashboard.module.css";
import {
    Search,
    MapPin,
    Star,
    X,
    Calendar,
    Users,
    Shield,
    Award,
} from "lucide-react";

const INITIAL_PARTNERS = [
    { id: 1, name: "Happy Tails Hostel", location: "Kuala Lumpur", services: "Boarding, Daycare", rating: 4.8, bookings: 342, revenue: "RM 28,560", status: "Active", joined: "2023-06-15", owner: "Li Wei", goodReviews: 210 },
    { id: 2, name: "Bark Avenue", location: "Petaling Jaya", services: "Grooming", rating: 4.6, bookings: 218, revenue: "RM 15,260", status: "Active", joined: "2023-08-20", owner: "Nina Raj", goodReviews: 125 },
    { id: 3, name: "PawSpa Premium", location: "Shah Alam", services: "Grooming, Spa", rating: 4.9, bookings: 189, revenue: "RM 22,680", status: "Active", joined: "2023-05-10", owner: "David Chong", goodReviews: 168 },
    { id: 4, name: "Critter Care", location: "Subang Jaya", services: "Veterinary, Boarding", rating: 4.3, bookings: 156, revenue: "RM 18,720", status: "Active", joined: "2023-09-01", owner: "Dr. Farah", goodReviews: 72 },
    { id: 5, name: "Pet Paradise", location: "Bangsar", services: "Daycare, Dog Walking", rating: 4.7, bookings: 287, revenue: "RM 14,350", status: "Active", joined: "2023-07-12", owner: "Rajan Nair", goodReviews: 195 },
    { id: 6, name: "Whiskers & Wags", location: "Mont Kiara", services: "Grooming, Spa", rating: 4.1, bookings: 94, revenue: "RM 7,520", status: "Suspended", joined: "2023-10-05", owner: "Jenny Lim", goodReviews: 32 },
    { id: 7, name: "The Pet Lodge", location: "Damansara", services: "Boarding, Hostel", rating: 4.5, bookings: 203, revenue: "RM 24,360", status: "Active", joined: "2023-04-18", owner: "Mark Tan", goodReviews: 105 },
    { id: 8, name: "FurEver Home", location: "Cheras", services: "Daycare, Training", rating: 4.4, bookings: 167, revenue: "RM 10,020", status: "Active", joined: "2023-11-22", owner: "Siti Aminah", goodReviews: 48 },
];

function getBadgeLevel(goodReviews: number) {
    if (goodReviews >= 200) return { level: 3, label: "Gold Verified", color: "#F59E0B", bg: "#FFFBEB" };
    if (goodReviews >= 100) return { level: 2, label: "Silver Verified", color: "#6B7280", bg: "#F3F4F6" };
    if (goodReviews >= 50) return { level: 1, label: "Bronze Verified", color: "#B45309", bg: "#FFF7ED" };
    return null;
}

function BadgeDisplay({ goodReviews }: { goodReviews: number }) {
    const badge = getBadgeLevel(goodReviews);
    if (!badge) return null;
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem',
            fontWeight: 700, background: badge.bg, color: badge.color,
            border: `1px solid ${badge.color}30`,
        }}>
            <Shield size={12} /> Lvl {badge.level}
        </span>
    );
}

type Partner = typeof INITIAL_PARTNERS[number];

function getStatusClass(status: string) {
    switch (status) {
        case "Active": return styles.statusActive;
        case "Suspended": return styles.statusSuspended || styles.statusRejected;
        default: return "";
    }
}

export default function AllPartnersPage() {
    const [partners, setPartners] = useState(INITIAL_PARTNERS);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

    const filtered = partners.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const toggleStatus = (id: number) => {
        setPartners(prev => prev.map(p =>
            p.id === id ? { ...p, status: p.status === "Active" ? "Suspended" : "Active" } : p
        ));
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>All Partners</h1>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div className={styles.searchWrap} style={{ flex: '1', minWidth: '240px', maxWidth: '400px', marginBottom: 0 }}>
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search partners..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.filterTabs} style={{ marginBottom: 0 }}>
                    {["All", "Active", "Suspended"].map(f => (
                        <button
                            key={f}
                            onClick={() => setStatusFilter(f)}
                            className={`${styles.filterTab} ${statusFilter === f ? styles.filterTabActive : ''}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Business Name</th>
                            <th>Location</th>
                            <th>Services</th>
                            <th>Rating</th>
                            <th>Total Bookings</th>
                            <th>Revenue</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(partner => (
                            <tr key={partner.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                        <strong>{partner.name}</strong>
                                        <BadgeDisplay goodReviews={partner.goodReviews} />
                                    </div>
                                </td>
                                <td>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <MapPin size={14} color="var(--text-muted)" /> {partner.location}
                                    </span>
                                </td>
                                <td>{partner.services}</td>
                                <td>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                                        <Star size={14} fill="#FFD700" color="#FFD700" /> {partner.rating}
                                    </span>
                                </td>
                                <td>{partner.bookings}</td>
                                <td>{partner.revenue}</td>
                                <td>
                                    <span className={`${styles.status} ${getStatusClass(partner.status)}`}>
                                        {partner.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className={styles.actionBtn} onClick={() => setSelectedPartner(partner)}>
                                            View Details
                                        </button>
                                        <button
                                            className={styles.actionBtn}
                                            style={{
                                                background: partner.status === "Active" ? '#FFEBEE' : '#E8F5E9',
                                                color: partner.status === "Active" ? '#C62828' : '#2E7D32',
                                            }}
                                            onClick={() => toggleStatus(partner.id)}
                                        >
                                            {partner.status === "Active" ? "Suspend" : "Activate"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No partners found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedPartner && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>{selectedPartner.name}</h2>
                            <button className={styles.modalClose} onClick={() => setSelectedPartner(null)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.formSection}>
                            {getBadgeLevel(selectedPartner.goodReviews) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: getBadgeLevel(selectedPartner.goodReviews)!.bg, borderRadius: '12px', border: `1px solid ${getBadgeLevel(selectedPartner.goodReviews)!.color}25` }}>
                                    <Award size={20} color={getBadgeLevel(selectedPartner.goodReviews)!.color} />
                                    <div>
                                        <div style={{ fontWeight: 800, color: getBadgeLevel(selectedPartner.goodReviews)!.color }}>{getBadgeLevel(selectedPartner.goodReviews)!.label}</div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{selectedPartner.goodReviews} good reviews</div>
                                    </div>
                                </div>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Users size={18} color="var(--text-muted)" />
                                <div>
                                    <div className={styles.formLabel} style={{ marginBottom: 0 }}>Owner</div>
                                    <div style={{ fontWeight: 700 }}>{selectedPartner.owner}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MapPin size={18} color="var(--text-muted)" />
                                <div>
                                    <div className={styles.formLabel} style={{ marginBottom: 0 }}>Location</div>
                                    <div style={{ fontWeight: 700 }}>{selectedPartner.location}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Calendar size={18} color="var(--text-muted)" />
                                <div>
                                    <div className={styles.formLabel} style={{ marginBottom: 0 }}>Joined</div>
                                    <div style={{ fontWeight: 700 }}>{selectedPartner.joined}</div>
                                </div>
                            </div>
                            <div className={styles.formRow} style={{ marginTop: '8px' }}>
                                <div className={styles.statCard}>
                                    <span className={styles.statValue} style={{ fontSize: '1.5rem' }}>{selectedPartner.bookings}</span>
                                    <span className={styles.statLabel}>Total Bookings</span>
                                </div>
                                <div className={styles.statCard}>
                                    <span className={styles.statValue} style={{ fontSize: '1.5rem' }}>{selectedPartner.revenue}</span>
                                    <span className={styles.statLabel}>Revenue</span>
                                </div>
                                <div className={styles.statCard}>
                                    <span className={styles.statValue} style={{ fontSize: '1.5rem' }}>
                                        <Star size={18} fill="#FFD700" color="#FFD700" style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                        {selectedPartner.rating}
                                    </span>
                                    <span className={styles.statLabel}>Rating</span>
                                </div>
                                <div className={styles.statCard}>
                                    <span className={`${styles.status} ${getStatusClass(selectedPartner.status)}`}>{selectedPartner.status}</span>
                                    <span className={styles.statLabel} style={{ marginTop: '8px' }}>Status</span>
                                </div>
                            </div>
                            <div>
                                <div className={styles.formLabel}>Services</div>
                                <div style={{ fontWeight: 700 }}>{selectedPartner.services}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
