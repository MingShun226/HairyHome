"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../Auth.module.css";
import { User, Briefcase, Mail, Lock, ChevronLeft, ShieldCheck, Star, ChevronDown } from "lucide-react";

export default function RegisterPage() {
    const [role, setRole] = useState<"user" | "b2b">("user");
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const router = useRouter();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(role === "user" ? "/dashboard/user" : "/dashboard/b2b");
    };

    // Close dropdown on click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isRoleOpen && !(event.target as Element).closest(`.${styles.customSelectWrapper}`)) {
                setIsRoleOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isRoleOpen]);

    return (
        <div className={styles.authPageWrapper}>
            <Link href="/" className={styles.backLink}>
                <ChevronLeft size={18} /> Back to Home
            </Link>

            <div className={styles.authContent}>
                {/* Left Section: Form */}
                <div className={styles.authFormSection}>
                    <h1 className={styles.authTitle}>Create Account</h1>
                    <p className={styles.authSub}>Join the GroomShine community today</p>

                    <div className={styles.authCard}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Register As</label>
                            <div className={styles.customSelectWrapper}>
                                <div 
                                    className={`${styles.selectTrigger} ${isRoleOpen ? styles.selectTriggerOpen : ""}`}
                                    onClick={() => setIsRoleOpen(!isRoleOpen)}
                                >
                                    <User className={styles.selectIcon} size={18} />
                                    <span>{role === "user" ? "Pet Owner" : "Business Partner"}</span>
                                    <ChevronDown className={`${styles.chevronIcon} ${isRoleOpen ? styles.chevronIconRotated : ""}`} size={16} />
                                </div>
                                
                                {isRoleOpen && (
                                    <div className={styles.selectMenu}>
                                        <div 
                                            className={`${styles.selectOption} ${role === "user" ? styles.selectOptionActive : ""}`}
                                            onClick={() => { setRole("user"); setIsRoleOpen(false); }}
                                        >
                                            <User size={16} /> Pet Owner
                                        </div>
                                        <div 
                                            className={`${styles.selectOption} ${role === "b2b" ? styles.selectOptionActive : ""}`}
                                            onClick={() => { setRole("b2b"); setIsRoleOpen(false); }}
                                        >
                                            <Briefcase size={16} /> Business Partner
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <form onSubmit={handleRegister}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>First Name</label>
                                    <input type="text" className={styles.input} placeholder="John" style={{ paddingLeft: '15px' }} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Last Name</label>
                                    <input type="text" className={styles.input} placeholder="Doe" style={{ paddingLeft: '15px' }} />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email Address</label>
                                <div className={styles.inputWrapper}>
                                    <Mail className={styles.inputIcon} size={18} />
                                    <input type="email" className={styles.input} placeholder="Enter your email (Optional)" />
                                </div>
                            </div>

                            {role === "b2b" && (
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Business Name</label>
                                    <div className={styles.inputWrapper}>
                                        <Briefcase className={styles.inputIcon} size={18} />
                                        <input type="text" className={styles.input} placeholder="Happy Paws Spa (Optional)" />
                                    </div>
                                </div>
                            )}

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Password</label>
                                <div className={styles.inputWrapper}>
                                    <Lock className={styles.inputIcon} size={18} />
                                    <input type="password" className={styles.input} placeholder="Create a password (Optional)" />
                                </div>
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Create Account
                            </button>

                            <div className={styles.authFooter}>
                                Already have an account? <Link href="/auth/login" className={styles.authLink}>Login</Link>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Section: Info */}
                <div className={styles.infoSection}>
                    <h2 className={styles.infoTitle}>Why join GroomShine?</h2>
                    
                    <div className={styles.infoItem}>
                        <div className={styles.infoIcon}><ShieldCheck size={24} /></div>
                        <div className={styles.infoText}>
                            <h3>Secure Account</h3>
                            <p>Verify your identity and keep your pet's records safe in our encrypted platform.</p>
                        </div>
                    </div>

                    <div className={styles.infoItem}>
                        <div className={styles.infoIcon}><Star size={24} /></div>
                        <div className={styles.infoText}>
                            <h3>Verified Partners</h3>
                            <p>Connect with top-rated pet professionals who have passed our strict quality checks.</p>
                        </div>
                    </div>

                    <div className={styles.benefitsBox}>
                        <h3 className={styles.benefitsTitle}>Membership Benefits</h3>
                        <ul className={styles.benefitsList}>
                            <li>Exclusive discounts for early adopters</li>
                            <li>Personalized pet care recommendations</li>
                            <li>Early access to new platform features</li>
                        <li>Priority booking for popular services</li>
                        </ul>
                    </div>

                    {role === "b2b" && (
                        <div style={{ display: 'flex', gap: '15px', padding: '20px', background: 'rgba(61, 90, 153, 0.05)', borderRadius: '10px', border: '1px dashed var(--primary)' }}>
                            <ShieldCheck size={24} color="var(--primary)" />
                            <p style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 600 }}>
                                Professional B2B profiles require administrative validation before appearing in search results.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
