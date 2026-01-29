"use client";

import styles from "./Footer.module.css";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Link href="/" className={styles.logo}>HAIRY HOME</Link>
                    <p>{t('footer_tagline')}</p>
                    <div className={styles.socials}>
                        <a href="#"><Linkedin size={20} /></a>
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                    </div>
                </div>

                <div className={styles.links}>
                    <h4>{t('footer_quick_links')}</h4>
                    <ul>
                        <li><Link href="/">{t('footer_about')}</Link></li>
                        <li><Link href="/">{t('footer_training')}</Link></li>
                        <li><Link href="/">{t('footer_grooming')}</Link></li>
                    </ul>
                </div>

                <div className={styles.subscribe}>
                    <h4>{t('footer_subscribe')}</h4>
                    <div className={styles.inputBox}>
                        <input type="email" placeholder={t('footer_email')} />
                        <button>&rarr;</button>
                    </div>
                    <p className={styles.phone}>+6011 3996 8999</p>
                    <p className={styles.address}>102A,B,C, Jalan Jejaka, Maluri, 55100 Cheras, KL</p>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>{t('footer_rights')}</p>
            </div>
        </footer>
    );
}
