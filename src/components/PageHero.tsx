"use client";

import { motion } from "framer-motion";
import styles from "./PageHero.module.css";
import Image from "next/image";

interface PageHeroProps {
    image: string;
    badge: string;
    title: string;
    description: string;
    badgeColor?: string;
}

export default function PageHero({ image, badge, title, description, badgeColor = "#FFCE1A" }: PageHeroProps) {
    return (
        <section className={styles.hero}>
            <div className={styles.imgWrapper}>
                <Image src={image} alt={title} fill className={styles.img} priority />
                <div className={styles.overlay} />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={styles.content}
            >
                <span className="badge-round" style={{ background: badgeColor }}>🐾 {badge}</span>
                <h1 className="title-lg" style={{ color: 'white' }}>{title}</h1>
                <p className={styles.desc}>{description}</p>
            </motion.div>
        </section>
    );
}
