"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, Lightbulb, Users, Award } from "lucide-react";
import Link from "next/link";

const TEAM = [
    { name: "Alvin Tan", role: "Founder & CEO", initial: "A", color: "#E1F5FE" },
    { name: "Sarah Chen", role: "Head Groomer", initial: "S", color: "#FFF9C4" },
    { name: "Raj Kumar", role: "Tech Lead", initial: "R", color: "#FFCCBC" },
    { name: "Nurul Aisyah", role: "Operations Manager", initial: "N", color: "#E8F5E9" }
];

export default function AboutPage() {
    const { t } = useLanguage();

    const values = [
        { icon: Shield, titleKey: "about_value_1_title", descKey: "about_value_1_desc", color: "#E1F5FE" },
        { icon: Lightbulb, titleKey: "about_value_2_title", descKey: "about_value_2_desc", color: "#FFF9C4" },
        { icon: Users, titleKey: "about_value_3_title", descKey: "about_value_3_desc", color: "#FFCCBC" },
        { icon: Award, titleKey: "about_value_4_title", descKey: "about_value_4_desc", color: "#E8F5E9" }
    ];

    return (
        <main>
            <Navbar />
            <PageHero
                image="/dog_boarding_hotel_1769602977566.png"
                badge={t('about_page_badge')}
                title={t('about_page_title')}
                description={t('about_page_desc')}
            />

            <section className={styles.missionVision}>
                <div className="container">
                    <div className={styles.mvGrid}>
                        <motion.div
                            className={`card-retro ${styles.mvCard}`}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3>{t('about_mission_title')}</h3>
                            <p>{t('about_mission_desc')}</p>
                        </motion.div>
                        <motion.div
                            className={`card-retro ${styles.mvCard}`}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3>{t('about_vision_title')}</h3>
                            <p>{t('about_vision_desc')}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className={styles.values}>
                <div className="container">
                    <div className="section-header">
                        <span className="badge-round" style={{ background: 'var(--primary)', color: 'var(--foreground)' }}>{t('about_page_badge')}</span>
                        <h2 className="title-lg" style={{ marginTop: '16px' }}>{t('about_values_title') || 'Our Core Values'}</h2>
                    </div>
                    <div className={styles.valuesGrid}>
                        {values.map((val, i) => (
                            <motion.div
                                key={val.titleKey}
                                className={`card-retro ${styles.valueCard}`}
                                style={{ background: val.color }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <val.icon size={32} color="var(--secondary)" />
                                <h4>{t(val.titleKey)}</h4>
                                <p>{t(val.descKey)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.team}>
                <div className="container">
                    <div className="section-header">
                        <span className="badge-round">{t('about_team_badge')}</span>
                        <h2 className="title-lg" style={{ marginTop: '16px' }}>{t('about_team_title')}</h2>
                    </div>
                    <div className={styles.teamGrid}>
                        {TEAM.map((member, i) => (
                            <motion.div
                                key={member.name}
                                className={`card-retro ${styles.teamCard}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className={styles.teamAvatar} style={{ background: member.color }}>
                                    {member.initial}
                                </div>
                                <h4>{member.name}</h4>
                                <p>{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className="container">
                    <motion.div
                        className={styles.ctaCard}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="title-lg">{t('about_cta_title')}</h2>
                        <p>{t('about_cta_desc')}</p>
                        <Link href="/auth/register" className="button-retro">
                            {t('about_cta_button')} &rarr;
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
