"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const languages = [
        { code: "EN", name: "English" },
        { code: "BM", name: "Bahasa Melayu" },
        { code: "ZH", name: "中文" }
    ];

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <Link
                    href="/"
                    className={styles.logo}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >HAIRY HOME</Link>
                <div className={styles.links}>
                    <Link href="/">{t('home')}</Link>
                    <Link href="/#about">{t('about')}</Link>
                    <Link href="/services">{t('services')}</Link>
                    <Link href="/puppies">{t('puppies')}</Link>
                    <Link href="/blog">{t('blog')}</Link>

                    <div className={styles.langSwitcher}>
                        <button
                            className={styles.langBtn}
                            onClick={() => setLangOpen(!langOpen)}
                        >
                            <Globe size={18} />
                            <span>{language}</span>
                            <ChevronDown size={14} className={langOpen ? styles.rotate : ""} />
                        </button>
                        {langOpen && (
                            <div className={styles.langDropdown}>
                                {languages.map((l) => (
                                    <button
                                        key={l.code}
                                        onClick={() => {
                                            setLanguage(l.code as any);
                                            setLangOpen(false);
                                        }}
                                    >
                                        {l.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <a href="https://wa.me/601139968999" className={`${styles.cta} button-retro`}>{t('booking')} &rarr;</a>
                </div>
            </div>
        </nav>
    );
}
