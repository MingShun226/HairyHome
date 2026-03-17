"use client";

import { motion } from "framer-motion";
import styles from "./Benefits.module.css";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useCallback } from "react";

export default function AboutUs() {
    const { t } = useLanguage();
    const videoRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);
    const apiReadyRef = useRef(false);

    const createPlayer = useCallback(() => {
        if (playerRef.current || !videoRef.current) return;
        const iframe = videoRef.current.querySelector('iframe');
        if (!iframe) return;

        playerRef.current = new (window as any).YT.Player(iframe, {
            events: {
                onReady: () => { apiReadyRef.current = true; },
            },
        });
    }, []);

    useEffect(() => {
        // Load YouTube IFrame API
        if (!(window as any).YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(tag);
            (window as any).onYouTubeIframeAPIReady = () => createPlayer();
        } else {
            createPlayer();
        }

        // IntersectionObserver for autoplay on scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!playerRef.current || !apiReadyRef.current) return;
                    try {
                        if (entry.isIntersecting) {
                            playerRef.current.playVideo();
                        } else {
                            playerRef.current.pauseVideo();
                        }
                    } catch (e) { /* player not ready yet */ }
                });
            },
            { threshold: 0.4 }
        );

        const el = videoRef.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [createPlayer]);

    return (
        <section className={styles.aboutWrapper} id="about">
            <div className="container">
                <div className={styles.introSplit}>
                    <motion.div
                        className={styles.info}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="badge-round">{t('about_badge')}</span>
                        <h2 className="title-lg">{t('about_title')}</h2>
                        <p className={styles.introText}>
                            {t('about_desc')}
                        </p>
                        <div className={styles.actions}>
                            <Link href="/services" className="button-retro">{t('about_cta')}</Link>
                        </div>
                    </motion.div>
                    <motion.div
                        className={styles.introVideo}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div ref={videoRef} className={styles.videoPlaceholder} style={{ border: 'none', background: 'transparent', padding: 0 }}>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/KdKSgJ3LImM?enablejsapi=1&mute=1&rel=0"
                                title="Hairy Home - Our Story"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ borderRadius: 'var(--radius-lg)', width: '100%', height: '100%', display: 'block' }}
                            />
                        </div>
                    </motion.div>
                </div>

                <div className={styles.storyGrid}>
                    <motion.div
                        className={styles.storyVisual}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-retro">
                            <Image
                                src="/cat_spa_treatment_1769602943984.png"
                                alt="Pet Spa Day"
                                width={600}
                                height={500}
                                className={styles.storyImg}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.storyInfo}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className={styles.subtitle}>{t('about_story')}</span>
                        <h3 className={styles.storyTitle}>{t('about_story_title')}</h3>
                        <p>
                            {t('about_story_desc')}
                        </p>

                        <div className={styles.serviceList}>
                            <h4>{t('about_grooming_includes')}</h4>
                            <ul>
                                <li>🐾 {t('about_grooming_1')}</li>
                                <li>🐾 {t('about_grooming_2')}</li>
                                <li>🐾 {t('about_grooming_3')}</li>
                                <li>🐾 {t('about_grooming_4')}</li>
                                <li>🐾 {t('about_grooming_5')}</li>
                                <li>🐾 {t('about_grooming_6')}</li>
                                <li>🐾 {t('about_grooming_7')}</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
