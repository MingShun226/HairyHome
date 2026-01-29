"use client";

import { motion } from "framer-motion";
import styles from "./Blog.module.css";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/data/blog";
import Image from "next/image";

export default function BlogPage() {
    return (
        <main className={styles.main}>
            <Navbar />

            <section className={styles.hero}>
                <div className={styles.heroImgWrapper}>
                    <Image
                        src="/services_hero_grooming_1769607223313.png"
                        alt="Blog Hero"
                        fill
                        className={styles.heroImg}
                        priority
                    />
                    <div className={styles.overlay} />
                </div>

                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="badge-round" style={{ background: '#FFCE1A' }}>🐾 Tales & Tips from Hairy Home</span>
                    <h1 className="title-lg" style={{ color: 'white' }}>EVERYTHING PETS</h1>
                    <p className={styles.heroSubtext}>
                        Expert advice, heartfelt stories, and essential guides for your furry family members.
                    </p>
                </motion.div>
            </section>

            <section className={styles.blogGridSection}>
                <div className="container">
                    <div className={styles.grid}>
                        {BLOG_POSTS.map((post, index) => (
                            <motion.div
                                key={post.id}
                                className={styles.blogCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                                    <div className={styles.imgWrapper}>
                                        <div className={styles.categoryBadge}>{post.category}</div>
                                        <Image src={post.image} alt={post.title} fill className={styles.cardImg} />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <span className={styles.date}>{post.date}</span>
                                        <h2 className={styles.postTitle}>{post.title}</h2>
                                        <p className={styles.excerpt}>{post.excerpt}</p>
                                        <span className={styles.readMore}>Read Story &rarr;</span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
