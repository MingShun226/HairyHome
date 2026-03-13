"use client";

import React, { useState } from "react";
import styles from "../../AdminDashboard.module.css";
import {
    Calendar,
    Clock,
    Star,
    X,
    RotateCcw,
    User,
    PawPrint,
    CheckCircle2,
} from "lucide-react";

type Booking = typeof INITIAL_BOOKINGS[number];

const INITIAL_BOOKINGS = [
    { id: 1, shop: "Pawsitive Vibes", service: "Full Grooming", date: "2024-03-15", time: "10:00 AM", price: "RM 85", status: "Upcoming" },
    { id: 2, shop: "Happy Tails Hostel", service: "Overnight Boarding", date: "2024-03-20", time: "06:00 PM", price: "RM 80", status: "Upcoming" },
    { id: 3, shop: "Bark Avenue", service: "Basic Bath & Dry", date: "2024-03-10", time: "02:00 PM", price: "RM 45", status: "Completed" },
    { id: 4, shop: "PawSpa Premium", service: "De-shedding Treatment", date: "2024-03-08", time: "11:00 AM", price: "RM 65", status: "Completed" },
    { id: 5, shop: "Pet Paradise", service: "Pet Daycare", date: "2024-03-05", time: "08:00 AM", price: "RM 55", status: "Completed" },
    { id: 6, shop: "Furry Friends", service: "Full Grooming", date: "2024-02-28", time: "03:00 PM", price: "RM 85", status: "Cancelled" },
    { id: 7, shop: "The Pet Lodge", service: "Overnight Hostel", date: "2024-03-22", time: "05:00 PM", price: "RM 80", status: "Upcoming" },
    { id: 8, shop: "Critter Care", service: "Veterinary Checkup", date: "2024-02-20", time: "09:30 AM", price: "RM 120", status: "Completed" },
];

