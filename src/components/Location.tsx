"use client";

import { motion } from "framer-motion";
import styles from "./Location.module.css";
import { MapPin, Clock, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Location() {
    const { t } = useLanguage();

    return (
        <section id="contact" className={styles.location}>
            <div className={styles.grid}>
                <motion.div
                    className={styles.info}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="badge-round">{t('location_badge')}</span>
                    <h2>{t('location_title')}</h2>
                    <p>{t('location_desc')}</p>

                    <div className={styles.details}>
                        <div className={styles.item}>
                            <MapPin className={styles.icon} />
                            <div>
                                <h4>{t('location_address_title')}</h4>
                                <p>102A,B,C, Jalan Jejaka, Maluri, Cheras 55100 KL</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <Clock className={styles.icon} />
                            <div>
                                <h4>{t('location_hours_title')}</h4>
                                <p>{t('location_hours_value')}</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <Phone className={styles.icon} />
                            <div>
                                <h4>{t('location_contact_title')}</h4>
                                <p>+6011-3996 8999</p>
                            </div>
                        </div>
                    </div>

                    <motion.a
                        href="https://www.google.com/maps/search/?api=1&query=102A,B,C,Jalan+Jejaka,Maluri,Cheras,55100+KL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-retro"
                        style={{ marginTop: '20px', fontSize: '0.95rem', padding: '14px 28px' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t('location_directions')} &rarr;
                    </motion.a>
                </motion.div>

                <motion.div
                    className={styles.map}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.mapContainer}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.85!2d101.7301!3d3.1075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMDYnMjcuMCJOIDEwMcKwNDMnNDguNCJF!5e0!3m2!1sen!2smy!4v1700000000000"
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: '16px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="GroomShine Location"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
