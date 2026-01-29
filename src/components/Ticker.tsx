"use client";

import styles from "./Ticker.module.css";

export default function Ticker() {
    const items = ["GROOMING 🐾", "HEALTH 💊", "FEEDING 🦴", "LOVE ❤️", "SITTING 🐕"];

    return (
        <div className={styles.ticker}>
            <div className={styles.track}>
                {[...items, ...items, ...items].map((item, i) => (
                    <span key={i} className={styles.item}>{item}</span>
                ))}
            </div>
        </div>
    );
}
