"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./CustomDropdown.module.css";

interface CustomDropdownProps {
    label?: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

export default function CustomDropdown({
    label,
    options,
    value,
    onChange,
    placeholder = "Select an option",
    icon,
    fullWidth = true
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div 
            className={`${styles.dropdownWrapper} ${fullWidth ? styles.fullWidth : ""}`} 
            ref={dropdownRef}
        >
            {label && <label className={styles.dropdownLabel}>{label}</label>}
            <div className={styles.dropdownContainer}>
                <div 
                    className={`${styles.customSelect} ${isOpen ? styles.active : ""}`} 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className={styles.valueWrap}>
                        {icon && <span className={styles.icon}>{icon}</span>}
                        <span className={value ? styles.selectedText : styles.placeholderText}>
                            {value || placeholder}
                        </span>
                    </div>
                    <ChevronDown size={18} className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} />
                </div>
                
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={styles.dropdownMenu}
                        >
                            {options.map((option) => (
                                <div 
                                    key={option} 
                                    className={`${styles.dropdownItem} ${value === option ? styles.itemActive : ""}`}
                                    onClick={() => {
                                        onChange(option);
                                        setIsOpen(false);
                                    }}
                                >
                                    {option}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
