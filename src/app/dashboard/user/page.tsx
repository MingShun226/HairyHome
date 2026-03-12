"use client";

import React from "react";
import styles from "../AdminDashboard.module.css";
import {
    Calendar,
    Heart,
    PawPrint,
    Star,
    CheckCircle2,
    MapPin,
    Clock,
} from "lucide-react";

const MOCK_MY_BOOKINGS = [
    { id: 1, shop: "Pawsitive Vibes", service: "Full Grooming", date: "2024-03-15", time: "10:00 AM", price: "RM 85", status: "Upcoming" },
    { id: 2, shop: "Happy Tails Hostel", service: "Overnight Boarding", date: "2024-03-20", time: "06:00 PM", price: "RM 80", status: "Upcoming" },
    { id: 3, shop: "Bark Avenue", service: "Basic Bath & Dry", date: "2024-03-10", time: "02:00 PM", price: "RM 45", status: "Completed" },
    { id: 4, shop: "PawSpa Premium", service: "De-shedding Treatment", date: "2024-03-08", time: "11:00 AM", price: "RM 65", status: "Completed" },
    { id: 5, shop: "Pet Paradise", service: "Pet Daycare", date: "2024-03-05", time: "08:00 AM", price: "RM 55", status: "Completed" },
    { id: 6, shop: "Furry Friends", service: "Full Grooming", date: "2024-02-28", time: "03:00 PM", price: "RM 85", status: "Cancelled" },
];

const MY_PETS = [
    { id: 1, name: "Mochi", breed: "Maltipoo", age: "2 years", initial: "M", color: "#E1F5FE" },
    { id: 2, name: "Luna", breed: "Persian Cat", age: "3 years", initial: "L", color: "#FFF9C4" },
    { id: 3, name: "Buddy", breed: "Golden Retriever", age: "4 years", initial: "B", color: "#E8F5E9" },
    { id: 4, name: "Whiskers", breed: "British Shorthair", age: "1 year", initial: "W", color: "#F3E5F5" },
];

const RECENT_ACTIVITY = [
    { id: 1, text: "Booking confirmed: Full Grooming at Pawsitive Vibes on Mar 15", time: "2 hours ago" },
    { id: 2, text: "Don't forget to leave a review for Bark Avenue!", time: "1 day ago" },
    { id: 3, text: "Overnight Boarding at Happy Tails Hostel booked successfully", time: "2 days ago" },
    { id: 4, text: "You earned 50 loyalty points from PawSpa Premium", time: "4 days ago" },
    { id: 5, text: "Reminder: Leave a review for your Pet Paradise daycare visit", time: "1 week ago" },
];

const RECOMMENDED_SHOPS = [
    { id: 1, name: "Critter Care", type: "Veterinary & Boarding", location: "Subang Jaya", rating: 4.3 },
    { id: 2, name: "The Pet Lodge", type: "Boarding & Hostel", location: "Damansara", rating: 4.5 },
    { id: 3, name: "FurEver Home", type: "Daycare & Training", location: "Cheras", rating: 4.4 },
];

function getBookingStatusClass(status: string) {
    switch (status) {
        case "Upcoming": return styles.statusUpcoming;
        case "Completed": return styles.statusCompleted;
        case "Cancelled": return styles.statusCancelled;
        default: return "";
    }
}

export default function UserDashboard() {
    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>My Pet Care</h1>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#E1F5FE' }}>
                        <Calendar size={20} color="#1976D2" />
                    </div>
                    <span className={styles.statValue}>2</span>
                    <span className={styles.statLabel}>Active Bookings</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#E8F5E9' }}>
                        <CheckCircle2 size={20} color="#388E3C" />
                    </div>
                    <span className={styles.statValue}>15</span>
                    <span className={styles.statLabel}>Completed Services</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#FFF9C4' }}>
                        <Heart size={20} color="#F57F17" />
                    </div>
                    <span className={styles.statValue}>5</span>
                    <span className={styles.statLabel}>Favorite Shops</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#F3E5F5' }}>
                        <PawPrint size={20} color="#7B1FA2" />
                    </div>
                    <span className={styles.statValue}>4</span>
                    <span className={styles.statLabel}>My Pets</span>
                </div>
            </div>

            {/* My Bookings */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>My Bookings</h3>
                    <button className={styles.viewAll}>View All</button>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Shop</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_MY_BOOKINGS.map((booking) => (
                            <tr key={booking.id}>
                                <td><strong>{booking.shop}</strong></td>
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
                                <td>{booking.price}</td>
                                <td>
                                    <span className={`${styles.status} ${getBookingStatusClass(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td>
                                    {booking.status === "Upcoming" ? (
                                        <button className={styles.dangerBtn} style={{ padding: '7px 16px', fontSize: '0.78rem' }}>
                                            Cancel
                                        </button>
                                    ) : (
                                        <button className={styles.whiteBtn} style={{ padding: '7px 16px', fontSize: '0.78rem' }}>
                                            View Details
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* My Pets */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3><PawPrint size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />My Pets</h3>
                    <button className={styles.viewAll}>+ Add Pet</button>
                </div>
                <div className={styles.petCards}>
                    {MY_PETS.map(pet => (
                        <div key={pet.id} className={styles.petCard}>
                            <div className={styles.petAvatar} style={{ background: pet.color }}>
                                {pet.initial}
                            </div>
                            <div>
                                <strong style={{ fontSize: '1rem' }}>{pet.name}</strong>
                                <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{pet.breed} &bull; {pet.age}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>Recent Activity</h3>
                </div>
                <div className={styles.activityFeed}>
                    {RECENT_ACTIVITY.map(item => (
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

            {/* Recommended Shops */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3><Star size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />Recommended Shops</h3>
                </div>
                <div className={styles.shopCards}>
                    {RECOMMENDED_SHOPS.map(shop => (
                        <div key={shop.id} className={styles.shopCard}>
                            <h4>{shop.name}</h4>
                            <p>{shop.type}</p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin size={13} /> {shop.location}
                            </p>
                            <div className={styles.shopCardRating}>
                                <Star size={14} fill="#FFD700" color="#FFD700" /> {shop.rating}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
