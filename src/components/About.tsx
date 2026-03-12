"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
    const { t } = useLanguage();

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
                        <h3>{t('about_experience')}</h3>
                        <p>{t('about_experience_desc')}</p>
                    </div>
                    <div className={styles.imagePlaceholder}>
                        <Image
                            src="/cat_spa_treatment_1769602943984.png"
                            alt="Pet spa treatment"
                            fill
                            style={{ objectFit: 'cover', borderRadius: '16px' }}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className={styles.contentSide}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="badge-round">{t('about_our_story')}</span>
                    <h2>{t('about_heading')}</h2>
                    <p>{t('about_p1')}</p>
                    <p>{t('about_p2')}</p>

                    <ul className={styles.benefits}>
                        <li>✨ {t('about_benefit_1')}</li>
                        <li>🏠 {t('about_benefit_2')}</li>
                        <li>💖 {t('about_benefit_3')}</li>
                        <li>⚡ {t('about_benefit_4')}</li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
