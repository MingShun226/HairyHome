"use client";

import React, { useState } from "react";
import styles from "../../AdminDashboard.module.css";
import {
    User,
    CreditCard,
    MapPin,
    Plus,
    Pencil,
    Trash2,
    Save,
    X,
    CheckCircle2,
} from "lucide-react";

const secondaryBtnStyle = {
    background: 'white',
    border: '1.5px solid rgba(61, 90, 153, 0.15)',
    color: 'var(--foreground)',
    borderRadius: '10px',
    padding: '9px 20px',
    fontSize: '0.8rem',
    fontWeight: 600 as const,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
};

interface Address {
    id: number;
    label: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    postcode: string;
}

export default function UserSettingsPage() {
    // Account Details
    const [name, setName] = useState("Ahmad Razif");
    const [email, setEmail] = useState("ahmad.razif@email.com");
    const [phone, setPhone] = useState("+60123456789");

    // Wallet
    const [payments] = useState([
        { id: 1, type: "Visa", label: "Visa ending in 4242", detail: "Expires 08/27", icon: "card" },
        { id: 2, type: "eWallet", label: "Touch 'n Go eWallet", detail: "ahmad.razif@tng", icon: "wallet" },
    ]);

    // Addresses
    const [addresses, setAddresses] = useState<Address[]>([
        { id: 1, label: "Home", line1: "12, Jalan SS 2/30", line2: "Taman Bahagia", city: "Petaling Jaya", state: "Selangor", postcode: "47300" },
        { id: 2, label: "Office", line1: "Level 8, Menara XYZ", line2: "Jalan Sultan Ismail", city: "Kuala Lumpur", state: "Kuala Lumpur", postcode: "50250" },
    ]);

    // Editing address
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [newAddress, setNewAddress] = useState<Address>({ id: 0, label: "", line1: "", line2: "", city: "", state: "", postcode: "" });

    // Toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const showNotification = (msg: string) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleSaveProfile = () => {
        showNotification("Account details saved successfully!");
    };

    const handleDeleteAddress = (id: number) => {
        setAddresses(prev => prev.filter(a => a.id !== id));
        showNotification("Address deleted successfully!");
    };

    const handleSaveEditAddress = () => {
        if (!editingAddress) return;
        setAddresses(prev => prev.map(a => a.id === editingAddress.id ? editingAddress : a));
        setEditingAddress(null);
        showNotification("Address updated successfully!");
    };

    const handleAddAddress = () => {
        if (!newAddress.label || !newAddress.line1 || !newAddress.city) return;
        setAddresses(prev => [...prev, { ...newAddress, id: Date.now() }]);
        setNewAddress({ id: 0, label: "", line1: "", line2: "", city: "", state: "", postcode: "" });
        setIsAddingAddress(false);
        showNotification("New address added successfully!");
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Settings</h1>
            </div>

            {/* ===== SECTION 1: Account Details ===== */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <User size={18} style={{ color: 'var(--secondary)' }} />
                        Account Details
                    </h3>
                </div>
                <div className={styles.formSection}>
                    <div className={styles.formRow3}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Full Name</label>
                            <input className={styles.formInput} value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Email Address</label>
                            <input className={styles.formInput} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Phone Number</label>
                            <input className={styles.formInput} value={phone} onChange={e => setPhone(e.target.value)} placeholder="+60123456789" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
                        <button
                            style={{ ...secondaryBtnStyle, display: 'flex', alignItems: 'center', gap: '8px' }}
                            onClick={handleSaveProfile}
                        >
                            <Save size={15} /> Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== SECTION 2: Wallet ===== */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CreditCard size={18} style={{ color: 'var(--secondary)' }} />
                        Wallet
                    </h3>
                    <button style={{ ...secondaryBtnStyle, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', padding: '7px 16px' }}>
                        <Plus size={14} /> Add Payment Method
                    </button>
                </div>
                <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {payments.map(p => (
                        <div key={p.id} style={{
                            background: 'white',
                            border: '1.5px solid rgba(61, 90, 153, 0.1)',
                            borderRadius: '12px',
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            transition: 'all 0.2s',
                        }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '10px',
                                background: p.icon === 'card' ? '#E3F2FD' : '#E8F5E9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <CreditCard size={20} style={{ color: p.icon === 'card' ? '#1565C0' : '#2E7D32' }} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--foreground)', marginBottom: '3px' }}>
                                    {p.label}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                    {p.detail}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== SECTION 3: My Addresses ===== */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MapPin size={18} style={{ color: 'var(--secondary)' }} />
                        My Addresses
                    </h3>
                    <button
                        style={{ ...secondaryBtnStyle, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', padding: '7px 16px' }}
                        onClick={() => setIsAddingAddress(true)}
                    >
                        <Plus size={14} /> Add New Address
                    </button>
                </div>
                <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {addresses.map(addr => (
                        <div key={addr.id} style={{
                            background: 'white',
                            border: '1.5px solid rgba(61, 90, 153, 0.1)',
                            borderRadius: '12px',
                            padding: '20px',
                            position: 'relative',
                        }}>
                            {editingAddress?.id === addr.id ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                        <label className={styles.formLabel}>Label</label>
                                        <input className={styles.formInput} value={editingAddress.label} onChange={e => setEditingAddress({ ...editingAddress, label: e.target.value })} />
                                    </div>
                                    <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                        <label className={styles.formLabel}>Address Line 1</label>
                                        <input className={styles.formInput} value={editingAddress.line1} onChange={e => setEditingAddress({ ...editingAddress, line1: e.target.value })} />
                                    </div>
                                    <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                        <label className={styles.formLabel}>Address Line 2</label>
                                        <input className={styles.formInput} value={editingAddress.line2} onChange={e => setEditingAddress({ ...editingAddress, line2: e.target.value })} />
                                    </div>
                                    <div className={styles.formRow3}>
                                        <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                            <label className={styles.formLabel}>City</label>
                                            <input className={styles.formInput} value={editingAddress.city} onChange={e => setEditingAddress({ ...editingAddress, city: e.target.value })} />
                                        </div>
                                        <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                            <label className={styles.formLabel}>State</label>
                                            <input className={styles.formInput} value={editingAddress.state} onChange={e => setEditingAddress({ ...editingAddress, state: e.target.value })} />
                                        </div>
                                        <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                            <label className={styles.formLabel}>Postcode</label>
                                            <input className={styles.formInput} value={editingAddress.postcode} onChange={e => setEditingAddress({ ...editingAddress, postcode: e.target.value })} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
                                        <button
                                            style={{ ...secondaryBtnStyle, display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', fontSize: '0.75rem' }}
                                            onClick={() => setEditingAddress(null)}
                                        >
                                            <X size={14} /> Cancel
                                        </button>
                                        <button
                                            className={styles.actionBtn}
                                            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', fontSize: '0.75rem' }}
                                            onClick={handleSaveEditAddress}
                                        >
                                            <Save size={14} /> Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '8px',
                                            background: addr.label === 'Home' ? '#FFF3E0' : '#E3F2FD',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <MapPin size={16} style={{ color: addr.label === 'Home' ? '#E65100' : '#1565C0' }} />
                                        </div>
                                        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--foreground)' }}>{addr.label}</span>
                                    </div>
                                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.6, marginBottom: '14px' }}>
                                        {addr.line1}, {addr.line2}<br />
                                        {addr.postcode} {addr.city}, {addr.state}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            style={{ ...secondaryBtnStyle, display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '0.72rem' }}
                                            onClick={() => setEditingAddress(addr)}
                                        >
                                            <Pencil size={13} /> Edit
                                        </button>
                                        <button
                                            style={{ ...secondaryBtnStyle, display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '0.72rem', color: '#C62828' }}
                                            onClick={() => handleDeleteAddress(addr.id)}
                                        >
                                            <Trash2 size={13} /> Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}

                    {/* Add new address form */}
                    {isAddingAddress && (
                        <div style={{
                            background: 'white',
                            border: '1.5px solid rgba(61, 90, 153, 0.15)',
                            borderRadius: '12px',
                            padding: '20px',
                            gridColumn: addresses.length % 2 === 0 ? '1' : '2',
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                    <label className={styles.formLabel}>Label</label>
                                    <input className={styles.formInput} placeholder="e.g. Home, Office" value={newAddress.label} onChange={e => setNewAddress({ ...newAddress, label: e.target.value })} />
                                </div>
                                <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                    <label className={styles.formLabel}>Address Line 1</label>
                                    <input className={styles.formInput} placeholder="Street address" value={newAddress.line1} onChange={e => setNewAddress({ ...newAddress, line1: e.target.value })} />
                                </div>
                                <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                    <label className={styles.formLabel}>Address Line 2</label>
                                    <input className={styles.formInput} placeholder="Area / Neighborhood" value={newAddress.line2} onChange={e => setNewAddress({ ...newAddress, line2: e.target.value })} />
                                </div>
                                <div className={styles.formRow3}>
                                    <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                        <label className={styles.formLabel}>City</label>
                                        <input className={styles.formInput} placeholder="City" value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} />
                                    </div>
                                    <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                        <label className={styles.formLabel}>State</label>
                                        <input className={styles.formInput} placeholder="State" value={newAddress.state} onChange={e => setNewAddress({ ...newAddress, state: e.target.value })} />
                                    </div>
                                    <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                        <label className={styles.formLabel}>Postcode</label>
                                        <input className={styles.formInput} placeholder="Postcode" value={newAddress.postcode} onChange={e => setNewAddress({ ...newAddress, postcode: e.target.value })} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
                                    <button
                                        style={{ ...secondaryBtnStyle, display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', fontSize: '0.75rem' }}
                                        onClick={() => { setIsAddingAddress(false); setNewAddress({ id: 0, label: "", line1: "", line2: "", city: "", state: "", postcode: "" }); }}
                                    >
                                        <X size={14} /> Cancel
                                    </button>
                                    <button
                                        className={styles.actionBtn}
                                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', fontSize: '0.75rem' }}
                                        onClick={handleAddAddress}
                                    >
                                        <Save size={14} /> Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className={styles.toast}>
                    <CheckCircle2 size={18} />
                    {toastMessage}
                </div>
            )}
        </div>
    );
}
