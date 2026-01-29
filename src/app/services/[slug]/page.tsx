"use client";

import { useParams } from "next/navigation";
import styles from "./ServiceDetail.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import Image from "next/image";
import { motion } from "framer-motion";

const SERVICE_DATA: Record<string, any> = {
    "professional-grooming": {
        title: "Professional Pet Grooming",
        desc: "Comprehensive grooming services for both cats and dogs in Cheras.",
        image: "/hero_dog_grooming_1769602911628.png",
        features: [
            "Basic & Full Grooming",
            "Nail Clipping & Ear Cleaning",
            "Medicated Baths",
            "De-shedding Treatment"
        ],
        details: "At Hairy Home, we believe grooming is more than just looking good. Our professional groomers use non-aggressive techniques to ensure your pet feels safe and pampered. From simple baths to breed-specific full clips, we provide the best care in Maluri, Cheras."
    },
    "cat-spa-experience": {
        title: "Cat Spa & Treatment",
        desc: "Luxury specialized treatments including Nano Bubble and Ayurveda Spa.",
        image: "/cat_spa_treatment_1769602943984.png",
        features: [
            "Nano Bubble Spa",
            "Ayurveda Herbal Spa",
            "Skin & Coat Treatment",
            "Relaxing Massage"
        ],
        details: "Give your cat the ultimate relaxation experience. Our specialized spa treatments help improve blood circulation, deep clean the fur, and provide therapeutic benefits for skin conditions. Your feline friend will leave feeling refreshed and rejuvenated."
    },
    "dog-hotel-stay": {
        title: "Pet Boarding & Hotel",
        desc: "Safe, cage-free and air-conditioned environment for your pets.",
        image: "/dog_boarding_hotel_1769602977566.png",
        features: [
            "24/7 Supervision",
            "Cage-Free Environment",
            "Air-Conditioned Rooms",
            "Daily Updates to Parents"
        ],
        details: "Hairy Home provides a 'Home away from Home' experience. Our boarding facility is designed to be stress-free and fun. We offer cage-free environments for dogs and specialized cat hotels to ensure every pet stays happy while you are away."
    }
};

export default function ServicePage() {
    const params = useParams();
    const slug = params.slug as string;
    const data = SERVICE_DATA[slug];

    if (!data) return <div className="p-20 text-center">Service Not Found</div>;

    return (
        <>
            <Navbar />
            <main className={`${styles.main} grid-paper`}>
                <section className={styles.hero}>
                    <motion.div
                        className={styles.content}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="badge-round">SERVICE DETAILS</span>
                        <h1 className="title-lg">{data.title}</h1>
                        <p className={styles.desc}>{data.desc}</p>
                        <a href="https://wa.me/601139968999" className="button-retro">Book Appointment</a>
                    </motion.div>
                    <motion.div
                        className={styles.imageBox}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="card-retro">
                            <Image src={data.image} alt={data.title} width={600} height={500} className={styles.mainImg} />
                        </div>
                    </motion.div>
                </section>

                <section className={styles.detailsSection}>
                    <div className={styles.grid}>
                        <div className={styles.info}>
                            <h2>Why Choose Our {data.title}?</h2>
                            <p>{data.details}</p>
                        </div>
                        <div className={`${styles.features} card-retro`}>
                            <h3>Included Services</h3>
                            <ul>
                                {data.features.map((f: string) => (
                                    <li key={f}>🐾 {f}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
            <Ticker />
            <Footer />
        </>
    );
}
