"use client";

import { motion } from "framer-motion";
import styles from "./Puppies.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const PUPPIES = [
    {
        id: 1,
        breedKey: "breed_maltipoo",
        age: "2",
        charKey: "char_maltipoo",
        image: "/puppies_hero_maltipoo_1769607328264.png"
    },
    {
        id: 2,
        breedKey: "breed_poodle",
        age: "3",
        charKey: "char_poodle",
        image: "/puppies_hero_maltipoo_1769607328264.png"
    },
    {
        id: 3,
        breedKey: "breed_bichon",
        age: "2.5",
        charKey: "char_bichon",
        image: "/puppies_hero_maltipoo_1769607328264.png"
    },
    {
        id: 4,
        breedKey: "breed_pomeranian",
        age: "2",
        charKey: "char_pomeranian",
        image: "/puppies_hero_maltipoo_1769607328264.png"
    }
];

export default function PuppiesPage() {
    const { t } = useLanguage();

    return (
        <main className={styles.main}>
            <Navbar />

            <section className={styles.hero}>
                <div className={styles.heroImgWrapper}>
                    <Image
                        src="/puppies_hero_maltipoo_1769607328264.png"
                        alt="Puppies Hero"
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
                    <span className="badge-round" style={{ background: '#FFCE1A' }}>🐾 {t('puppies_badge')}</span>
                    <h1 className="title-lg" style={{ color: 'white' }}>{t('puppies_hero_title')}</h1>
                    <p className={styles.heroSubtext}>
                        {t('puppies_hero_desc')}
                    </p>
                </motion.div>
            </section>

            <section className={styles.gallery}>
                <div className="container">
                    <div className={styles.grid}>
                        {PUPPIES.map((pup, index) => (
                            <motion.div
                                key={pup.id}
                                className={styles.pupCard}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className={styles.cardImgWrapper}>
                                    <Image src={pup.image} alt={t(pup.breedKey)} fill className={styles.cardImg} />
                                    <div className={styles.tag}>{t('puppies_available')}</div>
                                </div>
                                <div className={styles.pupInfo}>
                                    <h3 className={styles.breedName}>{t(pup.breedKey)}</h3>
                                    <div className={styles.details}>
                                        <span>{pup.age} {t('puppies_old')}</span>
                                        <span className={styles.dot}>•</span>
                                        <span>{t(pup.charKey)}</span>
                                    </div>
                                    <div className={styles.footer}>
                                        <span className={styles.price}>{t('puppies_contact')}</span>
                                        <a href="https://wa.me/601139968999" className="button-retro" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>{t('puppies_inquire')} &rarr;</a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.visit}>
                <div className="container">
                    <div className={styles.visitCard}>
                        <h2 className="title-lg">{t('puppies_visit_title')}</h2>
                        <p>{t('puppies_visit_desc')}</p>
                        <div className={styles.address}>
                            <strong>HAIRY HOME MALURI</strong>
                            <p>No. 3, Jalan Jejaka 2, Taman Maluri, Cheras, 55100 Kuala Lumpur</p>
                        </div>
                        <a href="https://goo.gl/maps/xxxx" className="button-retro">{t('puppies_directions')} &rarr;</a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
