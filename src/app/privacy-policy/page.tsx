"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
    return (
        <>
            <Navbar />
            <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
                <div className="container" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
<motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: 'white',
                            borderRadius: 'var(--radius-lg)',
                            border: '1.5px solid rgba(61, 90, 153, 0.1)',
                            padding: 'clamp(24px, 5vw, 48px)',
                            maxWidth: '900px',
                            margin: '0 auto',
                            boxShadow: '0 2px 12px rgba(61, 90, 153, 0.06)',
                        }}
                    >
                        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: '8px', color: 'var(--foreground)' }}>
                            Privacy Policy
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', fontWeight: 500 }}>
                            Last updated: March 2026
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--foreground)' }}>
                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>1. Information We Collect</h2>
                                <p>When you use GroomShine, we may collect the following information:</p>
                                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li><strong>Personal Information:</strong> Name, email address, phone number, and profile details provided during registration.</li>
                                    <li><strong>Pet Information:</strong> Pet names, breeds, ages, and health notes you add to your profile.</li>
                                    <li><strong>Booking Data:</strong> Service bookings, appointment history, reviews, and payment records.</li>
                                    <li><strong>Usage Data:</strong> Pages visited, features used, browser type, device information, and IP address.</li>
                                    <li><strong>Location Data:</strong> Approximate location for finding nearby pet service providers (with your consent).</li>
                                </ul>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>2. How We Use Your Information</h2>
                                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li>To provide, operate, and improve our platform and services.</li>
                                    <li>To process bookings and facilitate payments between pet owners and service partners.</li>
                                    <li>To send booking confirmations, reminders, and service updates.</li>
                                    <li>To personalise your experience with relevant service recommendations.</li>
                                    <li>To verify partner businesses and maintain platform trust and safety.</li>
                                    <li>To comply with legal obligations and enforce our Terms & Conditions.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>3. Information Sharing</h2>
                                <p>We do not sell your personal data. We may share information with:</p>
                                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li><strong>Service Partners:</strong> Your name, pet details, and booking info are shared with the partner you book with.</li>
                                    <li><strong>Payment Processors:</strong> Payment details are securely processed by third-party providers (e.g., iPay88).</li>
                                    <li><strong>Legal Authorities:</strong> When required by law, regulation, or legal proceedings.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>4. Data Security</h2>
                                <p>We implement industry-standard security measures including encryption, secure servers, and access controls to protect your data. However, no method of electronic transmission is 100% secure, and we cannot guarantee absolute security.</p>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>5. Cookies</h2>
                                <p>We use cookies and similar technologies to enhance your browsing experience, remember preferences, and analyse platform usage. You can manage cookie preferences through your browser settings.</p>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>6. Your Rights</h2>
                                <p>You have the right to:</p>
                                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li>Access, update, or delete your personal information.</li>
                                    <li>Withdraw consent for data processing at any time.</li>
                                    <li>Request a copy of the data we hold about you.</li>
                                    <li>Opt out of marketing communications.</li>
                                </ul>
                                <p style={{ marginTop: '8px' }}>To exercise these rights, contact us at <strong>privacy@groomshine.com</strong>.</p>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>7. Changes to This Policy</h2>
                                <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a notice on our platform. Continued use of GroomShine after changes constitutes acceptance of the updated policy.</p>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>8. Contact Us</h2>
                                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li>Email: <strong>privacy@groomshine.com</strong></li>
                                    <li>Phone: <strong>+603 8765 4321</strong></li>
                                    <li>Address: Level 12, Tower A, Petaling Street, 50000 Kuala Lumpur, Malaysia</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
