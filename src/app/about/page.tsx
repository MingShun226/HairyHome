"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, Lightbulb, Users, Award, Heart, PawPrint, MapPin, Star, Clock, CheckCircle, TrendingUp, Handshake } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const TEAM = [
    { name: "Alvin Tan", role: "Founder & CEO", initial: "A", color: "#E1F5FE", bio: "Passionate pet lover with 10+ years in tech, dedicated to transforming pet care in Malaysia." },
    { name: "Sarah Chen", role: "Head Groomer", initial: "S", color: "#FFF9C4", bio: "Certified professional groomer with expertise in breed-specific styling and gentle handling." },
    { name: "Raj Kumar", role: "Tech Lead", initial: "R", color: "#FFCCBC", bio: "Full-stack engineer building seamless booking experiences for pet owners and partners." },
    { name: "Nurul Aisyah", role: "Operations Manager", initial: "N", color: "#E8F5E9", bio: "Ensuring every partner meets our quality standards and every booking runs smoothly." }
];

const STATS = [
    { value: "500+", label: "Verified Partners", icon: Handshake },
    { value: "50K+", label: "Happy Pet Owners", icon: Heart },
    { value: "14", label: "States Covered", icon: MapPin },
    { value: "4.9★", label: "Average Rating", icon: Star },
];

const JOURNEY = [
    { year: "2021", title: "The Spark", desc: "Founded in Cheras, KL — started as a single grooming shop with a vision for better pet care." },
    { year: "2022", title: "Going Digital", desc: "Launched the GroomShine platform to connect pet owners with verified service providers online." },
    { year: "2023", title: "Rapid Growth", desc: "Expanded to 100+ partners across KL, Selangor, and Johor. Introduced boarding and daycare." },
    { year: "2024", title: "Nationwide", desc: "Reached all 14 states in Malaysia. Launched B2B partner dashboard and admin analytics." },
    { year: "2025", title: "Smart Platform", desc: "Introduced AI-powered recommendations, real-time booking, and nano bubble spa partnerships." },
    { year: "2026", title: "The Future", desc: "Building Southeast Asia's largest pet services marketplace with 500+ verified partners." },
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

            {/* Our Story */}
            <section className={styles.story}>
                <div className="container">
                    <div className={styles.storyGrid}>
                        <motion.div
                            className={styles.storyImage}
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src="/hero_dog_grooming_1769602911628.png"
                                alt="GroomShine Story"
                                fill
                                style={{ objectFit: "cover", borderRadius: "20px" }}
                            />
                            <div className={styles.storyOverlay}>
                                <PawPrint size={32} />
                                <span>Since 2021</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className={styles.storyContent}
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="badge-round">🐾 {t('about_our_story')}</span>
                            <h2 className="title-lg">{t('about_heading')}</h2>
                            <p>{t('about_p1')}</p>
                            <p>{t('about_p2')}</p>
                            <div className={styles.storyHighlights}>
                                <div className={styles.highlight}>
                                    <CheckCircle size={20} color="var(--secondary)" />
                                    <span>{t('about_benefit_1')}</span>
                                </div>
                                <div className={styles.highlight}>
                                    <CheckCircle size={20} color="var(--secondary)" />
                                    <span>{t('about_benefit_2')}</span>
                                </div>
                                <div className={styles.highlight}>
                                    <CheckCircle size={20} color="var(--secondary)" />
                                    <span>{t('about_benefit_3')}</span>
                                </div>
                                <div className={styles.highlight}>
                                    <CheckCircle size={20} color="var(--secondary)" />
                                    <span>{t('about_benefit_4')}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className={styles.stats}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className={styles.statCard}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <stat.icon size={28} className={styles.statIcon} />
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className={styles.missionVision}>
                <div className="container">
                    <div className={styles.mvGrid}>
                        <motion.div
                            className={`card-retro ${styles.mvCard}`}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.mvIcon}>
                                <TrendingUp size={28} />
                            </div>
                            <h3>{t('about_mission_title')}</h3>
                            <p>{t('about_mission_desc')}</p>
                        </motion.div>
                        <motion.div
                            className={`card-retro ${styles.mvCard}`}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.mvIcon}>
                                <Star size={28} />
                            </div>
                            <h3>{t('about_vision_title')}</h3>
                            <p>{t('about_vision_desc')}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className={styles.values}>
                <div className="container">
                    <div className="section-header">
                        <span className="badge-round" style={{ background: 'var(--primary)', color: 'var(--foreground)' }}>✨ OUR PRINCIPLES</span>
                        <h2 className="title-lg" style={{ marginTop: '16px' }}>{t('about_values_title') || 'Our Core Values'}</h2>
                    </div>
                    <div className={styles.valuesGrid}>
                        {values.map((val, i) => (
                            <motion.div
                                key={val.titleKey}
                                className={`card-retro ${styles.valueCard}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className={styles.valueIcon} style={{ background: val.color }}>
                                    <val.icon size={28} color="var(--secondary)" />
                                </div>
                                <h4>{t(val.titleKey)}</h4>
                                <p>{t(val.descKey)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Timeline */}
            <section className={styles.journey}>
                <div className="container">
                    <div className="section-header">
                        <span className="badge-round">🚀 OUR JOURNEY</span>
                        <h2 className="title-lg" style={{ marginTop: '16px' }}>From a Small Shop to a National Platform</h2>
                    </div>
                    <div className={styles.timeline}>
                        {JOURNEY.map((item, i) => (
                            <motion.div
                                key={item.year}
                                className={styles.timelineItem}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <div className={styles.timelineYear}>{item.year}</div>
                                <div className={styles.timelineDot} />
                                <div className={styles.timelineContent}>
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className={styles.team}>
                <div className="container">
                    <div className="section-header">
                        <span className="badge-round">👥 {t('about_team_badge')}</span>
                        <h2 className="title-lg" style={{ marginTop: '16px' }}>{t('about_team_title')}</h2>
                        <p style={{ maxWidth: '600px', margin: '12px auto 0', color: 'var(--text-muted)' }}>
                            A passionate team of pet lovers, technologists, and service professionals dedicated to making pet care better for everyone.
                        </p>
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
                                <span className={styles.teamRole}>{member.role}</span>
                                <p className={styles.teamBio}>{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <motion.div
                        className={styles.ctaCard}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <PawPrint size={40} color="var(--secondary)" style={{ marginBottom: '16px' }} />
                        <h2 className="title-lg">{t('about_cta_title')}</h2>
                        <p>{t('about_cta_desc')}</p>
                        <div className={styles.ctaButtons}>
                            <Link href="/auth/register" className="button-retro">
                                {t('about_cta_button')} &rarr;
                            </Link>
                            <Link href="/services" className={styles.ctaSecondary}>
                                Browse Services &rarr;
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
