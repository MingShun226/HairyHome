"use client";

import { motion } from "framer-motion";
import styles from "./ServiceCard.module.css";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    delay?: number;
}

export default function ServiceCard({ title, description, icon, delay = 0 }: ServiceCardProps) {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -10 }}
        >
            <div className={styles.iconWrapper}>
                {icon}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </motion.div>
    );
}
