"use client";

import { motion } from "framer-motion";
import styles from "./PetCollection.module.css";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const PETS = [
    { nameKey: "collection_cat_spa", color: "#E1F5FE", img: "/cat_spa_treatment_1769602943984.png" },
    { nameKey: "collection_dog_hotel", color: "#FFF9C4", img: "/dog_boarding_hotel_1769602977566.png" },
    { nameKey: "collection_grooming", color: "#FFCCBC", img: "/hero_dog_grooming_1769602911628.png" }
];

export default function PetCollection() {
    const { t } = useLanguage();

    return (
        <section className={styles.wrapper} id="services">
            <div className="container">
                <header className={styles.header}>
                    <h2 className="title-lg">{t('collection_title')}</h2>
                    <p>{t('collection_desc')}</p>
                </header>

                <div className={styles.grid}>
                    {PETS.map((pet, index) => (
                        <motion.div
                            key={pet.nameKey}
                            className="card-retro"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className={styles.imgWrapper} style={{ backgroundColor: pet.color }}>
                                <Image
                                    src={pet.img}
                                    alt={t(pet.nameKey)}
                                    fill
                                    className={styles.petImg}
                                />
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.petName}>{t(pet.nameKey)}</h3>
                                <a href='/services' className={styles.more}>{t('view_details')} &rarr;</a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
