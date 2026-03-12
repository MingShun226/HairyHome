"use client";

import styles from "./WhatsAppFloat.module.css";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
    return (
        <a
            href="https://wa.me/601139968999"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.float}
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={28} />
        </a>
    );
}
