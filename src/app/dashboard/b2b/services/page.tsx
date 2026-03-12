"use client";

import React, { useState } from "react";
import styles from "../../AdminDashboard.module.css";
import {
    Plus,
    Edit3,
    Trash2,
    X,
    PawPrint,
} from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";

const INITIAL_SERVICES = [
    { id: 1, name: "Full Grooming", description: "Complete bath, haircut, nail trim & styling", price: "RM 85", duration: "90 min", category: "Grooming", active: true },
    { id: 2, name: "Basic Bath & Dry", description: "Shampoo, conditioner & blow dry", price: "RM 45", duration: "45 min", category: "Grooming", active: true },
    { id: 3, name: "Pet Daycare", description: "Full day supervised play & care", price: "RM 55/day", duration: "Full Day", category: "Daycare", active: true },
    { id: 4, name: "Overnight Hostel", description: "Overnight boarding with meals", price: "RM 80/night", duration: "Overnight", category: "Boarding", active: true },
    { id: 5, name: "Nail Trimming", description: "Quick nail clip & filing", price: "RM 20", duration: "15 min", category: "Grooming", active: false },
    { id: 6, name: "De-shedding Treatment", description: "Deep coat treatment for shedding", price: "RM 65", duration: "60 min", category: "Spa", active: true },
    { id: 7, name: "Teeth Cleaning", description: "Professional dental cleaning for pets", price: "RM 40", duration: "30 min", category: "Grooming", active: true },
    { id: 8, name: "Flea Treatment", description: "Full flea and tick treatment", price: "RM 50", duration: "45 min", category: "Spa", active: false },
];

type Service = typeof INITIAL_SERVICES[number];

export default function MyServicesPage() {
    const [services, setServices] = useState(INITIAL_SERVICES);
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    const [formName, setFormName] = useState("");
    const [formDesc, setFormDesc] = useState("");
    const [formPrice, setFormPrice] = useState("");
    const [formDuration, setFormDuration] = useState("");
    const [formCategory, setFormCategory] = useState("Grooming");

    const openAddModal = () => {
        setEditingService(null);
        setFormName("");
        setFormDesc("");
        setFormPrice("");
        setFormDuration("");
        setFormCategory("Grooming");
        setShowModal(true);
    };

    const openEditModal = (service: Service) => {
        setEditingService(service);
        setFormName(service.name);
        setFormDesc(service.description);
        setFormPrice(service.price);
        setFormDuration(service.duration);
        setFormCategory(service.category);
        setShowModal(true);
    };

    const handleSave = () => {
        if (!formName.trim()) return;
        if (editingService) {
            setServices(prev => prev.map(s => s.id === editingService.id
                ? { ...s, name: formName, description: formDesc, price: formPrice, duration: formDuration, category: formCategory }
                : s
            ));
        } else {
            const newService: Service = {
                id: Date.now(),
                name: formName,
                description: formDesc,
                price: formPrice,
                duration: formDuration,
                category: formCategory,
                active: true,
            };
            setServices(prev => [...prev, newService]);
        }
        setShowModal(false);
    };

    const handleDelete = (id: number) => {
        setServices(prev => prev.filter(s => s.id !== id));
        setDeleteConfirm(null);
    };

    const toggleActive = (id: number) => {
        setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>My Services</h1>
                <button className={styles.actionBtn} onClick={openAddModal} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} /> Add New Service
                </button>
            </div>

            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3><PawPrint size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />Services ({services.length})</h3>
                </div>
                <div className={styles.serviceGrid}>
                    {services.map(service => (
                        <div key={service.id} className={styles.serviceCard} style={{ opacity: service.active ? 1 : 0.5, flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                <div className={styles.serviceInfo}>
                                    <h4>{service.name}</h4>
                                    <p>{service.description}</p>
                                    <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>{service.duration} &bull; {service.category}</p>
                                </div>
                                <div className={styles.serviceRight}>
                                    <span className={styles.servicePrice}>{service.price}</span>
                                    <button
                                        className={`${styles.toggleSwitch} ${service.active ? styles.toggleActive : ''}`}
                                        onClick={() => toggleActive(service.id)}
                                        title={service.active ? 'Deactivate' : 'Activate'}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                                <button className={styles.actionBtn} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => openEditModal(service)}>
                                    <Edit3 size={14} /> Edit
                                </button>
                                {deleteConfirm === service.id ? (
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button className={styles.actionBtn} style={{ background: '#FFEBEE', color: '#C62828' }} onClick={() => handleDelete(service.id)}>Confirm</button>
                                        <button className={styles.actionBtn} onClick={() => setDeleteConfirm(null)}>Cancel</button>
                                    </div>
                                ) : (
                                    <button className={styles.actionBtn} style={{ background: '#FFEBEE', color: '#C62828', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => setDeleteConfirm(service.id)}>
                                        <Trash2 size={14} /> Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                            <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.formSection}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Service Name</label>
                                <input className={styles.formInput} value={formName} onChange={e => setFormName(e.target.value)} placeholder="e.g. Full Grooming" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Description</label>
                                <textarea className={styles.formTextarea} value={formDesc} onChange={e => setFormDesc(e.target.value)} placeholder="Describe the service..." />
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Price</label>
                                    <input className={styles.formInput} value={formPrice} onChange={e => setFormPrice(e.target.value)} placeholder="e.g. RM 85" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Duration</label>
                                    <input className={styles.formInput} value={formDuration} onChange={e => setFormDuration(e.target.value)} placeholder="e.g. 90 min" />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <CustomDropdown
                                    label="Category"
                                    options={["Grooming", "Spa", "Boarding", "Daycare", "Training", "Veterinary"]}
                                    value={formCategory}
                                    onChange={setFormCategory}
                                />
                            </div>
                        </div>

                        <div className={styles.modalActions}>
                            <button className={styles.actionBtn} onClick={handleSave}>
                                {editingService ? 'Save Changes' : 'Add Service'}
                            </button>
                            <button className={styles.actionBtn} style={{ background: 'white', color: 'var(--foreground)', border: '1.5px solid rgba(139,148,204,0.2)' }} onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
