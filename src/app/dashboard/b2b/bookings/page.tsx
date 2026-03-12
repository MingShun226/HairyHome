"use client";

import React, { useState } from "react";
import styles from "../../AdminDashboard.module.css";
import {
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    X,
    User,
    PawPrint,
    QrCode,
    DollarSign,
} from "lucide-react";

const INITIAL_BOOKINGS = [
    { id: 1, customer: "Alice Wong", pet: "Buddy (Golden Retriever)", service: "Full Grooming", date: "2024-03-15", time: "10:00 AM", price: "RM 85", status: "Confirmed" },
    { id: 2, customer: "Bob Chen", pet: "Whiskers (British Shorthair)", service: "Basic Bath & Dry", date: "2024-03-15", time: "11:30 AM", price: "RM 45", status: "Confirmed" },
    { id: 3, customer: "Nurul Aisha", pet: "Coco (Poodle)", service: "De-shedding Treatment", date: "2024-03-15", time: "02:00 PM", price: "RM 65", status: "Pending" },
    { id: 4, customer: "Raj Kumar", pet: "Princess (Persian)", service: "Full Grooming", date: "2024-03-16", time: "09:00 AM", price: "RM 85", status: "Confirmed" },
    { id: 5, customer: "Charlie Davis", pet: "Max (Shih Tzu)", service: "Pet Daycare", date: "2024-03-16", time: "08:00 AM", price: "RM 55", status: "Pending" },
    { id: 6, customer: "Michelle Tan", pet: "Bunny (Rabbit)", service: "Nail Trimming", date: "2024-03-14", time: "03:00 PM", price: "RM 20", status: "Completed" },
    { id: 7, customer: "Liam Parker", pet: "Rocky (Labrador)", service: "Overnight Hostel", date: "2024-03-17", time: "06:00 PM", price: "RM 80", status: "Pending" },
    { id: 8, customer: "Siti Fatimah", pet: "Mimi (Siamese)", service: "Teeth Cleaning", date: "2024-03-18", time: "10:30 AM", price: "RM 40", status: "Confirmed" },
];

type Booking = typeof INITIAL_BOOKINGS[number];

function getStatusClass(status: string) {
    switch (status) {
        case "Confirmed": return styles.statusConfirmed;
        case "Pending": return styles.statusPending;
        case "Completed": return styles.statusCompleted;
        case "Declined": return styles.statusRejected;
        default: return "";
    }
}

