"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Search, MapPin, Briefcase, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./Hero.module.css";

export default function Hero() {
    const { t } = useLanguage();
    const [areaOpen, setAreaOpen] = useState(false);
    const [serviceOpen, setServiceOpen] = useState(false);
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedService, setSelectedService] = useState("");
    
    const areaRef = useRef<HTMLDivElement>(null);
    const serviceRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (selectedArea) params.set('area', selectedArea);
        if (selectedService) params.set('service', selectedService);
        router.push(`/services${params.toString() ? '?' + params.toString() : ''}`);
    };

    const areas = ["KL", "Selangor", "Johor", "Penang", "Perak", "Negeri Sembilan", "Melaka", "Pahang", "Terengganu", "Kelantan", "Kedah", "Perlis", "Sabah", "Sarawak"];
    const services = ["Grooming", "Daycare", "Hostel", "Clinic", "Training"];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (areaRef.current && !areaRef.current.contains(event.target as Node)) setAreaOpen(false);
            if (serviceRef.current && !serviceRef.current.contains(event.target as Node)) setServiceOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <section className={styles.hero}>
            <div className={`container ${styles.heroContainer}`}>
                <div className={styles.content}>
                    <motion.div
                        className={styles.textBlock}
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className={styles.topBadge}>
                            <span className="badge-round">🐾 {t('hero_badge')}</span>
                        </div>
                        <h1 className="title-xl">
                            {t('hero_title_1')} <br />
                            {t('hero_title_2')} <br />
                            <span className={styles.accentText}>{t('hero_title_3')}</span>
                        </h1>
                        <p className={styles.subtext}>
                            {t('hero_sub')}
                        </p>
                        <div className={styles.actions}>
                            <div className={styles.searchBar}>
                                {/* Area Dropdown */}
                                <div className={styles.searchGroup} ref={areaRef}>
                                    <MapPin size={20} className={styles.searchIcon} />
                                    <div className={styles.dropdownContainer}>
                                        <div 
                                            className={styles.customSelect} 
                                            onClick={() => { setAreaOpen(!areaOpen); setServiceOpen(false); }}
                                        >
                                            <span className={selectedArea ? styles.selectedText : styles.placeholderText}>
                                                {selectedArea ? selectedArea : t('select_area')}
                                            </span>
                                            <ChevronDown size={18} className={`${styles.chevron} ${areaOpen ? styles.chevronOpen : ""}`} />
                                        </div>
                                        <AnimatePresence>
                                            {areaOpen && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className={styles.dropdownMenu}
                                                >
                                                    {areas.map(area => (
                                                        <div 
                                                            key={area} 
                                                            className={styles.dropdownItem}
                                                            onClick={() => { setSelectedArea(area); setAreaOpen(false); }}
                                                        >
                                                            {area === "KL" ? "Kuala Lumpur" : area}
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Service Dropdown */}
                                <div className={styles.searchGroup} ref={serviceRef}>
                                    <Briefcase size={20} className={styles.searchIcon} />
                                    <div className={styles.dropdownContainer}>
                                        <div 
                                            className={styles.customSelect} 
                                            onClick={() => { setServiceOpen(!serviceOpen); setAreaOpen(false); }}
                                        >
                                            <span className={selectedService ? styles.selectedText : styles.placeholderText}>
                                                {selectedService ? t(`service_${selectedService.toLowerCase()}`) : t('select_service')}
                                            </span>
                                            <ChevronDown size={18} className={`${styles.chevron} ${serviceOpen ? styles.chevronOpen : ""}`} />
                                        </div>
                                        <AnimatePresence>
                                            {serviceOpen && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className={styles.dropdownMenu}
                                                >
                                                    {services.map(service => (
                                                        <div 
                                                            key={service} 
                                                            className={styles.dropdownItem}
                                                            onClick={() => { setSelectedService(service); setServiceOpen(false); }}
                                                        >
                                                            {t(`service_${service.toLowerCase()}`)}
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <button className={styles.searchBtn} onClick={handleSearch}>
                                    <Search size={22} />
                                    <span>{t('hero_cta')}</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className={styles.visuals}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className={styles.imageMain}>
                        <div className={styles.dogContainer}>
                            <Image
                                src="/hero_dog_grooming_1769602911628.png"
                                alt="Happy Pomeranian"
                                fill
                                className={styles.mainImg}
                                priority
                            />
                        </div>
                        <div className={styles.floatingTag}>
                            <span className={styles.tagLabel}>{t('hero_trusted')}</span>
                            <p className={styles.tagDesc}>{t('hero_rated')}</p>
                        </div>
                    </div>

                    <div className={styles.badgeModern}>
                        <div className={styles.tagItem}>{t('hero_tag_grooming')}</div>
                        <div className={styles.tagItem}>{t('hero_tag_boarding')}</div>
                        <div className={styles.tagItem}>{t('hero_tag_spa')}</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
