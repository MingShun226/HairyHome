"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className={styles.hero}>
            <div className={`container ${styles.heroContainer}`}>
                <div className={styles.content}>
                    <motion.div
                        className={styles.textBlock}
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className={styles.topBadge}>
                            <span className="badge-round">🐾 {t('hero_badge')}</span>
                        </div>
                        <h1 className="title-xl">
                            {t('hero_title_1')} <br />
                            {t('hero_title_2')} <br />
                            <span className={styles.accentText}>{t('hero_title_3')}</span>
                        </h1>
                        <p className={styles.subtext}>
                            {t('hero_sub')}
                        </p>
                        <div className={styles.actions}>
                            <a href="#services" className="button-retro">{t('hero_cta')} &rarr;</a>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className={styles.visuals}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className={styles.imageMain}>
                        <div className={styles.dogContainer}>
                            <Image
                                src="/hero_dog_grooming_1769602911628.png"
                                alt="Happy Pomeranian"
                                fill
                                className={styles.mainImg}
                                priority
                            />
                        </div>
                        <div className={styles.floatingTag}>
                            <span className={styles.tagLabel}>{t('hero_trusted')}</span>
                            <p className={styles.tagDesc}>{t('hero_rated')}</p>
                        </div>
                    </div>

                    <div className={styles.badgeModern}>
                        <div className={styles.tagItem}>{t('hero_tag_grooming')}</div>
                        <div className={styles.tagItem}>{t('hero_tag_boarding')}</div>
                        <div className={styles.tagItem}>{t('hero_tag_spa')}</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