function getStatusClass(status: string) {
    switch (status) {
        case "Upcoming": return styles.statusUpcoming;
        case "Completed": return styles.statusCompleted;
        case "Cancelled": return styles.statusCancelled;
        default: return "";
    }
}

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
    const [filter, setFilter] = useState("All");
    const [reviewModal, setReviewModal] = useState<number | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [rebookModal, setRebookModal] = useState<Booking | null>(null);
    const [rebookDate, setRebookDate] = useState("");
    const [rebookTime, setRebookTime] = useState("");
    const [rebookSuccess, setRebookSuccess] = useState(false);

    const filtered = filter === "All" ? bookings : bookings.filter(b => b.status === filter);

    const handleCancel = (id: number) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Cancelled" } : b));
    };

    const handleReviewSubmit = () => {
        setReviewModal(null);
        setReviewRating(5);
        setReviewText("");
    };

    const handleRebook = () => {
        if (!rebookModal || !rebookDate || !rebookTime) return;
        const newBooking = {
            id: Date.now(),
            shop: rebookModal.shop,
            service: rebookModal.service,
            date: rebookDate,
            time: rebookTime,
            price: rebookModal.price,
            status: "Upcoming" as const,
        };
        setBookings(prev => [newBooking, ...prev]);
        setRebookModal(null);
        setRebookDate("");
        setRebookTime("");
        setRebookSuccess(true);
        setTimeout(() => setRebookSuccess(false), 3000);
    };

    const filters = ["All", "Upcoming", "Completed", "Cancelled"];

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>My Bookings</h1>
            </div>

            <div className={styles.filterTabs}>
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ''}`}
                    >
                        {f} {f !== "All" && `(${bookings.filter(b => b.status === f).length})`}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filtered.map(booking => (
                    <div key={booking.id} className={styles.tableContainer} style={{ marginBottom: 0 }}>
                        <div className={styles.formSection}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                                <div>
                                    <strong style={{ fontSize: '1.1rem' }}>{booking.shop}</strong>
                                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>{booking.service}</p>
                                </div>
                                <span className={`${styles.status} ${getStatusClass(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                                    <Calendar size={16} color="var(--primary)" /> {booking.date}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                                    <Clock size={16} color="var(--primary)" /> {booking.time}
                                </span>
                                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--secondary)' }}>{booking.price}</span>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <button 
                                    className={styles.whiteBtn}
                                    onClick={() => setSelectedBooking(booking)}
                                >
                                    View Details
                                </button>
                                {booking.status === "Upcoming" && (
                                    <button
                                        className={styles.dangerBtn}
                                        onClick={() => handleCancel(booking.id)}
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                                {booking.status === "Completed" && (
                                    <>
                                        <button
                                            className={styles.whiteBtn}
                                            onClick={() => { setReviewModal(booking.id); setReviewRating(5); setReviewText(""); }}
                                        >
                                            <Star size={14} /> Leave Review
                                        </button>
                                        <button
                                            className={styles.whiteBtn}
                                            onClick={() => { setRebookModal(booking); setRebookDate(""); setRebookTime(""); }}
                                        >
                                            <RotateCcw size={14} /> Rebook
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', fontWeight: 600 }}>
                        No bookings found.
                    </div>
                )}
            </div>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className={styles.modalOverlay} onClick={() => setSelectedBooking(null)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Booking Details</h2>
                            <button className={styles.modalClose} onClick={() => setSelectedBooking(null)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.formSection} style={{ padding: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <div className={styles.shopAvatar} style={{ width: '50px', height: '50px', background: 'var(--gradient-accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Calendar size={24} color="var(--secondary)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Shop</div>
                                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--foreground)' }}>{selectedBooking.shop}</div>
                                </div>
                            </div>

                            <div className={styles.formRow} style={{ marginTop: '10px' }}>
                                <div style={{ background: '#FFF8F3', padding: '12px 16px', borderRadius: '12px' }}>
                                    <div className={styles.formLabel}>Service</div>
                                    <div style={{ fontWeight: 700 }}>{selectedBooking.service}</div>
                                </div>
                                <div style={{ background: '#FFF8F3', padding: '12px 16px', borderRadius: '12px' }}>
                                    <div className={styles.formLabel}>Price</div>
                                    <div style={{ fontWeight: 700, color: 'var(--secondary)' }}>{selectedBooking.price}</div>
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div style={{ background: '#FFF8F3', padding: '12px 16px', borderRadius: '12px' }}>
                                    <div className={styles.formLabel}>Date</div>
                                    <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Calendar size={16} color="var(--primary)" /> {selectedBooking.date}
                                    </div>
                                </div>
                                <div style={{ background: '#FFF8F3', padding: '12px 16px', borderRadius: '12px' }}>
                                    <div className={styles.formLabel}>Time</div>
                                    <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Clock size={16} color="var(--primary)" /> {selectedBooking.time}
                                    </div>
                                </div>
                            </div>

                            <div style={{ background: '#FFF8F3', padding: '12px 16px', borderRadius: '12px' }}>
                                <div className={styles.formLabel}>Status</div>
                                <span className={`${styles.status} ${getStatusClass(selectedBooking.status)}`}>
                                    {selectedBooking.status}
                                </span>
                            </div>
                        </div>

                        <div className={styles.modalActions}>
                            <button className={styles.primaryBtn} style={{ flex: 1, justifyContent: 'center' }} onClick={() => setSelectedBooking(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Rebook Modal */}
            {rebookModal && (
                <div className={styles.modalOverlay} onClick={() => setRebookModal(null)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Rebook Service</h2>
                            <button className={styles.modalClose} onClick={() => setRebookModal(null)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.formSection} style={{ padding: 0 }}>
                            <div style={{ background: '#FFF8F3', padding: '14px 16px', borderRadius: '12px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rebooking</div>
                                <div style={{ fontWeight: 800, fontSize: '1.1rem', marginTop: '2px' }}>{rebookModal.shop}</div>
                                <div style={{ fontSize: '0.88rem', color: 'var(--secondary)', fontWeight: 600, marginTop: '2px' }}>{rebookModal.service} — {rebookModal.price}</div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>New Date</label>
                                <input
                                    type="date"
                                    className={styles.formInput}
                                    value={rebookDate}
                                    onChange={e => setRebookDate(e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Preferred Time</label>
                                <input
                                    type="time"
                                    className={styles.formInput}
                                    value={rebookTime}
                                    onChange={e => setRebookTime(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.modalActions}>
                            <button
                                className={styles.primaryBtn}
                                onClick={handleRebook}
                                disabled={!rebookDate || !rebookTime}
                                style={{ opacity: (!rebookDate || !rebookTime) ? 0.5 : 1 }}
                            >
                                <RotateCcw size={14} /> Confirm Rebook
                            </button>
                            <button className={styles.whiteBtn} onClick={() => setRebookModal(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Rebook Success Toast */}
            {rebookSuccess && (
                <div className={styles.toast}>
                    <CheckCircle2 size={20} /> Booking created successfully!
                </div>
            )}

            {/* Review Modal */}
            {reviewModal !== null && (
                <div className={styles.modalOverlay} onClick={() => setReviewModal(null)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Leave a Review</h2>
                            <button className={styles.modalClose} onClick={() => setReviewModal(null)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.formSection} style={{ padding: 0 }}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Rating</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setReviewRating(s)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                                        >
                                            <Star size={32} fill={s <= reviewRating ? "#FFD700" : "none"} color={s <= reviewRating ? "#FFD700" : "#ccc"} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Your Review</label>
                                <textarea
                                    className={styles.formTextarea}
                                    value={reviewText}
                                    onChange={e => setReviewText(e.target.value)}
                                    placeholder="Tell us about your experience..."
                                    style={{ minHeight: '120px' }}
                                />
                            </div>
                        </div>

                        <div className={styles.modalActions}>
                            <button
                                className={styles.primaryBtn}
                                onClick={handleReviewSubmit}
                            >
                                Submit Review
                            </button>
                            <button
                                className={styles.whiteBtn}
                                onClick={() => setReviewModal(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
