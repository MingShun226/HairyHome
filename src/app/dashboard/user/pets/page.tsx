"use client";

import React, { useState } from "react";
import styles from "../../AdminDashboard.module.css";
import {
    Plus,
    Edit3,
    Trash2,
    X,
    PawPrint,
    Shield,
} from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";

const INITIAL_PETS = [
    { id: 1, name: "Mochi", species: "Dog", breed: "Maltipoo", age: "2 years", weight: "4.5 kg", initial: "M", color: "#E1F5FE", vaccinations: ["Rabies (2024-01)", "DHPP (2023-12)", "Bordetella (2024-02)"] },
    { id: 2, name: "Luna", species: "Cat", breed: "Persian", age: "3 years", weight: "3.8 kg", initial: "L", color: "#FFF9C4", vaccinations: ["Rabies (2024-01)", "FVRCP (2023-11)"] },
    { id: 3, name: "Buddy", species: "Dog", breed: "Golden Retriever", age: "4 years", weight: "30 kg", initial: "B", color: "#E8F5E9", vaccinations: ["Rabies (2024-01)", "DHPP (2023-12)", "Leptospirosis (2024-01)"] },
    { id: 4, name: "Whiskers", species: "Cat", breed: "British Shorthair", age: "1 year", weight: "4.2 kg", initial: "W", color: "#F3E5F5", vaccinations: ["Rabies (2024-02)", "FVRCP (2024-01)"] },
];

type Pet = typeof INITIAL_PETS[number];

