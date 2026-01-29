"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className={styles.about}>
            <div className={styles.grid}>
                <motion.div
                    className={styles.imageSide}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.experienceCard}>
                        <h3>5+ Years</h3>
                        <p>of Professional Grooming</p>
                    </div>
                    <div className={styles.imagePlaceholder}>
                        {/* Placeholder for About Image */}
                        <span style={{ fontSize: '10rem' }}>🐾</span>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.contentSide}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="badge">Our Story</span>
                    <h2>A Second Home for Your <br />Furry Family Members</h2>
                    <p>
                        Founded in the heart of Taman Maluri, Hairy Home began with a simple mission:
                        to provide a safe, non-aggressive, and loving environment for pets.
                    </p>
                    <p>
                        We believe that grooming is more than just a haircut—it's about health,
                        comfort, and building trust. Our cage-free boarding ensures your pets
                        feel free and happy even when you're away.
                    </p>

                    <ul className={styles.benefits}>
                        <li>✨ Certified Professional Groomers</li>
                        <li>🏠 Cage-Free & Clean Environment</li>
                        <li>💖 Gentle, Non-Aggressive Approach</li>
                        <li>⚡ Easy WhatsApp Booking</li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
