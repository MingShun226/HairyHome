"use client";

import React, { useState } from "react";
import styles from "../../AdminDashboard.module.css";
import {
    CheckCircle2,
    XCircle,
    X,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
} from "lucide-react";

const INITIAL_APPLICATIONS = [
    { id: 1, name: "Pawsitive Vibes", owner: "John Doe", email: "john@pawsitive.com", phone: "+60123456789", type: "Grooming & Spa", location: "Petaling Jaya, Selangor", date: "2024-03-10", status: "Pending", description: "Premium pet grooming and spa services for dogs and cats." },
    { id: 2, name: "Furry Friends Daycare", owner: "Aisha Rahman", email: "aisha@furry.com", phone: "+60198765432", type: "Daycare", location: "Bangsar, KL", date: "2024-03-09", status: "Pending", description: "Safe and fun daycare environment for pets while owners are at work." },
    { id: 3, name: "Elite Pet Clinic", owner: "Dr. Mike Tan", email: "mike@elitepet.com", phone: "+60112345678", type: "Veterinary", location: "Mont Kiara, KL", date: "2024-03-08", status: "Pending", description: "Full-service veterinary clinic with experienced staff." },
    { id: 4, name: "Bark & Board", owner: "Liam O'Brien", email: "liam@bark.com", phone: "+60134567890", type: "Boarding", location: "Shah Alam, Selangor", date: "2024-03-07", status: "Approved", description: "Comfortable boarding facilities with 24/7 supervision." },
    { id: 5, name: "Kitty Kingdom", owner: "Mei Ling", email: "mei@kitty.com", phone: "+60145678901", type: "Cat Cafe & Grooming", location: "Subang Jaya, Selangor", date: "2024-03-06", status: "Rejected", description: "Cat-focused grooming and cafe experience." },
    { id: 6, name: "PetPals Walker", owner: "Carlos Reyes", email: "carlos@petpals.com", phone: "+60156789012", type: "Dog Walking", location: "Damansara, Selangor", date: "2024-03-05", status: "Pending", description: "Professional dog walking services in your neighborhood." },
    { id: 7, name: "Aqua Pets", owner: "Sarah Lee", email: "sarah@aqua.com", phone: "+60167890123", type: "Fish & Aquarium", location: "Cheras, KL", date: "2024-03-04", status: "Approved", description: "Aquarium maintenance and tropical fish supplies." },
    { id: 8, name: "Purrfect Grooming", owner: "Ahmad Zain", email: "ahmad@purrfect.com", phone: "+60178901234", type: "Grooming", location: "Ampang, KL", date: "2024-03-03", status: "Pending", description: "Specialized grooming for all breeds and sizes." },
];

type Application = typeof INITIAL_APPLICATIONS[number];

function getStatusClass(status: string) {
    switch (status) {
        case "Pending": return styles.statusPending;
        case "Approved": return styles.statusActive;
        case "Rejected": return styles.statusRejected;
        default: return "";
    }
}

export default function PartnerApplicationsPage() {
    const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
    const [filter, setFilter] = useState("All");
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);

    const filtered = filter === "All" ? applications : applications.filter(a => a.status === filter);

    const handleApprove = (id: number) => {
        setApplications(prev => prev.map(a => a.id === id ? { ...a, status: "Approved" } : a));
    };

    const handleReject = (id: number) => {
        setApplications(prev => prev.map(a => a.id === id ? { ...a, status: "Rejected" } : a));
    };

    const filters = ["All", "Pending", "Approved", "Rejected"];

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Partner Applications</h1>
            </div>

            <div className={styles.filterTabs}>
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ''}`}
                    >
                        {f} {f !== "All" && `(${applications.filter(a => f === "All" || a.status === f).length})`}
                    </button>
                ))}
            </div>

            <div className={styles.tableContainer}>
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
                        {filtered.map((app) => (
                            <tr key={app.id} onClick={() => setSelectedApp(app)} style={{ cursor: 'pointer' }}>
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
                                        <div style={{ display: 'flex', gap: '10px' }} onClick={e => e.stopPropagation()}>
                                            <button className={styles.actionBtn} title="Approve" onClick={() => handleApprove(app.id)}>
                                                <CheckCircle2 size={18} />
                                            </button>
                                            <button className={styles.actionBtn} style={{ background: '#FFEBEE', color: '#b71c1c' }} title="Reject" onClick={() => handleReject(app.id)}>
                                                <XCircle size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                            {app.status}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No applications found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedApp && (
                <div className={styles.modalOverlay} onClick={() => setSelectedApp(null)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>{selectedApp.name}</h2>
                            <button className={styles.modalClose} onClick={() => setSelectedApp(null)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.formSection}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Briefcase size={18} color="var(--text-muted)" />
                                <div>
                                    <div className={styles.formLabel} style={{ marginBottom: 0 }}>Service Type</div>
                                    <div style={{ fontWeight: 700 }}>{selectedApp.type}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MapPin size={18} color="var(--text-muted)" />
                                <div>
                                    <div className={styles.formLabel} style={{ marginBottom: 0 }}>Location</div>
                                    <div style={{ fontWeight: 700 }}>{selectedApp.location}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Mail size={18} color="var(--text-muted)" />
                                <div>
                                    <div className={styles.formLabel} style={{ marginBottom: 0 }}>Email</div>
                                    <div style={{ fontWeight: 700 }}>{selectedApp.email}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Phone size={18} color="var(--text-muted)" />
                                <div>
                                    <div className={styles.formLabel} style={{ marginBottom: 0 }}>Phone</div>
                                    <div style={{ fontWeight: 700 }}>{selectedApp.phone}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Calendar size={18} color="var(--text-muted)" />
                                <div>
                                    <div className={styles.formLabel} style={{ marginBottom: 0 }}>Date Applied</div>
                                    <div style={{ fontWeight: 700 }}>{selectedApp.date}</div>
                                </div>
                            </div>
                            <div>
                                <div className={styles.formLabel}>Description</div>
                                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.6 }}>{selectedApp.description}</p>
                            </div>
                            <div>
                                <div className={styles.formLabel}>Status</div>
                                <span className={`${styles.status} ${getStatusClass(selectedApp.status)}`}>{selectedApp.status}</span>
                            </div>
                        </div>

                        {selectedApp.status === "Pending" && (
                            <div className={styles.modalActions} style={{ paddingTop: '20px', borderTop: '1px solid rgba(139,148,204,0.1)' }}>
                                <button className={styles.actionBtn} style={{ background: '#E8F5E9', color: '#2E7D32' }} onClick={() => { handleApprove(selectedApp.id); setSelectedApp({ ...selectedApp, status: "Approved" }); }}>
                                    <CheckCircle2 size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Approve
                                </button>
                                <button className={styles.actionBtn} style={{ background: '#FFEBEE', color: '#C62828' }} onClick={() => { handleReject(selectedApp.id); setSelectedApp({ ...selectedApp, status: "Rejected" }); }}>
                                    <XCircle size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Reject
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
