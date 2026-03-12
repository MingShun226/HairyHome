"use client";

import React, { useState } from "react";
import styles from "../AdminDashboard.module.css";
import {
    Calendar,
    Clock,
    Star,
    Store,
    Users,
    DollarSign,
    MapPin,
    ShieldCheck,
    PawPrint,
} from "lucide-react";

const INITIAL_SERVICES = [
    { id: 1, name: "Full Grooming", description: "Bath, haircut, nail trim & styling", price: "RM 85", active: true },
    { id: 2, name: "Basic Bath & Dry", description: "Shampoo, conditioner & blow dry", price: "RM 45", active: true },
    { id: 3, name: "Pet Daycare", description: "Full day supervised play & care", price: "RM 55/day", active: true },
    { id: 4, name: "Overnight Hostel", description: "Overnight boarding with meals", price: "RM 80/night", active: true },
    { id: 5, name: "Nail Trimming", description: "Quick nail clip & filing", price: "RM 20", active: false },
    { id: 6, name: "De-shedding Treatment", description: "Deep coat treatment for shedding", price: "RM 65", active: true },
];

const UPCOMING_BOOKINGS = [
    { id: 1, customer: "Alice Wong", pet: "Dog (Golden Retriever)", service: "Full Grooming", date: "2024-03-15", time: "10:00 AM", status: "Confirmed" },
    { id: 2, customer: "Bob Chen", pet: "Cat (British Shorthair)", service: "Basic Bath & Dry", date: "2024-03-15", time: "11:30 AM", status: "Confirmed" },
    { id: 3, customer: "Nurul Aisha", pet: "Dog (Poodle)", service: "De-shedding Treatment", date: "2024-03-15", time: "02:00 PM", status: "Pending" },
    { id: 4, customer: "Raj Kumar", pet: "Cat (Persian)", service: "Full Grooming", date: "2024-03-16", time: "09:00 AM", status: "Confirmed" },
    { id: 5, customer: "Charlie Davis", pet: "Dog (Shih Tzu)", service: "Pet Daycare", date: "2024-03-16", time: "08:00 AM", status: "Pending" },
    { id: 6, customer: "Michelle Tan", pet: "Rabbit", service: "Nail Trimming", date: "2024-03-14", time: "03:00 PM", status: "Completed" },
];

function getBookingStatusClass(status: string) {
    switch (status) {
        case "Confirmed": return styles.statusConfirmed;
        case "Pending": return styles.statusPending;
        case "Completed": return styles.statusCompleted;
        default: return "";
    }
}

export default function B2BDashboard() {
    const [services, setServices] = useState(INITIAL_SERVICES);

    const toggleService = (id: number) => {
        setServices(prev =>
            prev.map(s => s.id === id ? { ...s, active: !s.active } : s)
        );
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Partner Dashboard</h1>
            </div>

            {/* Shop Profile Card */}
            <div className={styles.shopProfile}>
                <div className={styles.shopAvatar}>
                    <Store size={32} color="var(--secondary)" />
                </div>
                <div className={styles.shopInfo} style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <h3 style={{ margin: 0 }}>Pawsitive Vibes</h3>
                        <span className={styles.verifiedBadge}>
                            <ShieldCheck size={12} /> Verified Partner
                        </span>
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Premium Grooming & Spa</p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                            <Star size={14} fill="#FFD700" color="#FFD700" /> 4.8 Rating
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                            <MapPin size={14} /> Petaling Jaya, Selangor
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#E1F5FE' }}>
                        <Calendar size={20} color="#1976D2" />
                    </div>
                    <span className={styles.statValue}>12</span>
                    <span className={styles.statLabel}>Today&apos;s Bookings</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#E8F5E9' }}>
                        <DollarSign size={20} color="#388E3C" />
                    </div>
                    <span className={styles.statValue}>RM 8,450</span>
                    <span className={styles.statLabel}>This Month Revenue</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#FFF9C4' }}>
                        <Star size={20} color="#F57F17" />
                    </div>
                    <span className={styles.statValue}>4.8</span>
                    <span className={styles.statLabel}>Average Rating</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#F3E5F5' }}>
                        <Users size={20} color="#7B1FA2" />
                    </div>
                    <span className={styles.statValue}>156</span>
                    <span className={styles.statLabel}>Total Customers</span>
                </div>
            </div>

            {/* My Services */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3><PawPrint size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />My Services</h3>
                    <button className={styles.viewAll}>+ Add Service</button>
                </div>
                <div className={styles.serviceGrid}>
                    {services.map(service => (
                        <div key={service.id} className={styles.serviceCard} style={{ opacity: service.active ? 1 : 0.6 }}>
                            <div className={styles.serviceInfo}>
                                <h4>{service.name}</h4>
                                <p>{service.description}</p>
                            </div>
                            <div className={styles.serviceRight}>
                                <span className={styles.servicePrice}>{service.price}</span>
                                <button
                                    className={`${styles.toggleSwitch} ${service.active ? styles.toggleActive : ''}`}
                                    onClick={() => toggleService(service.id)}
                                    title={service.active ? 'Deactivate' : 'Activate'}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Bookings */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>Upcoming Bookings</h3>
                    <button className={styles.viewAll}>View All</button>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Pet</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UPCOMING_BOOKINGS.map((booking) => (
                            <tr key={booking.id}>
                                <td><strong>{booking.customer}</strong></td>
                                <td>{booking.pet}</td>
                                <td>{booking.service}</td>
                                <td>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Calendar size={14} color="var(--primary)" /> {booking.date}
                                    </span>
                                </td>
                                <td>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Clock size={14} color="var(--primary)" /> {booking.time}
                                    </span>
                                </td>
                                <td>
                                    <span className={`${styles.status} ${getBookingStatusClass(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
