"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQ.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { FAQ_ITEMS } from "@/data/faq";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
    const { t } = useLanguage();
    const [openId, setOpenId] = useState<number | null>(1);

    const toggle = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className={styles.section}>
            <div className="container">
                <div className="section-header">
                    <span className="badge-round">❓ {t('faq_badge')}</span>
                    <h2 className="title-lg" style={{ marginTop: '16px' }}>{t('faq_title')}</h2>
                    <p>{t('faq_desc')}</p>
                </div>

                <div className={styles.list}>
                    {FAQ_ITEMS.map((item) => (
                        <motion.div
                            key={item.id}
                            className={`${styles.item} ${openId === item.id ? styles.active : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <button
                                className={styles.question}
                                onClick={() => toggle(item.id)}
                            >
                                <span>{t(item.questionKey)}</span>
                                {openId === item.id ? <Minus size={20} /> : <Plus size={20} />}
                            </button>
                            <AnimatePresence>
                                {openId === item.id && (
                                    <motion.div
                                        className={styles.answer}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p>{t(item.answerKey)}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