export default function MyPetsPage() {
    const [pets, setPets] = useState(INITIAL_PETS);
    const [showModal, setShowModal] = useState(false);
    const [editingPet, setEditingPet] = useState<Pet | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    const [formName, setFormName] = useState("");
    const [formSpecies, setFormSpecies] = useState("Dog");
    const [formBreed, setFormBreed] = useState("");
    const [formAge, setFormAge] = useState("");
    const [formWeight, setFormWeight] = useState("");
    const [formNotes, setFormNotes] = useState("");

    const COLORS = ["#E1F5FE", "#FFF9C4", "#E8F5E9", "#F3E5F5", "#FFECB3", "#E0F7FA"];

    const openAddModal = () => {
        setEditingPet(null);
        setFormName("");
        setFormSpecies("Dog");
        setFormBreed("");
        setFormAge("");
        setFormWeight("");
        setFormNotes("");
        setShowModal(true);
    };

    const openEditModal = (pet: Pet) => {
        setEditingPet(pet);
        setFormName(pet.name);
        setFormSpecies(pet.species);
        setFormBreed(pet.breed);
        setFormAge(pet.age);
        setFormWeight(pet.weight);
        setFormNotes("");
        setShowModal(true);
    };

    const handleSave = () => {
        if (!formName.trim()) return;
        if (editingPet) {
            setPets(prev => prev.map(p => p.id === editingPet.id
                ? { ...p, name: formName, species: formSpecies, breed: formBreed, age: formAge, weight: formWeight, initial: formName[0].toUpperCase() }
                : p
            ));
        } else {
            const newPet: Pet = {
                id: Date.now(),
                name: formName,
                species: formSpecies,
                breed: formBreed,
                age: formAge,
                weight: formWeight,
                initial: formName[0].toUpperCase(),
                color: COLORS[pets.length % COLORS.length],
                vaccinations: [],
            };
            setPets(prev => [...prev, newPet]);
        }
        setShowModal(false);
    };

    const handleDelete = (id: number) => {
        setPets(prev => prev.filter(p => p.id !== id));
        setDeleteConfirm(null);
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>My Pets</h1>
                <button className={styles.whiteBtn} onClick={openAddModal}>
                    <Plus size={18} /> Add Pet
                </button>
            </div>

            <div className={styles.cardGrid}>
                {pets.map(pet => (
                    <div
                        key={pet.id}
                        className={styles.tableContainer}
                        style={{
                            marginBottom: 0,
                            minHeight: '340px',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(93, 100, 164, 0.18)';
                            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(93, 100, 164, 0.1)';
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(139, 148, 204, 0.06)';
                            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(93, 100, 164, 0.04)';
                        }}
                    >
                        <div className={styles.formSection} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            {/* Avatar + Name */}
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <div className={styles.petAvatar} style={{ background: pet.color, width: '60px', height: '60px', fontSize: '1.5rem' }}>
                                    {pet.initial}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <strong style={{ fontSize: '1.15rem' }}>{pet.name}</strong>
                                    <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                        {pet.species} &bull; {pet.breed}
                                    </p>
                                </div>
                            </div>

                            {/* Age / Weight */}
                            <div className={styles.formRow}>
                                <div style={{ background: '#F9FAFF', padding: '10px 14px', borderRadius: '10px' }}>
                                    <div className={styles.formLabel} style={{ marginBottom: 0 }}>Age</div>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{pet.age}</div>
                                </div>
                                <div style={{ background: '#F9FAFF', padding: '10px 14px', borderRadius: '10px' }}>
                                    <div className={styles.formLabel} style={{ marginBottom: 0 }}>Weight</div>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{pet.weight}</div>
                                </div>
                            </div>

                            {/* Vaccination Records */}
                            <div style={{ minHeight: '48px' }}>
                                {pet.vaccinations.length > 0 ? (
                                    <div>
                                        <div className={styles.formLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Shield size={14} /> Vaccinations
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {pet.vaccinations.map((v, i) => (
                                                <span key={i} className={`${styles.status} ${styles.statusActive}`} style={{ fontSize: '0.7rem' }}>
                                                    {v}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className={styles.formLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Shield size={14} /> Vaccinations
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>No records yet</span>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                                <button className={styles.whiteBtn} style={{ flex: 1, justifyContent: 'center' }} onClick={() => openEditModal(pet)}>
                                    <Edit3 size={14} /> Edit
                                </button>
                                {deleteConfirm === pet.id ? (
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button className={styles.dangerBtn} onClick={() => handleDelete(pet.id)}>Confirm</button>
                                        <button className={styles.whiteBtn} onClick={() => setDeleteConfirm(null)}>Cancel</button>
                                    </div>
                                ) : (
                                    <button className={styles.dangerBtn} style={{ justifyContent: 'center' }} onClick={() => setDeleteConfirm(pet.id)}>
                                        <Trash2 size={14} /> Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>
                                <PawPrint size={22} />
                                {editingPet ? 'Edit Pet' : 'Add New Pet'}
                            </h2>
                            <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.formSection} style={{ padding: 0 }}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Pet Name</label>
                                <input className={styles.formInput} value={formName} onChange={e => setFormName(e.target.value)} placeholder="e.g. Mochi" />
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <CustomDropdown
                                        label="Species"
                                        options={["Dog", "Cat", "Rabbit", "Bird", "Other"]}
                                        value={formSpecies}
                                        onChange={setFormSpecies}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Breed</label>
                                    <input className={styles.formInput} value={formBreed} onChange={e => setFormBreed(e.target.value)} placeholder="e.g. Maltipoo" />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Age</label>
                                    <input className={styles.formInput} value={formAge} onChange={e => setFormAge(e.target.value)} placeholder="e.g. 2 years" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Weight</label>
                                    <input className={styles.formInput} value={formWeight} onChange={e => setFormWeight(e.target.value)} placeholder="e.g. 4.5 kg" />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Notes</label>
                                <textarea className={styles.formTextarea} value={formNotes} onChange={e => setFormNotes(e.target.value)} placeholder="Any special needs or notes..." />
                            </div>
                        </div>

                        <div className={styles.modalActions}>
                            <button className={styles.primaryBtn} style={{ flex: 1 }} onClick={handleSave}>
                                {editingPet ? 'Save Changes' : 'Add Pet'}
                            </button>
                            <button className={styles.whiteBtn} style={{ flex: 1 }} onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
