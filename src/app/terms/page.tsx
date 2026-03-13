"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function TermsPage() {
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
                            Terms & Conditions
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', fontWeight: 500 }}>
                            Last updated: March 2026
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--foreground)' }}>
                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>1. Acceptance of Terms</h2>
                                <p>By accessing or using GroomShine (&quot;the Platform&quot;), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the Platform. These terms apply to all users, including pet owners, service partners, and visitors.</p>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>2. Platform Services</h2>
                                <p>GroomShine is a marketplace platform that connects pet owners with verified pet service providers in Malaysia. We facilitate bookings, payments, and reviews but do not directly provide pet services. The quality and delivery of services are the responsibility of individual service partners.</p>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>3. User Accounts</h2>
                                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li>You must provide accurate and complete information when creating an account.</li>
                                    <li>You are responsible for maintaining the security of your account credentials.</li>
                                    <li>You must be at least 18 years old to create an account.</li>
                                    <li>GroomShine reserves the right to suspend or terminate accounts that violate these terms.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>4. Bookings & Payments</h2>
                                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li>All bookings are subject to availability and confirmation by the service partner.</li>
                                    <li>Payments are processed securely through our payment partners (e.g., iPay88).</li>
                                    <li>Funds are held in escrow until the service is marked as complete.</li>
                                    <li>GroomShine charges a 10% commission on each transaction to service partners.</li>
                                    <li>Cancellation policies vary by service partner. Please review before booking.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>5. Service Partners</h2>
                                <p>Partners listed on GroomShine must:</p>
                                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li>Hold valid business licenses and relevant permits.</li>
                                    <li>Provide accurate service descriptions, pricing, and availability.</li>
                                    <li>Maintain professional standards of care for all animals.</li>
                                    <li>Respond to bookings and customer inquiries in a timely manner.</li>
                                    <li>Comply with all applicable Malaysian laws and regulations.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>6. Reviews & Content</h2>
                                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li>Reviews must be honest, accurate, and based on genuine experiences.</li>
                                    <li>Fraudulent, defamatory, or abusive reviews will be removed.</li>
                                    <li>By submitting content (reviews, photos), you grant GroomShine a non-exclusive licence to display it on the platform.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>7. Verification Badges</h2>
                                <p>GroomShine assigns verification levels to partners based on review count and service quality:</p>
                                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li><strong>Level 1 (Blue):</strong> 100+ verified reviews.</li>
                                    <li><strong>Level 2 (Orange):</strong> 200+ verified reviews.</li>
                                    <li><strong>Level 3 (Purple):</strong> 300+ verified reviews.</li>
                                </ul>
                                <p style={{ marginTop: '8px' }}>Badges are automatically assigned and may be revoked if a partner falls below quality standards.</p>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>8. Limitation of Liability</h2>
                                <p>GroomShine acts as a marketplace intermediary. We are not liable for:</p>
                                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li>The quality, safety, or outcome of services provided by partners.</li>
                                    <li>Any injury, loss, or damage to pets during services.</li>
                                    <li>Disputes between users and service partners (though we will assist in mediation).</li>
                                    <li>Service interruptions or technical issues beyond our control.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>9. Intellectual Property</h2>
                                <p>All content on GroomShine, including logos, designs, text, and software, is owned by GroomShine Sdn Bhd and protected under Malaysian intellectual property laws. Unauthorised reproduction or distribution is prohibited.</p>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>10. Governing Law</h2>
                                <p>These Terms & Conditions are governed by the laws of Malaysia. Any disputes shall be subject to the exclusive jurisdiction of the Malaysian courts.</p>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>11. Changes to Terms</h2>
                                <p>We reserve the right to modify these terms at any time. Users will be notified of significant changes. Continued use of the platform after modifications constitutes acceptance of the updated terms.</p>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--secondary)' }}>12. Contact Us</h2>
                                <p>For questions regarding these Terms & Conditions:</p>
                                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li>Email: <strong>legal@groomshine.com</strong></li>
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
