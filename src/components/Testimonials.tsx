"use client";

import styles from "./Testimonials.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { TESTIMONIALS } from "@/data/testimonials";
import { Star } from "lucide-react";

export default function Testimonials() {
    const { t } = useLanguage();

    // Triple the items for seamless loop
    const items = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

    return (
        <section className={styles.section}>
            <div className="container">
                <div className="section-header">
                    <span className="badge-round">⭐ {t('testimonials_badge')}</span>
                    <h2 className="title-lg" style={{ marginTop: '16px' }}>{t('testimonials_title')}</h2>
                    <p>{t('testimonials_desc')}</p>
                </div>

                <div className={styles.carousel}>
                    <div className={styles.track}>
                        {items.map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className={styles.card}
                                style={{ background: item.color }}
                            >
                                <div className={styles.quote}>&ldquo;</div>
                                <p className={styles.text}>{item.quote}</p>
                                <div className={styles.stars}>
                                    {Array.from({ length: item.rating }).map((_, i) => (
                                        <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                                    ))}
                                </div>
                                <div className={styles.author}>
                                    <div className={styles.avatar} style={{ background: item.color, borderColor: 'black' }}>
                                        {item.initial}
                                    </div>
                                    <div>
                                        <strong>{item.name}</strong>
                                        <span>{item.petType} • {item.service}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
