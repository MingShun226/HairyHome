"use client";

import { motion } from "framer-motion";
import styles from "./BlogPost.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/data/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = BLOG_POSTS.find(p => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className={styles.main}>
            <Navbar />

            <article className={styles.article}>
                <header className={styles.header}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.headerContent}
                    >
                        <Link href="/blog" className={styles.backLink}>&larr; Back to Blog</Link>
                        <span className={styles.category}>{post.category}</span>
                        <h1 className="title-lg">{post.title}</h1>
                        <div className={styles.meta}>
                            <span>By Hairy Home Team</span>
                            <span className={styles.dot}>•</span>
                            <span>{post.date}</span>
                        </div>
                    </motion.div>
                </header>

                <div className={styles.contentWrapper}>
                    <motion.div
                        className={styles.featuredImg}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className={styles.placeholderImg}>
                            {post.category === "Cat Care" ? "🐱" : "🐶"}
                        </div>
                    </motion.div>

                    <div className={styles.body}>
                        <p>{post.excerpt}</p>
                        <p>
                            At Hairy Home, we believe that every pet owner should have access to the best
                            information regarding their pet's health and happiness. Our team in Taman Maluri
                            is dedicated to providing not just services, but a community of care.
                        </p>
                        <h3>Why this matters</h3>
                        <p>
                            Information about {post.category.toLowerCase()} is vital for maintaining a healthy
                            lifestyle for your pets in Malaysia. The tropical climate brings unique challenges
                            that require specific solutions.
                        </p>
                        {/* More detailed content would go here based on the specific post */}
                    </div>

                    <div className={styles.newsletter}>
                        <h3>Stay in the Loop</h3>
                        <p>Get the latest pet tips and exclusive offers from Hairy Home Maluri delivered to your inbox.</p>
                        <div className={styles.form}>
                            <input type="email" placeholder="Your Email Address" />
                            <button className="button-retro">Join &rarr;</button>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
