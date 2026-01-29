"use client";

import { motion } from "framer-motion";
import styles from "./Location.module.css";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export default function Location() {
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
                    <span className="badge">Visit Us</span>
                    <h2>Find Us in Cheras</h2>
                    <p>We are conveniently located in Taman Maluri, just minutes away from downtown KL.</p>

                    <div className={styles.details}>
                        <div className={styles.item}>
                            <MapPin className={styles.icon} />
                            <div>
                                <h4>Location</h4>
                                <p>102A,B,C, Jalan Jejaka, Maluri, Cheras 55100 KL</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <Clock className={styles.icon} />
                            <div>
                                <h4>Opening Hours</h4>
                                <p>Monday - Sunday: 11:00 am - 07:00 pm</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <Phone className={styles.icon} />
                            <div>
                                <h4>Call / WhatsApp</h4>
                                <p>+6011-3996 8999</p>
                            </div>
                        </div>
                    </div>

                    <motion.a
                        href="https://api.whatsapp.com/send/?phone=601139968999"
                        className="button-primary"
                        style={{ marginTop: '20px' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Directions
                    </motion.a>
                </motion.div>

                <motion.div
                    className={styles.map}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* In a real scenario, we would use an iframe or a map library */}
                    <div className={styles.mapPlaceholder}>
                        <MapPin size={48} color="var(--primary)" />
                        <p>Interactive Map coming soon</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
