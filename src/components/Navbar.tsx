"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { Globe, ChevronDown, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";
import { Language } from "@/context/LanguageContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setLangOpen(false);
        setMobileOpen(false);
    }, [pathname]);

    const languages = [
        { code: "EN" as const, name: "English" },
        { code: "BM" as const, name: "Bahasa Melayu" },
        { code: "ZH" as const, name: "中文" }
    ];

    const navLinks = [
        { href: "/", label: t('home') },
        { href: "/about", label: t('about') },
        { href: "/services", label: t('services') },
        { href: "/contact", label: t('contact') },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
                <div className={styles.container}>
                    <Link
                        href="/"
                        className={styles.logo}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <Image src="/groomshine_logo.png" alt="GroomShine" width={50} height={50} className={styles.logoImg} />
                        <span>GROOMSHINE</span>
                    </Link>
                    <div className={styles.links}>
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={isActive(link.href) ? styles.activeLink : ""}
                            >
                                {link.label}
                            </Link>
                        ))}

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
                                                setLanguage(l.code);
                                                setLangOpen(false);
                                            }}
                                        >
                                            {l.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href="/auth/login" className={`${styles.cta} button-retro`}>{t('nav_auth')} &rarr;</Link>
                    </div>

                    <button
                        className={styles.hamburger}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {mobileOpen && (
                <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)} />
            )}
            <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ""}`}>
                <div className={styles.mobileLinks}>
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.mobileLink} ${isActive(link.href) ? styles.mobileActive : ""}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className={styles.mobileDivider} />
                <div className={styles.mobileBottom}>
                    <div className={styles.mobileLangRow}>
                        {languages.map((l) => (
                            <button
                                key={l.code}
                                className={`${styles.mobileLangBtn} ${language === l.code ? styles.mobileLangActive : ""}`}
                                onClick={() => setLanguage(l.code)}
                            >
                                {l.code}
                            </button>
                        ))}
                    </div>
                    <Link
                        href="/auth/login"
                        className={styles.mobileCta}
                        onClick={() => setMobileOpen(false)}
                    >
                        {t('nav_auth')} &rarr;
                    </Link>
                </div>
            </div>
        </>
    );
}
