import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Benefits from "@/components/Benefits";
import styles from "./page.module.css";

const PetCollection = dynamic(() => import("@/components/PetCollection"));
const TopPartners = dynamic(() => import("@/components/TopPartners"));
const HowWeServe = dynamic(() => import("@/components/HowWeServe"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Ticker = dynamic(() => import("@/components/Ticker"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <Hero />
        <Benefits />
        <PetCollection />
        <TopPartners />
        <Testimonials />
        <HowWeServe />
        <FAQ />
      </main>
      <Ticker />
      <Footer />
    </>
  );
}
