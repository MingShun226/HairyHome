"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import styles from "./Post.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function BlogPost({ children }: { children: React.ReactNode }) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            <Navbar />
            <motion.div className={styles.progressBar} style={{ scaleX }} />

            <main className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link href="/blog" className={styles.back}>&larr; Back to Blog</Link>
                    <div className={styles.meta}>
                        <span className="badge">Grooming</span>
                        <span className={styles.date}>May 15, 2025</span>
                    </div>
                    <h1>5 Essential Grooming Tips for New Pet Parents</h1>
                </motion.div>

                <motion.article
                    className={styles.article}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {children}
                </motion.article>

                <section className={styles.newsletter}>
                    <h3>Get More Pet Tips</h3>
                    <p>Join our newsletter for weekly grooming advice and exclusive offers in Cheras.</p>
                    <div className={styles.inputGroup}>
                        <input type="email" placeholder="Your email address" />
                        <button className="button-primary">Subscribe</button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
