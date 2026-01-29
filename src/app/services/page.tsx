"use client";

import { motion } from "framer-motion";
import styles from "./Services.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const SERVICES = [
    {
        id: "grooming",
        titleKey: "service_grooming",
        image: "/services_hero_grooming_1769607223313.png",
        price: "From RM 50",
        descKey: "service_grooming_desc",
        featureKeys: ["feat_styling", "feat_bathing", "feat_nail", "feat_ear", "feat_facial", "feat_deshed"]
    },
    {
        id: "boarding",
        titleKey: "service_boarding",
        image: "/service_boarding_room_1769607486073.png",
        price: "From RM 40/night",
        descKey: "service_boarding_desc",
        featureKeys: ["feat_private", "feat_social", "feat_supervision", "feat_meal", "feat_photo", "feat_climate"]
    },
    {
        id: "spa",
        titleKey: "service_spa",
        image: "/cat_spa_treatment_1769602943984.png",
        price: "From RM 30",
        descKey: "service_spa_desc",
        featureKeys: ["feat_pore", "feat_oxygen", "feat_odor", "feat_stress", "feat_antibac", "feat_revital"]
    }
];

export default function ServicesPage() {
    const { t } = useLanguage();

    return (
        <main className={styles.main}>
            <Navbar />

            <section className={styles.hero}>
                <div className={styles.heroImgWrapper}>
                    <Image
                        src="/services_hero_grooming_1769607223313.png"
                        alt="Services Hero"
                        fill
                        className={styles.heroImg}
                        priority
                    />
                    <div className={styles.overlay} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.heroContent}
                >
                    <span className="badge-round" style={{ background: '#FFCE1A' }}>🐾 {t('services_badge')}</span>
                    <h1 className="title-lg" style={{ color: 'white' }}>{t('services_hero_title')}</h1>
                    <p className={styles.heroSubtext}>
                        {t('services_hero_desc')}
                    </p>
                </motion.div>
            </section>

            <section className={styles.serviceSection}>
                {SERVICES.map((ser, index) => (
                    <motion.div
                        key={ser.id}
                        className={styles.servicePanel}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className={styles.panelTextSide}>
                            <h2 className={styles.serTitle}>{t(ser.titleKey)}</h2>
                            <p className={styles.serDesc}>{t(ser.descKey)}</p>

                            <div className={styles.featureGrid}>
                                {ser.featureKeys.map((key, i) => (
                                    <div key={i} className={styles.featureItem}>
                                        <CheckCircle2 size={24} className={styles.check} />
                                        <span>{t(key)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.serFooter}>
                                <div className={styles.priceBox}>{ser.price}</div>
                                <a href="https://wa.me/601139968999" className="button-retro">{t('reserve_now')} &rarr;</a>
                            </div>
                        </div>
                        <div className={styles.panelImageSide}>
                            <Image src={ser.image} alt={t(ser.titleKey)} fill className={styles.panelImg} />
                        </div>
                    </motion.div>
                ))}
            </section>

            <Footer />
        </main>
    );
}
