"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Clock, Phone, MessageCircle, CheckCircle } from "lucide-react";

export default function ContactPage() {
    const { t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main>
            <Navbar />
            <PageHero
                image="/services_hero_grooming_1769607223313.png"
                badge={t('contact_badge')}
                title={t('contact_title')}
                description={t('contact_desc')}
            />

            <section className={styles.section}>
                <div className="container">
                    <div className={styles.grid}>
                        <motion.div
                            className={styles.formSide}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            {submitted ? (
                                <div className={styles.success}>
                                    <CheckCircle size={48} color="var(--primary)" />
                                    <h3>{t('contact_success_title')}</h3>
                                    <p>{t('contact_success_desc')}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.formGroup}>
                                        <label>{t('contact_name')}</label>
                                        <input type="text" required />
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.formGroup}>
                                            <label>{t('contact_email')}</label>
                                            <input type="email" required />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>{t('contact_phone')}</label>
                                            <input type="tel" />
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>{t('contact_service_interest')}</label>
                                        <select defaultValue="">
                                            <option value="" disabled>{t('contact_select_service')}</option>
                                            <option value="grooming">{t('service_grooming')}</option>
                                            <option value="boarding">{t('service_boarding')}</option>
                                            <option value="spa">{t('service_spa')}</option>
                                            <option value="puppies">{t('puppies_badge')}</option>
                                        </select>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>{t('contact_message')}</label>
                                        <textarea rows={5} required />
                                    </div>
                                    <button type="submit" className="button-retro" style={{ width: '100%', justifyContent: 'center' }}>
                                        {t('contact_send')} &rarr;
                                    </button>
                                </form>
                            )}
                        </motion.div>

                        <motion.div
                            className={styles.infoSide}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3>{t('contact_info_title')}</h3>
                            <div className={styles.infoCards}>
                                <div className={styles.infoCard}>
                                    <MapPin size={24} color="var(--primary)" />
                                    <div>
                                        <strong>{t('contact_address')}</strong>
                                        <p>Level 12, Tower A, Petaling Street, 50000 Kuala Lumpur</p>
                                    </div>
                                </div>
                                <div className={styles.infoCard}>
                                    <Clock size={24} color="var(--primary)" />
                                    <div>
                                        <strong>{t('contact_hours')}</strong>
                                        <p>{t('contact_hours_value')}</p>
                                    </div>
                                </div>
                                <div className={styles.infoCard}>
                                    <Phone size={24} color="var(--primary)" />
                                    <div>
                                        <strong>{t('location_contact_title')}</strong>
                                        <p>+603 8765 4321</p>
                                    </div>
                                </div>
                                </div>

                            <div className={styles.mapEmbed}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.95!2d101.7069!3d3.1466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49c701efeae7%3A0x713e3a26bfd43a89!2sPetaling%20Street!5e0!3m2!1sen!2smy!4v1700000000000"
                                    width="100%"
                                    height="250"
                                    style={{ border: 0, borderRadius: '12px' }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Location"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