export default function UpcomingBookingsPage() {
    const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
    const [filter, setFilter] = useState("All");
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const today = "2024-03-15";
    const weekEnd = "2024-03-21";
    const monthEnd = "2024-03-31";

    const filtered = bookings.filter(b => {
        if (filter === "Today") return b.date === today;
        if (filter === "This Week") return b.date >= today && b.date <= weekEnd;
        if (filter === "This Month") return b.date >= today && b.date <= monthEnd;
        return true;
    });

    const handleAccept = (id: number) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Confirmed" } : b));
    };

    const handleDecline = (id: number) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Declined" } : b));
    };

    const handleComplete = (id: number) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Completed" } : b));
    };

    const filters = ["All", "Today", "This Week", "This Month"];

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Upcoming Bookings</h1>
            </div>

            <div className={styles.filterTabs}>
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ''}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Pet</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(booking => (
                            <tr key={booking.id} onClick={() => setSelectedBooking(booking)} style={{ cursor: 'pointer' }}>
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
                                <td>{booking.price}</td>
                                <td>
                                    <span className={`${styles.status} ${getStatusClass(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td onClick={e => e.stopPropagation()}>
                                    {booking.status === "Pending" && (
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className={styles.actionBtn} style={{ background: '#E8F5E9', color: '#2E7D32' }} onClick={() => handleAccept(booking.id)} title="Accept">
                                                <CheckCircle2 size={16} />
                                            </button>
                                            <button className={styles.actionBtn} style={{ background: '#FFEBEE', color: '#C62828' }} onClick={() => handleDecline(booking.id)} title="Decline">
                                                <XCircle size={16} />
                                            </button>
                                        </div>
                                    )}
                                    {booking.status === "Confirmed" && (
                                        <button className={styles.actionBtn} style={{ background: '#E8F5E9', color: '#2E7D32' }} onClick={() => handleComplete(booking.id)}>
                                            Mark Complete
                                        </button>
                                    )}
                                    {(booking.status === "Completed" || booking.status === "Declined") && (
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{booking.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No bookings found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedBooking && (
                <div className={styles.modalOverlay} onClick={() => setSelectedBooking(null)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Booking Details</h2>
                            <button className={styles.modalClose} onClick={() => setSelectedBooking(null)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.formSection}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <User size={18} color="var(--text-muted)" />
                                <div>
                                    <div className={styles.formLabel} style={{ marginBottom: 0 }}>Customer</div>
                                    <div style={{ fontWeight: 700 }}>{selectedBooking.customer}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <PawPrint size={18} color="var(--text-muted)" />
                                <div>
                                    <div className={styles.formLabel} style={{ marginBottom: 0 }}>Pet</div>
                                    <div style={{ fontWeight: 700 }}>{selectedBooking.pet}</div>
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div>
                                    <div className={styles.formLabel}>Service</div>
                                    <div style={{ fontWeight: 700 }}>{selectedBooking.service}</div>
                                </div>
                                <div>
                                    <div className={styles.formLabel}>Price</div>
                                    <div style={{ fontWeight: 700 }}>{selectedBooking.price}</div>
                                </div>
                                <div>
                                    <div className={styles.formLabel}>Date</div>
                                    <div style={{ fontWeight: 700 }}>{selectedBooking.date}</div>
                                </div>
                                <div>
                                    <div className={styles.formLabel}>Time</div>
                                    <div style={{ fontWeight: 700 }}>{selectedBooking.time}</div>
                                </div>
                            </div>
                            <div>
                                <div className={styles.formLabel}>Status</div>
                                <span className={`${styles.status} ${getStatusClass(selectedBooking.status)}`}>{selectedBooking.status}</span>
                            </div>

                            {/* QR Code Scanning */}
                            {(selectedBooking.status === "Confirmed") && (
                                <div style={{
                                    padding: '16px', borderRadius: '12px',
                                    background: '#E8F5E9', border: '1px solid #C8E6C9',
                                    display: 'flex', alignItems: 'center', gap: '14px',
                                }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '10px',
                                        background: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    }}>
                                        <QrCode size={24} color="white" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#2E7D32' }}>Scan Customer QR Code</div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Verify the booking by scanning the customer&apos;s QR code when they arrive</div>
                                    </div>
                                </div>
                            )}

                            {/* Commission Breakdown */}
                            <div style={{ padding: '14px 16px', borderRadius: '12px', background: '#FFF8F3', border: '1px solid rgba(61,90,153,0.08)' }}>
                                <div className={styles.formLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <DollarSign size={14} /> Settlement Breakdown
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                                    <span>Service Price</span>
                                    <span style={{ fontWeight: 700 }}>{selectedBooking.price}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#C62828', marginBottom: '4px' }}>
                                    <span>GroomShine Commission (10%)</span>
                                    <span style={{ fontWeight: 600 }}>-{(() => { const n = parseFloat(selectedBooking.price.replace(/[^\d.]/g, '')); return `RM ${(n * 0.1).toFixed(2)}`; })()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, paddingTop: '8px', borderTop: '1px dashed rgba(61,90,153,0.15)' }}>
                                    <span>Your Earnings</span>
                                    <span style={{ color: '#2E7D32' }}>{(() => { const n = parseFloat(selectedBooking.price.replace(/[^\d.]/g, '')); return `RM ${(n * 0.9).toFixed(2)}`; })()}</span>
                                </div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                                    Payment via iPay88 escrow. Released after service marked complete.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
