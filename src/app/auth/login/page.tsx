"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../Auth.module.css";
import { Mail, Lock, ChevronLeft, ShieldCheck, Star, Calendar, User, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (role === "admin" || email.includes("admin")) {
            router.push("/dashboard/admin");
        } else if (role === "partner" || email.includes("partner")) {
            router.push("/dashboard/b2b");
        } else {
            router.push("/dashboard/user");
        }
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

    const getRoleLabel = (r: string) => {
        switch(r) {
            case "admin": return "Platform Admin";
            case "partner": return "Business Partner";
            default: return "Pet Owner";
        }
    };

    return (
        <div className={styles.authPageWrapper}>
            <Link href="/" className={styles.backLink}>
                <ChevronLeft size={18} /> Back to Home
            </Link>

            <div className={styles.authContent}>
                {/* Left Section: Form */}
                <div className={styles.authFormSection}>
                    <h1 className={styles.authTitle}>Welcome Back</h1>
                    <p className={styles.authSub}>Sign in to your GroomShine account</p>

                    <div className={styles.authCard}>
                        <form onSubmit={handleLogin}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Login As</label>
                                <div className={styles.customSelectWrapper}>
                                    <div 
                                        className={`${styles.selectTrigger} ${isRoleOpen ? styles.selectTriggerOpen : ""}`}
                                        onClick={() => setIsRoleOpen(!isRoleOpen)}
                                    >
                                        <User className={styles.selectIcon} size={18} />
                                        <span>{getRoleLabel(role)}</span>
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
                                                className={`${styles.selectOption} ${role === "partner" ? styles.selectOptionActive : ""}`}
                                                onClick={() => { setRole("partner"); setIsRoleOpen(false); }}
                                            >
                                                <Star size={16} /> Business Partner
                                            </div>
                                            <div 
                                                className={`${styles.selectOption} ${role === "admin" ? styles.selectOptionActive : ""}`}
                                                onClick={() => { setRole("admin"); setIsRoleOpen(false); }}
                                            >
                                                <ShieldCheck size={16} /> Platform Admin
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email Address</label>
                                <div className={styles.inputWrapper}>
                                    <Mail className={styles.inputIcon} size={18} />
                                    <input 
                                        type="email" 
                                        className={styles.input} 
                                        placeholder="Enter your email (Optional for prototype)" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Password</label>
                                <div className={styles.inputWrapper}>
                                    <Lock className={styles.inputIcon} size={18} />
                                    <input 
                                        type="password" 
                                        className={styles.input} 
                                        placeholder="Enter your password (Optional for prototype)" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles.formExtra}>
                                <label className={styles.rememberMe}>
                                    <input type="checkbox" /> Remember me
                                </label>
                                <Link href="#" className={styles.authLink}>Forgot password?</Link>
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Sign In
                            </button>

                            <div className={styles.socialDivider}>Or continue with</div>

                            <div className={styles.socialBtns}>
                                <button type="button" className={styles.socialBtn}>
                                    <Image src="https://www.google.com/favicon.ico" alt="Google" width={16} height={16} /> Google
                                </button>
                                <button type="button" className={styles.socialBtn}>
                                    <Image src="https://www.facebook.com/favicon.ico" alt="Facebook" width={16} height={16} /> Facebook
                                </button>
                            </div>

                            <div className={styles.authFooter} style={{ marginTop: '25px' }}>
                                Don't have an account? <Link href="/auth/register" className={styles.authLink}>Sign up</Link>
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
                            <p>Your pet and business data is protected with platform-grade security and verification.</p>
                        </div>
                    </div>

                    <div className={styles.infoItem}>
                        <div className={styles.infoIcon}><Star size={24} /></div>
                        <div className={styles.infoText}>
                            <h3>Trusted Providers</h3>
                            <p>Access a curated marketplace of verified pet shops, clinics, and groomers in Malaysia.</p>
                        </div>
                    </div>

                    <div className={styles.infoItem}>
                        <div className={styles.infoIcon}><Calendar size={24} /></div>
                        <div className={styles.infoText}>
                            <h3>Easy Booking</h3>
                            <p>Manage all your pet's needs—from grooming to boarding—in one seamless platform.</p>
                        </div>
                    </div>

                    <div className={styles.benefitsBox}>
                        <h3 className={styles.benefitsTitle}>Exclusive Platform Benefits</h3>
                        <ul className={styles.benefitsList}>
                            <li>Direct communication with verified shops</li>
                            <li>Real-time booking status & reminders</li>
                            <li>Trusted community ratings & reviews</li>
                            <li>Priority customer support for pet owners</li>
                        </ul>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: '#8C7E7E' }}>
                        New business partner? <Link href="/#about" className={styles.authLink}>Explore our services</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
