"use client";

import React, { useState } from "react";
import styles from "../../AdminDashboard.module.css";
import {
    Star,
    MessageSquare,
    X,
    Send,
} from "lucide-react";

const INITIAL_REVIEWS = [
    { id: 1, customer: "Alice Wong", rating: 5, date: "2024-03-10", comment: "Amazing grooming! My golden retriever looks fabulous.", service: "Full Grooming", reply: "" },
    { id: 2, customer: "Bob Chen", rating: 4, date: "2024-03-09", comment: "Good service, but had to wait 15 minutes past appointment.", service: "Basic Bath & Dry", reply: "Sorry for the wait! We're working on improving our scheduling." },
    { id: 3, customer: "Nurul Aisha", rating: 5, date: "2024-03-08", comment: "Best pet spa in PJ! My cats always come home happy.", service: "De-shedding Treatment", reply: "" },
    { id: 4, customer: "Raj Kumar", rating: 5, date: "2024-03-07", comment: "Very professional staff. They handle my Persian with great care.", service: "Full Grooming", reply: "" },
    { id: 5, customer: "Charlie Davis", rating: 3, date: "2024-03-05", comment: "Decent service but pricing is a bit high compared to others.", service: "Pet Daycare", reply: "Thank you for the feedback! We offer premium care facilities." },
    { id: 6, customer: "Michelle Tan", rating: 5, date: "2024-03-04", comment: "Love the nail trimming service. Quick and efficient!", service: "Nail Trimming", reply: "" },
    { id: 7, customer: "Liam Parker", rating: 4, date: "2024-03-02", comment: "Good overnight hostel. My dog was well taken care of.", service: "Overnight Hostel", reply: "" },
    { id: 8, customer: "Siti Fatimah", rating: 5, date: "2024-03-01", comment: "Excellent teeth cleaning! Very thorough and gentle.", service: "Teeth Cleaning", reply: "" },
];

const RATING_BREAKDOWN = [
    { stars: 5, percentage: 65 },
    { stars: 4, percentage: 25 },
    { stars: 3, percentage: 7 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 },
];

export default function ReviewsPage() {
    const [reviews, setReviews] = useState(INITIAL_REVIEWS);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState("");

    const handleSubmitReply = () => {
        if (!replyText.trim() || replyingTo === null) return;
        setReviews(prev => prev.map(r => r.id === replyingTo ? { ...r, reply: replyText } : r));
        setReplyText("");
        setReplyingTo(null);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={16} fill={i < rating ? "#FFD700" : "none"} color={i < rating ? "#FFD700" : "#ccc"} />
        ));
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Customer Reviews</h1>
            </div>

            {/* Average Rating Overview */}
            <div className={styles.tableContainer} style={{ marginBottom: '30px' }}>
                <div className={styles.ratingDisplay}>
                    <div className={styles.ratingBig}>
                        <div className={styles.ratingBigNum}>4.8</div>
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '8px' }}>
                            {renderStars(5)}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{reviews.length} reviews</div>
                    </div>
                    <div className={styles.ratingBars}>
                        {RATING_BREAKDOWN.map(r => (
                            <div key={r.stars} className={styles.ratingBarRow}>
                                <span style={{ width: '50px' }}>{r.stars} star</span>
                                <div className={styles.ratingBarTrack}>
                                    <div className={styles.ratingBarFill} style={{ width: `${r.percentage}%` }} />
                                </div>
                                <span style={{ width: '40px', textAlign: 'right' }}>{r.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Review Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reviews.map(review => (
                    <div key={review.id} className={styles.tableContainer} style={{ marginBottom: 0 }}>
                        <div style={{ padding: '24px 30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                                <div>
                                    <strong style={{ fontSize: '1rem' }}>{review.customer}</strong>
                                    <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>{renderStars(review.rating)}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{review.date}</div>
                                    <span className={`${styles.status} ${styles.statusActive}`} style={{ marginTop: '4px' }}>{review.service}</span>
                                </div>
                            </div>
                            <p style={{ margin: '0 0 16px', fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.6 }}>{review.comment}</p>

                            {review.reply && (
                                <div style={{ background: '#F9FAFF', padding: '16px', borderRadius: '12px', marginBottom: '12px', borderLeft: '3px solid var(--primary)' }}>
                                    <div className={styles.formLabel}>Your Reply</div>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--foreground)' }}>{review.reply}</p>
                                </div>
                            )}

                            {!review.reply && (
                                <button
                                    className={styles.actionBtn}
                                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                                    onClick={() => { setReplyingTo(review.id); setReplyText(""); }}
                                >
                                    <MessageSquare size={14} /> Reply
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Reply Modal */}
            {replyingTo !== null && (
                <div className={styles.modalOverlay} onClick={() => setReplyingTo(null)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Reply to Review</h2>
                            <button className={styles.modalClose} onClick={() => setReplyingTo(null)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ background: '#F9FAFF', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                            <strong>{reviews.find(r => r.id === replyingTo)?.customer}</strong>
                            <p style={{ margin: '8px 0 0', fontSize: '0.9rem', color: 'var(--foreground)' }}>
                                {reviews.find(r => r.id === replyingTo)?.comment}
                            </p>
                        </div>

                        <textarea
                            className={styles.formTextarea}
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                            style={{ minHeight: '120px' }}
                        />

                        <div className={styles.modalActions}>
                            <button className={styles.actionBtn} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={handleSubmitReply}>
                                <Send size={16} /> Send Reply
                            </button>
                            <button className={styles.actionBtn} style={{ background: 'white', color: 'var(--foreground)', border: '1.5px solid rgba(139,148,204,0.2)' }} onClick={() => setReplyingTo(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
