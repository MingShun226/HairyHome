"use client";

import React from "react";
import styles from "../AdminDashboard.module.css";
import {
    ShieldAlert,
    CheckCircle2,
    XCircle,
    Users,
    Calendar,
    DollarSign,
    MapPin,
    Star,
} from "lucide-react";

const PARTNER_APPLICATIONS = [
    { id: 1, name: "Pawsitive Vibes", owner: "John Doe", type: "Grooming & Spa", date: "2024-03-10", status: "Pending" },
    { id: 2, name: "Furry Friends Daycare", owner: "Aisha Rahman", type: "Daycare", date: "2024-03-09", status: "Pending" },
    { id: 3, name: "Elite Pet Clinic", owner: "Dr. Mike Tan", type: "Veterinary", date: "2024-03-08", status: "Pending" },
    { id: 4, name: "Bark & Board", owner: "Liam O'Brien", type: "Boarding", date: "2024-03-07", status: "Approved" },
    { id: 5, name: "Kitty Kingdom", owner: "Mei Ling", type: "Cat Cafe & Grooming", date: "2024-03-06", status: "Rejected" },
    { id: 6, name: "PetPals Walker", owner: "Carlos Reyes", type: "Dog Walking", date: "2024-03-05", status: "Pending" },
];

const ALL_PARTNERS = [
    { id: 1, name: "Happy Tails Hostel", location: "Kuala Lumpur", services: "Boarding, Daycare", rating: 4.8, bookings: 342, status: "Active" },
    { id: 2, name: "Bark Avenue", location: "Petaling Jaya", services: "Grooming", rating: 4.6, bookings: 218, status: "Active" },
    { id: 3, name: "PawSpa Premium", location: "Shah Alam", services: "Grooming, Spa", rating: 4.9, bookings: 189, status: "Active" },
    { id: 4, name: "Critter Care", location: "Subang Jaya", services: "Veterinary, Boarding", rating: 4.3, bookings: 156, status: "Active" },
    { id: 5, name: "Pet Paradise", location: "Bangsar", services: "Daycare, Dog Walking", rating: 4.7, bookings: 287, status: "Active" },
    { id: 6, name: "Whiskers & Wags", location: "Mont Kiara", services: "Grooming, Spa", rating: 4.1, bookings: 94, status: "Suspended" },
    { id: 7, name: "The Pet Lodge", location: "Damansara", services: "Boarding, Hostel", rating: 4.5, bookings: 203, status: "Active" },
    { id: 8, name: "FurEver Home", location: "Cheras", services: "Daycare, Training", rating: 4.4, bookings: 167, status: "Active" },
];

const ACTIVITY = [
    { id: 1, text: "Pawsitive Vibes submitted a new partner application", time: "2 hours ago" },
    { id: 2, text: "Happy Tails Hostel received a 5-star review from Alice Wong", time: "4 hours ago" },
    { id: 3, text: "Booking #1284 completed at Bark Avenue", time: "6 hours ago" },
    { id: 4, text: "Whiskers & Wags account suspended due to policy violation", time: "8 hours ago" },
    { id: 5, text: "PawSpa Premium updated their service pricing", time: "1 day ago" },
    { id: 6, text: "New partner Bark & Board approved and onboarded", time: "1 day ago" },
];

function getStatusClass(status: string) {
    switch (status) {
        case "Pending": return styles.statusPending;
        case "Approved": case "Active": return styles.statusActive;
        case "Rejected": case "Suspended": return styles.statusRejected;
        default: return "";
    }
}

export default function AdminDashboard() {
    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Admin Overview</h1>
                <div className={styles.userProfile}>
                    <span>Welcome, Admin</span>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#E1F5FE' }}>
                        <Users size={20} color="#1976D2" />
                    </div>
                    <span className={styles.statValue}>32</span>
                    <span className={styles.statLabel}>Total Partners</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#FFF9C4' }}>
                        <ShieldAlert size={20} color="#F57F17" />
                    </div>
                    <span className={styles.statValue}>4</span>
                    <span className={styles.statLabel}>Pending Approvals</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#E8F5E9' }}>
                        <Calendar size={20} color="#388E3C" />
                    </div>
                    <span className={styles.statValue}>1,847</span>
                    <span className={styles.statLabel}>Total Bookings</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#F3E5F5' }}>
                        <DollarSign size={20} color="#7B1FA2" />
                    </div>
                    <span className={styles.statValue}>RM 48,320</span>
                    <span className={styles.statLabel}>Platform Revenue</span>
                </div>
            </div>

            {/* Partner Applications */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>Partner Applications</h3>
                    <button className={styles.viewAll}>View All</button>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Business Name</th>
                            <th>Owner</th>
                            <th>Service Type</th>
                            <th>Date Applied</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PARTNER_APPLICATIONS.map((app) => (
                            <tr key={app.id}>
                                <td><strong>{app.name}</strong></td>
                                <td>{app.owner}</td>
                                <td>{app.type}</td>
                                <td>{app.date}</td>
                                <td>
                                    <span className={`${styles.status} ${getStatusClass(app.status)}`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td>
                                    {app.status === "Pending" ? (
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button className={styles.actionBtn} title="Approve">
                                                <CheckCircle2 size={18} />
                                            </button>
                                            <button className={styles.actionBtn} style={{ background: '#FFEBEE', color: '#b71c1c' }} title="Reject">
                                                <XCircle size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                            {app.status === "Approved" ? "Approved" : "Rejected"}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* All Partners */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>All Partners</h3>
                    <button className={styles.viewAll}>View All</button>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Business Name</th>
                            <th>Location</th>
                            <th>Services</th>
                            <th>Rating</th>
                            <th>Total Bookings</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ALL_PARTNERS.map((partner) => (
                            <tr key={partner.id}>
                                <td><strong>{partner.name}</strong></td>
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
                                <td>
                                    <span className={`${styles.status} ${getStatusClass(partner.status)}`}>
                                        {partner.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Activity Feed */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>Recent Activity</h3>
                </div>
                <div className={styles.activityFeed}>
                    {ACTIVITY.map(item => (
                        <div key={item.id} className={styles.activityItem}>
                            <div className={styles.activityDot} />
                            <div className={styles.activityContent}>
                                <p style={{ fontSize: '0.95rem', color: 'var(--foreground)', margin: 0, fontWeight: 500 }}>{item.text}</p>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
