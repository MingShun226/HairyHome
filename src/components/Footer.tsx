"use client";

import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin, ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Link href="/" className={styles.logoWrap}>
                        <Image src="/groomshine_logo.png" alt="GroomShine" width={64} height={64} style={{ borderRadius: '14px' }} />
                        <span className={styles.logo}>GROOMSHINE</span>
                    </Link>
                    <p>{t('footer_tagline')}</p>
                    <div className={styles.socials}>
                        <a href="https://linkedin.com/company/groomshine" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                        <a href="https://facebook.com/groomshine" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                        <a href="https://x.com/groomshine" target="_blank" rel="noopener noreferrer"><Twitter size={20} /></a>
                        <a href="https://instagram.com/groomshine" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                    </div>
                </div>

                <div className={styles.links}>
                    <h4>{t('footer_quick_links')}</h4>
                    <ul>
                        <li><Link href="/about">{t('footer_about')}</Link></li>
                        <li><Link href="/services">{t('footer_browse_services')}</Link></li>
                        <li><Link href="/contact">{t('footer_contact')}</Link></li>
                        <li><Link href="/auth/login">Login / Register</Link></li>
                        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link href="/terms">Terms & Conditions</Link></li>
                    </ul>
                </div>

                <div className={styles.links}>
                    <h4>{t('footer_for_business')}</h4>
                    <ul>
                        <li><Link href="/auth/register">{t('footer_become_partner')}</Link></li>
                        <li><Link href="/services">{t('footer_grooming_link')}</Link></li>
                        <li><Link href="/services">{t('footer_boarding_link')}</Link></li>
                        <li><Link href="/contact">{t('footer_contact')}</Link></li>
                    </ul>
                </div>

                <div className={styles.subscribe}>
                    <h4>{t('footer_connect')}</h4>
                    <div className={styles.inputBox}>
                        <input type="email" placeholder={t('footer_email')} />
                        <button>&rarr;</button>
                    </div>
                    <p className={styles.phone}>+603 8765 4321</p>
                    <p className={styles.address}>Level 12, Tower A, Petaling Street, 50000 Kuala Lumpur</p>
                    <Link href="/auth/register" className={styles.partnerLink}>{t('footer_partner_signup')} &rarr;</Link>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>{t('footer_rights')}</p>
                <button onClick={scrollToTop} className={styles.backToTop}>
                    <ArrowUp size={16} />
                    {t('footer_back_top')}
                </button>
            </div>
        </footer>
    );
}
