"use client";

import { motion } from "framer-motion";
import styles from "./HowWeServe.module.css";
import { Check } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const SERVICE_KEYS = ["serve_1", "serve_2", "serve_3", "serve_4"];

export default function HowWeServe() {
    const { t } = useLanguage();

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
            <div className={styles.grid}>
                <motion.div
                    className={styles.info}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="badge-round">{t('serve_badge')}</span>
                    <h2 className="title-lg">{t('serve_title')}</h2>
                    <p className={styles.desc}>
                        {t('serve_desc')}
                    </p>
                    <ul className={styles.list}>
                        {SERVICE_KEYS.map(key => (
                            <li key={key}><Check size={20} className={styles.check} /> {t(key)}</li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    className={styles.visuals}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="card-retro">
                        <Image
                            src="/grooming_tools_flatlay_1769603003880.png"
                            alt="Grooming Tools"
                            width={480}
                            height={360}
                            className={styles.sideImg}
                        />
                    </div>
                </motion.div>
            </div>
            </div>
        </section>
    );
}
