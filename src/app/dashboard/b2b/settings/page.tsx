"use client";

import React, { useState } from "react";
import styles from "../../AdminDashboard.module.css";
import {
    Save,
    Upload,
    CheckCircle2,
} from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const INITIAL_HOURS = DAYS.map(day => ({
    day,
    enabled: day !== "Sunday",
    open: "09:00",
    close: "18:00",
}));

const STATES = ["Kuala Lumpur", "Selangor", "Penang", "Johor", "Perak", "Sabah", "Sarawak", "Melaka", "Pahang", "Kedah"];
const CATEGORIES = ["Grooming", "Spa", "Boarding", "Daycare", "Veterinary", "Training", "Dog Walking", "Pet Supplies"];

export default function ShopSettingsPage() {
    const [shopName, setShopName] = useState("Pawsitive Vibes");
    const [description, setDescription] = useState("Premium pet grooming and spa services for dogs and cats. We provide the best care for your furry friends.");
    const [category, setCategory] = useState("Grooming");
    const [phone, setPhone] = useState("+60123456789");
    const [email, setEmail] = useState("info@pawsitivevibes.com");
    const [address, setAddress] = useState("23, Jalan SS 15/4");
    const [city, setCity] = useState("Petaling Jaya");
    const [state, setState] = useState("Selangor");
    const [hours, setHours] = useState(INITIAL_HOURS);
    const [showToast, setShowToast] = useState(false);

    const toggleDay = (day: string) => {
        setHours(prev => prev.map(h => h.day === day ? { ...h, enabled: !h.enabled } : h));
    };

    const updateHour = (day: string, field: "open" | "close", value: string) => {
        setHours(prev => prev.map(h => h.day === day ? { ...h, [field]: value } : h));
    };

    const handleSave = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Shop Settings</h1>
                <button className={styles.actionBtn} onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Save size={18} /> Save Changes
                </button>
            </div>

            {/* Business Information */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>Business Information</h3>
                </div>
                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Shop Name</label>
                        <input className={styles.formInput} value={shopName} onChange={e => setShopName(e.target.value)} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Description</label>
                        <textarea className={styles.formTextarea} value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className={styles.formRow3}>
                        <div className={styles.formGroup}>
                            <CustomDropdown
                                label="Category"
                                options={CATEGORIES}
                                value={category}
                                onChange={setCategory}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Phone</label>
                            <input className={styles.formInput} value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Email</label>
                            <input className={styles.formInput} value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>Location</h3>
                </div>
                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Address</label>
                        <input className={styles.formInput} value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>City</label>
                            <input className={styles.formInput} value={city} onChange={e => setCity(e.target.value)} />
                        </div>
                        <div className={styles.formGroup}>
                            <CustomDropdown
                                label="State"
                                options={STATES}
                                value={state}
                                onChange={setState}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Operating Hours */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>Operating Hours</h3>
                </div>
                <div className={styles.formSection}>
                    {hours.map(h => (
                        <div key={h.day} style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                            <div style={{ width: '120px', fontWeight: 700, fontSize: '0.9rem' }}>{h.day}</div>
                            <button
                                className={`${styles.toggleSwitch} ${h.enabled ? styles.toggleActive : ''}`}
                                onClick={() => toggleDay(h.day)}
                            />
                            {h.enabled ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input
                                        type="time"
                                        value={h.open}
                                        onChange={e => updateHour(h.day, "open", e.target.value)}
                                        className={styles.formInput}
                                        style={{ width: '140px' }}
                                    />
                                    <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>to</span>
                                    <input
                                        type="time"
                                        value={h.close}
                                        onChange={e => updateHour(h.day, "close", e.target.value)}
                                        className={styles.formInput}
                                        style={{ width: '140px' }}
                                    />
                                </div>
                            ) : (
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Closed</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Profile Photos */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>Profile Photos</h3>
                </div>
                <div style={{ padding: '24px 30px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {[1, 2, 3].map(slot => (
                        <div
                            key={slot}
                            style={{
                                border: '2px dashed rgba(139,148,204,0.3)',
                                borderRadius: '16px',
                                padding: '40px 20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                cursor: 'pointer',
                                background: '#F9FAFF',
                            }}
                        >
                            <Upload size={32} color="var(--text-muted)" />
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                                Upload Photo {slot}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                JPG, PNG up to 5MB
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className={styles.toast}>
                    <CheckCircle2 size={20} /> Settings saved successfully!
                </div>
            )}
        </div>
    );
}
